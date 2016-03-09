---
layout: tutorial
title: Transform Scripting
weight: 1041
indent: 1
difficulty_overall: 1
contains_scripts: true
tags: scripting, translation, rotation, scale, lookAt, coordinates, hierarchies
achievements: Transform matrix, Scripting transformations, Scripting rotation, Scripting scale, 
duration: 20 minutes
short_description: In this tutorial, we'll have a look at the basics of the hierarchy and some of its uses.
thumbnail: tutorials\create\transforms/thumbnail.jpg
---
This tutorial will walk you through how to translate, rotate and scale objects via Scripting in Goo Create.

## Rotation, Translation and Scale

A *Transform* positions an entity and all of its vertices in space. A typical 3D transform consists of three parts: rotation, translation, and scale.

### Translation

The translation is simply a three-dimensional vector, describing an entity's position as 3D coordinates *(x, y, z)*. Its default value is the origin, *(0, 0, 0)*.

The following script moves the entity along the X axis.

{% highlight js %}
var update = function(args, ctx) {
    ctx.entity.transformComponent.transform.translation.x = Math.sin(ctx.world.time);
    ctx.entity.transformComponent.setUpdated(); // Trigger update
};
{% endhighlight %}

```ctx.entity.transformComponent.transform.translation``` is an instance of ```Vector3```. See the [Vector3 API](http://code.gooengine.com/latest/docs/index.html?c=Vector3).

<iframe allowfullscreen src="//goote.ch/f8d0392727657e78d65a60e0931c2e95cacf896a"></iframe>

### Rotation

The rotation is used to specify an entity's rotation. It's represented by a *3x3 matrix*, also called a [rotation matrix](http://en.wikipedia.org/wiki/Rotation_matrix#In_three_dimensions). Luckily, you won't have to care too much about the mathy details if you don't want to: Goo Engine takes care of that for you.

The following script animates the entity rotation around the Y axis.

{% highlight js %}
var update = function(args, ctx) {
    ctx.entity.transformComponent.transform.rotation.rotateY(ctx.world.tpf);
    ctx.entity.transformComponent.setUpdated();
};
{% endhighlight %}

<iframe allowfullscreen src="//goote.ch/61d1568b11d596370b34a3dbd4e97c680d050e01"></iframe>

```ctx.entity.transformComponent.transform.rotation``` is an instance of ```Matrix3```. See the [Matrix3](http://code.gooengine.com/latest/docs/index.html?c=Matrix3) API.

### Scale

The scale is, like the translation, a three-dimensional vector. Its default value is *(1, 1, 1)* meaning that the entity scale along each axis is one. If we would use the vector *(2, 2, 2)* instead, that would mean that the entity is *twice as big in each direction*.

The following script animates the scale of the entity along the X direction.

{% highlight js %}
var update = function(args, ctx) {
    ctx.entity.transformComponent.transform.scale.x = 2 * Math.abs(Math.sin(ctx.world.time));
    ctx.entity.transformComponent.setUpdated(); // Trigger update
};
{% endhighlight %}

```ctx.entity.transformComponent.transform.scale``` is an instance of ```Vector3```. See the [Vector3 API](http://code.gooengine.com/latest/docs/index.html?c=Vector3).

<iframe allowfullscreen src="//goote.ch/853e0744b31b6fd66ddd1a18d709439710aa0a64/"></iframe>

## The Transform

### The Transform Matrix

Now when we have an understanding of the three parts above, we can grasp the full transform a little better. A transform is a combination of a translation, a rotation and a scale. These three quantities (two vectors and one matrix) are combined into a final *transform matrix*. This matrix represents the total, combined result of the three components. The transform matrix is of size 4x4.

### The Transform API

We have already seen that the matrix and vector classes already have some helper functions, and the [Transform class](http://code.gooengine.com/latest/docs/index.html?c=Transform) brings some more. It being essentialy a matrix (after combining) one can for example combine this matrix with other transform matrices, apply points or vectors to it, or invert it. There might be special cases where those kinds of operations are neccecary if you're writing an app using advanced transforms. There are other useful functions, but these functions will also be accessible from the *TransformComponent* directly, and we recommend to use them on that level.

## The Transform Component

Goo Engine implements transforms in the [TransformComponent](http://code.gooengine.com/latest/docs/index.html?c=TransformComponent). The component effectively takes care of all the details, and makes sure everything happens in the correct order. Moreover, the [TransformComponent API](http://code.gooengine.com/latest/docs/index.html?c=TransformComponent) adds a lot of useful methods.

### The TransformComponent API

The API has functions for *adding* or directly *setting* rotation, translation or scale. There are also *getters* for accessing these values. To build hierarchies and parent/children relationships between entities, one uses the *attachChild* or *detachChild* functions. The function lookAt can be used to orient an entity in a certain direction.

<iframe allowfullscreen src="//goote.ch/1107233399a27f819dd36d3e10abf2088e1717c8/"></iframe>

{% highlight js %}
// Have the entity (Cone) look at the Sphere
// Sphere is moving with the super simple translation script above

var setup = function(args, ctx) {
    ctx.entityToFollow = ctx.world.by.name('Sphere').first();
};

var update = function(args, ctx) {
    ctx.entity.lookAt(ctx.entityToFollow.getTranslation());
    // Could also have used ctx.entity.transformComponent.lookAt(...
    // No need to call setUpdated() when we use the helper functions!
};
{% endhighlight %}

### Local and Global Coordinates and Hierarchies

The 3D world contains two different coordinate systems and corresponding transforms. The local transform orients an entity relative to its parent, and the global transform is the resulting transform relative to the root, or the world coordinate. The root is represented by the Scene in the Goo world. The TransformComponent has two transform members, the *transform* (local) as well as *worldTransform*!

In the examples above, we have called *setUpdated()* on the transform component after manually editing the individual parts. This tells the engine that the transforms need to be updated. This is done for efficiency reasons, the engine won't update unchanged values. For more control, one could manually call *updateTransform()* or *updateWorldTransform()* to trigger these recalculations. When we use the helper methods of the TransformComponent, *we don't have to call setUpdated()*! The engine does this for us automatically.

Refer to the [Hierarchy and Transforms tutorial]({{ '/tutorials/create/trasnform-hierarchy' | prepend: site.baseurl }}) for some examples on hierarchies in Create and more discussion about local/global transforms.
