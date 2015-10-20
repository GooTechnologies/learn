---
title: The Canvas
layout: manual
weight: 901
indent: 2
---

<img class="size-full" src="../annotated-interface1.jpg" alt="annotated interface"/>


In the center of the editor, the WebGL-rendered viewport is located. Here you can nagivate, inspect and preview the contents of your scene.

## Dropping external files on the viewport

<img src="drop.png" alt="Drag drop from file system"/>

By dragging and dropping files on the viewport you will issue an import of that file.

The currently supported importable files include:

- 3d-models
{% for format in site.data.importable.3d_files %}
  : {{ format.suffix }}
{% endfor %}
- images 
- sounds

More on importing 3dmodels can be found here <<< todo: insert link to import section >>>