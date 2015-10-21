---
title: Sounds
weight: 3601
indent: 2
layout: manual
---
A S[ound](http://code.gooengine.com/latest/docs/Sound.html) can be added to a [SoundComponent](//code.gooengine.com/latest/docs/SoundComponent.html). In Create, this is done by simply adding a sound component to an entity and then dragging-and-dropping or browsing for a file (mp3 or wav). Sounds behave a little differently than other assets. If a sound file is dragged and dropped onto the canvas, it will not automatically be added to an entity, but only show up in the Asset Panel. From there, it can of course be added to sound components. Additionally,  sounds _don't play automatically_. They have to be started by a **state machine** instance or a **script**.  

[![The Sound Panel](sound1.jpg)](sound1.jpg)  

The Sound Panel  