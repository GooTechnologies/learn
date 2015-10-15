---
layout: page
title: Transform Hierarchy
weight: 5500
indent: 1
---
The hierarchy functionality in Goo Create lets us build <em>scene graphs</em>. In short, the hierarchy makes it possible to make entities follow other entities when moved, by connecting their 3D transforms in a graph structure. In this tutorial, we'll have a look at the basics of the hierarchy and some of its uses.
<h2>A Simple Example</h2>
Consider this amazing model of a car. We are building a racing game and would like some headlights. Therefore, we have added two spotlights and carefully put them in the right spot and rotated them in the correct direction.

<a href="car_1.jpg"><img class="wp-image-393 size-full" src="car_1.jpg" alt="car_1" /></a> A car with two headlights, made from spotlights. Here the right one is selected
<p style="text-align: left">What happens when we move the car? Of course, the car body will move away, leaving the spotlights behind. This is obviously not what we'd like. We want to have the lights stay in place and move relative to the car entity! Therefore, we need to make the lights children of the car entity. This is done by dragging the <em>Headlight Left</em> and <em>Headlight Right</em> entities to the <em>Car</em> entity in the <strong>Hierarchy Menu</strong>. After doing that, we see that the hiearchy menu reflects the new graph structure. The lights are sitting one level below the car body. When we move the car body around in the scene, the lights will follow!</p>


<a href="car_2.jpg"><img class="wp-image-394 size-full" src="car_2.jpg" alt="car_2" /></a> To the right, we see the new (expanded) hierarchy structure. To the left, we see that the lights follow if we move the Car entity
<h2 style="text-align: left">3D Transforms</h2>
So, how does this work? We'll have to look into <em>transforms</em> to understand it. All entities in the 3D world has a transform. The transform contains information about the entity's <strong>translation </strong>(position), <strong>rotation</strong> and <strong>scale</strong>. All these quantities are in the form of vectors with <strong>x</strong>, <strong>y</strong> and<strong> z</strong> components. For example, an entity might have the translation (5, 0, 0). That would mean that it's positioned five lenght units along the <strong>x</strong> axis away from it's <em>origin, </em>which is  (0, 0, 0). Transforms in Goo Engine are handled by the Transform Components.
<h2>Local and Global Coordinates</h2>
There are two types of transforms, or sets of coordinates, to keep track of. They're called the local and the global transforms. The <strong>global transform</strong> is how we have mapped the entire 3D world, and the global transform has its origin in the middle of the scene, at (0, 0, 0). The <strong>local transform</strong> is how each entity is transformed relative to its parent! If we take a look at the hierarchy we see that all entities need to be children of the Scene. That simply means that initially, all transforms are directly relative to the scene. If we add an entity it will have the local translation (0, 0, 0) and the global translation (0, 0, 0), for example.

<a href="box_1.jpg"><img class="wp-image-395 size-full" src="box_1.jpg" alt="box_1" /></a> A new box, a child of the Scene, placed in the origin

Now as we build deeper hierarchies, things change a little.  Let's add another entiity, say a sphere. Then we make it a child of the Box and after that move the Sphere two units along the x axis.

<a href="box_2.jpg"><img class="wp-image-396 size-full" src="box_2.jpg" alt="box_2" /></a> A sphere made a child of the box, and then moved two units along the x axis
<p style="text-align: left">Now what happens when we move the <strong>box? </strong>The sphere will follow, as we know by now. The box's coordinates will naturally change, but what happens with the sphere? If we take a look we se that <em>nothing has happened</em>, even though the sphere is clearly in a new position. This is because what we see as transforms values are the <strong>local</strong> coordinates. The sphere's local coordinates are relative to the box, and the box is all that the sphere is concerned with. The <strong>global</strong> transform is changed. It represents the actual position, relative to the scene's origin, that the sphere now has. It can be derived by combining the local transforms of the box and the sphere, but that's a more advanced topic.</p>


<a href="box3.jpg"><img class="wp-image-399 size-full" src="box3.jpg" alt="box3" /></a> Moving, rotating and scaling the box. The sphere's local transform remains unchanged!
<p style="text-align: left">All transforms are calculated using matrix operations under the hood. The use of <a href="//en.wikipedia.org/wiki/Transformation_matrix">transform matrices</a> are fundamental to the science of computer graphics.</p>

<h2 style="text-align: left">Hints and Tricks</h2>
<h3>Local Transform Widgets</h3>
Sometimes, it is useful to move an entity along it's local axes. Press 'R' when an entity is selected to switch between local and global mode.

<a href="Untitled-11.jpg"><img class="wp-image-459 size-full" src="Untitled-11.jpg" alt="Rotation Center" /></a> Left is translation along the global axes and right is translation along the entity’s local axes
<h3 style="text-align: left">Center of Rotation</h3>
An empty parent entity is a good way to achieve an off-center center of rotation. Simply place the parent entity where the center should be and use it when rotating, and move the child relative to it.

<a href="rotation.jpg"><img class="wp-image-403 size-full" src="rotation.jpg" alt="rotation" /></a> Off-center rotation using a parent entity
<h2 style="text-align: left">More Uses for Hierarchical Transforms</h2>
<p style="text-align: left">Hierarchical transforms are fundamental to computer graphics, and here are just some uses for it.</p>

<ul>
	<li>Compose objects out of several entities, as we have seen before.</li>
	<li>Using a parent entity to move a group of entities together.</li>
	<li>Import models from different sources and scale them relative to each other to fit together.</li>
	<li>Use an empty entity as a parent and use it as a center of rotation.</li>
</ul>
<h2>Further Reading</h2>
Interested in more advanced topics? Check out the Entities and Components tutorial to see how things are implemented in Goo Engine, or read about the <a href="//en.wikipedia.org/wiki/Transformation_matrix">math of transformation matrices</a>!
