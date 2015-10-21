---
title: Importing 3D Models
weight: 6000
indent: 1
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


#### Note: Triangulation

Meshes will automatically be triangulated during the conversion process. Triangle meshes are a requirement for the engine.

### 3. Put it in your scene

When the model is successfully converted, it will be included in your Asset Bin as a new pack. 

Drag and drop the root node into the viewport to use the model in your scene.

## File Formats

These are the file formats we support:

{% for format in site.data.importable.3d_files %}
- {{ format.name }}
	- File ending: `{{ format.suffix }}`
	- <{{format.url}}>
{% endfor %}

Due to the fact that we are using Autodesk's FBX SDK as a third-party library for importing model files, the FBX format will most likely work best.


## Features, Attributes

Vertex colors

UV maps, if two are available , the second one can be used for e.g. light maps.

embedded textures ( fbx )

## Add more skeleton-animations

If you already have converted a model with skeleton animations into create, and afterwards added more animations in your modeling tool, you are able to add those new animations onto the existing model in create.

This is done by dropping the file upon the animation panel's animation state drop area. This issues the file upload as usual, but during conversion, only the animation data is exported.

Note that the underlying skeleton rig must be the same for this to work. - If you have done changes to the rig you will need to re-import the model through the regular process.

## An artist's tips

Prior to exporting from your creation tool of choice, here are some tips.

- Delete history
- Freeze transformations
- Refrain from using "Geometric Transforms" (3d studio max, Maya)

Animation:

- Bake the animation
- Do not use constraints


## Model Creation Tools

While there are several paid software out there for creating 3d models, here are some free ones:

- [Blender](http://www.blender.org)
- [FreeCad](http://www.freecadweb.org)