---
layout: page
title: Engine overview
weight: 5500
indent: 1
---
This is an article providing a high-level view of Goo Engine. The article will describe the Entity-Component-System architecture, how the Goo World is updated and how it all fits together.
<h2>Entity-Component-System</h2>
Goo Engine is built using the Entity-Component-System philosophy. It is a software pattern that strongly encourages composition over inheritance, as we will see soon.
<h2>Entities</h2>
An Entity can be thought of as a container. An Entity is a basic object in the World, but does not contain any functionality on it's own! This is a very important point. An empty Entity does not have any functionality at all. On the other hand, an Entity can be given any set of functionality and features by using Components.
<h2>Components</h2>
A Component is made for a specific purpose. There are many types of Components, and each type gives an Entity its functionality. The easiest way to see this is trough some examples:
<ul>
	<li>A <strong>TransformComponent</strong> places an Entity in 3D space, giving it a translation and rotation. Since this is such a basic functionality for a 3D engine, Entities created in Goo Engine will automatically have a TransformComponent.</li>
	<li>A <strong>CameraComponent</strong> makes the entity function as a camera.</li>
	<li>A <strong>MeshRendererComponent</strong> makes it possible for the Entity to have a mesh, and for the engine to render it.</li>
	<li>A <strong>LightComponent</strong> adds a light to the Entity.</li>
	<li>A <strong>ScriptComponent</strong> makes it possible to add custom code to an Entity.</li>
	<li>...and so on.</li>
</ul>
Each type of Component is meant to be simple in isolation, but Entities can of course have several components attached to it. A camera entity would need a TransformComponent and a CameraComponent, for example.

<img class="wp-image-423 size-full" src="light1.png" alt="light" /> A light Entity typically consists of a TransformComponent and a LightComponent  <em> </em>
<h2>Systems</h2>
Systems keep track of the components. Since each type of Component takes care of one specific thing, it makes sense to also have a System for each component type. When adding new Components to Entities, the Components get registered with the corresponding System. The Systems run continuously and make sure to update the Components when needed. As you might have guessed, isolating functionality in this manner provides excellent encapsulation between different kinds of features. Each System type can also be optimized to solve its specific tasks fast and efficient.

Remember when you were told that each System has one matching Component? That was a simplification. In reality, one System can be interested in multiple Component types. The image below shows a very simple scene; a sphere and a camera. Both these objects are represented with Entities, and their features are represented with Components. The following happens: A TransformSystem keeps track of all transforms, a CameraSystem handles the single camera and a RenderSystem takes take of both the vertex data (MeshDataComponent) and the material (MeshRendererComponent) of the sphere.

<img class="wp-image-422 size-full" src="graph21.png" alt="graph2" /> A simple scene with two entities, their components and the needed systems
<h2 style="text-align: left">The World and the Runner</h2>
<h3>The World</h3>
The World harbors all Entities and provides a 3D world coordinate system for everything to lived in. This means that the World is the access point for all Entities when we want to modify them.
<h3>The Runner</h3>
The Runner (or GooRunner) is responsible for running the game loop, making sure the Systems run, calling the renderers and that everything happens in the correct order. The Runner pulls the threads to make things happen, basically. The World is a member of the GooRunner (created automatically). Accessing the World (and from there everything in it) is typically done through the runner:

<pre><code>
var gooRunner = new GooRunner();
var allEntities = gooRunner.world.getEntities();
</code></pre>

<h2>How it all fits together</h2>
This image below illustrated how the main parts fit together. GooRunner holds the world, which in turn contains the Entities. Entities in turn consist of different Components. To make everything run, GooRunner updates the World and its Systems, and each type of System takes care of the corresponding type of Component.

<img class="wp-image-421 size-full" src="graph11.png" alt="graph1" /> A schematic overview of the main parts in Goo Engine
<h2>Details and Disclaimers</h2>
This article is a high-level description of what's going on, and intentionally leaves a lot of details out. For example, the components in Create look a little different than in engine code. The MeshDataComponent is represented by Geometry, and the MeshRendererComponent functionality is reached via Materials. These are just some simplifications that makes Create easier to work with, but it is useful to know what goes on behind the scenes. Another example of something that the article leaves out is Managers, who is the actual link for selecting Entities in the World.