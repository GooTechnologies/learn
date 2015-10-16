---
title: Assets
weight: 3600
indent: 1
layout: manual
---
<h2>Asset Types</h2>
<h3>Meshes</h3>
A mesh is a set of points (vertices) which defines the <em>geometry</em> of a 3D model. Every renderable 3D entity must therefore have a mesh (and a material, which we'll discuss later). Mesh data is handled by the <a href="http://code.gooengine.com/latest/docs/MeshDataComponent.html" target="_blank">MeshDataComponent </a> in the engine. Mesh data not only includes vertices, but also normals and the local bounding volume, for example. At the time of writing, mesh data can not be modified directly in the Create interface. The exceptions are some primitives, where some <em>geometry parameters</em> can be adjusted.

<a href="wireframe.jpg"><img class="wp-image-677 size-full" src="wireframe.jpg" alt="" /></a> 

Meshes can be viewed in Create by setting the rendering mode to "Wireframe".

<h3>Materials</h3>
A renderable 3D entity must have a mesh and a material (<a href="http://code.gooengine.com/latest/docs/Material.html" target="_blank">Material</a> class in the engine). A material defines the look of the entity, and is composed by a large collection of various settings. Some settings have color and texture channels, while others are represented by a value or multiple options. Each material has basic settings like diffuse and specular color, as well as advanced settings such as refraction and blending modes.

<a href="material_panel1.jpg"><img class="size-full wp-image-680" src="material_panel1.jpg" alt="The Material Panel" /></a>

The Material Panel

Materials can be shared between entities. If a material is shared, changing the look of one entity will also change the ones which are sharing the material! All materials are viewable from the right-hand <strong>Asset Panel</strong>. From there, materials can be dragged onto the dotted <em>Drop Material</em> area at the top of the Material Panel.

<a href="materials1.jpg"><img class="size-full wp-image-681" src="materials1.jpg" alt="Materials can be shared." /></a>

The Asset Panel, filtered to show only materials.

<h3>Textures</h3>

Each material has a few different texture channels. A texture (<a href="http://code.gooengine.com/latest/docs/Texture.html" target="_blank">Texture</a> class in the engine) is basically a 2D image which will get interpreted in different ways depending on the texture type. The simplest channel is the diffuse color channel which maps the pixel colors onto the entity directly. Another example is the normal map channel, will interpret the RGB values as (x, y, z) normal vectors.

Importing textures is very easy, it's possible to just drag and drop 2D images from the desktop to the dotted texture drop area (or click the little folder icon to browse for the files). Textures can also be reached from the Asset Panel and be dragged around for sharing!

<a href="import_tex_11.jpg"><img class="size-full wp-image-682" src="import_tex_11.jpg" alt="Moments after importing a texture using a jpg image." /></a>

Moments after importing a texture using a jpg image

There are advanced texture settings (texture repeat, offset and so on) which are reachable by clicking the edit button next to the texture in the Material Panel.

<a href="tex_edit1.jpg"><img class="size-medium wp-image-683" src="tex_edit1-300x201.jpg" alt="Accessing texture settings (click for full size image)." /></a> Accessing texture settings (click for full size image).

<h3>Sound Clips</h3>

A S<a href="http://code.gooengine.com/latest/docs/Sound.html" target="_blank">ound</a> can be added to a <a href="//code.gooengine.com/latest/docs/SoundComponent.html" target="_blank">SoundComponent</a>. In Create, this is done by simply adding a sound component to an entity and then dragging-and-dropping or browsing for a file (mp3 or wav). Sounds behave a little differently than other assets. If a sound file is dragged and dropped onto the canvas, it will not automatically be added to an entity, but only show up in the Asset Panel. From there, it can of course be added to sound components. Additionally,  sounds <em>don't play automatically</em>. They have to be started by a <strong>state machine</strong> instance or a <strong>script</strong>.

<a href="sound1.jpg"><img class="size-full wp-image-685" src="sound1.jpg" alt="The Sound Panel" /></a>

The Sound Panel

<h3>Scripts</h3>
A script belongs to a <a href="http://code.gooengine.com/latest/docs/ScriptComponent.html" target="_blank">ScriptComponent</a>, and can be created after adding such a component to an entity. After a script has been created, it will be accessible from the Asset Panel and can from there be shared with other script components! One somewhat tricky thing to keep in mind is that creating or sharing a script actually creates a separate <strong>instance </strong>of that script. This way, scripts can be shared or even added multiple times to the same script component.

<a href="drag_script1.jpg"><img class="size-full wp-image-684" src="drag_script1.jpg" alt="Adding an existing script to a script component" /></a> 

Adding an existing script to a script component

<h2>The Asset Panel</h2>

The Asset Panel collects all shareable assets in the scene. It has a search box and filter buttons to sort through the assets easily.
<h3>Duplicating Assets</h3>
All assets in the panel can be duplicated by clicking the corresponding icon. This creates an independent copy of the asset which can be edited individually.

<a href="dupe_asset1.jpg"><img class="size-full wp-image-686" src="dupe_asset1.jpg" alt="Duplicate an asset" /></a>

Duplicate an asset

<h3>Removing Unused Assets</h3>

Having too many assets will affect performance negatively, since bandwidth and loading times are very important for web applications. There is a useful function which deletes all currently unused assets in the scene, but use this with caution as it is <span style="color: #ff0000"><strong>not reversible</strong></span>! You are strongly recommended to take a <em>snapshot</em> of your project before doing this. The button is accessible by first clicking the gearbox icon at the top of the panel.

<a href="remove_unused1.jpg"><img class="size-full wp-image-687" src="remove_unused1.jpg" alt="Showing the button to remove all assets" /></a>

Showing the button to remove all assets

<h2>The Asset Library</h2>

Configured assets can be added to the Asset Library for re-use later. That means that if you have a perfect material you'd like to store, or the most amazing entity mankind has ever seen, you can very easily add it straight from the Asset Library later. The library is accessed by clicking the Import button at the top of the interface.

<a href="import2.jpg"><img class="size-full wp-image-689" src="import2.jpg" alt="Access the Asset Library" /></a>

Access the Asset Library

The Asset Library has a list of different sources and collections, including your own added assets. Assets can be added to the library by clicking the<em> Add To Asset Library</em> button (easy, eh?) next to the asset in the various panels, or with the icon in the Asset Panel.

<a href="add-to-asset-lib1.jpg"><img class="size-full wp-image-690" src="add-to-asset-lib1.jpg" alt="Add an asset to the library" /></a>

Add an asset to the library

Whole entities can also be added to the library, of course! The option for adding is accessed by first opening the <em>Entity Options</em> by clicking the gearbox icon at the top of the <em>Entity Inspector</em>.

<a href="add-entity-to-asset-lib1.jpg"><img class="size-full wp-image-691" src="add-entity-to-asset-lib1.jpg" alt="Add an entity to the asset library" /></a>

Adding an entity to the asset library

<h2>Conclusion</h2>

Hopefully you've gotten an overview of the various asset types in Create, and how to work with them. Each type of assets is a topic on itself, of course, so why not check out some more tutorials?
