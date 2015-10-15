---
layout: page
title: Creating a Goon
weight: 5500
indent: 1
---
[alert type="warning" close="true" heading="Warning"]Create has been updated many times since the original writing of this tutorial. While the concepts still are similar, there might be slight differences in certain interface and feature details. At this time template projects no longer exist, but you can still create the scene yourself.[/alert]
<h2>The Goal</h2>
As in any good cooking show, we have prepared the final result beforehand. The<strong> template project</strong> <em>Creating a Goon</em> is already ready to use, accessible from the project list. The project features a Goon with super special, light emitting glasses. After pressing <strong>play</strong>, the Goon can be controlled with the W, A and D buttons.

<img class="wp-image-490 size-full" src="templates.png" alt="templates" /> Template projects - for the practically minded

For those of you interested in how to arrive at this beautiful creation, please join us in this tutorial!
<h2>Getting Things into the Scene</h2>
The first step is, unsurprisingly, to open up an empty Create project (if you can’t find the <strong>create new project</strong> button, it is at the very bottom of the <strong>project list</strong>). Goo Create comes with a useful <strong>asset library</strong>. Luckily for us, this library happens to contain everything we need for this project! The Import From Asset Library button is found by clicking the <strong>import </strong>button in the top left corner of the screen.

<a href="topmenu.png"><img class="wp-image-491 size-full" src="topmenu.png" alt="topmenu" /></a> The asset library is reached from the import menu

We are going to need two of the <strong>entities</strong> (read more about <a title="Entities and Components" href="http://goolabs.wpengine.com/learn/entities-and-components/" target="_blank">entities and components here</a>) to begin with. The two entities we’ll initially need are <em>Goon</em> and <em>Goo Lab</em>. We simply click the asset library asset and the they will be added to our canvas. We will also scroll down a bit in the asset library and add the<em> Goo Lab</em> <strong>skybox</strong>. If we close the asset library now and zoom out a bit, this is what we see:

<img class="wp-image-487 size-full" src="goon_and_lab.jpg" alt="goon_and_lab" /> Super mega secret Goon lab of Doom

Zooming, by the way, is done with either the middle mouse wheel or by scrolling on a trackpad. You can also pan the camera by pressing down the middle mouse button or SHIFT and then moving the mouse. Orbiting the camera is done by pressing down the right mouse button or ALT and moving the mouse. The <strong>grid</strong> overlay can be helpful. If it's not, it can easily be deactivated from the top menu: <img class="alignnone size-full wp-image-488" src="grid.png" alt="grid" /> If we zoom in a little bit, we notice that the Goon is currently floating in thin air. To not make him feel sick, let’s put his small feet on the ground! Moving a 3D object around is referred to as <em>translating</em>, and there is a tool for doing exactly that. It can be reached from the top menu bar.

<img class="wp-image-492 size-full" src="translate_button.png" alt="translate_button" /> Translate - make things move

Having the translate tool selected, we grab a hold of the Goon and gently move him around until we are happy with the new position.

<img class="wp-image-489 size-full" src="move_goon.jpg" alt="move_goon" /> Come back down, Goon. You can't fly.
<h2>Getting in Control</h2>
Now we have the Goon in place in his lab, and it is time to give him some exercise. One of the <strong>components</strong> that we can attach to entities is a <em>state machine component</em> which lets us put interactivity into our creations, and acts as an alternative to scripting. [<a title="The State Machine" href="http://goolabs.wpengine.com/learn/the-state-machine/">Read more about the state machine here</a>] Let’s make our Goon run! This will require a <strong>behavior</strong> with two <strong>states</strong>, <em>running</em> and <em>idle</em>. The simple, basic idea is that the Goon will go from the idle state to the running state when pressing down W, and will go back to the idle state when the button is released. The two states will be responsible for setting the correct animations (the animations are included with the Goon asset). To give the Goon entity state machine functionality, we'll need to add a state machine component. Start by selecting the Goon, then click the add component button (the big plus) and select <em>state machine</em>.

<a href="add_component2.png"><img class="wp-image-495 size-full" src="add_component2.png" alt="add_component" /></a> Adding a component

If we open the newly created state machine panel, we see that the component already comes with a behavior. We will use this behavior for making the Goon run, so let's rename it to <em>Running behavior</em> (surprise, surprise). Like we concluded earlier, our running behavior will contain two states; one for moving and one for standing still. Our next task will therefore be to add another state and then rename both states to names that make sense. Don’t worry about the contents of the states right now, that will be next! Add another state and rename the states to <em>Idle</em> and <em>Run</em>. This is what the behavior should look like at this point:

