---
layout: tutorial
title: UV Sprite Animation
weight: 1041
indent: 1
---
This tutorial tells you how to make UV sprite animation via a simple script, like the following:

<iframe src="https://c1.goote.ch/5a3c485848cf4289bed1af5213b70d41.scene"></iframe>

Say you want to make an old school pixel style game, where you have animations defined in sprite sheets, like in the following image:

<img src="spritesheet.png" style="max-width:50%"/>

Or, say that you want to create an animated video on a mesh (but you don't want to use a video texture for some reason). Convert the video into a spritesheet like the following:

![](sprite-video.jpg)

I will not show you how to convert the video in this tutorial, but I can show you how to make the animation inside Create.

1. Put the spritesheet texture in the *Diffuse Texture* slot in the material panel on your entity.
2. Put the script provided below in a *Script Component* on the same entity.
3. Enter the number of sprites in the sprite sheet in X and Y directions, in the "tiling" parameter field.
3. Press Play.

Then you'll get a nice sprite animation.

This is the script that was mentioned above.

{% highlight js %}var setup = function (args, ctx) {
  if(!ctx.entity.meshRendererComponent) return;
  ctx.tex = ctx.entity.meshRendererComponent.materials[0].getTexture('DIFFUSE_MAP');
  if(!ctx.tex) return;
  ctx.tex.repeat.setDirect(1/args.tiling[0], 1/args.tiling[1]);
};

var update = function (args, ctx) {
  if(!ctx.tex) return;
  var t = (args.speed * ctx.world.time) % 1;
  var tileX = Math.floor(args.tiling[0] * args.tiling[1] * t % args.tiling[1]);
  var tileY = Math.floor((args.tiling[1] * t) % args.tiling[1]);
  ctx.tex.offset.setDirect(tileX, tileY).mul(ctx.tex.repeat);
  ctx.tex.offset.y = 1 - ctx.tex.offset.y;
};

var parameters = [{
  key: 'tiling',
  type: 'vec2',
  'default': [1, 1]
}, {
  key: 'speed',
  type: 'float',
  'default': 1
}];{% endhighlight %}

![](sprite-uv-animation-script.png)

## Resources

* [Live demo](https://c1.goote.ch/5a3c485848cf4289bed1af5213b70d41.scene)
* [Public Create scene](https://create.goocreate.com/edit/5a3c485848cf4289bed1af5213b70d41.scene)