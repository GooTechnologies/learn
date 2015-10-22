---
title: The anatomy of a Script
layout: manual
indent: 2
weight: 4010
---

## The ctx object
  
The **ctx** (short for _context_) object is one of the useful pre-defined objects used in scripting. This tutorial will explain what's already on there, what one might add to it and some of the use cases.  

## Context Lifespan

The context gets <span style="text-decoration: underline;">cleared</span> when pressing **stop**, and is _re-built_ when pressing **play** (or running a published project). In other words, _all variables stored on ctx are lost between plays_. Keep that in mind when devloping!  

## Pre-defined Properties

The ctx object has a few pre-defined properties. A quick console printout gives us the following list:  

![Properties of the ctx object](props.jpg)  

Properties of the ctx object  

These properties can (roughly) be divided into **scopes** and **Goo world objects.**  

## Scoping

The **ctx** object is itself _unique to each script_, and any properties we define ourselves will only be accssebile by that script. However some of its _properties are shared_.** ctx.entityData** and **ctx.worldData**are examples of shared objects . They are both initially empty, and can be used to share any kind of data across _all scripts belonging to a certain entity_ (ctx.entityData)_,_ or _all scripts in the world _(ctx.worldData). For example, if we'd like to define a property called _acceleration, _we could make it available on three levels:  

{% highlight js %}  
// Only accessible to the script which defined it.  
ctx.acceleration = 9.82;  

// Accessible to all scripts on the entity which has the script.  
ctx.entityData.acceleration = 9.82;  

// Accessible to all scripts.  
ctx.worldData.acceleration = 9.82;  
{% endhighlight %}  

