---
layout: tutorial
title: Reducing Draw Calls
weight: 5980
indent: 1
---
## Moving Calculations to the GPU

One way to reduce CPU calculations is to move them from the CPU to the GPU. One great example of this approach is picking. Picking is the task of determining which screen-rendered object a user has clicked on or is being intersected by a ray. There are **two** common approaches to pick objects in a 3D scene.

### Software picking

**First:** one can build a hierarchical tree of objects based on their position and bounding box and if one needs to pick an object we can traverse the tree to find all intersecting objects. Here is a [demo using software picking](http://labs.gooengine.com/examples/picking/).

### Hardware picking

**Alternatively:** one can render the scene from the perspective of the pick origin and render every object in a different color based on the objects ID. Then you can simply look at the pixel color where the pick was made to find the picked object. Here is a [demo using hardware picking](http://code.gooengine.com/0.9.10/visual-test/goo/renderer/WorldPickCoords/WorldPickCoordinates-vtest.html). And one more demo at [jsfiddle](http://jsfiddle.net/qLw8H/14/).

For a C based program with the proper optimizations the first approach is no performance problem but for a JavaScript program with many objects this can quickly become a bottleneck and as you can imagine the second approach is as fast as rendering a frame of your scene. This effectively shifts all of the work and leverages all the optimizations of the graphics card pipeline and therefore scales much better.