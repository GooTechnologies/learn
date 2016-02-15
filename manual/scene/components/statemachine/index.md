---
title: State Machine
layout: manual
weight: 2200
indent: 3
---
The *State Machine Component* adds simple logic to the entity, similarly to scripts. The difference from scripts is that the State machine is much easier to use (no coding required!) and have many built-in Create-specific Actions.

The State Machine Component has two main panels, the panel for the Component:

![](state-machine-component-panel.png)

...and a panel for the Behavior:

![](behavior-panel.png)

## Structure

The State machine has a list of *Behaviors*, which contains *States*, which in turn contain *Actions*.

![](abstract-state-machine.png)

[Read more about Finite State Machines on Wikipedia](https://en.wikipedia.org/wiki/Finite-state_machine).

### Behaviors

A *Behavior* is a collection of states. A state machine component can have several behaviors, and they are independent of each other. A Behavior can be seen as and behaves like *an independent state machine*.

### States

Each *Behavior* has one or several *States*, but only one *active* state. As long as a state is active, all its *Actions* will also be active. All actions in inactive states are inactive. The *active state* can be changed by *transitions* in the state’s actions.

A Behavior always has one *Default State* which is activated when you press Play.

### Actions

An *Action* is some logic gets executed while its State is active. Some actions executes its logic once and are done, while others execute logic once per frame. There are also Actions that just listens for events, and executes logic when the event happens.

There are many types of Actions and their effect varies a lot. Some examples are:

* Pick: Listen for a click/touch on the entity.
* FireFX: Emits fire particles from an entity.
* KeyDown: Listen for and react to key presses.
* Collide: Check for and react to collisions between entities.
* Wait: Transition to another state after a certain amount of time.
* Move: Moves an entity.
* Set Animation: Select active animation.
* Emit: Emits an event to the System Bus.
* ...and so on!

## Transitions: How to switch State

Many of the Actions have events, and they can trigger Transitions to other states. The simplest example is probably the WaitAction. When the Action starts executing, it sets a timer for a number of seconds. When the timer is up, it can transition to some other State.

![](wait-action.png)

## Actions list

<table class="table">
<tr><td><b>Add light</b><br>Adds a point light to the entity</td><td><img src="actions/actions-add-light.gif"></td></tr>
<tr><td><b>Apply force</b><br>Apply a force to the attached rigid body.</td><td></td></tr>
<tr><td><b>Apply impulse</b><br>Apply an impulse to the attached rigid body.</td><td></td></tr>
<tr><td><b>ApplyTorque</b><br>Apply a torque to the attached rigid body.</td><td></td></tr>
<tr><td><b>Arrow Keys</b><br>Transitions to other states when arrow keys are pressed</td><td></td></tr>
<tr><td><b>Background Color</b><br>Sets the clear color</td><td><img src="actions/actions-set-background.gif"></td></tr>
<tr><td><b>Camera Distance</b><br>Performs a transition based on the distance to the main camera or to a location</td><td></td></tr>
<tr><td><b>Compare 2 Counters</b><br>Compares the value of 2 counters</td><td></td></tr>
<tr><td><b>Compare Counter</b><br>Compares a counter with a value</td><td></td></tr>
<tr><td><b>Copy Joint Transform</b><br>Copies a joint's transform from another entity, and applies it to this entity. This entity must be a child of an entity with an animation component</td><td><img src="actions/actions-copyjoint.gif"></td></tr>
<tr><td><b>Dolly Zoom</b><br>Performs dolly zoom</td><td></td></tr>
<tr><td><b>Emit Message</b><br>Emits a message (a ping) to a channel on the bus. Messages can be listened to by the Listen action, or by scripts using the SystemBus.addListener(channel, callback) function.</td><td></td></tr>
<tr><td><b>Fire FX</b><br>Makes the entity emit fire. To "extinguish" the fire use the "Remove Particles" action.</td><td><img src="actions/actions-fire.gif"></td></tr>
<tr><td><b>Hide</b><br>Hides an entity and its children</td><td><img src="actions/actions-hide.gif"></td></tr>
<tr><td><b>In Box</b><br>Performs a transition based on whether an entity is inside a user defined box volume or not.The volume is defined by setting two points which, when connected, form a diagonal through the box volume.</td><td></td></tr>
<tr><td><b>In View</b><br>Performs a transition based on whether the entity is in a camera's frustum or not</td><td></td></tr>
<tr><td><b>Increment Counter</b><br>Increments a counter with a value</td><td></td></tr>
<tr><td><b>Key Down</b><br>Listens for a key press and performs a transition</td><td></td></tr>
<tr><td><b>Key Pressed</b><br>Listens for a key press event and performs a transition. Works over transition boundaries.</td><td></td></tr>
<tr><td><b>Key Up</b><br>Listens for a key release and performs a transition</td><td></td></tr>
<tr><td><b>Listen</b><br>Performs a transition on receiving a system bus message (a ping) on a specific channel</td><td></td></tr>
<tr><td><b>Log Message</b><br>Prints a message in the debug console of your browser</td><td></td></tr>
<tr><td><b>Look At</b><br>Reorients an entity so that it's facing a specific point</td><td></td></tr>
<tr><td><b>Mouse Down</b><br>Listens for a mouse button press and performs a transition</td><td></td></tr>
<tr><td><b>Mouse Move</b><br>Listens for mouse movement and performs a transition</td><td></td></tr>
<tr><td><b>Mouse Up</b><br>Listens for a mouse button release and performs a transition</td><td></td></tr>
<tr><td><b>Move</b><br>Moves the entity</td><td><img src="actions/actions-move.gif"></td></tr>
<tr><td><b>Pause Animation</b><br>Pauses skeleton animations</td><td><img src="actions/actions-pause-animation.gif"></td></tr>
<tr><td><b>Pick</b><br>Listens for a picking event on the entity and performs a transition</td><td></td></tr>
<tr><td><b>Pick and Exit</b><br>Listens for a picking event on the entity and opens a new browser window</td><td></td></tr>
<tr><td><b>Random Transition</b><br>Performs a random transition</td><td></td></tr>
<tr><td><b>Remove Light</b><br>Removes the light attached to the entity</td><td></td></tr>
<tr><td><b>Remove Particles</b><br>Removes any particle emitter attached to the entity</td><td><img src="actions/actions-remove-particles.gif"></td></tr>
<tr><td><b>Resume Animation</b><br>Continues playing a skeleton animation</td><td><img src="actions/actions-pause-animation.gif"></td></tr>
<tr><td><b>Rotate</b><br>Rotates the entity with the set angles (in degrees).</td><td><img src="actions/actions-rotate.gif"></td></tr>
<tr><td><b>Scale</b><br>Scales the entity</td><td><img src="actions/actions-scale.gif"></td></tr>
<tr><td><b>Set Animation</b><br>Transitions to a selected animation</td><td></td></tr>
<tr><td><b>Set Animation Time Scale</b><br>Sets the time scale for the current animation</td><td><img src="actions/actions-set-animation-timescale.gif"></td></tr>
<tr><td><b>Set Counter</b><br>Sets a counter to a value</td><td></td></tr>
<tr><td><b>Set Material Color</b><br>Sets the color of a material</td><td></td></tr>
<tr><td><b>Set Render Target</b><br>Renders what a camera sees on the current entity's texture</td><td></td></tr>
<tr><td><b>Shake</b><br>Shakes the entity. Optionally performs a transition.</td><td><img src="actions/actions-shake.gif"></td></tr>
<tr><td><b>Show</b><br>Makes an entity visible</td><td><img src="actions/actions-hide.gif"></td></tr>
<tr><td><b>Smoke FX</b><br>Makes the entity emit smoke. To cancel the smoke emitter use the "Remove Particles" action.</td><td><img src="actions/actions-smoke.gif"></td></tr>
<tr><td><b>Sound Fade In</b><br>Fades in a sound. NOTE: will not work on iOS devices.</td><td></td></tr>
<tr><td><b>Sound Fade Out</b><br>Fades out a sound and stops it.</td><td></td></tr>
<tr><td><b>Switch Camera</b><br>Switches to a selected camera</td><td></td></tr>
<tr><td><b>Toggle Post FX</b><br>Enabled/disables post fx globally</td><td></td></tr>
<tr><td><b>Transition</b><br>Transition to a selected state</td><td></td></tr>
<tr><td><b>TriggerEnter</b><br>Transitions when a trigger volume is entered.</td><td></td></tr>
<tr><td><b>TriggerLeave</b><br>Transitions when a collider is leaving the trigger volume.</td><td></td></tr>
<tr><td><b>Tween Light</b><br>Tweens the color of the light</td><td></td></tr>
<tr><td><b>Tween Look At</b><br>Transition the entity's rotation to face the set position.</td><td></td></tr>
<tr><td><b>Tween Material Opacity</b><br>Tweens the opacity of a material</td><td><img src="actions/actions-tween-material-opacity.gif"></td></tr>
<tr><td><b>Tween Move</b><br>Transition to the set location.</td><td><img src="actions/actions-tween-move.gif"></td></tr>
<tr><td><b>Tween Rotate</b><br>Transition to the set rotation, in angles.</td><td><img src="actions/actions-tween-rotate.gif"></td></tr>
<tr><td><b>Tween Scale</b><br>Transition to the set scale.</td><td></td></tr>
<tr><td><b>Tween Texture Offset</b><br>Smoothly changes the texture offset of the entity</td><td><img src="actions/actions-tween-texture-offset.gif"></td></tr>
<tr><td><b>WASD Keys</b><br>Transitions to other states when the WASD keys are pressed</td><td></td></tr>
<tr><td><b>Wait</b><br>Performs a transition after a specified amount of time. A random time can be set, this will add between 0 and the set random time to the specified wait time.</td><td></td></tr>
</table>