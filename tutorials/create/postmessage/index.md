---
layout: tutorial
title: Iframe communication (postMessage)
lastupdated: 2016-06-07
weight: 2000
indent: 1
difficulty_overall: 2
contains_scripts: true
tags: iframe, postmessage
achievements: Scripting
duration: 30 minutes
short_description: Sometimes you want to embed your Goo scene in an iframe, but still want to to communicate with it from outside.
thumbnail: tutorials/create/postmessage/thumbnail.jpg
---
The goal of this tututorial is to embed a Goo scene in an iframe, but make the Goo scene react to mouse movements outside the iframe.

## Step 1: The "mousemove" event

To track the mouse movement on a page, traditionally we use an event listener on the `window` object. Let's try this.

1. Create a new scene in Create
2. Add a box to the scene
3. Add a Script component to the box entity.
4. Create a Custom Script in the script component.
5. Open the script in the Script editor.
6. Enter the following code:

{% highlight js %}// This will not work outside the iframe!
var setup = function(args, ctx) {
  ctx.listener = function(evt) {
    console.log(evt.clientX, evt.clientY);
  };
  window.addEventListener('mousemove', ctx.listener);
}

var cleanup = function(args, ctx) {
  window.removeEventListener('mousemove', ctx.listener);
}{% endhighlight %}

Now embed the scene in a HTML page:

{% highlight html %}<iframe id="goo-scene" src="https://goote.ch/yoursceneID.scene"></iframe>{% endhighlight %}

If you open the HTML page in a browser, and open the JavaScript console, you will notice that the mouse position is only logging when the mouse is inside of the iframe. The reason is because we are listening to the *iframe window* and not the *parent window*.

## Step 2: Listening for "mousemove" on window.parent

Now let's attach the listener on the correct *Window* object, by using `window.parent`. Update the code so it looks like this:

{% highlight js %}// This will throw a cross-origin error!
var setup = function(args, ctx) {
  ctx.listener = function(evt) {
    console.log(evt.clientX, evt.clientY);
  };
  window.parent.addEventListener('mousemove', ctx.listener);
}

var cleanup = function(args, ctx) {
  window.parent.removeEventListener('mousemove', ctx.listener);
}{% endhighlight %}

Unfortunately, we now get the following error message:

`Uncaught DOMException: Blocked a frame with origin "https://goote.ch" from accessing a cross-origin frame.`.

The browser automatically blocks the iframe from reaching out of its frame, because of security concerns. So how can we get around this? One option is to download the scene as a webpage, and put it on the same domain as the main webpage. If you do it this way, the browser will allow the iframe to "reach out" and not throw an error.

## Step 3: Using postMessage

Let's say we would like to include a published Create scene in an `iframe`, without having to put it in our own server. A solution we can use here is called `postMessage`.

Change the HTML embed code so it looks like this:

{% highlight html %}<iframe id="goo-scene" src="https://goote.ch/yoursceneID.scene"></iframe>
<script>
var iframe = document.getElementById('goo-scene');
iframe.onload = function() {
  window.addEventListener('mousemove', function(event) {
    var data = {
      clientX: event.clientX,
      clientY: event.clientY
    };
    iframe.contentWindow.postMessage(data, '*');
  });
};
</script>{% endhighlight %}

Now, in our script we can listen to the `message` event on the iframe window. Update the Goo Create script to this:

{% highlight js %}var setup = function(args, ctx) {
  ctx.listener = function(evt) {
    console.log(evt.data.clientX, evt.data.clientY);
  };
  window.addEventListener('message', ctx.listener);
}

var cleanup = function(args, ctx) {
  window.removeEventListener('message', ctx.listener);
}{% endhighlight %}

You will now notice that you get log messages both on the iframe and outside the iframe. Perfect!

## Step 4: Change the color of a mesh depending on mouse position

The `console.log` example is a bit boring, so let's do something useful instead.

Update your HTML embed code to the following.

{% highlight html %}<!-- Embed the goo scene -->
<iframe id="goo-scene" src="..."></iframe>

<!-- when the iframe loads, send in the mouse position -->
<script>
var iframe = document.getElementById('goo-scene');
iframe.onload = function() {
  window.addEventListener('mousemove', function(event) {
    // Send the mouse position (relative to the upper left iframe corner) to the iframe.
    var rect = iframe.getBoundingClientRect();
    var data = {
      myEvent: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    iframe.contentWindow.postMessage(data, '*');
  });
};
</script>{% endhighlight %}

In the Create script, we want to set the diffuse color of the cube depending on the mouse position. Copy this code to the custom script:

{% highlight js %}var setup = function(args, ctx) {
  // Listen for messages from the parent window
  window.addEventListener('message', ctx.messageListener = function(evt) {
    if(evt.data.myEvent){
      // Set the color of the mesh on the entity
      var color = [
        0.5 * Math.sin(evt.data.x / ctx.domElement.width) + 0.5,
        0.5 * Math.sin(evt.data.y / ctx.domElement.height) + 0.5,
        0,
        1
      ];
      ctx.entity.meshRendererComponent.materials[0].uniforms.materialDiffuse = color;
    }
  });
  // Listen for mouse movement on the iframe window.
  // This is needed because mouse events on the iframe
  // can't be caught by the parent window.
  window.addEventListener('mousemove', ctx.mousemoveListener = function(evt){
    ctx.messageListener({
      data: {
        myEvent: true,
        x: evt.clientX,
        y: evt.clientY
      }
    });
  });
}

var cleanup = function(args, ctx) {
  window.removeEventListener('message', ctx.messageListener);
  window.removeEventListener('mousemove', ctx.mousemoveListener);
}{% endhighlight %}

<iframe id="goo-scene" src="https://goote.ch/cb8a64d8b7be4fbda23a2cd935b717b6.scene/"></iframe>
<script>
var iframe = document.getElementById('goo-scene');
iframe.onload = function() {
  window.addEventListener('mousemove', function(event) {
    var rect = iframe.getBoundingClientRect();
    var data = {
      myEvent: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    iframe.contentWindow.postMessage(data, '*');
  });
};
</script>