---
title: Assets
weight: 3600
indent: 1
---
<h2>Asset Types</h2>
<h3>Meshes</h3>
A mesh is a set of points (vertices) which defines the <em>geometry</em> of a 3D model. Every renderable 3D entity must therefore have a mesh (and a material, which we'll discuss later). Mesh data is handled by the <a href="http://code.gooengine.com/latest/docs/MeshDataComponent.html" target="_blank">MeshDataComponent </a> in the engine. Mesh data not only includes vertices, but also normals and the local bounding volume, for example. At the time of writing, mesh data can not be modified directly in the Create interface. The exceptions are some primitives, where some <em>geometry parameters</em> can be adjusted.

[caption id="attachment_677" align="alignnone" width="654"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/wireframe.jpg"><img class="wp-image-677 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/wireframe.jpg" alt="" width="654" height="368" /></a> Meshes can be viewed in Create by setting the rendering mode to "Wireframe".[/caption]
<h3>Materials</h3>
A renderable 3D entity must have a mesh and a material (<a href="http://code.gooengine.com/latest/docs/Material.html" target="_blank">Material</a> class in the engine). A material defines the look of the entity, and is composed by a large collection of various settings. Some settings have color and texture channels, while others are represented by a value or multiple options. Each material has basic settings like diffuse and specular color, as well as advanced settings such as refraction and blending modes.

[caption id="attachment_680" align="alignnone" width="557"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/material_panel1.jpg"><img class="size-full wp-image-680" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/material_panel1.jpg" alt="The Material Panel" width="557" height="441" /></a> The Material Panel[/caption]

Materials can be shared between entities. If a material is shared, changing the look of one entity will also change the ones which are sharing the material! All materials are viewable from the right-hand <strong>Asset Panel</strong>. From there, materials can be dragged onto the dotted <em>Drop Material</em> area at the top of the Material Panel.

[caption id="attachment_681" align="alignnone" width="902"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/materials1.jpg"><img class="size-full wp-image-681" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/materials1.jpg" alt="Materials can be shared." width="902" height="322" /></a> The Asset Panel, filtered to show only materials.[/caption]
<h3>Textures</h3>
Each material has a few different texture channels. A texture (<a href="http://code.gooengine.com/latest/docs/Texture.html" target="_blank">Texture</a> class in the engine) is basically a 2D image which will get interpreted in different ways depending on the texture type. The simplest channel is the diffuse color channel which maps the pixel colors onto the entity directly. Another example is the normal map channel, will interpret the RGB values as (x, y, z) normal vectors.

Importing textures is very easy, it's possible to just drag and drop 2D images from the desktop to the dotted texture drop area (or click the little folder icon to browse for the files). Textures can also be reached from the Asset Panel and be dragged around for sharing!

[caption id="attachment_682" align="alignnone" width="832"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/import_tex_11.jpg"><img class="size-full wp-image-682" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/import_tex_11.jpg" alt="Moments after importing a texture using a jpg image." width="832" height="437" /></a> Moments after importing a texture using a jpg image[/caption]

There are advanced texture settings (texture repeat, offset and so on) which are reachable by clicking the edit button next to the texture in the Material Panel.

[caption id="attachment_683" align="alignnone" width="300"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/tex_edit1.jpg"><img class="size-medium wp-image-683" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/tex_edit1-300x201.jpg" alt="Accessing texture settings (click for full size image)." width="300" height="201" /></a> Accessing texture settings (click for full size image).[/caption]
<h3>Sound Clips</h3>
A S<a href="http://code.gooengine.com/latest/docs/Sound.html" target="_blank">ound</a> can be added to a <a href="//code.gooengine.com/latest/docs/SoundComponent.html" target="_blank">SoundComponent</a>. In Create, this is done by simply adding a sound component to an entity and then dragging-and-dropping or browsing for a file (mp3 or wav). Sounds behave a little differently than other assets. If a sound file is dragged and dropped onto the canvas, it will not automatically be added to an entity, but only show up in the Asset Panel. From there, it can of course be added to sound components. Additionally,  sounds <em>don't play automatically</em>. They have to be started by a <strong>state machine</strong> instance or a <strong>script</strong>.

[caption id="attachment_685" align="alignnone" width="410"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/sound1.jpg"><img class="size-full wp-image-685" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/sound1.jpg" alt="The Sound Panel" width="410" height="443" /></a> The Sound Panel[/caption]
<h3>Scripts</h3>
A script belongs to a <a href="http://code.gooengine.com/latest/docs/ScriptComponent.html" target="_blank">ScriptComponent</a>, and can be created after adding such a component to an entity. After a script has been created, it will be accessible from the Asset Panel and can from there be shared with other script components! One somewhat tricky thing to keep in mind is that creating or sharing a script actually creates a separate <strong>instance </strong>of that script. This way, scripts can be shared or even added multiple times to the same script component.

[caption id="attachment_684" align="alignnone" width="884"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/drag_script1.jpg"><img class="size-full wp-image-684" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/drag_script1.jpg" alt="Adding an existing script to a script component" width="884" height="308" /></a> Adding an existing script to a script component[/caption]
<h2>The Asset Panel</h2>
The Asset Panel collects all shareable assets in the scene. It has a search box and filter buttons to sort through the assets easily.
<h3>Duplicating Assets</h3>
All assets in the panel can be duplicated by clicking the corresponding icon. This creates an independent copy of the asset which can be edited individually.

[caption id="attachment_686" align="alignnone" width="222"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/dupe_asset1.jpg"><img class="size-full wp-image-686" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/dupe_asset1.jpg" alt="Duplicate an asset" width="222" height="191" /></a> Duplicate an asset[/caption]
<h3>Removing Unused Assets</h3>
Having too many assets will affect performance negatively, since bandwidth and loading times are very important for web applications. There is a useful function which deletes all currently unused assets in the scene, but use this with caution as it is <span style="color: #ff0000"><strong>not reversible</strong></span>! You are strongly recommended to take a <em>snapshot</em> of your project before doing this. The button is accessible by first clicking the gearbox icon at the top of the panel.

[caption id="attachment_687" align="alignnone" width="386"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/remove_unused1.jpg"><img class="size-full wp-image-687" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/remove_unused1.jpg" alt="Showing the button to remove all assets" width="386" height="206" /></a> Showing the button to remove all assets[/caption]
<h2>The Asset Library</h2>
Configured assets can be added to the Asset Library for re-use later. That means that if you have a perfect material you'd like to store, or the most amazing entity mankind has ever seen, you can very easily add it straight from the Asset Library later. The library is accessed by clicking the Import button at the top of the interface.

[caption id="attachment_689" align="alignnone" width="297"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/import2.jpg"><img class="size-full wp-image-689" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/import2.jpg" alt="Access the Asset Library" width="297" height="36" /></a> Access the Asset Library[/caption]

The Asset Library has a list of different sources and collections, including your own added assets. Assets can be added to the library by clicking the<em> Add To Asset Library</em> button (easy, eh?) next to the asset in the various panels, or with the icon in the Asset Panel.

[caption id="attachment_690" align="alignnone" width="227"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/add-to-asset-lib1.jpg"><img class="size-full wp-image-690" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/add-to-asset-lib1.jpg" alt="Add an asset to the library" width="227" height="251" /></a> Add an asset to the library[/caption]

Whole entities can also be added to the library, of course! The option for adding is accessed by first opening the <em>Entity Options</em> by clicking the gearbox icon at the top of the <em>Entity Inspector</em>.

[caption id="attachment_691" align="alignnone" width="502"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/add-entity-to-asset-lib1.jpg"><img class="size-full wp-image-691" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/add-entity-to-asset-lib1.jpg" alt="Add an entity to the asset library" width="502" height="168" /></a> Adding an entity to the asset library[/caption]
<h2>Conclusion</h2>
Hopefully you've gotten an overview of the various asset types in Create, and how to work with them. Each type of assets is a topic on itself, of course, so why not check out some more tutorials?