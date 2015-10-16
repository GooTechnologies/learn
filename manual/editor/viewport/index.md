---
title: The 3D viewport
layout: manual
weight: 901
indent: 2
---

In the center of the editor, the WebGL-rendered viewport is located. Here you can nagivate, inspect and preview the contents of your scene.

# Dropping external files on the viewport

By dragging and dropping files on the viewport you can issue an asset import of that file. More on importing can be found here <<< todo: insert link to import section >>>

The currently supported importable files include:
- 3d-scene-files
  (
  {% for format in site.data.importable.3d_files %}
    {{ format }},
  {% endfor %}
  )
- images 
- sounds