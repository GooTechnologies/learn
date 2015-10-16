---
layout: tutorial
title: Reducing Memory Usage
weight: 5990
indent: 1
---
<h2>Object Creation and Garbage Collection</h2>
This is probably the most important advice in this article series: <strong><em>Do not create objects unconditionally in the main game loop !</em></strong>

It’s a thing that comes natural to us in garbage collected languages like JavaScript: creating objects. In many application scenarios this is not a problem but for a WebGL application this can quickly become a performance killer.

<h3>Here is Why</h3>
The recommended way to refresh a scene in a WebGL application is to use <a href="https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame">requestAnimationFrame</a> which is similar to the setTimeout function. This function will ideally call your main game or application animation code <strong>60 times per second</strong>. So even if you only create one object in your main game code you will have created <strong>3600 objects after a minute</strong> which all have to be cleaned up by the <a title="computer_science" href="http://en.wikipedia.org/wiki/Garbage_collection_">garbage collector</a>, causing performance degradation and stutter.

Consider this example of a car chasing camera script that is executed every frame (the math API is from <a href="http://code.gooengine.com">Goo Engine</a>).

{% highlight js %}
function cameraScript() {
  var transform =car.transformComponent.transform;
  var pos = transform.translation;
  var behindCar = new Vector3(0,0,-3);
  transform.rotation.applyPost(behindCar);
  behindCar.add(pos).add(0,2.5,0);
  camera.transformComponent.transform.translation.lerp(behindCar,0.05);
  camera.lookAt(new Vector3(pos).add(0,1,0), Vector3.UNIT_Y);
}
{% endhighlight %}

The code looks innocent enough, but there are two big problems: The two new instances of the Vector3 class. <strong>This code will result in 7200 created objects after one minute.</strong>

The fix is easy enough: Simply create two Vector3 objects outside of the function to be re-used:

{% highlight js %}
var aboveCar = new Vector3();
var behindCar = new Vector3();
function cameraScript() {
  var transform = car.transformComponent.transform;
  var pos = transform.translation;
  behindCar.set(0,0,-3);
  transform.rotation.applyPost(behindCar);
  behindCar.add(pos).add(0,2.5,0);
  camera.transformComponent.transform.translation.lerp(behindCar,0.05);
  camera.lookAt(aboveCar.set(pos).add(0,1,0),Vector3.UNIT_Y);
}
{% endhighlight %}

For a great article specifically on this topic please take a look at: <a href="https://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript">How to write low garbage real-time JavaScript</a>

And here is a great article on <a href="https://github.com/petkaantonov/bluebird/wiki/Optimization-killers">Optimization-killers</a>

And Chrome comes with a great developer tool to detect memory leaks, an option called: <a href="https://developer.chrome.com/devtools/docs/javascript-memory-profiling">Record Heap Allocations</a>

<h2>Polygon Reduction</h2>
An interesting topic in regards to WebGL performance and bandwidth is polygon reduction. While it is not super important from a rendering performance point of view to have few polygons per model, it can mean a significant reduction in data that needs to be transferred to the browser and stored in memory. The basic idea is to have an off-line tool to process complex and detailed models and have the tool try to reduce the number of polygons without significantly reducing the visual quality of the models.

Some popular tools for polygon reduction are built-in in <strong>Blender</strong>, <strong>3DS Max</strong> and <strong>Maya</strong>.
Some popular external tools include:

* <a href="http://simplygon.com">http://simplygon.com</a>
* <a href="http://www.topogun.com">http://www.topogun.com</a>
* <a href="http://meshlab.sourceforge.net/">http://meshlab.sourceforge.net</a>
* <a href="https://www.mixamo.com/decimator">https://www.mixamo.com/decimator</a>

<h2>Crunch Texture compression</h2>

A very advanced option to reduce GPU memory usage is to use <a href="http://code.google.com/p/crunch/">crunch textures</a>. They are compressed in way that allows the graphics card to load and use them unchanged.
JPG and PNG textures are uncompressed into GPU memory wasting a lot of space.

<span style="color: #363b40">To load <code style="color: #c7254e">.crn</code> textures with TextureCreator.loadTexture2D using the Goo Engine just add this script-tag to your html file:</span>

{% highlight html %}
<script src="//code.gooengine.com/latest/lib/crunch/crunch.js"></script>
{% endhighlight %}

Next: <a href="../reducing-draw-calls/">Reducing Draw Calls</a>
