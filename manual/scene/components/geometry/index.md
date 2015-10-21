---
title: Geometry
weight: 1403
indent: 3
layout: manual
todo: Fix this. This is just bad.
---
A mesh is a set of points (vertices) which defines the _geometry_ of a 3D model. Every renderable 3D entity must therefore have a mesh (and a material, which we'll discuss later). Mesh data is handled by the [MeshDataComponent ](http://code.gooengine.com/latest/docs/MeshDataComponent.html) in the engine. Mesh data not only includes vertices, but also normals and the local bounding volume, for example. At the time of writing, mesh data can not be modified directly in the Create interface. The exceptions are some primitives, where some _geometry parameters_ can be adjusted.  

[![](wireframe.jpg)](wireframe.jpg)  

Meshes can be viewed in Create by setting the rendering mode to "Wireframe".