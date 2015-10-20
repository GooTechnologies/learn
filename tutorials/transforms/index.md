---
layout: tutorial
title: Transforms
weight: 6100
indent: 1
---
Transforms are fundamental to computer graphics, and this tutorial will talk briefly about what a transform is, how it's constructed and how the transform component in Goo Create works and is used.

## Rotation, Translation and Scale

Let's start from the bottom. A transform positions an entity and all its vertices in space. Transforms can work in any number of dimensions, but we'll be mostly concerned about 3D transforms here. A typical 3D transform consists of three parts. Rotation, translation, and scale.

### Translation

The translation is simply a three-dimensional vector ([Vector3](http://code.gooengine.com/latest/docs/index.html?c=Vector3)) describing an entity's position as 3D coordinates **(x, y, z)**. Its default is the origin, **(0, 0, 0)**.

{% highlight js %}
// Super simple example
var update = function(args, ctx, goo) {
	ctx.entity.transformComponent.transform.translation.x = Math.sin(ctx.world.time);
 	ctx.entity.transformComponent.setUpdated(); // Trigger update
};
{% endhighlight %}

<iframe src="//goote.ch/f8d0392727657e78d65a60e0931c2e95cacf896a/"></iframe>

### Rotation

The rotation is used to specify an entity's rotation around the x, y and z axises. It is represented by a _3x3 matrix_ ([Matrix3x3](http://code.gooengine.com/latest/docs/index.html?c=Matrix3x3)), called the rotation matrix ([Wikipedia link](http://en.wikipedia.org/wiki/Rotation_matrix#In_three_dimensions)). All the underlying math is actually represented by matrices and vectors! If you take a look at the Wikipedia article, you'll see that three individual matrices can be used for rotations around the axises. These three are then multiplied together to form the rotation matrix representing the total rotation. If you're familiar with linear algebra, you'll know that the order of multiplication matters! If you're not, now you're informed. Luckily, you won't have to care too much about the details if you don't want to. [The Matrix3x3 class](http://code.gooengine.com/latest/docs/index.html?c=Matrix3x3) has plenty of useful functions. For example, **rotateX(_number_ rad)** which builds the correct matrix and multiplies the current rotation matrix with it for you.

{% highlight js %}
// Super simple example
var update = function(args, ctx, goo) {
	ctx.entity.transformComponent.transform.rotation.rotateY(ctx.world.tpf);
	ctx.entity.transformComponent.setUpdated();
};
{% endhighlight %}

<iframe src="//goote.ch/61d1568b11d596370b34a3dbd4e97c680d050e01/"></iframe>

### Scale

The scale is, like the translation, a three-dimensional vector. It starts as the vector **(1, 1, 1)** meaning that an entity's scale along each axis is one, unchanged. If we would use the vector **(2, 2, 2)** instead, that would mean that the entity is _twice as big in each direction_!

{% highlight js %}
// Super simple example
var update = function(args, ctx, goo) {
    ctx.entity.transformComponent.transform.scale.x = 2*Math.abs(Math.sin(ctx.world.time));
    ctx.entity.transformComponent.setUpdated(); // Trigger update
};
{% endhighlight %}

<iframe src="//goote.ch/853e0744b31b6fd66ddd1a18d709439710aa0a64/"></iframe>

## The Transform

### The Transform Matrix

Now when we have an understanding of the three parts above, we can grasp the transform a little better. A transform is simply a combination of a translation, a rotation and a scale. These three quantities (two vectors and one matrix) are combined into a final **transform matrix**. This matrix represents the total, combined result of the three components. The matrix is actually a 4x4 matrix (Matrix4x4) because of math details. It has to do with being able to represent the translation with a matrix, [read this StackExchange question for more details](http://math.stackexchange.com/questions/336/why-are-3d-transformation-matrices-4-times-4-instead-of-3-times-3). Again, we don't have to worry too much about the math unless we want to!

### The Transform API

We have already seen that the matrix and vector classes already have some helper functions, and the [Transform class](http://code.gooengine.com/latest/docs/index.html?c=Transform) brings some more. It being essentialy a matrix (after combining) one can for example combine this matrix with other transform matrices, apply points or vectors to it, or invert it. There might be special cases where those kinds of operations are neccecary if you're writing an app using advanced transforms. There are other useful functions, but these functions will also be accessible from the TransformComponent directly, and we recommend to use them on that level.

## The Transform Component

Transforms belong to the fundamentals of computer graphics, but Goo Engine (and other entity-component-system engines) implement this in the [TransformComponent](http://code.gooengine.com/latest/docs/index.html?c=TransformComponent). The component effectively takes care of all the low-level details, and makes sure everything happens in the correct order. The transform component integrates the transform into the rendering engine, and takes care of building the hierarchical scene graph. Moreover, the [TransformComponent API](http://code.gooengine.com/latest/docs/index.html?c=TransformComponent) adds a lot of useful functions which also are accessible directly from the entity! This makes writing code considerably simpler and shorter.

### The TransformComponent API

The API has functions for **adding** or directly **setting** rotation, translation or scale. There are also **getters** for accessing these values. To build hierarchies and parent/children relationships between entities, one uses the **attachChild** or **detachChild** functions. The function lookAt can be used to orient an entity in a certain direction.

<iframe src="//goote.ch/1107233399a27f819dd36d3e10abf2088e1717c8/"></iframe>

{% highlight js %}
// Have the entity (Cone) look at the Sphere
// Sphere is moving with the super simple translation script above

var setup = function(args, ctx, goo) {
	ctx.entityToFollow = ctx.world.by.name('Sphere').first();
};

var update = function(args, ctx, goo) {
	ctx.entity.lookAt(ctx.entityToFollow.getTranslation());
	// Could also have used ctx.entity.transformComponent.lookAt(...
	// No need to call setUpdated() when we use the helper functions!
};
{% endhighlight %}

### Local and Global Coordinates and Hierarchies

The 3D world contains two different coordinate systems and corresponding transforms. The local transform orients an entity relative to its parent, and the global transform is the resulting transform relative to the root, or the world coordinate. The root is represented by the Scene in the Goo world. The TransformComponent has two transform members, the **transform** (local) as well as **worldTransform**!  

In the examples above, we have called **setUpdated()** on the transform component after manually editing the individual parts. This tells the engine that the transforms need to be updated. This is done for efficiency reasons, the engine won't update unchanged values. For more control, one could manually call **updateTransform()** or **updateWorldTransform()** to trigger these recalculations. When we use the helper methods of the TransformComponent, **we don't have to call setUpdated()**! The engine does this for us automatically.  

Refer to the [Hierarchy and Transforms tutorial](http://goolabs.wpengine.com/learn/the-hierachy-and-transforms/ "The Hierarchy and Transforms") for some examples on hierarchies in Create and more discussion about local/global transforms!