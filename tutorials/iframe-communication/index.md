---
layout: tutorial
title: Iframe Communication
weight: 5790
indent: 1
---
By default, scripts can't communicate across pages unless they're all from the same host, use the same protocols, et cetera. This poses a problem if we'd like to include a published Create project in an iframe, but have the project react to input coming from the rest of the page. The solution for this is called **postMessage** ([read about it here](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage)). This tutorial will explain how to use it for communicating with a project in an iframe.

## The Setup (A Project that Doesn't Work)

We are going to use a very simple scene, were we control the color of a cube using the position of the mouse. The scene includes a simple box entity, with the following script attached to it:

{% highlight js %}
var setup = function(args, ctx, goo) {
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;
  ctx.material = ctx.entity.meshRendererComponent.materials[0];
  ctx.windowListeners = {
    mousemove: function(evt) {
      setDiffuseColor(ctx.material, mousePosToColor(ctx, evt.clientX, evt.clientY));
    }
  };
  for (var k in ctx.windowListeners) {
    window.addEventListener(k, ctx.windowListeners[k]);
  }
};

var setDiffuseColor = function(material, color) {
  material.uniforms.materialDiffuse = color;
};

var mousePosToColor = function(ctx, x, y) {
  // Do some arbitrary mapping of mouse position to a color
  return [x/ctx.width, y/ctx.height, Math.sin(2*Math.PI*x/ctx.width), 1];
};

var cleanup = function(args, ctx, goo) {
  for (var k in ctx.windowListeners) {
    window.removeEventListener(k, ctx.windowListeners[k]);
  }
};
{% endhighlight %}

The result, contained in a small iframe, looks like this:

<iframe src="https://goote.ch/0faa7841926b4bf9be6964056e212bb8.project/"></iframe>

*Works only when mouse is over iframe*

As you can see, the color changes with the position as long as the mouse is hovering over the iframe. Once the cursor goes outside, it won't update anymore. Let's combat that using postMessage!

<h2>A Project that Works</h2>

We need to forward the info from this page to the iframe. This is what we have put on *this very tutorial page,* or the page containing the iframe:

{% highlight js %}
function setupMousemoveProxy(iframe) {
  var width, height, mx, my;
  var mousemove = function() {
    var msg = {
      type: 'mousemove',
      innerWidth: width,
      innerHeight: height,
      clientX: mx,
      clientY: my
    };
    iframe.contentWindow.postMessage(JSON.stringify(msg), '*');
  };
  window.addEventListener('mousemove', function(evt) {
    width = window.innerWidth;
    height = window.innerHeight;
    mx = evt.clientX;
    my = evt.clientY;
    mousemove();
  });
}
var iframe = document.getElementById('project_iframe');
iframe.onload = function() {
  setupMousemoveProxy(iframe);
};
{% endhighlight %}

Then, we need to make some changes to the Create project code. We no longer use the iframe's data, but listen for the 'message' event instead. The code below explains the changes.

{% highlight js %}
var setup = function(args, ctx, goo) {
  ctx.material = ctx.entity.meshRendererComponent.materials[0];
  ctx.windowListeners = {
    // Listen for message instead of direct mousemove
    message: function(evt) {
      // We need to parse the message, which is just a string
      var msg = JSON.parse(evt.data);
      // Since all types of event need to go through the same listener,
      // it can be a good idea to separate by type.
      if (msg.type === 'mousemove') {
      // Use data from message instead of own window
      setDiffuseColor(ctx.material, mousePosToColor(
        msg.innerWidth, msg.innerHeight, msg.clientX, msg.clientY));
      }
    }
  };
  for (var k in ctx.windowListeners) {
    window.addEventListener(k, ctx.windowListeners[k]);
  }
};

var setDiffuseColor = function(material, color) {
  material.uniforms.materialDiffuse = color;
};

var mousePosToColor = function(width, height, x, y) {
  return [x/width, y/height, Math.sin(2*Math.PI*x/width), 1];
};

var cleanup = function(args, ctx, goo) {
  for (var k in ctx.windowListeners) {
    window.removeEventListener(k, ctx.windowListeners[k]);
  }
};
{% endhighlight %}

The new project reacts to movements outside its own page!

<iframe id="project_iframe" src="https://goote.ch/b50617b01c0f4aaeb05be87887ecc18f.project/"></iframe>

*Works even when the mouse is outside the iframe*

## More

There are, of course, optimizations to do here. We don't need to send the window size all the time, sending it if it changes is enough. Also, it might be useful to implement both the direct and the postMessage strategy in some kind of fallback mechanism.

Want to take a look at the Create projects? Here they are!

Projects to Duplicate:

* [Scene not using postMessage](https://app.goocreate.com/4768/2ba38845216d4eeeb9087b305dfbddb0.scene)
* [Scene using postMessage](https://app.goocreate.com/4768/d6a9c3d845be4a4496dcbffefbfbfe0c.scene)