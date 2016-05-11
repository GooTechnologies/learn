---
layout: tutorial
title: Camera and light
lastupdated: 2015-03-27
weight: 300
indent: 1
difficulty_overall: 0
short_description: "Test"
tags: camera, light, shadows, directional, point, spot, orbit, fly, fixed, 3D
achievements: Camera types, light types
duration: 15 minutes
short_description: In this first tutorial of Goo Create you will learn how to make a house on water by using entities, the hierarchy and transformation
thumbnail: tutorials/create/camera-light/thumbnail.jpg
---

![](1.jpg)

When you create a scene a Default camera is automatically provided.
This camera is set to follow the editor camera (the one you use while editing the scene).

![](2.jpg)

You can create new cameras using the create menu, four setups are available: Orbit, Fly, Fixed and 2d.
The only real difference between those type is the script that has been pre-applied to them. The script influence how the camera is
controlled.

![](3.jpg)

Let’s create a new fixed camera and access its parameters by unfolding the camera component. Remember, you can switch between cameras in the canvas menu.

![](4.jpg)

In here you can define if the camera should follow the editor camera or not, this is an easy way to place your cameras. Now I will set this camera as *default*, which means it will be used during play mode.

![](5.jpg)

In the *Create* dialog three light types are available: Parallel (like sun rays), Spot light and Point light.
You can test the different light types and parameters by unfolding the light component.

![](6.jpg)

Parallel and Spot light can generate shadows. Toggle the checkbox at the bottom of the panel and define resolution, darkness and shadow type.

![](7.jpg)

A light can project a texture to other surface. Just drag and drop an image in the texture placeholder.
