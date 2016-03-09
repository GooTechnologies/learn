---
layout: tutorial
title: Animation
weight: 1010
indent: 1
difficulty_overall: 1
tags: animation, fbx, state machine
achievements: Animation, State machine and animation
duration: 10 minutes
short_description: In this tutorial you will learn how to use animations in Goo Create, and how to import them.
thumbnail: tutorials\create\animation\thumbnail.jpg
---
![](1.jpg)

Goo create supports bones animation. To view your animation just press play. To configure different animation states select the root entity of your character and open the animation component.

![](2.jpg)

If you have several animations for your character, just export them as .fbx and drag them to the animation component.

![](3.jpg)

You can then set your new layer as default by checking the default option.

![](4.jpg)

Unfold an animation state to set parameters like loop count, time scale and specific transitions to other layers.

![](5.jpg)

To define general transition rules to other layers click on the add icon.

![](6.jpg)

In this case all state will transit to 'Hello' with a fade transition during 1 second.
