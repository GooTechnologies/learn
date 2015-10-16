---
layout: tutorial
title: Solar System
weight: 6050
indent: 1
---
Hi fellow Goons,

In this tutorial, we will show you how you can use the <em>ScriptComponent</em> to make a solar system, just like in the <a href="http://learn.goocreate.com/engine-intro-tutorial/">Hello World engine tutorial</a>

<a href="solar.png"><img class="alignnone wp-image-411 size-full" src="solar.png" alt="solar" /></a>

The ScriptComponent is a component that you can add to an entity in <a href="//app.goocreate.com">Goo Create</a>. It allows you use the programming language JavaScript together with a subset of the Goo Engine API to control the behavior of your Goo entities in real time. In comparison to the State Machine the ScriptComponent is more powerful and provides a very high level of flexibility.

Here are the steps we will take in this tutorial:
<ul>
	<li>Start a new project in Goo Create</li>
	<li>Add 3 spheres and a PointLight</li>
	<li>Add some materials</li>
	<li>Add a ScriptComponent to the first two spheres</li>
	<li>Nest the spheres</li>
	<li>Add a Bloom post effect and a skybox</li>
</ul>
<h2>Start a new project in Goo Create</h2>
Open up Goo Create and click on <strong>+NEW PROJECT</strong> in the dashboard. Then give the project a nice name like <em>SolarSystem.</em>
<h2>Add three spheres and a PointLight</h2>
We will add three spheres. They will represent the Sun, Earth and the Moon.

To add a sphere, click on <strong>+CREATE</strong> and then select the <em>sphere</em> icon:

<a href="sphere_icon.png"><img class="alignnone wp-image-412 size-full" src="sphere_icon.png" alt="sphere_icon" /></a>

This will be our Sun, so let’s call the entity <em>Sun.</em>

If you want to, open up the <strong>Geometry</strong> settings and increase the X and Y samples to 64 to make the shape edges smoother.

Next, we will add earth: Click on <strong>Create</strong> again and add another sphere. Then increase the X and Y samples and give it the name <em>Earth</em>. After that, go to the <strong>Transform</strong> settings and set the X translation to 4 and scale X,Y,Z to 0.4:

<a href="earth_transform.png"><img class="alignnone wp-image-414 size-full" src="earth_transform.png" alt="earth_transform" /></a>

Next we will add the Moon.

Click on +<strong>CREATE</strong> again and add another sphere. Increase the X and Y samples and give it the name <em>Moon</em>. Then go to the <strong>Transform</strong> settings again and set the X translation to 2 and scale X,Y,Z to 0.1:

<a href="moon_transform.png"><img class="alignnone wp-image-415 size-full" src="moon_transform.png" alt="moon_transform" /></a>

[alert type="info"]Please note: The moon will look to be very close to the sun, but don’t worry, once we nest the Moon as a child entity to the Earth entity it will look correct again. Nesting the entities will be done as one of the last steps in the tutorial.[/alert]

Next, we will add a <em>point light</em> to make the Sun appear to shine light on Earth and the Moon.

To add a point light click on <strong>Create</strong> and click the <strong>Point</strong> button:

<a href="point_light.png"><img class="alignnone wp-image-418 size-full" src="point_light.png" alt="point_light" /></a>

[alert type="info"]If you are wondering where the point light is: It is inside the sun and will shine through the Sun model onto Earth and the Moon[/alert]
<h2>Add some Materials</h2>
We will use the same textures as in the Hello World tutorial. You can download the individual images here:

<a href="http://labs.gooengine.com/learn/SolarSystem/sun.png">http://labs.gooengine.com/learn/SolarSystem/sun.png</a>

<a href="http://labs.gooengine.com/learn/SolarSystem/earth.jpg">http://labs.gooengine.com/learn/SolarSystem/earth.jpg</a>

<a href="http://labs.gooengine.com/learn/SolarSystem/moon.jpg">http://labs.gooengine.com/learn/SolarSystem/moon.jpg</a>

