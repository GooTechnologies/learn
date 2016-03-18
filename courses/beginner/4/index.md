---
layout: coursepart
title: Beautify the scene
part: 4
thumbnail: /courses/beginner/4/thumbnail.jpg
scene_partfinished: 3ca61686b4b94092bbfe872d761aa188.scene
tags: entity, transformation, scale, rotate, translate, duplication
achievements: What entities are, How to add entities, Transformation, Duplicating entities
description: In this part we're going to add a material to the Moon surface, the Moon station and the Earth. We're also going to add the starry sky to our scene.
---
# The Moon surface

The first entity we're going to add a material to is the Moon surface. We have to import the material first before we can add it to the Moon surface. You can find the material in the *Asset Library*, in addition to many other things like skyboxes, 3D models and readymade scripts.

## Import the material asset from the Asset Library

1. Click on the *Import Asset* button, which you can find next to the *Add Entity* button at the center top of the canvas
![](importassetbutton.jpg)
2. We are going to use the 'concrete' material for the Moon surface, because it looks like Moon soil. Search for 'concrete' on the top right corner of the asset library
![](searchconcrete.gif)
4.  The Concrete Material should now appear. Add it to your scene by double-clicking the asset.
![](doubleclickasset.gif)

The material is now added to the Asset binary
![](addedtobin.jpg)


## Add the material to the Moon surface

1. Select the Moon surface in the hierarchy panel
2. Expand the *Material* component in the inspector panel
![](expandmaterial.gif)
3. Drag and drop the *Concrete material* from the *asset bin* to the *material box*.
![](dragmaterial.gif)
![](dropmaterial.gif)

**Hint:** You can recognize materials on the following icon:
![](materialicon.jpg)

The material looks very blurry and stretched right now because the Moon surface is so big, so we have to change the *repeat* settings of the texture:

1. Unfold *Color (Diffuse)* and click on the texture to open the texture settings
![](clicktexture.gif)
2. Unfold the *Placement* item and change *Repeat U* to '200' and *Repeat V* to 130.
![](changeplacement.gif)

We also have to increase the *strength* of the material

3. Go back to the *Material* settings by clicking on the entity name, in our case 'Moon Surface', at the top above the texture name
![](gobacktomaterial.gif)
4. Unfold the *Normal* item and increase the strength to '10'.
![](increasestrength.gif)

Look's much better, don't you think?

Optionally, you could change the color of the Moon surface. You can make it darker or lighter, or even a whole different color (though then it doesn't really looks like the surface of the Moon anymore).

To change the color:

1. Unfold the *Color (Diffuse)* item again
2. Click on the color and change the color to the color that you want
![](changecolor.gif)

You can do this for the Moon station as well!

1. Select a 'Moon station part' or a 'Tunnel' entity in the 'Moon station' entity in the hierarchy panel
2. Expand the *Material* component in the inspector panel
![](expandmaterial.gif)
3. Unfold the *Color (Diffuse)* item again
4. Click on the color and change the color to the color that you want
![](changecolor.gif)

I've changed the colors of my Moon station to black and white:
![](spacestationcolor.jpg)

## Add a texture to the Earth

For the Earth we are going to use an image of a flat version of the Earth and wrap it around our 'Earth' sphere entity.

1. <a href="/courses/beginner/4/earth.jpg" download="earthtexture">Click here to download the image</a>
2. Select the Earth in the Hierarchy panel or by clicking on  the Earth on the canvas
3. Unfold the *Material Component* and inside the *Material Component* the *Color (Diffuse)* item
![](expandmaterialcolor.gif)
4. Drag and drop the earth image in the texture box
![](addearthtexture.gif)

Because there doesn't shine any light on the Earth, 
