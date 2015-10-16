---
layout: tutorial
title: Procedural textures
weight: 5950
indent: 1
---
A great way to <strong>reduce load times</strong> is to use procedurally generated textures.
There is one really easy way to generate texture data, and there are a couple of more advanced ones.
<h2>The Easy Way</h2>
Simply create an off-screen canvas and paint to it and use the data with the WebGL function to initialize a texture like so:
{% highlight js %}function createGradientImage(opt_width, opt_height)
{
  var canvas = document.createElement("canvas");
  canvas.width = opt_width || 256;
  canvas.height = opt_height || 256;
  var ctx = canvas.getContext('2d');

  var cxlg=ctx.createLinearGradient(0, 0, canvas.width, 0);
  cxlg.addColorStop(0, '#f00');
  cxlg.addColorStop(0.5, '#0f0');
  cxlg.addColorStop(1.0, '#00f');

  ctx.fillStyle = cxlg;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  return canvas;
}

function textureFromCanvas(canvas) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  return texture;
}
{% endhighlight %}
Here is a <a href="http://rhulha.github.io/self-contained-webgl-demo/">demo using that technique</a>.
<h2>The Advanced Way</h2>
The advanced way is to generate raw image data bytes in an array and then pass it to the WebGL texture functions. This gives you the ultimate flexibility, but the easier canvas method above might be preferable.
{% highlight js %}function createTexture(byteArrayWithRGBAData) {
  var data = new Uint8Array(byteArrayWithRGBAData);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D,
       0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  return texture;
}
{% endhighlight %}
Here is a <a href="http://jsfiddle.net/uzMPU/">great demo by Notch</a> (the creator of Minecraft) using this strategy. All the textures are generated in the JavaScript code as RGB byte values. Here is a <a href="https://www.youtube.com/watch?v=WaZvDCmlERc">video</a> explaining the code if you like to know more.
<h2>Render to texture</h2>
Another way is to <strong>render a WebGL scene to a texture.</strong> See here for an <a href="http://learningwebgl.com/blog/?p=1786">example using pure WebGL</a>. Here is <a href="http://jsfiddle.net/rherlitz/6mG3W/">one using Goo Engine</a>.
<h2>Shader effects</h2>
Finally, you can do a lot of spectacular effects completely without textures by only using shader effects. Here is a <a href="http://rhulha.github.io/ChronosGL/TunnelVision/index.html">demo using Perlin Noise</a>.

<a href="http://www.shadertoy.com">Shadertoy</a> is a great place for many many examples of this approach.

Next: <a href="../reducing-memory-usage/">Reducing Memory Usage</a>