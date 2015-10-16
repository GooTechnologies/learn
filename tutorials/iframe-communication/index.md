---
layout: tutorial
title: Iframe Communication
weight: 5790
indent: 1
---
[vc_row no_margin="true" padding_top="0px" padding_bottom="0px" border="none"][vc_column width="1/1"][text_output]By default, scripts can't communicate across pages unless they're all from the same host, use the same protocols, et cetera. This poses a problem if we'd like to include a published Create project in an iframe, but have the project react to input coming from the rest of the page. The solution for this is called <strong>postMessage</strong> (<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage" target="_blank">read about it here</a>). This tutorial will explain how to use it for communicating with a project in an iframe.
<h2>The Setup (A Project that Doesn't Work)</h2>
We are going to use a very simple scene, were we control the color of a cube using the position of the mouse. The scene includes a simple box entity, with the following script attached to it:

<pre><code>
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
</code></pre>

The result, contained in a small iframe, looks like this:
<p style="text-align: center">[advanced_iframe src="https://goote.ch/0faa7841926b4bf9be6964056e212bb8.project/" securitykey="iframe" width="400" height="200" style="width:400px;height:200px;"]
<em>Works only when mouse is over iframe</em></p>
As you can see, the color changes with the position as long as the mouse is hovering over the iframe. Once the cursor goes outside, it won't update anymore. Let's combat that using postMessage!
<h2>A Project that Works</h2>
We need to forward the info from this page to the iframe. This is what we have put on <em>this very tutorial page,</em> or the page containing the iframe:

<pre><code>
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
</code></pre>

Then, we need to make some changes to the Create project code. We no longer use the iframe's data, but listen for the 'message' event instead. The code below explains the changes.

<pre><code>
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
</code></pre>

The new project reacts to movements outside its own page!
<p style="text-align: center">[advanced_iframe id="project_iframe" src="https://goote.ch/b50617b01c0f4aaeb05be87887ecc18f.project/" securitykey="iframe" width="400" height="200" style="width:400px;height:200px;"]
<em>Works even when the mouse is outside the iframe</em></p>

<h2 style="text-align: left">More</h2>
There are, of course, optimizations to do here. We don't need to send the window size all the time, sending it if it changes is enough. Also, it might be useful to implement both the direct and the postMessage strategy in some kind of fallback mechanism.

Want to take a look at the Create projects? Here they are!

<strong>Projects to Duplicate:</strong>
<a href="https://app.goocreate.com/4768/2ba38845216d4eeeb9087b305dfbddb0.scene" target="_blank">Scene not using postMessage
</a><a href="https://app.goocreate.com/4768/d6a9c3d845be4a4496dcbffefbfbfe0c.scene" target="_blank">Scene using postMessage</a>

&nbsp;

[/text_output][/vc_column][/vc_row][vc_row no_margin="true" padding_top="0px" padding_bottom="0px" border="none"][vc_column width="1/1"][vc_raw_js]JTNDc2NyaXB0JTIwdHlwZSUzRCUyMnRleHQlMkZqYXZhc2NyaXB0JTIyJTNFJTBBJTBBZnVuY3Rpb24lMjBzZXR1cE1vdXNlbW92ZVByb3h5JTI4aWZyYW1lJTI5JTIwJTdCJTBBJTIwJTIwJTIwJTIwdmFyJTIwd2lkdGglMkMlMjBoZWlnaHQlMkMlMjBteCUyQyUyMG15JTNCJTBBJTIwJTIwJTIwJTIwdmFyJTIwbW91c2Vtb3ZlJTIwJTNEJTIwZnVuY3Rpb24lMjglMjklMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB2YXIlMjBtc2clMjAlM0QlMjAlN0IlMjAlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB0eXBlJTNBJTIwJTI3bW91c2Vtb3ZlJTI3JTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaW5uZXJXaWR0aCUzQSUyMHdpZHRoJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaW5uZXJIZWlnaHQlM0ElMjBoZWlnaHQlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjbGllbnRYJTNBJTIwbXglMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBjbGllbnRZJTNBJTIwbXklMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlN0QlM0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSUyOEpTT04uc3RyaW5naWZ5JTI4bXNnJTI5JTJDJTIwJTIyJTJBJTIyJTI5JTNCJTBBJTIwJTIwJTIwJTIwJTdEJTNCJTBBJTIwJTIwJTIwJTIwd2luZG93LmFkZEV2ZW50TGlzdGVuZXIlMjglMjdtb3VzZW1vdmUlMjclMkMlMjBmdW5jdGlvbiUyOGV2dCUyOSUyMCU3QiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHdpZHRoJTIwJTNEJTIwd2luZG93LmlubmVyV2lkdGglM0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBoZWlnaHQlMjAlM0QlMjB3aW5kb3cuaW5uZXJIZWlnaHQlM0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBteCUyMCUzRCUyMGV2dC5jbGllbnRYJTNCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwbXklMjAlM0QlMjBldnQuY2xpZW50WSUzQiUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG1vdXNlbW92ZSUyOCUyOSUzQiUwQSUyMCUyMCUyMCUyMCU3RCUyOSUzQiUwQSU3RCUwQXZhciUyMGlmcmFtZSUyMCUzRCUyMGRvY3VtZW50LmdldEVsZW1lbnRCeUlkJTI4JTI3cHJvamVjdF9pZnJhbWUlMjclMjklM0IlMEFjb25zb2xlLmxvZyUyOCUyN2lmcmFtZSUyNyUyQyUyMGlmcmFtZSUyOSUzQiUwQWlmcmFtZS5vbmxvYWQlMjAlM0QlMjBmdW5jdGlvbiUyOCUyOSUyMCU3QiUwQSUyMCUyMCUyMCUyMGNvbnNvbGUubG9nJTI4JTI3aWZyYW1lJTIwb25sb2FkJTI3JTI5JTNCJTBBJTIwJTIwJTIwJTIwc2V0dXBNb3VzZW1vdmVQcm94eSUyOGlmcmFtZSUyOSUzQiUwQSU3RCUzQiUwQSUwQSUzQyUyRnNjcmlwdCUzRQ==[/vc_raw_js][/vc_column][/vc_row][vc_row][vc_column width="1/1"][/vc_column][/vc_row]