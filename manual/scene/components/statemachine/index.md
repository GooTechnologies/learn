---
title: State Machine Component
---

The state machine is a visual programming tool that makes it really fast for you to prototype your project.

In a state machine we have Behaviours that contains States and States contains Actions.
Behaviours are layers of interaction being executed at the same time.
States are steps for those behaviours.
Behaviors are layers of interaction.
By default a behavior contains a initial state
Controls such as shading mode, gizmo switch, camera selection can be found in the canvas menu.
In the default state click the add action button.
The Add action pop ups gives you access to pre-made blocks that you can use. As the earth needs to spin I will add a
rotate action.
Actions are categorized by types.
Search for the pick action
Controls such as shading mode, gizmo switch, camera selection can be found in the canvas menu.
When the user will click on the user the Pick action will be fired and connect to the next state.
State to go to once the user
clicked/picked the earth
Controls such as shading mode, gizmo switch, camera selection can be found in the canvas menu. Now add a new state to your behavior and a rotate action to it.
You can now connect the Pick action to the new state that I called ‘Rotate State’.
State to go to once the user
clicked/picked the earth
Rename your state here
Controls such as shading mode, gizmo switch, camera selection can be found in the canvas menu.
Adjust the rotation parameters to make your earth spin.
Here the earth will rotate 10 degrees every frame on the Y axis.
Controls such as shading mode, gizmo switch, camera selection can be found in the canvas menu.


<p class="page-header" style="font-weight: 300;color: #363b40">Goo Create ships with a state machine, which is one of three ways to add interactivity to your scene. The other two ways are <em>scripting</em> and the <em>timeline</em>. Each way has its pros and cons, and there are ways to use several methods simultaneously.</p>
<p style="color: #363b40">State machines are added via <em>State machine components</em> attached to entities. State machines are good for adding interactivity without coding, and let you work with a large selection of predefined <em>actions</em>. Actions are activated when certain <em>states</em> become active, and states are in turn are encapsulated by <em>behaviors</em>.</p>


[caption id="attachment_518" align="aligncenter" width="644"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/goon.png"><img class="wp-image-518 size-full" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/goon.png" alt="goon" width="644" height="352" /></a> A Goon with a state machine[/caption]
<h2>The Building Blocks</h2>
<p style="color: #363b40">It’s difficult to explain the state machine concepts independently, so it might be worth reading through the following explanations twice to solidify the way things are connected.</p>

<h3>Behaviors</h3>
<p style="color: #363b40">A behavior is a collection of states. If an entity’s state machine has several behaviors, they are independent of each other. That means that the transitions in a behavior will not affect the other behaviors! A behavior can be seen as and behaves like <em>an independent state machine</em>.</p>

<h3>States</h3>
<p style="color: #363b40">Each behavior can one or several states, but only one <em>active</em> state. As long as a state is active, all its actions will also be activated. All actions in other states will be deactivated. The active state is changed by<em>transitions</em> in the state’s actions.</p>

<h3>Actions</h3>
<p style="color: #363b40">An action is the thing that eventually gets executed when its state becomes active. There are many types of actions and their effect varies a lot, so it’s very hard to give a complete picture in a document like this. Take a minute to look through the different actions in Create, you might find something useful! In the meantime, here are some examples of actions:</p>

<ul style="color: #363b40">
	<li>Emit fire particles from an entity.</li>
	<li>Listen for and react to key presses.</li>
	<li>Check for and react to collisions between entities.</li>
	<li>Transition to another state after a certain amount of time.</li>
	<li>Move, scale or rotate an entity.</li>
	<li>Project a camera’s image on an entity’s texture.</li>
	<li>Select active animation.</li>
	<li>… and so on!</li>
</ul>
<h2 id="how-to-use-the-state-machine" style="font-weight: 400;color: #363b40">How To Use The State Machine</h2>
<h3>Setting up Transitions</h3>
<p style="color: #363b40">Equipped with all this knowledge, how does one tie it together? The key is the transitions. The standard way of working with the state machine is by wiring up a chain of states with transitions between them. For example, an easy example is moving an entity using key listeners. Each state in a “moving behavior” represents one way of moving, including not moving at all. For example, one could use three states. One for moving forward, one for moving backward, and one for standing still. The moving states would both use a “move” action with appropriate parameters, and the idle state would just be empty. Then, one could add a key listener to each of the states and wiring up the transitions appropriately, deciding how to move between the three states.</p>
<p style="color: #363b40">How to do the above, including how and why one might add several behaviors, is described as a part of the<span style="text-decoration: underline"> </span></p>

<h3>Using The System Bus</h3>
<p style="color: #363b40">There is a convenient way of communicating between states, between scripts and state machines, between the timeline and scripts, and even between behaviors. By emitting and listening to messages on the system bus, any type of actions and scripts can be triggered. The state machine facilitates this by providing Emit Message and Listen actions, both capable of transitions.</p>

<h3>An Example</h3>
[caption id="attachment_517" align="aligncenter" width="865"]<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/graph12.png"><img class="wp-image-517 size-large" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/graph12-1024x615.png" alt="" width="865" height="519" /></a> Application example, explained below (click to open large image)[/caption]

The picture above shows a (simplified) little application. The idea is the following: A character can either take cover, move or be dead. If some key is pressed while the character is taking cover, the player enters the “moving” state and starts moving. If the key is released while moving, the character goes back to taking cover. If the system bus emits on the channel “explode”, the character goes into the “dead” state. Here, it waits for some amount of time and then awakes from the dead and moves into the “taking cover” state.
<p style="color: #363b40;text-align: left">The other behavior is separate, and might belong to another entity. This behavior moves a bomb between three states; disarmed, armed and exploding. The bomb can be armed or disarmed by pressing a key. If the bomb is armed long enough, it will explode and emit a message on the “explode” channel. It is up to other behaviors to listen to this message and react to it, as in the case with the character.</p>
<p style="color: #363b40">Scripts and timelines interacts with the same bus. For example, one could write a script to emit the explosion at any complex combination of requirements. Another option would be to set off explosion at certain points in time using the timeline.</p>

<h3 id="what-else-" style="font-weight: 400;color: #363b40">What Else?</h3>
<p style="color: #363b40">Given all the possible combinations and uses, it’s impossible to describe all the options. This was merely a scratch on the surface. Now go explore, and tell us what you discover!</p>