This mechanism is useful when breaking an application up into several scripts, and to avoid setting properties directly on entites. Of course, using [setAttribute()](http://code.gooengine.com/latest/docs/everything.html#setAttribute) or [setTag()](http://code.gooengine.com/latest/docs/everything.html#setTag) on entities is fine too, and is a matter of taste and design choices.  

## Goo World Objects

The rest of the properties on **ctx** are shortcuts to useful variables in the Goo world.  

### ctx.entity

This property directly accesses the entity on which the script is defined. It can be used in a lot of ways, for example making sure that a picking event touched the correct entity, or for controlling a game entity through a script. It's actually just a shortcut, since _all entities in the world_ are accessible by every script through the _world_, which we will see next.  

### ctx.world

The world object opens up paths to everything, pretty much. [The world object](http://code.gooengine.com/latest/docs/index.html?c=World) is used to select any entity (using _by_), getting the very useful time per frame (_tpf_) variable or grabbing hold of the [_gooRunner_ ](http://code.gooengine.com/latest/docs/index.html?c=GooRunner)(and from there the [_renderer_](http://code.gooengine.com/latest/docs/index.html?c=Renderer), and so on). Checking those classes out in the API docs is very useful, and so it the [architecture overview](/learn/goo-engine-architecture-overview/ "Goo Engine Architecture Overview").  

{% highlight js %}  
// Select an entity by name  
var someEntity = ctx.world.by.name('someEntity').first();  
// Use time per frame for frame-rate independent physics  
ctx.entityData.velocity += ctx.entityData.acceleration * ctx.world.tpf;  
{% endhighlight %}  

### ctx.domElement

While the [_canvas_](http://www.w3schools.com/html/html5_canvas.asp) element that Goo uses can be accessed via the world, the gooRunner and the renderer, this property is a much faster way to do it. Useful for setting DOM event listeners or attaching HTML elements, for example.  

{% highlight js %}  
// Add an event listener  
ctx.domElement.addEventListener('mouseup', myMouseUpCallback);  

// Attach a DOM element  
ctx.domElement.attachChild(myDOMElement);  
{% endhighlight %}  

### ctx.viewportWidth and ctx.viewportHeight

There properties are straightforward and will get the width and height of the current viewport.  

### ctx.activeCameraEntity

A quick way to get a hold of the [camera](http://code.gooengine.com/latest/docs/index.html?c=Camera) entity which is currently used.  

## Adding Your Own Properties

### Use Case Examples

While there are already many useful properties defined on the **ctx **object, it is also very useful for adding custom properties. Thanks to the scoping mechanisms mentioned before, it is very flexible. Script-wide values and objects can be available to every function in the script (just make sure to pass the object around as an argument). Here are some examples on uses:  

[A simple scripting example](/learn/scripting-basics-bouncing-ball/ "Scripting in Create – The Basics") which used the ctx object to define some physics properties.  
[DOM event listener tutorial](/learn/dom-event-listeners/ "DOM Event Listeners (Mouse, Keyboard and Touch Input)") showing how to use ctx for managing event callbacks.  
[Transform tutorial](/learn/transforms-and-the-transform-component/ "Transforms and the Transform Component") using ctx to access an entity and modify its components.  

There are many uses, and **ctx** is a fundamental mechanism. There is no "one way" to use it, and there are many styles of usage!  

### Performance

By using the ctx object to define variables, one can gain some performance. For example, it is not advisable to create objects every frame (like in the _update_ function). By using ctx for storing these variables instead of creating new with _var, _a lot of object creation time can be saved.

## The goo object

The **goo **object provides access to most of the [Goo Engine API](http://code.gooengine.com/latest/docs/). For example, one can create entities and access math functions.

{% highlight js %}
// Creating a disc entity with mesh data and a material
var discMeshData = new goo.Torus(32, 12, ctx.tubeRadius, ctx.centerRadius);
var discMaterial = new goo.Material(goo.ShaderLib.simpleLit);
var discEntity = ctx.world.createEntity(discMeshData, discMaterial, 'Disc ' + number).addToWorld();
{% endhighlight %}


{% highlight js %}
// Part of an application using Goo math classes
var diff = goo.Vector3.sub(ctx.addedObjects[i].endPos, ctx.addedObjects[i].getTranslation());
if (diff.length() > ctx.threshold) {
	ctx.addedObjects[i].addTranslation(goo.Vector3.mul(diff, ctx.offset));
}
{% endhighlight %}


## Parameters

To define custom parameters in a Create script, the <em>parameter array </em>and the <em>args </em>object are used.

{% highlight js %}
parameters = [{
	name: "Velocity",
	key: "velocity",
	type: "vec3",
	default: [1, 0, 0]
}];

var setup = function(args, ctx, goo) {
    console.log(args.velocity);
};
{% endhighlight %}
  
[![](velocity1.jpg)](velocity1.jpg)  

Defined parameters show up in the script component panel!  

All parameters that are declared in the _parameters_ array are accessed via the **args **object and are also displayed the _script component panel_ in Create. This makes scripts much easier to work with, and it enables customization of scripts without having to change any code! Below you can read more about what the custom parameters lets you do.  

## Parameter Format

Parameters need to be defined on a specific format. It is mentioned in the comments of an empty script too, but here's a walkthrough of the structure.  

*   **key [string]** - _Required_. The key with which the variable is accessed as a property of the **args** object.
*   **name [string]** - The name that shows up in the script component panel.
*   **type [string enum]** - _Required_. Parameter type, will be discussed in detail further down.
*   **control [string enum]** - Type of control in the script component panel. Will be discussed later.
*   **description [string]** - Tooltip for the script component panel.
*   **options [array of *]** - Used with the _select_ control type.
*   **default [*]** - _Required_ (not for object references). Default value for the parameter.
*   **min [number]** - Used with _int_ or _float_ types.
*   **max [number]** - Used with _int_ or _float_ types.
*   **precision [number]** - Number of significant digits for _float_ values.
*   **scale [number]** - Used with _slider_ control type.
*   **exponential [boolean]** - Used with _slider_ control type.

## Parameter Types

The type property must be set to one of a few predefined strings, each corresponding to a type of parameter.  

*   **"int" -** Simple integer variable (e.g. _5_).
*   **"float" -** Simple float variable (e.g. _3.14_).
*   **"string" -** Simple string variable (e.g. _"HelloGoo"_).
*   **"boolean" **- Simple boolean (e.g. _false_).
*   **"vecX"** - An array of X (2, 3 or 4) float numbers. Not a goo.Vector!
*   **"texture", "image", "sound", "entity", "camera", "animation", "key"** - Direct references to different types of objects, controlled by drag-and-drop boxes in the script panel.

## Parameter Controls

Different types can have different controls which in turn have several different available options:  

**"slider"** - A slider for numbers. The specific options _scale_ and _exponential_ can be used with it, in addition to the number options _min,_ _max_ and _precision_.  

{% highlight js %}  
var parameters = [{
	key: "magnitude",
	name: "Magnitude",
	type: "float",  
	default: 10.0,
	min: 5.0,
	max: 15.0,
	control: "slider"
}];  
{% endhighlight %}  

[![](slider1.jpg)](slider1.jpg)  

"slider" control type  

**"color"** - Brings up an RBG color picker for the _vec3_ type.  

{% highlight js %}  
var parameters = [{
	key: "playerColor",
	name: "Player Color",  
	type: "vec3",
	default: [0, 1, 0],
	control: "color"
}];  
{% endhighlight %}  

[!["color" control option](color.jpg)](color.jpg)  

"color" control type  

**"select"** or **"dropdown"** - Used to define a list of options of the selected type.  Use the options array to define the available options.  

{% highlight js %}  
var parameters = [{ key: "weapon", name: "Weapon",  
type: "string", default: "Wooden Sword", control: "select",  
options: ["Wooden Sword", "Banana", "Laser Bazooka"]}];  
{% endhighlight %}  

[!["select" control](option.jpg)](option.jpg)  

"select" control type  

When using the **select,** the options can be created dynamically, which can be useful sometimes (example from the [Rotating Cube tutorial](http://goolabs.wpengine.com/learn/html-and-css-buttons-rotating-cube/ "HTML and CSS Buttons (Rotating Cube)")):  

{% highlight js %}  
var easingNames = [];  
var easings = window.TWEEN.Easing;  
for (var easing in easings) {  
	if (easings.hasOwnProperty(easing)) {  
		var variations = easings[easing];  
		for (var variation in variations) {
			if (variations.hasOwnProperty(variation)) {  
				easingNames.push(easing + '.' + variation);  
			}
		}  
	}  
}  

var parameters = [{  
	name: 'Easing',  
	key: 'easing',  
	type: 'string',  
	control: 'select',  
	options: easingNames,  
	default: easingNames[0]  
}];  
{% endhighlight %}  

**"jointSelector**" or **"joint"** - used together with an int, to get the ID of a joint. Needs to be used on scripts whose parent entities have joints.  

[![Joint selector on the Goon](joint.jpg)](joint.jpg)  

Joint selector on the Goon