<a href="state_machine_1.png"><img class="wp-image-496 size-full" src="state_machine_1.png" alt="state_machine_1" /></a> The states of the Running behavior

What entities will do while they are in certain states is decided by the state’s <strong>actions</strong>. Actions can be used for many different things, and we will use it to trigger <strong>transitions</strong> between states, to set animations and to move entities. This is the final structure of the Running behavior (we will go through parts of the process soon):
<ul>
	<li>Idle state
<ul>
	<li>Set animation to the idle animation.</li>
	<li>If W is pressed, move to running.</li>
</ul>
</li>
	<li>Run state
<ul>
	<li>Set animation to the running animation.</li>
	<li>Move the entity forward along its own Z axis.</li>
	<li>If W is released, move to idle.</li>
</ul>
</li>
</ul>
Pretty simple, right? Each of the bullet points above is represented by an action. Let’s start with adding the actions for the idle state. The actions are added by clicking the <strong>add action</strong> button on a state, and then selecting one of the states from the list. Let's try this by adding a <strong>Set Animatio</strong>n action. When the action has been added, we click to choose an animation from the drop-down menu. Let’s choose<em> Goon_animation_idl</em>e to have the Goon relax when he’s not running.

<a href="set_animation.png"><img class="size-full wp-image-497" src="set_animation.png" alt="Setting an animation" /></a> Setting an animation

The next action we need to add is the <em>Key Down</em> action. This action, like many others, has a <strong>transition</strong>. Opening the drop-down within the action lets us choose what state to move to when the action is done. When we press a key in the idle state, we want to go to the running state, so choose that in the menu. Also, let <strong>W</strong> be the button which fires the state change.

&nbsp;

<a href="key_down.png"><img class="size-full wp-image-498" src="key_down.png" alt="Setting up a state transition" /></a> Setting up a state transition

Our <em>Idle </em>state now has the two necessary states, so let's move on to the <em>Run</em> state. We'll add another <strong>Set Animation</strong> action, this time choosing to start the animation <strong>Goon_animation_running</strong>. We also need to add a <strong>Key Up</strong> action so that the Goon will stop running when <strong>W</strong> is released. Additionally, to not keep the Goon running on the spot, we need a <strong>Move</strong> action. After careful calculations, we have decided that moving 0.2 units in the <strong>Z</strong> direction is optimal.

<a href="running_behavior.png"><img class="size-full wp-image-499" src="running_behavior.png" alt="The complete Running behavior" /></a> The complete Running behavior

In the picture of the complete <em>Running</em> behavior above, note the check box next to the <em>Idle</em> state. It indicates that the state is the default, and will be active when we start the interaction. If something looks terribly wrong in the states, please back up a bit. Remember that the whole project is available as a template, so a little innocent cheating is easy! This is all we need to make the Goon run. Try it out by pressing the <strong>play</strong> button at the bottom and go crazy on the W button!

<a href="goon_run.jpg"><img class="size-full wp-image-500" src="goon_run.jpg" alt="Run Goon, run!" /></a> Run Goon, run!

We need to add another behavior to make the Goon turn. The reason that we need another behavior, instead of just more states, is that we would like the turning and the running to becompletely <em>independent</em> of each other. Using separate behaviors achieve this. The <em>Turn</em> behavior should contain the following states:
<ul>
	<li>Idle state:
<ul>
	<li>Two Key Down actions, one for A and one for D</li>
</ul>
</li>
	<li>Left state:
<ul>
	<li>Key Up action for A</li>
	<li>Rotate action, 130 degrees around the Y axis</li>
</ul>
</li>
	<li>Right state:
<ul>
	<li>Key Up action for D</li>
	<li>Rotate action, -130 degrees around the Y axis</li>
</ul>
</li>
</ul>
After connecting the transitions to the correct states, the complete Turning behavior should look like this:

<a href="turning_behavior.png"><img class="wp-image-501 size-full" src="turning_behavior.png" alt="" /></a> The complete Turning behavior

Again, please refer to the template project if something is terribly off. If it’s not, the Goon should now be capable of both running and turning!
<h2>Lighting it Up</h2>
When creating a new project, a few default lights are added for us (otherwise we wouldn’t be able to see anything). While they might be nice, we now feel artistically confident enough to add our own instead. Let’s start with turning on that big lamp in the ceiling! Lights are, as other entities, added from the <strong>create </strong>panel in the top menu. Opening the panel gives us a few different lights to try out, and what could be better than adding a <em>spotlight</em>?

