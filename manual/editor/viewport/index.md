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

By dragging and dropping files on the viewport you will issue an import of that file. It is also possible to import files by dropping on the asset bin.

The currently supported importable files include:

### 3d-models

{% for format in site.data.importable.3d_files %}
- {{ format.suffix }}
{% endfor %}

{% assign model-page = '/manual/importing-models' %}
More on importing 3dmodels can be found at [Importing 3D-models]({{ model-page | prepend: site.baseurl }})

### Images

{% for suffix in site.data.importable.images %}
- {{ suffix }}
{% endfor %}

### Sounds

{% for suffix in site.data.importable.audio %}
- {{ suffix }}
{% endfor %}

