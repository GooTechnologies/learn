---
layout: page
title: Reducing Draw Calls
weight: 5500
indent: 1
---

<h2>Moving Calculations to the GPU</h2>
One way to reduce CPU calculations is to move them from the CPU to the GPU. One great example of this approach is picking. Picking is the task of determining which screen-rendered object a user has clicked on or is being intersected by a ray. There are <strong>two</strong> common approaches to pick objects in a 3D scene.
<h3>Software picking</h3>
<strong>First:</strong> one can build a hierarchical tree of objects based on their position and bounding box and if one needs to pick an object we can traverse the tree to find all intersecting objects.

Here is a <a href="http://labs.gooengine.com/examples/picking/">demo using software picking</a>.
<h3>Hardware picking</h3>
<strong>Alternatively:</strong> one can render the scene from the perspective of the pick origin and render every object in a different color based on the objects ID. Then you can simply look at the pixel color where the pick was made to find the picked object. Here is a <a href="http://code.gooengine.com/0.9.10/visual-test/goo/renderer/WorldPickCoords/WorldPickCoordinates-vtest.html">demo using hardware picking</a>. And one more demo at <a href="http://jsfiddle.net/qLw8H/14/">jsfiddle</a>.

For a C based program with the proper optimizations the first approach is no performance problem but for a JavaScript program with many objects this can quickly become a bottleneck and as you can imagine the second approach is as fast as rendering a frame of your scene. This effectively shifts all of the work and leverages all the optimizations of the graphics card pipeline and therefore scales much better.