<a href="spotlight.png"><img class="size-full wp-image-502" src="spotlight.png" alt="Adding a spotlight" /></a> Adding a spotlight

Add the light, use the translate to move it to the ceiling and then rotate it to point straight down. At this point, we can also select the <em>default lights</em> in the right hand menu and delete them.

<a href="spotlight_translate.png"><img class="size-full wp-image-503" src="spotlight_translate.png" alt="An illuminated Goon" /></a> An illuminated Goon

This looks like a very narrow light, so let us explore and tweak the light settings for a moment. Having the light selected, open the Light panel and try out the settings. Below are the ones used in the template, or at least close to them. Note that the shadow setting is turned on!

<a href="spotlight_settings.png"><img class="size-full wp-image-504" src="spotlight_settings.png" alt=" Ceiling spotlight settings" /></a> Ceiling spotlight settings

No Goon is complete without <em>shining goggles</em>. To equip or Goon with this absolutely vital detail, we will make use of another <strong>spotlight</strong>, attached to the Goon, and the neat <strong>projection texture</strong> feature. We create another spotlight and then use the hierarchy tree to the right. Expand the Goon entity until the mesh <em>goon_mesh</em> is visible, and then drag and drop the new spotlight to the mesh.

<a href="hierarchy.png"><img class="size-full wp-image-505" src="hierarchy.png" alt="The right hand hierarchy view" /></a> The right hand hierarchy view

This makes the light a <strong>child</strong> of the mesh, so that when the mesh is rotated or moved around, the light will follow. This means we can now move the light to the goggles and point it away from the Goon, and it will follow when the Goon moves around. Try it! To learn more, check out the <a title="The Hierarchy and Transforms" href="http://goolabs.wpengine.com/learn/the-hierachy-and-transforms/">Hierarchy and Transforms tutorial</a>.

<a href="glasses_settings_1.png"><img class="size-full wp-image-506" src="glasses_settings_1.png" alt="Goggle glasses and the light settings" /></a> Goo Glasses and the light settings

We will now need a texture for the light’s projection.

<a href="glasses_texture.jpg"><img class="size-full wp-image-507" src="glasses_texture.jpg" alt="The light projection texture" /></a> The light projection texture

Download the image above, then drag and drop it from your desktop onto the<strong> projection texture slot</strong> in the light panel. The texture will now act as a mask and make the light projection match the goggles.

<a href="projection.png"><img class="size-full wp-image-508" src="projection.png" alt="Pretty neat, huh?" /></a> Pretty neat, huh?
<h2>Final touches</h2>
We are pretty close to the look we were aiming for, but let’s not get ahead of ourselves. Opening up the <strong>asset library</strong> again, we can add the <em>Crate</em> asset and put it somewhere nice. Goo Engine is pretty smart about sharing resources, so it’s possible to add more crates and have them share mesh information, textures and so on. If we select the crate and press the <strong>duplicate</strong> button in the top right, we suddenly have twice the amount of crates we had before!

<a href="duplicate.png"><img class="wp-image-509 size-full" src="duplicate.png" alt="duplicate" /></a> Create Crate Cloning Coolness

After duplicating the crates until our duplicating urges are satisfied, we have all the assets we need. All that is left is to add some nice <strong>post effects</strong>! Post effects are added from the <strong>scene</strong> panel, accessed by clicking the very top icon in the right hand hierarchy menu. <em>Bloom</em> is an effect that makes light "bleed" from bright areas, and can give a scene a very nice and glowing look. Adding some bloom is very easy, we just click the Add effect button, select <em>Bloom</em>, set some parameters and watch the result. Note that the post effects rendering needs to be turned on (the magic wand icon in the top menu)!

<a href="bloom.png"><img class="size-full wp-image-510" src="bloom.png" alt="It glows!" /></a> It glows!

Score! For those of you that stuck with us until this point, thank you. We have used Goo Create to set up a small but very interactive scene using the asset library and the state machine, and then made it look cool using lights and a post effect. Please try out adding more interactivity, more elements, additional post effects and generally do things differently. When you’re done, share the result by going to the <strong>export</strong> panel and <strong>publish</strong> the scene to a website with just one click!
<h2>Stuff to Try</h2>
Not enough? Here are some ideas for taking the project further.
<ul>
	<li>Add an antialiasing post effect to get rid of any jagged edges that might have appeared.</li>
	<li>Implement collision with the crates using the state machine or scripting.</li>
	<li>Add sound effects to the animation.</li>
</ul>