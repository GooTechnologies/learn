---
layout: coursepart
title: Flying with the Moonlander
part: 1
thumbnail: /courses/gaming/1/thumbnail.jpg
scene_partfinished: fec0e9f826584d1ca7f0b304d042c6e2.scene
tags: collider, rigid body, keyboard input, force, state machine
achievements: Creating a new scene, The Create UI
description: In the this first part of the gaming course, we will start right away with creating the state machines that enables you to fly with the Moonlander by using the WASD buttons on your keyboard.
---
This course is written with the assumption the reader finished the Beginner course. If you didn't finish the Beginner course, it's strongly suggested you do that before beginning with this course. Click <a href="/courses/beginner/">here</a> to go to the Beginner course.

The instructions in this course will be less comprehensive than the instructions in the Beginner course. If you don't remember how to do particular things, for instance creating a new scene, you can look it up in the <a href="/courses/beginner/">Beginner course</a>.

# Setting up the physics

## Importing

1. The first thing you have to do is log into Goo Create. After you logged into Goo Create, you will enter the Dashboard
2. Below *Create from template*, click on *Empty* to open an empty scene:
![](createemptyscene.jpg)
3. Fill in a name for your scene, for instance 'beginner course scene', and click on the *Create* button
![](namescene.jpg)

## The Goo interface

You've now entered Goo Create. As you can see, there are several panels and buttons. We will give a short explanation of the most important components of the interface.

### The canvas

First of all, the canvas. Here you can navigate, inspect and preview the contents of your scene. You can change the point of view of the camera by pressing your right mouse button on the canvas and drag the mouse, like this:
![](changecamerapov.gif)
You can zoom in and out by using the scroll wheel on your mouse.

### Topbar

We will start at the left part of the topbar:
![](topbar-left.jpg)
If you click on *scene*, a dropdown menu will expand.
![](topbar-left-scene.jpg)
From there you can do things like creating a new scene, opening an existing scene or publish your scene when it's finished.

In the center of the topbar you'll find the buttons for creating entities (the components your 3D scene exists out) and importing assets.
![](center-topbar.jpg)

### Hierarchy panel

The hierarchy panel is located at the right side of the panel, and here you can find all the entities that you've added to your scene.
![](hierarchypanel.jpg)
Because we've just created a new scene, the 'Default camera' is the only entity in your scene, and therefore the only entity in your hierarchy.

### Asset Bin

The Asset Bin is located below the Hierarchy panel.
![](assetbin.jpg)
All the files that you import and create while working on your scene can be found in the Asset Bin. Why it's useful will be clear at the end of this course.

### Inspector panel

The inspector panel is the panel on the left. When you select an entity in the hierarchy panel, you can change the settings of that entity in the inspector panel. Try it by clicking the 'Default camera' entity in the hierarchy panel. You will see that the content of the Inspector panel changes.

![](inspectorpanel.jpg)
