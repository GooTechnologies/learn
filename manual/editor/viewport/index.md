---
title: Canvas
layout: manual
weight: 901
indent: 2
---

<img class="size-full" src="../annotated-interface1.jpg" alt="annotated interface"/>

In the center of the editor, the WebGL-rendered viewport is located. Here you can navigate, inspect and preview the contents of your scene.

## Navigation

For the best navigation experience you will need a two buttoned mouse with a scroll wheel.

The complete list of navigation keys are documented as a cheat sheet inside create, under help -> shortcut list.


- Mouse 1: Select entities inside the scene.

- Mouse 2 + drag <strong>or</strong> Alt + Mouse 1 + drag: Rotate around the current focus point.

- Mouse wheel scroll: Zoom in and out towards the current focus point.

- Mouse 3 + drag <strong>or</strong> Shift + Mouse 1 + drag: Pan in x/y directions.


## Dropping external files on the viewport

<img src="drop.png" alt="Drag drop from file system"/>

By dragging and dropping files on the viewport you will issue an import of that file. It is also possible to import files by dropping on the asset bin.

The currently supported importable files include:

### 3d-models

{% for format in site.data.importable.3d_files %}
- {{ format.suffix }}
{% endfor %}

{% for page in site.pages %}
	{% if page.id == 'model-import' %}
		{% assign model-page = page.url %}	
	{% endif %}
{% endfor %}
More on importing 3dmodels can be found at [Importing 3D-models]({{ model-page | prepend: site.baseurl }})

### Images

{% for suffix in site.data.importable.images %}
- {{ suffix }}
{% endfor %}

### Sounds

{% for suffix in site.data.importable.audio %}
- {{ suffix }}
{% endfor %}

### Videos

{% for suffix in site.data.importable.video %}
- {{ suffix }}
{% endfor %}

### Scripts

Import your JavaScript files.

