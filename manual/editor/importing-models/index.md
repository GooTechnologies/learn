---
title: Importing 3D Models
weight: 901
indent: 2
---

## The Process

### Upload the model

There are two ways to upload your 3d model into Create.

1. Drop file on canvas
	or 
2. Use the import from disk feature on the "Import Assets"-popup.

After you have selected your model and provided it to Create, the file will be uploaded to our servers.

### Converting

To make the model useable in create, we will convert it to a format which is usable by our 3d-engine. This is all automatic and will take some time, depending on the model size and format.

You can follow the progress of the conversion in the status bar.

#### Note: Triangulation

Meshes will automatically be triangulated during the conversion process. Triangle meshes are a requirement for the engine.

### Success

When the model is successfully converted, it will be included in your Asset Bin as a new pack. 

Drag and drop the root node into the viewport to use the model in your scene.

## File Formats


Due to the fact that we are using Autodesk's FBX SDK as a third-party library for importing model files,
the FBX format will most likely work best.


## Features, Attributes

Vertex colors

UV maps, if two are available , the second one can be used for e.g. light maps.

embedded textures ( fbx )


## An artist's tips

Prior to exporting from your creation tool of choice, here are some tips.

- Delete history
- Freeze transformations
- Refrain from using "Geometric Transforms" (3d studio max, Maya)

Animation:

- Bake the animation
- Do not use constraints


## Model Creation Tools

While there are paid software out there for creating 3d models, 
here are tips on free modelling tools:

- http://www.blender.org
- http://www.freecadweb.org