To assign the Sun texture in the material settings, click on the <em>Sun</em> entity and open up the <strong>Material</strong> settings: Then drag and drop the <em>sun.png</em> file onto the color texture slot:

<a href="drop_texture.png"><img class="alignnone wp-image-419 size-full" src="drop_texture.png" alt="drop_texture" /></a>

Next, go to the ambient settings and change the color to bright yellow. This will make the Sun appear bright even though the light is inside the model and is not lighting up the sun itself. Next, select the Earth sphere and open up the <strong>Material</strong> settings and drag and drop the Earth texture onto the color texture slot. You will notice that the earth appears to be turned to the side by 90 degrees. Don’t worry, we will fix this in a later step.

Finally, repeat the process for the moon.

[alert type="info"]If you have trouble selecting the Moon sphere, remember that you can always select an entity using the *Hierarchy* panel to the right.[/alert]
<h2>Add a ScriptComponent to the first two spheres</h2>
Okay, now we get to talk about the ScriptComponent. Select the sun again and click on <strong>Add Component</strong> and click on <strong>Script</strong>.

<a href="add_component.png"><img class="alignnone wp-image-420 size-full" src="add_component.png" alt="add_component" /></a>

Open up the new ScriptComponent's settings and select <strong>Add Script</strong> and click on <strong>Custom</strong>.

Once you have added a script, you can click on the <strong>Edit</strong> symbol to open up a new window with the script editor.

<a href="edit_script.png"><img class="alignnone wp-image-426 size-full" src="edit_script.png" alt="edit_script" /></a>

[alert type="info"]Please note: You can leave the script editor window open, it will automatically switch to new contents when you change entities.[/alert]

You should see a big wall of JavaScript source code, but don’t get scared. Most of it is just documentation. Essentially, you have control over three functions and one array:
{% highlight js %}/* Implement this method to do initializing. */
var setup = function(args, ctx, goo) {};
/* Implement this method to do cleanup. Called on script stop and delete. */
var cleanup = function(args, ctx, goo) {};
/* This function will be called every frame. */
var update = function(args, ctx, goo) {};
/* Parameters defined here will be available on the 'args' object. */
var parameters = [];
{% endhighlight %}
The <strong>setup</strong> function can be used to initialize variables, state and anything else you want to initialize. It will be called every time you press the <strong>play</strong> button in Create or when running an exported project.

<a href="press_play.png"><img class="alignnone wp-image-427 size-full" src="press_play.png" alt="press_play" /></a>

The <strong>cleanup</strong> function can be used to clean up state and anything else you want to clean up. It will be called every time you press the <em>stop</em> button in Create or delete a script. It usually is used to reset the entities position and rotation after you changed them in the update or setup function. It can also be used to removed anything you created using scripting, or to remove event listeners et cetera.

The <strong>update</strong> function can be used to update state, your Goo entities or anything else you want to update. It will be called <em>every frame</em> after you click the play button in Create or if you run an exported project. Every frame means approximately <em>60 times per second</em>. So usually you don’t want to unconditionally log something in this function or it will flood the console.

For our Solar System we don’t need the <em>cleanup</em> or <em>setup</em> functions, but only the <strong>update</strong> function. For our use case we want to rotate the Sun and with it all nested entities. We will later attach the Earth entity to the Sun and thus the Earth will be rotated around the Sun.

Select <strong>all text</strong> in the script code editor and replace it with this:
{% highlight js %}/* Implement this method to do initializing. */
var setup = function(args, ctx, goo) {};
/* Implement this method to do cleanup. Called on script stop and delete. */
var cleanup = function(args, ctx, goo) {};
/* This function will be called every frame. */
var update = function(args, ctx, goo) {
    ctx.entity.addRotation(0, 0.75 * ctx.world.tpf, 0);
};
/* Parameters defined here will be available on the 'args' object. */
var parameters = [];
{% endhighlight %}
As you can see we added a call to <strong>addRotation</strong> on the object <strong>ctx.entity</strong>.

