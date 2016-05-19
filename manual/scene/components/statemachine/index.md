---
title: State Machine Component
menutitle: State Machine
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

There are many types of Actions and their effect varies a lot. See the [Actions list]({{ '/manual/scene/components/statemachine/#actions-list' | prepend: site.baseurl }}).

## Transitions: How to switch State

Many of the Actions have events, and they can trigger Transitions to other states. The simplest example is probably the WaitAction. When the Action starts executing, it sets a timer for a number of seconds. When the timer is up, it can transition to some other State.

![](wait-action.png)

## Actions list

<table class="table">

<tr><td><h4 id="AddLightAction">Add light</h4>Adds a point light to the entity</td><td><img src="actions/actions-add-light.gif"></td></tr>
<tr><td><h4 id="ApplyForceAction">Apply force</h4>Apply a force to the attached rigid body.</td><td></td></tr>
<tr><td><h4 id="ApplyImpulseAction">Apply impulse</h4>Apply an impulse to the attached rigid body.</td><td></td></tr>
<tr><td><h4 id="ApplyTorqueAction">Apply torque</h4>Apply a torque to the attached rigid body.</td><td></td></tr>
<tr><td><h4 id="ArrowsAction">Arrow Keys</h4>Transitions to other states when arrow keys are pressed</td><td></td></tr>
<tr><td><h4 id="ClickAction">Click/Tap on entity</h4></td><td></td></tr>
<tr><td><h4 id="CompareCounterAction">Compare Counter</h4>Compares a counter with a value</td><td></td></tr>
<tr><td><h4 id="CompareCountersAction">Compare 2 Counters</h4>Compares the value of 2 counters</td><td></td></tr>
<tr><td><h4 id="CompareDistanceAction">Camera Distance</h4>Performs a transition based on the distance to the main camera or to a location</td><td></td></tr>
<tr><td><h4 id="CopyJointTransformAction">Copy Joint Transform</h4>Copies a joint's transform from another entity, and applies it to this entity. This entity must be a child of an entity with an animation component</td><td><img src="actions/actions-copyjoint.gif"></td></tr>
<tr><td><h4 id="DollyZoomAction">Dolly Zoom</h4>Performs dolly zoom</td><td></td></tr>
<tr><td><h4 id="DomEventAction">DOM Listen</h4>Adds a DOM event listener on one or many elements (specified by a query selector), and performs a transition on a given event.</td><td></td></tr>
<tr><td><h4 id="EmitAction">Emit Message</h4>Emits a message (a ping) to a channel on the bus. Messages can be listened to by the Listen action, or by scripts using the SystemBus.addListener(channel, callback) function.</td><td></td></tr>
<tr><td><h4 id="FireAction">Fire FX</h4>Makes the entity emit fire. To "extinguish" the fire use the "Remove Particles" action.</td><td><img src="actions/actions-fire.gif"></td></tr>
<tr><td><h4 id="HideAction">Hide</h4>Hides an entity and its children</td><td><img src="actions/actions-hide.gif"></td></tr>
<tr><td><h4 id="HoverEnter">Hover Enter</h4>Performs a transition based on whether an entity is inside a user defined box volume or not.The volume is defined by setting two points which, when connected, form a diagonal through the box volume.</td><td></td></tr>
<tr><td><h4 id="HoverExit">Hover Exit</h4>Performs a transition based on whether an entity is inside a user defined box volume or not.The volume is defined by setting two points which, when connected, form a diagonal through the box volume.</td><td></td></tr>
<tr><td><h4 id="Html">HTML Pick</h4>Listens for a picking event and performs a transition. Can only be used on HTML entities.</td><td></td></tr>
<tr><td><h4 id="InBoxAction">In Box</h4>Performs a transition based on whether an entity is inside a user defined box volume or not.The volume is defined by setting two points which, when connected, form a diagonal through the box volume.</td><td></td></tr>
<tr><td><h4 id="IncrementCounterAction">Increment Counter</h4>Increments a counter with a value</td><td></td></tr>
<tr><td><h4 id="InFrustumAction">In View</h4>Performs a transition based on whether the entity is in a camera's frustum or not</td><td></td></tr>
<tr><td><h4 id="KeyDownAction">Key Down</h4>Listens for a key press and performs a transition</td><td></td></tr>
<tr><td><h4 id="KeyPressedAction">Key Pressed</h4>Listens for a key press event and performs a transition. Works over transition boundaries.</td><td></td></tr>
<tr><td><h4 id="KeyUpAction">Key Up</h4>Listens for a key release and performs a transition</td><td></td></tr>
<tr><td><h4 id="LogMessageAction">Log Message</h4>Prints a message in the debug console of your browser</td><td></td></tr>
<tr><td><h4 id="LookAtAction">Look At</h4>Reorients an entity so that it's facing a specific point</td><td></td></tr>
<tr><td><h4 id="MouseDownAction">Mouse Down</h4>Listens for a mouse button press and performs a transition</td><td></td></tr>
<tr><td><h4 id="MouseMoveAction">Mouse Move</h4>Listens for mouse movement and performs a transition</td><td></td></tr>
<tr><td><h4 id="MousePressedAction">Mouse Pressed</h4>Listens for a mouse button press event and performs a transition. Works over transition boundaries.</td><td></td></tr>
<tr><td><h4 id="MouseUpAction">Mouse Up</h4>Listens for a mouse button release and performs a transition</td><td></td></tr>
<tr><td><h4 id="MoveAction">Move</h4>Moves the entity</td><td><img src="actions/actions-move.gif"></td></tr>
<tr><td><h4 id="MuteAction">Mute</h4>Mute all sounds globally.</td></tr>
<tr><td><h4 id="NextFrameAction">Next Frame</h4>Transition to a selected state on the next frame.</td></tr>
<tr><td><h4 id="PauseAnimationAction">Pause Animation</h4>Pauses skeleton animations</td><td><img src="actions/actions-pause-animation.gif"></td></tr>
<tr><td><h4 id="PauseParticleSystemAction">Pause Particle System</h4>Pauses particle system</td><td></td></tr>
<tr><td><h4 id="PauseSoundAction">Pause Sound</h4>Pauses a sound.</td><td></td></tr>
<tr><td><h4 id="PauseTimelineAction">Pause Timeline</h4>Pauses the timeline.</td><td></td></tr>
<tr><td><h4 id="PickAction">Pick</h4>Listens for a picking event on the entity and performs a transition</td><td></td></tr>
<tr><td><h4 id="PickAndExitAction">Pick and Exit</h4>Listens for a picking event on the entity and opens a new browser window</td><td></td></tr>
<tr><td><h4 id="PlaySoundAction">Play Sound</h4>Listens for a picking event on the entity and opens a new browser window</td><td></td></tr>
<tr><td><h4 id="RandomTransitionAction">Random Transition</h4>Performs a random transition</td><td></td></tr>
<tr><td><h4 id="RemoveAction">Remove</h4>Removes the entity from the world.</td><td></td></tr>
<tr><td><h4 id="RemoveLightAction">Remove Light</h4>Removes the light attached to the entity</td><td></td></tr>
<tr><td><h4 id="RemoveParticlesAction">Remove Particles</h4>Removes any particle emitter attached to the entity</td><td><img src="actions/actions-remove-particles.gif"></td></tr>
<tr><td><h4 id="ResumeAnimationAction">Resume Animation</h4>Continues playing a skeleton animation</td><td><img src="actions/actions-pause-animation.gif"></td></tr>
<tr><td><h4 id="RotateAction">Rotate</h4>Rotates the entity with the set angles (in degrees).</td><td><img src="actions/actions-rotate.gif"></td></tr>
<tr><td><h4 id="ScaleAction">Scale</h4>Scales the entity</td><td><img src="actions/actions-scale.gif"></td></tr>
<tr><td><h4 id="SetAnimationAction">Set Animation</h4>Transitions to a selected animation</td><td></td></tr>
<tr><td><h4 id="SetAnimationOffsetAction">Set Animation Offset</h4>Sets animation clip offset.</td><td></td></tr>
<tr><td><h4 id="SetClearColorAction">Background Color</h4>Sets the clear color</td><td><img src="actions/actions-set-background.gif"></td></tr>
<tr><td><h4 id="SetCounterAction">Set Counter</h4>Sets a counter to a value</td><td></td></tr>
<tr><td><h4 id="SetHtmlTextAction">Set HTML Text</h4>Sets the contents of an HTML element.</td><td></td></tr>
<tr><td><h4 id="SetLightPropertiesAction">Set Light Properties</h4>Sets various properties of a light.</td><td></td></tr>
<tr><td><h4 id="SetLightRangeAction">Set Light Range</h4>Sets the range of a light.</td><td></td></tr>
<tr><td><h4 id="SetMaterialColorAction">Set Material Color</h4>Sets the color of a material</td><td></td></tr>
<tr><td><h4 id="SetRenderTargetAction">Set Render Target</h4>Renders what a camera sees on the current entity's texture</td><td></td></tr>
<tr><td><h4 id="SetRigidBodyAngularVelocityAction">Set Rigid Body Angular Velocity</h4></td><td></td></tr>
<tr><td><h4 id="SetRigidBodyPositionAction">Set Rigid Body Position</h4>Set the position of the rigid body.</td><td></td></tr>
<tr><td><h4 id="SetRigidBodyRotationAction">Set Rigid Body Rotation</h4></td><td></td></tr>
<tr><td><h4 id="SetRigidBodyVelocityAction">Set Rigid Body Velocity</h4></td><td></td></tr>
<tr><td><h4 id="SetRotationAction">Set Rotation</h4></td><td></td></tr>
<tr><td><h4 id="SetTimelineTimeAction">Set Timelime Time</h4></td><td></td></tr>
<tr><td><h4 id="SetTimeScaleAction">Set Animation Time Scale</h4>Sets the time scale for the current animation</td><td><img src="actions/actions-set-animation-timescale.gif"></td></tr>
<tr><td><h4 id="ShakeAction">Shake</h4>Shakes the entity. Optionally performs a transition.</td><td><img src="actions/actions-shake.gif"></td></tr>
<tr><td><h4 id="ShowAction">Show</h4>Makes an entity visible</td><td><img src="actions/actions-hide.gif"></td></tr>
<tr><td><h4 id="SmokeAction">Smoke FX</h4>Makes the entity emit smoke. To cancel the smoke emitter use the "Remove Particles" action.</td><td><img src="actions/actions-smoke.gif"></td></tr>
<tr><td><h4 id="SoundFadeInAction">Sound Fade In</h4>Fades in a sound. NOTE: will not work on iOS devices.</td><td></td></tr>
<tr><td><h4 id="SoundFadeOutAction">Sound Fade Out</h4>Fades out a sound and stops it.</td><td></td></tr>
<tr><td><h4 id="SpriteAnimationAction">Sprite Animation</h4></td><td></td></tr>
<tr><td><h4 id="StartParticleSystemAction">Start Particle System</h4></td><td></td></tr>
<tr><td><h4 id="StartTimelineAction">Start Timeline</h4></td><td></td></tr>
<tr><td><h4 id="StopParticleSystemAction">Stop Particle System</h4></td><td></td></tr>
<tr><td><h4 id="StopSoundAction">Stop Sound</h4></td><td></td></tr>
<tr><td><h4 id="StopTimelineAction">Stop Timeline</h4></td><td></td></tr>
<tr><td><h4 id="SwitchCameraAction">Switch Camera</h4>Switches to a selected camera</td><td></td></tr>
<tr><td><h4 id="ToggleFullscreenAction">Toggle Full Screen</h4>Toggles fullscreen on/off. Note that in most browsers this must be initiated by a user gesture. For example, click or touch.</td><td></td></tr>
<tr><td><h4 id="ToggleMuteAction">Toggle Mute</h4>Toggles mute of all sounds globally.</td><td></td></tr>
<tr><td><h4 id="TogglePostFxAction">Toggle Post FX</h4>Enabled/disables post fx globally</td><td></td></tr>
<tr><td><h4 id="TransitionAction">Transition</h4>Transition to a selected state</td><td></td></tr>
<tr><td><h4 id="TransitionOnMessageAction">Listen</h4>Performs a transition on receiving a system bus message (a ping) on a specific channel</td><td></td></tr>
<tr><td><h4 id="TriggerEnterAction">TriggerEnter</h4>Transitions when a trigger volume is entered.</td><td></td></tr>
<tr><td><h4 id="TriggerLeaveAction">TriggerLeave</h4>Transitions when a collider is leaving the trigger volume.</td><td></td></tr>
<tr><td><h4 id="TweenLightColorAction">Tween Light</h4>Tweens the color of the light</td><td></td></tr>
<tr><td><h4 id="TweenLookAtAction">Tween Look At</h4>Transition the entity's rotation to face the set position.</td><td></td></tr>
<tr><td><h4 id="TweenMaterialColorAction">Tween Material Color</h4>Tweens the color of a material.</td><td></td></tr>
<tr><td><h4 id="TweenMoveAction">Tween Move</h4>Transition to the set location.</td><td><img src="actions/actions-tween-move.gif"></td></tr>
<tr><td><h4 id="TweenOpacityAction">Tween Material Opacity</h4>Tweens the opacity of a material</td><td><img src="actions/actions-tween-material-opacity.gif"></td></tr>
<tr><td><h4 id="TweenRotationAction">Tween Rotate</h4>Transition to the set rotation, in angles.</td><td><img src="actions/actions-tween-rotate.gif"></td></tr>
<tr><td><h4 id="TweenScaleAction">Tween Scale</h4>Transition to the set scale.</td><td></td></tr>
<tr><td><h4 id="TweenTextureOffsetAction">Tween Texture Offset</h4>Smoothly changes the texture offset of the entity</td><td><img src="actions/actions-tween-texture-offset.gif"></td></tr>
<tr><td><h4 id="UnmuteAction">Unmute</h4>Unmute all sounds globally.</td><td></td></tr>
<tr><td><h4 id="WaitAction">Wait</h4>Performs a transition after a specified amount of time. A random time can be set, this will add between 0 and the set random time to the specified wait time.</td><td></td></tr>
<tr><td><h4 id="WasdAction">WASD Keys</h4>Transitions to other states when the WASD keys are pressed</td><td></td></tr>

</table>
