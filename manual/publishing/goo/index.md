---
title: Goo hosting
indent: 2
weight: 5002
layout: manual
---
The easiest way to get your 3D Scene online is to publish it to the Goo cloud.

1. Create a scene.
2. Open the Publish dialog in *Scene > Publish...*.
3. Edit the publish settings.
4. Click Publish.

After a few seconds, your scene is live! You can click *View* to open it.

![](publish-dialog.png)

*The publishing dialog*

## Publishing settings

### Cover image

This cover image is the thumbnail for the scene, you will see it in the Dashboard and in the Gallery.

### Name & description

These will be shown on the loading screen of your published scene.

### Enable share buttons

This will toggle the Facebook and Twitter links.

### Goo Logo

This will toggle the Goo logotype in the corner.

### Enable Alpha

If your scene has a transparent background, and you want to use it, for example when embedding as an iframe on top of something else, then you should check this checkbox.

### Enable Anti-aliasing & Use Device Pixel Ratio

These are rendering settings. Anti-aliasing will render triangles more smoothly.

Using device pixel ratio will enable higher resolution on some devices, for example Retina screens. Warning: using too high resolution may kill performance.

### Use transient publish URL

By default, the scene that you are editing gets a publish URL on the following form:

{% highlight html %}
https://goote.ch/SCENE_ID.scene
{% endhighlight %}

But if you enable *transient publish URL*, you will get an URL on this form:

{% highlight html %}
https://goote.ch/PUBLISH_ID
{% endhighlight %}

The PUBLISH_ID will be different for each time you publish. This can be useful sometimes.

### Embed code

Use this HTML tag to embed your scene into your webpage.