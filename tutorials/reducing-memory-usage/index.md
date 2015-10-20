---
layout: tutorial
title: Reducing Memory Usage
weight: 5990
indent: 1
---
## Object Creation and Garbage Collection

This is probably the most important advice in this article series: **_Do not create objects unconditionally in the main game loop !_**  

It’s a thing that comes natural to us in garbage collected languages like JavaScript: creating objects. In many application scenarios this is not a problem but for a WebGL application this can quickly become a performance killer.  

### Here is Why

The recommended way to refresh a scene in a WebGL application is to use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame) which is similar to the setTimeout function. This function will ideally call your main game or application animation code **60 times per second**. So even if you only create one object in your main game code you will have created **3600 objects after a minute** which all have to be cleaned up by the [garbage collector](http://en.wikipedia.org/wiki/Garbage_collection_(computer_science)), causing performance degradation and stutter.  

Consider this example of a car chasing camera script that is executed every frame (the math API is from [Goo Engine](http://code.gooengine.com)).

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

The code looks innocent enough, but there are two big problems: The two new instances of the Vector3 class. *This code will result in 7200 created objects after one minute.*

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

For a great article specifically on this topic please take a look at: [How to write low garbage real-time JavaScript](https://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript) And here is a great article on [Optimization-killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) And Chrome comes with a great developer tool to detect memory leaks, an option called: [Record Heap Allocations](https://developer.chrome.com/devtools/docs/javascript-memory-profiling)

## Polygon Reduction

An interesting topic in regards to WebGL performance and bandwidth is polygon reduction. While it is not super important from a rendering performance point of view to have few polygons per model, it can mean a significant reduction in data that needs to be transferred to the browser and stored in memory. The basic idea is to have an off-line tool to process complex and detailed models and have the tool try to reduce the number of polygons without significantly reducing the visual quality of the models. Some popular tools for polygon reduction are built-in in **Blender**, **3DS Max** and **Maya**. Some popular external tools include:

* [http://simplygon.com](http://simplygon.com)
* [http://www.topogun.com](http://www.topogun.com)
* [http://meshlab.sourceforge.net](http://meshlab.sourceforge.net/)
* [https://www.mixamo.com/decimator](https://www.mixamo.com/decimator)

## Crunch Texture compression

A very advanced option to reduce GPU memory usage is to use [crunch textures](http://code.google.com/p/crunch/). They are compressed in way that allows the graphics card to load and use them unchanged. JPG and PNG textures are uncompressed into GPU memory wasting a lot of space. To load `.crn` textures with TextureCreator.loadTexture2D using the Goo Engine just add this script-tag to your html file:

{% highlight html %}
<script src="//code.gooengine.com/latest/lib/crunch/crunch.js"></script>
{% endhighlight %}