<strong>addRotation</strong> is a useful function of the Goo Engine injected into the entity by the <a href="//code.gooengine.com/latest/docs/TransformComponent.html">TransformComponent</a>.

[alert type="info"]*ctx* stands for *context* and it hosts a couple of cool objects. Mainly the current entity to which this script belongs. If you create a new script you can read the comments for other objects it contains.[/alert]

As a parameter to the rotation around the Y axis we give it <strong>0.75 * ctx.world.tpf</strong>.

<strong>ctx.world</strong> represents the root of scene graph. You can use the <a href="//code.gooengine.com/latest/docs/World.html">world object</a> to query for any entity. But the world also contains the time it took to render the last frame in a property called <strong>tpf</strong> (time per frame). A typical value is 1/60, or 0.01666…

The reason we use the <strong>tpf</strong> as part of our parameter to addRotation is to make the code <em>frame rate independent</em>. If we always use tpf as part of our animation code it will run at the same speed regardless of how long it takes to render the scene. So this is a good practice to remember!

Repeat the script process in exactly the same way for the Earth entity to finish this step, but use this slightly altered update function instead:
{% highlight js %}var update = function(args, ctx, goo) {
    ctx.entity.setRotation( -Math.PI/2, ctx.world.time, 0);
};
{% endhighlight %}
The difference between the Sun script and this script for Earth is because Earth appears to be turned to the side by 90 degrees. With the function setRotation we can fix this, by rotating the earth around the X axis by -90 degrees. Goo uses a 3D math library where every angle needs to be in <a href="http://en.wikipedia.org/wiki/Radian">radians</a>. As the second parameter we pass in the time property of the ctx.world object which is similar to the ctx.world.tpf property but instead of containing the time per frame it contains the time since the program started in floating point seconds.

Ok, time to test: Click on the <strong>play</strong> button and look closely at the Sun and Earth and you should see them slowly rotating: <a href="press_play.png"><img class="alignnone wp-image-427 size-full" src="press_play.png" alt="press_play" /></a>
<h2>Nest the spheres</h2>
This step is very easy: Inside the <em>Hierarchy</em> window, drag and drop the Earth entity onto the Sun entity. Then drag and drop the moon entity onto the Earth entity:

<a href="nested_spheres.png"><img class="alignnone wp-image-428 size-full" src="nested_spheres.png" alt="nested_spheres" /></a>

[alert type="info"]You can click on the little triangle in front of an entity to show its children.[/alert]

Now click <strong>play</strong> again and you should see Earth rotating around the Sun and the Moon rotating around Earth.

[alert type="info"]Of course this simulation is not an accurate representation of our real solar system. It merely serves as a nice playground for our ScriptComponent demo. :-)[/alert]
<h4>Why does nesting entities have such an effect?</h4>
The reason is that nested entities have their parents transformation applied to them as well, but only after their own transformation is applied. So for example, Earth is first rotated around its center and then moved 4 units along the X axis. Then it is rotated around the suns center. This behavior of nested entities is a nice trick we can use to make our simple little solar system.

[alert type="info"]The same technique is also used to animate realistic hands for example. The fingers are nested under the palm entity and only moved relative to the palm. If the arm or palm is moved then the fingers move with it, but if only the fingers are moved then the palm is not affected.[/alert]
<h2>Add a Bloom post effect and a Skybox</h2>
Ok, for the last step we will add a bit of eye candy: In your <em>Hierarchy</em> window click on the entity called <strong>Scene</strong> and you should see a <strong>Post Effect</strong> settings panel on the left side of Goo Create.

<a href="postfx.png"><img class="alignnone size-full wp-image-429" src="postfx.png" alt="postfx" /></a>

Click on <strong>Add Effect</strong> and click on <strong>Bloom</strong>. You should immediately get a nice glow effect around your sun.

Finally click on <strong>Import</strong> and click on <strong>Import From Asset Library</strong> and then select one of the nice skyboxes. I used <em>Dark Sky</em>.

And here, again, is the beautiful result:

<a href="solar.png"><img class="alignnone wp-image-411 size-full" src="solar.png" alt="solar" /></a>