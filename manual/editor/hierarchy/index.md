---
title: Hierarchy
indent: 2
weight: 904
layout: manual
---
The Hierarchy menu is covered in more detail in the [Hierarchy and Transforms tutorial](/learn/the-hierachy-and-transforms/ "The Hierarchy and Transforms"). It shows all entities in the scene and their position in the _scene graph_, or _hierarchy_.In short, the graph shows the parent-child relations of the entities. Parents are shown at a smaller indentation level than their children. The children's _transforms _are relative to their closest parent, so the hierarchy can be manipulated to make entities connect to each other and rotate, scale and move with their parents. To move entities around in the graph, simply drag and drop the entities in the menu. In the example, _AirPlane_ (and other entities) are children of the _World_ entity, which is turn is a child of the permanent _Scene_ node.  

![hierarchy-annotated](hierarchy-annotated1.jpg)  

The Hierarchy panel  

The panel has controls for hiding and showing entities, expanding or collapsing hierarchies, to duplicate or delete entities, or undo the latest action (any action in Create). From here, the _scene _can be selected (showing all scene settings and info in the Inspector).