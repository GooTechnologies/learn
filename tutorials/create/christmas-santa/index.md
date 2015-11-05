---
layout: tutorial
title: Creating Santa (Christmas Special)
weight: 1002
indent: 1
---

Create comes with a Christmas template project. In this game scene, Santa is traveling around the world with his loyal jetpack. Use the Left and Right keys to accelerate/decelerate and the Up and Down keys to fly higher or lower. This tutorial presents how Santa has been built for this scene and goes through some special Christmas features added in Goo Create. ## It’s All About Primitives This Mozilla and Goo Christmas challenge was a large competition based around the use of simple shapes to build the worlds. To create a _primitive_, click on the _Create_ menu at the top of the screen. The following 3d primitives are available:

![](primitives.jpg)

All the primitives you need!

Click on the sphere icon to create one in the viewport. A sphere is a perfect start for our Santa Claus, we will use it to build his chest. With the sphere selected, in the left panel, click on the _Geometry_ category, to view the _Shape Options_:

![Picture of shape options](image_11.png)

Picture of shape options

Use the sliders to increase or decrease the amount of samples in your sphere in both the X and Y direction. The more samples, the smoother the surface.

## Should Santa Be Red or Green?

Below the _Shape Options_, if you click on the _Materials_ category, you can see that Goo Create already created an empty material for you. In the Materials, _color (diffuse)_ section, click on the colored square. A color picker will appear and you'll be able to change the color of your entity.

[![image_2](image_21.png)](image_21.png)

Material panel : Color (diffuse)

Under the color slot you might have noticed a _Drop Texture_ placeholder. If you want to add any texture to your entity just drag and drop an image file from your desktop or from your project library.

## Limb by Limb

Once you've created your first primitive, practice some more by going through the following construction map using the other primitive shapes available:

[![Assembly picture](image_3.jpg)](image_3.jpg)

Assembly picture

### Grouping

All these limbs can be tiresome to manipulate, and that's when _grouping_ becomes very handy. You can create an empty entity object by clicking on the following icon in the Create panel. It's a bit further down from the primitives!

[![](empty.jpg)](image_41.png)

Create an empty entity

In the project library, drag and drop all the primitives you created on the new entity. You'll then get a complete Santa that can be moved around.

[![Parent an entity to another](image_51.png)](image_51.png)

Parent an entity to another

## This jetpack needs some smoke!

*Fire* and *smoke* are actions handled through one of Create's secret weapons: the [_state machine_]({{ "/manual/scene/components/statemachine" | prepend: site.baseurl }}). Click on one entity that should be our smoke emitter (in this case a cylinder located at the bottom of Santa's jetpack). Next, click the **Add Component** button at the top left of the screen. It is located to the right of the entity's name. In the Add Component drop down menu, choose *State Machine*. Click the _State Machine_ panel to see its options. In the default state (called simply _State_), click Add Action, then choose *Smoke FX* in the library.

[![](add-action.jpg)](image_61.png)

Add an action to a state

Now simply press the play button at the bottom of the screen to see smoke coming out of your jetpack.

## So.. Where Is the Snow?

If you select the root 'Scene' in the hierarchy on the right panel, _Post Effects_ and _Environment_ should appear inside the left panel. Expand the _Environment_ panel, and you will see the snow effect we've added for the occasion. You may need to place a check mark in the box next to 'Snow' to access the effects properties.

[![Snow options in the environment panel](image_71.png)](image_71.png)

Snow options in the environment panel

_Velocity_ and _rate_ are quite self-explanatory. _Height_ refers to the distance from the camera's current position.

Now add some snow to your scene to create that special holiday feeling!