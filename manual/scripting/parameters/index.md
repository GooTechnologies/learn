---
title: Parameters
---

To define custom parameters in a Create script, the <em>parameter array </em>and the <em>args </em>object are used.

<pre><code>
parameters = [{
	name: "Velocity",
	key: "velocity",
	type: "vec3",
	default: [1, 0, 0]
}];

var setup = function(args, ctx, goo) {
    console.log(args.velocity);
};
</code></pre>

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/velocity1.jpg"><img class="wp-image-779 size-full" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/velocity1.jpg" alt="" /></a> Defined parameters show up in the script component panel!

All parameters that are declared in the <em>parameters</em> array are accessed via the <strong>args </strong>object and are also displayed the <em>script component panel</em> in Create. This makes scripts much easier to work with, and it enables customization of scripts without having to change any code! Below you can read more about what the custom parameters lets you do.
<h2>Parameter Format</h2>
Parameters need to be defined on a specific format. It is mentioned in the comments of an empty script too, but here's a walkthrough of the structure.
<ul>
	<li><strong>key [string]</strong> - <em>Required</em>. The key with which the variable is accessed as a property of the <strong>args</strong> object.</li>
	<li><strong>name [string]</strong> - The name that shows up in the script component panel.</li>
	<li><strong>type [string enum]</strong> - <em>Required</em>. Parameter type, will be discussed in detail further down.</li>
	<li><strong>control [string enum]</strong> - Type of control in the script component panel. Will be discussed later.</li>
	<li><strong>description [string]</strong> - Tooltip for the script component panel.</li>
	<li><strong>options [array of *]</strong> - Used with the <em>select</em> control type.</li>
	<li><strong>default [*]</strong> - <em>Required</em> (not for object references). Default value for the parameter.</li>
	<li><strong>min [number]</strong> - Used with <em>int</em> or <em>float</em> types.</li>
	<li><strong>max [number]</strong> - Used with <em>int</em> or <em>float</em> types.</li>
	<li><strong>precision [number]</strong> - Number of significant digits for <em>float</em> values.</li>
	<li><strong>scale [number]</strong> - Used with <em>slider</em> control type.</li>
	<li><strong>exponential [boolean]</strong> - Used with <em>slider</em> control type.</li>
</ul>
<h2>Parameter Types</h2>
The type property must be set to one of a few predefined strings, each corresponding to a type of parameter.
<ul>
	<li><strong>"int" - </strong>Simple integer variable (e.g. <em>5</em>).</li>
	<li><strong>"float" - </strong>Simple float variable (e.g. <em>3.14</em>).</li>
	<li><strong>"string" -</strong> Simple string variable (e.g. <em>"HelloGoo"</em>).</li>
	<li><strong>"boolean" </strong>- Simple boolean (e.g. <em>false</em>).</li>
	<li><strong>"vecX"</strong> - An array of X (2, 3 or 4) float numbers. Not a goo.Vector!</li>
	<li><strong>"texture", "image", "sound", "entity", "camera", "animation", "key"</strong> - Direct references to different types of objects, controlled by drag-and-drop boxes in the script panel.</li>
</ul>
&nbsp;
<h2>Parameter Controls</h2>
Different types can have different controls which in turn have several different available options:

<strong>"slider"</strong> - A slider for numbers. The specific options <em>scale</em> and <em>exponential</em> can be used with it, in addition to the number options <em>min,</em> <em>max </em>and<em> precision</em>.

<pre><code>
var parameters = [{ key: "magnitude", name: "Magnitude", type: "float",
    default: 10.0, min: 5.0, max: 15.0, control: "slider" }];
</code></pre>

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/slider1.jpg"><img class="wp-image-784 size-full" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/slider1.jpg" alt="" /></a> "slider" control type

<strong>"color"</strong> - Brings up an RBG color picker for the <em>vec3</em> type.

<pre><code>
var parameters = [{ key: "playerColor", name: "Player Color",
	type: "vec3", default: [0, 1, 0], control: "color" }];
</code></pre>

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/color.jpg"><img class="size-full wp-image-781" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/color.jpg" alt="&quot;color&quot; control option" /></a> "color" control type

<strong>"select" </strong>or<strong> "dropdown"</strong> - Used to define a list of options of the selected type.  Use the options array to define the available options.

<pre><code>
var parameters = [{ key: "weapon", name: "Weapon",
	type: "string", default: "Wooden Sword", control: "select",
	options: ["Wooden Sword", "Banana", "Laser Bazooka"]}];
</code></pre>

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/option.jpg"><img class="size-full wp-image-782" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/option.jpg" alt="&quot;select&quot; control" /></a> "select" control type

When using the <strong>select,</strong> the options can be created dynamically, which can be useful sometimes (example from the <a title="HTML and CSS Buttons (Rotating Cube)" href="http://goolabs.wpengine.com/learn/html-and-css-buttons-rotating-cube/" target="_blank">Rotating Cube tutorial</a>):

<pre><code>
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
</code></pre>

<strong>"jointSelector</strong>" or <strong>"joint"</strong> - used together with an int, to get the ID of a joint. Needs to be used on scripts whose parent entities have joints.

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/07/joint.jpg"><img class="size-full wp-image-1148" src="http://goocreate.com/wp-content/uploads/sites/3/2014/07/joint.jpg" alt="Joint selector on the Goon" /></a> Joint selector on the Goon