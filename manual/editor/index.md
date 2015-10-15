---
title: Editor
indent: 0
weight: 900
---

This tutorial will briefly go over the main features of the Goo Create interface. Keep in mind that the product is always evolving and changing, so there might be small details that have changed! With that in mind, let's have a look at the interface.

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/annotated-interface1.jpg"><img class="wp-image-1144 size-full" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/annotated-interface1.jpg" alt="" /></a> The main interface of Goo Create. Click for larger image.
<p style="text-align: left">The areas can, very roughly, be broken down into the following areas. Let's go over them one by one.</p>

<ol>
	<li>The Canvas</li>
	<li>The Inspector</li>
	<li>The Hierarchy</li>
	<li>The Assets</li>
	<li>The Top Menu</li>
	<li>The Bottom Menu</li>
</ol>
<h2>1. The Canvas</h2>
The centerpiece of the interface has gotten its name from the HTML5 canvas element type. It is simply the surface onto which the graphics we create is displayed. The content is rendered by Goo Engine, which is powered by WebGL.
<h2>2. The Inspector</h2>
The Inspector, or the Entity Inspector, is used to interact with the entities in the scene. If you haven't already, now is a good time to catch up on the <a title="Entities and Components" href="/learn/entities-and-components/">fundamentals on Entities and Components</a>! When an entity is selected, like the "Satellite" entity in the screenshot above, the Inspector shows the entity and its components.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/inspector-annotated.jpg"><img class="wp-image-451 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/inspector-annotated.jpg" alt="inspector-annotated" /></a> The Inspector panel
<p style="text-align: left">Let's talk about the various parts of the Inspector. At the top, we see and can edit the <strong>entity's name</strong>. We can also <strong>add components</strong> to the entity, or show the <strong>entity options</strong>. These options let us expand the entity panel to see some information about the entity and any <em>tags </em>it might have, as well as adding the entity to the <em>asset library</em> or <em>hide </em>the entity. The<strong> type-specific component options</strong> will look different for each component type. In this case, the expanded <strong>component panel</strong> shows the transform options. The <strong>general component options</strong> can be used to <em>reset</em> the component's values or to <em>delete</em> the component.</p>

<h3 style="text-align: left">Scene Settings and Information</h3>
<p style="text-align: left">There is a special case of the Inspector. Apart from showing entity options, the panel can also show settings for the <strong>scene</strong>. The scene settings are accessed by selection the scene at the top of the hierarchy menu, and includes settings for handling snapshots, changing document size, setting a skybox or background color, adding post effects, viewing scene details and more.</p>

<h2 style="text-align: left">3. The Hierarchy</h2>
<p style="text-align: left">The Hierarchy menu is covered in more detail in the<a title="The Hierarchy and Transforms" href="/learn/the-hierachy-and-transforms/"> Hierarchy and Transforms tutorial</a>. It shows all entities in the scene and their position in the <em>scene graph</em>, or <em>hierarchy</em>.In short, the graph shows the parent-child relations of the entities. Parents are shown at a smaller indentation level than their children. The children's <em>transforms </em>are relative to their closest parent, so the hierarchy can be manipulated to make entities connect to each other and rotate, scale and move with their parents. To move entities around in the graph, simply drag and drop the entities in the menu. In the example, <em>AirPlane</em> (and other entities) are children of the <em>World</em> entity, which is turn is a child of the permanent <em>Scene</em> node.</p>


<img class="wp-image-455 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/hierarchy-annotated1.jpg" alt="hierarchy-annotated" /> The Hierarchy panel
<p style="text-align: left">The panel has controls for hiding and showing entities, expanding or collapsing hierarchies, to duplicate or delete entities, or undo the latest action (any action in Create). From here, the <em>scene </em>can be selected (showing all scene settings and info in the Inspector).</p>

<h2 style="text-align: left">4. The Assets</h2>
The Asset panel shows all assets belonging to the scene. These can be<em> materials, textures, sounds, scripts </em>or<em> skyboxes. </em>

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/assets-annotated.jpg"><img class="wp-image-460 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/assets-annotated.jpg" alt="assets-annotated" /></a> The Asset panel
<p style="text-align: left">The panel has filters for showing particular types of assets, and a search bar to find a specific asset. The top right <strong>asset options</strong> contains the very useful <em>delete unused assets</em> functionality. Each asset can be <strong>added to the asset library</strong>, <strong>duplicated</strong> or <strong>deleted</strong>.</p>

<h2 style="text-align: left">5. The Top Menu</h2>
The top menu, or the top area, is not as focused as other panels or sections. It contains many small groups with different functionality, so let's quickly go over the main features.

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/topmenu1.jpg"><img class="alignnone size-full wp-image-1143" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/topmenu1.jpg" alt="topmenu" /></a>

<strong>Change Scene</strong>: Start editing another scene.<strong>
Create: </strong>Opens a window with tools for creating entities, such as 2D and 3D primitives, lights, cameras and HTML entities.
<strong>Asset Library</strong>: Accesses the <strong>asset library</strong> as well as extra tools for <strong>importing models</strong> from hard drive (<em>this can also be done by dragging and dropping them onto the canvas</em>).
<strong>Export</strong>: Options for quickly <strong>publishing</strong> and/or <strong>sharing</strong> a project, or downloading the <strong>project bundle</strong>.
<strong>Text Editor</strong>: Opens the script and HTML entity editor.
<strong>Timeline</strong>: Brings up the timeline interface.
<strong>Help</strong>: Useful <strong>help links</strong> and a nice <strong>shortcut list</strong>.
<strong>User Avatar</strong>: Exit to <strong>dashboard</strong>, <strong>change password</strong> or <strong>log out</strong>.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/create.jpg"><img class="wp-image-466 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/create.jpg" alt="create" /></a> The Create panel, accessible from the top menu
<h2 style="text-align: left">6. The Bottom Menu</h2>
<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/bottom.jpg"><img class="alignnone size-full wp-image-467" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/bottom.jpg" alt="bottom" /></a>

<strong> Show/Hide Inspector and Hierarchy</strong>: Collapses or expands the left and right hand menus. Useful for getting more canvas space.
<strong>Play/Pause/Stop</strong>: Control all scripts, timelines and state machines. Nothing runs until pressing play!
<strong>Progress Bar and Activity Status</strong>: Show information about the current activity, such as model uploading.
<strong>Interface Theme</strong>: Switch between dark and light interface.
<h2>7. More</h2>
There are plenty of sub-menus and expandable options left to discuss, don't be a afraid to explore! The <a href="//answers.goocreate.com/" target="_blank">Q&amp;A</a> is there for you for problems, thoughts and feedback. Finally, make sure to check out the shortcuts!

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/shortcut-list.jpg"><img class="wp-image-468 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/shortcut-list.jpg" alt="shortcut-list" /></a> Useful Shortcuts

