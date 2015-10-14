---
layout: page
title: Rotations
weight: 6000
indent: 1
---
<h3 style="text-align: center">This article will list frequently asked questions about the <a title="Everything you always wanted to know about rotation" href="http://www.goocreate.com/learn/everything-you-always-wanted-to-know-about-rotation/"><strong>Everything you always wanted to know about rotation</strong></a> article:</h3>
<h3></h3>
<h3>What are the basic transformations you can apply to an object in 3D space ?</h3>
They are: translation, scale and rotation.

In the Goo Engine a translation is usually expressed in a <a href="http://code.gooengine.com/latest/docs/Vector3.html">Vector3</a> object. It contains the translation in x, y and z axis directions. The default values are (0,0,0).

Similarly the scale is also expressed in a Vector3 object which contains the multiplication factors for the volume's positions. The default values are (1,1,1).

Rotation in contrast is expressed as a <a href="http://code.gooengine.com/latest/docs/Matrix3x3.html">Matrix3x3</a> object.
<h3>What would happen if the rotation matrix would contain non unit length and non orthogonal vector values?</h3>
Your application wouldn't crash, but it would basically display distorted and weirdly scaled 3D objects in your scene. Especially if you would use such a broken rotation matrix on the camera.

If this is overwhelming, don't worry, you practically never have to touch the rotation matrix values directly. There are plenty of helper functions to make setting rotations easy and this tutorial will go over them all.
<h3>Is it really a smart choice to express rotations using an object containing as many as 9 floating point values?</h3>
Well, good question, let's look at the alternatives:

One option could have been the 3 values needed to express a rotation using <a href="https://en.wikipedia.org/wiki/Euler_angles">Euler angles</a>, but the problem with Euler angles are that they are prone to <a title="Gimbal_lock" href="https://en.wikipedia.org/wiki/Gimbal_lock">Gimbal Lock</a>.
<h3>Well, what about the 4 values needed to express a rotation using a <a href="http://code.gooengine.com/latest/docs/Quaternion.html">Quaternion</a>?</h3>
Quaternions are great and Goo Engine has support for them in the sense that you can convert a rotation matrix to a quaternion and vice versa, but WebGL shader support is lacking.

In contrast WebGL shaders have built-in support for matrices and matrix multiplication, that means that if you pass in a matrix to a shader you can simply use the star (*) symbol to use it in multiplications, the same is not true for Quaternions.

Even better we can and do combine the three basic transformations into a single transform <a href="http://code.gooengine.com/latest/docs/Matrix4x4.html">Matrx4x4</a> and use it in our shader and can then apply all the basic transformations in one multiplication.
<h3>So, why not combine a quaternion rotation into a transform matrix?</h3>
Combining a translation, a scale and a <strong>quaternion</strong> <strong>rotation</strong> into a transform matrix is a bit <strong>slower </strong>than combining a translation, a scale and a <strong>Matrix3x3</strong> <strong>rotation</strong> into a transform matrix.
<h3> What is the algorithm behind lookAt inside Matrix3x3:</h3>
The abbreviated algorithm is:

[js]
z.set(back_direction).normalize();
x.set(up).cross(z).normalize();
y.set(z).cross(x);
m[0] = x[0];
m[1] = x[1];
m[2] = x[2];
m[3] = y[0];
m[4] = y[1];
m[5] = y[2];
m[6] = z[0];
m[7] = z[1];
m[8] = z[2];
[/js]

[alert type="info"]If you calculate the <a href="http://en.wikipedia.org/wiki/Cross_product">cross product</a> of two vectors the result is a vector orthogonal to both vectors even if the initial vectors are not orthogonal themselves.[/alert]