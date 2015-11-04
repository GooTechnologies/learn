---
title: Serve ad
indent: 2
weight: 5003
layout: manual
---

When you have made your ad ready, you can use our ad serving for embedding and tracking.

The easiest way to get started is to open the Publisher app. Open your scene and select *Scene / Serve Ad..." in the top menu bar. You are now taken to the Publisher app.

![](publisher.png)

To the left, you can make settings for your ad. To the right, you get a preview. When you have set a new setting, click the refresh button at top to update the preview.

When you are done with your ad settings, you can get a script tag for it by clicking the "Get script tag" button at the bottom. Copy and paste this tag into any HTML page and it will embed your ad.

## Script tag reference

When you generate the script tag, you get something on the following format:

{% highlight html %}
<script id="goo123"
src="//.../serve.js?param1=value&param2=value&..."
type="text/javascript"></script>
{% endhighlight %}

The parameters need some explanation.

### elementId (required)

This is the id that the created DOM element will get. When everything is loaded, you can get the element by this ID and manipulate it.

### sceneId (required)

The ID of the scene to load, for example "cd83beb3b2e34cc6839377be95949054.scene".

### sceneName

The name of the scene.

### zIndex = 1000

The z-index of the created DOM element.

### transparentBackground = true

Whether the DOM element should allow transparency or not.

### loadingScreen = thumbnail

What kind of loading screen that should be used. The following values are allowed:

* thumbnail
* transparent
* white
* black
* any CSS color in hex format

### iframe = false

Whether to embed the WebGL canvas in an iframe or not.

### mraid = false

Whether MRaid should be used.

### loadOn = polite

When the ad should start loading. Allowed values are:

* polite
* immediate

The "polite" loading mode will wait until the rest of the page has loaded before loading the Goo scene.

### engineVersion = latest

Which version of Goo Engine to load. Default value is "latest" but you can also use a fixed engine version like "0.15.1".

### features

A comma-separated list of engine packs to load. If your scene depends on physicspack (for example), then you need to add "physics" to this list. Available packs are:

* animation
* posteffects
* statemachine
* timeline
* quad
* script
* html
* physics

### fallback = thumbnail

What to use for fallback image, if the client browser doesn't support WebGL.

* "thumbnail"
* a URL
* a hex color

### tracking = {}

Specifies tracking pixel URLs and on what events to hit them on. Built in events are:

* imp - will be hit on impression.
* fallback_imp - hit on impression if in fallback mode. If not specified, imp pixel is hit.

Sample tracking parameter value: 

{% highlight html %}
{
    "imp": ['//imp_pixel1', '//imp_pixel2'],
    "myCustomEvent": ['//custom_pixel3', '//custom_pixel4']
}
{% endhighlight %}

If you use the value above, you'll get the imp_pixels hit when the ad loads in both normal and fallback mode. If you run ```gsrv.track('myCustomEvent')``` in a Goo Create script, then the custom_pixels will be hit.

### contentRoot

The root URL of the serve.js script.

### exit = {}

This parameter defines all exit URLs in your ad. If you from your goo scene run ```gsrv.exit('default')```, and you have the following value for the exit parameter:

{% highlight html %}
{
    "default": {
        "url": "http://google.com",
        "tracking": ["http://tracking.pixel"]
    }
}
{% endhighlight %}

...then the client will hit the tracking pixel at "http://tracking.pixel" and open google.com in a new window.

### border = false

Whether the ad should have a border or not. "true" will ad an 1px black border.

### catchTouch = true

Whether the ad should prevent scrolling when touching or mouse hovering on it.

### exitMacro

An exit macro, that will be prepended to your exit URL. The value of this macro could be for example: %%CLICK_URL_ESC%%.