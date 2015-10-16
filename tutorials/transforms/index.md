---
layout: tutorial
title: Transforms
weight: 6100
indent: 1
---
Transforms are fundamental to computer graphics, and this tutorial will talk briefly about what a transform is, how it's constructed and how the transform component in Goo Create works and is used.
<h2>Rotation, Translation and Scale</h2>
Let's start from the bottom. A transform positions an entity and all its vertices in space. Transforms can work in any number of dimensions, but we'll be mostly concerned about 3D transforms here. A typical 3D transform consists of three parts. Rotation, translation, and scale.
<h3>Translation</h3>
The translation is simply a three-dimensional vector (<a href="http://code.gooengine.com/latest/docs/Vector3.html" target="_blank">Vector3</a>) describing an entity's position as 3D coordinates <strong>(x, y, z)</strong>. Its default is the origin, <strong>(0, 0, 0)</strong>.

<pre><code>
// Super simple example
var update = function(args, ctx, goo) {
	ctx.entity.transformComponent.transform.translation.x = Math.sin(ctx.world.time);
 	ctx.entity.transformComponent.setUpdated(); // Trigger update
};
</code></pre>

<p style="text-align: center">[advanced_iframe style="width: 400px;" securitykey="iframe" src="//goote.ch/f8d0392727657e78d65a60e0931c2e95cacf896a/" width="400" height="200"][/advanced_iframe]</p>

<h3>Rotation</h3>
The rotation is used to specify an entity's rotation around the x, y and z axises. It is represented by a <em>3x3 matrix</em> (<a href="http://code.gooengine.com/latest/docs/Matrix3x3.html" target="_blank">Matrix3x3</a>), called the rotation matrix (<a href="http://en.wikipedia.org/wiki/Rotation_matrix#In_three_dimensions" target="_blank">Wikipedia link</a>). All the underlying math is actually represented by matrices and vectors! If you take a look at the Wikipedia article, you'll see that three individual matrices can be used for rotations around the axises. These three are then multiplied together to form the rotation matrix representing the total rotation. If you're familiar with linear algebra, you'll know that the order of multiplication matters! If you're not, now you're informed. Luckily, you won't have to care too much about the details if you don't want to. <a href="http://code.gooengine.com/latest/docs/Matrix3x3.html" target="_blank">The Matrix3x3 class</a> has plenty of useful functions. For example, <strong>rotateX(<em>number </em>rad)</strong> which builds the correct matrix and multiplies the current rotation matrix with it for you.

<pre><code>
// Super simple example
var update = function(args, ctx, goo) {
	ctx.entity.transformComponent.transform.rotation.rotateY(ctx.world.tpf);
	ctx.entity.transformComponent.setUpdated();
};
</code></pre>

<p style="text-align: center">[advanced_iframe style="width: 400px;" securitykey="iframe" src="//goote.ch/61d1568b11d596370b34a3dbd4e97c680d050e01/" width="400" height="200"][/advanced_iframe]</p>

<h3>Scale</h3>
The scale is, like the translation, a three-dimensional vector. It starts as the vector <strong>(1, 1, 1)</strong> meaning that an entity's scale along each axis is one, unchanged. If we would use the vector <strong>(2, 2, 2)</strong> instead, that would mean that the entity is <em>twice as big in each direction</em>!

<pre><code>
// Super simple example
var update = function(args, ctx, goo) {
    ctx.entity.transformComponent.transform.scale.x = 2*Math.abs(Math.sin(ctx.world.time));
    ctx.entity.transformComponent.setUpdated(); // Trigger update
};
</code></pre>

<p style="text-align: center">[advanced_iframe style="width: 400px;" securitykey="iframe" src="//goote.ch/853e0744b31b6fd66ddd1a18d709439710aa0a64/" width="400" height="200"][/advanced_iframe]</p>

<h2>The Transform</h2>
<h3>The Transform Matrix</h3>
Now when we have an understanding of the three parts above, we can grasp the transform a little better. A transform is simply a combination of a translation, a rotation and a scale. These three quantities (two vectors and one matrix) are combined into a final <strong>transform matrix</strong>. This matrix represents the total, combined result of the three components. The matrix is actually a 4x4 matrix (Matrix4x4) because of math details. It has to do with being able to represent the translation with a matrix, <a href="http://math.stackexchange.com/questions/336/why-are-3d-transformation-matrices-4-times-4-instead-of-3-times-3" target="_blank">read this StackExchange question for more details</a>. Again, we don't have to worry too much about the math unless we want to!
<h3>The Transform API</h3>
We have already seen that the matrix and vector classes already have some helper functions, and the <a href="http://code.gooengine.com/latest/docs/Transform.html" target="_blank">Transform class</a> brings some more. It being essentialy a matrix (after combining) one can for example combine this matrix with other transform matrices, apply points or vectors to it, or invert it. There might be special cases where those kinds of operations are neccecary if you're writing an app using advanced transforms. There are other useful functions, but these functions will also be accessible from the TransformComponent directly, and we recommend to use them on that level.
<h2>The Transform Component</h2>
Transforms belong to the fundamentals of computer graphics, but Goo Engine (and other <a title="Goo Engine Architecture Overview" href="http://goolabs.wpengine.com/learn/goo-engine-architecture-overview/" target="_blank">entity-component-system</a> engines) implement this in the <a href="http://code.gooengine.com/latest/docs/TransformComponent.html" target="_blank">TransformComponent</a>. The component effectively takes care of all the low-level details, and makes sure everything happens in the correct order. The transform component integrates the transform into the rendering engine, and takes care of building the hierarchical scene graph. Moreover, the <a href="http://code.gooengine.com/latest/docs/TransformComponent.html" target="_blank">TransformComponent API</a> adds a lot of useful functions which also are accessible directly from the entity! This makes writing code considerably simpler and shorter.
<h3>The TransformComponent API</h3>
The API has functions for <strong>adding</strong> or directly <strong>setting</strong> rotation, translation or scale. There are also <strong>getters</strong> for accessing these values. To build hierarchies and parent/children relationships between entities, one uses the <strong>attachChild</strong> or <strong>detachChild</strong> functions. The function lookAt can be used to orient an entity in a certain direction.
<p style="text-align: center">[advanced_iframe style="width: 400px;" securitykey="iframe" src="//goote.ch/1107233399a27f819dd36d3e10abf2088e1717c8/" width="400" height="200"][/advanced_iframe]</p>


<pre><code>
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
</code></pre>

<h3>Local and Global Coordinates and Hierarchies</h3>
The 3D world contains two different coordinate systems and corresponding transforms. The local transform orients an entity relative to its parent, and the global transform is the resulting transform relative to the root, or the world coordinate. The root is represented by the Scene in the Goo world. The TransformComponent has two transform members, the <strong>transform</strong> (local) as well as <strong>worldTransform</strong>!

In the examples above, we have called <strong>setUpdated()</strong> on the transform component after manually editing the individual parts. This tells the engine that the transforms need to be updated. This is done for efficiency reasons, the engine won't update unchanged values. For more control, one could manually call <strong>updateTransform()</strong> or <strong>updateWorldTransform()</strong> to trigger these recalculations. When we use the helper methods of the TransformComponent, <strong>we don't have to call setUpdated()</strong>! The engine does this for us automatically.

Refer to the <a title="The Hierarchy and Transforms" href="http://goolabs.wpengine.com/learn/the-hierachy-and-transforms/" target="_blank">Hierarchy and Transforms tutorial</a> for some examples on hierarchies in Create and more discussion about local/global transforms!