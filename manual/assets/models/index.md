---
title: Models
weight: 3602
indent: 2
id: model-import
---

In order to make a scene with custom models, you are able to import 3d models from your file system, into create.

## The Process

### 1. Upload the model

There are two ways to upload your 3d model into Create.

1. Drop file on canvas.

2. Use the import from disk feature on the "Import Assets"-popup.

After you have selected your model and provided it to Create, the file will be uploaded to our servers.

### 2. Converting

To make the model useable in create, we will convert it to a format which is usable by our 3d-engine. This is all automatic and will take some time, depending on the model size and format.

You can follow the progress of the conversion in the status bar.

<div class="well">
	<strong>Note: Triangulation</strong>
	<p>
	Meshes will automatically be triangulated during the conversion. Triangle meshes are a requirement for the engine.
	</p>
</div>


### 3. Put it in your scene

When the model is successfully converted, it will be included in your Asset Bin as a new pack. 

Drag and drop the root entity into the viewport to use the model in your scene.

## File Formats

These are the file formats we support:

{% for format in site.data.importable.3d_files %}
- {{ format.name }}
	- File ending: `{{ format.suffix }}`
	- <{{format.url}}>
{% endfor %}

Due to the fact that we are using Autodesk's FBX SDK as a third-party library for importing model files, the FBX format will most likely work best.


## Features

#### Vertex colors

Per-vertex colors or per-face-vertex colors is supported.

When the mesh data contains vertex colors, a slider will be available on the mesh's material panel under the diffuse channel. Here you are able to blend between the set diffuse map or color and the vertex color.

#### UV maps

If two are available, the second one can be used for e.g. light maps or ambient occlusion maps.

In create, you are able to apply these textures on the ambient channel in the material panel.

#### Tangents

If no tangent data is provided, this will be generated during the conversion. 

#### Normals

If no normal data is provided, interpolated normals will be generated during the conversion.

#### Skeleton Animations

Animation via skeleton mesh deformation is supported. You can provide several animations in one file.

<div class="alert alert-info">
	<strong>Shader limitations</strong>
	<ul>
		<li>
			The maximum number of weights per vertex is <strong>4</strong>.
			If more are provided, the ones with the least values are removed.
		</li>
		<li>
		Keeping the joint count low will allow supporting a broader set of hardware.
		</li>
	</ul>
</div>

<strong>Adding more animations</strong>

If you already have converted a model with skeleton animations into create, and afterwards added more animations in your modeling tool, you are able to add those new animations onto the existing model in create.

This is done by dropping the file upon the animation panel's animation state drop area. This issues the file upload as usual, but during conversion, only the animation data is exported.

Note that the underlying skeleton rig must be the same for this to work. - If you have done changes to the rig you will need to re-import the model through the regular process.

#### Embedded textures (FBX)

When exporting to the fbx binary format, you are able to embed textures into the resulting file.

<div class="alert alert-warning">
<h4>Object animations</h4>
<p>
Currently regular transform-animations on objects is <strong>not supported</strong>.
</p>
</div>

## An artist's tips

Prior to exporting from your creation tool of choice, here are some tips.

### Modeling

- Delete history
- Freeze transformations
- Refrain from using "Geometric Transforms" (3d studio max, Maya)

### Skeleton Animation

- Bake the animation
- Do not use constraints


## Model Creation Tools

While there are several commerical products out there for creating 3d models, here are some free ones:

- [Blender](http://www.blender.org)
- [FreeCad](http://www.freecadweb.org)