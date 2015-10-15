---
layout: page
title: System Bus
indent: 1
weight: 5500
---
The SystemBus, a global instance of the <a href="http://code.gooengine.com/latest/docs/Bus.html" target="_blank">Bus class</a>, provides a way to communicate across scripts, state machines, and timelines. It's an event-driven mechanism which can be really useful when building interactive apps. This tutorial will provide some basic examples of its use.
<h2>Emitting a Message</h2>
The most basic message consists of only a <strong>channel name</strong>, represented by a string. This string is typically used to indicate that something happened, and does not imply any particular effect of the event. It's just a way for something to say "<em>this just happened, and whoever is listening may react however they wan</em>t"! This way of thinking aligns with the <a href="https://developer.mozilla.org/en/docs/Web/API/Event" target="_blank">DOM Event Mode</a>l, where for example events such as <em>mouseup</em>, <em>keydown</em>, <em>mousemove</em>, etc are emitted when a user interacts with the browser , and it's up to the listeners do decide what to to with the information.

Here's a simple example, emitting a message (roughly) every second:

[js]
var setup = function(args, ctx, goo) {
	ctx.interval = 1;
	ctx.lastUpdate = ctx.world.time;
}

var update = function(args, ctx, goo) {
	var delta = ctx.world.time - ctx.lastUpdate;
	if (delta > ctx.interval) {
		goo.SystemBus.emit('it_is_time');
		ctx.lastUpdate = ctx.world.time;
	}
};
[/js]

<h2>Listening to a Channel</h2>
Any script or state in the State Machine can listen to a channel, and do whatever it wants with the information. Using the "it_is_time" channel from the example above, we can for example rotate an entity every time it happens. Note that this script can be placed on a different entity than the first one, <strong>everything in the same scene uses the same bus!</strong>

[js]
var setup = function(args, ctx, goo) {
	ctx.rotate = function() {
		ctx.entity.addRotation(0, 0.1, 0);
	};
	goo.SystemBus.addListener('it_is_time', ctx.rotate);
};

var cleanup = function(args, ctx, goo) {
	goo.SystemBus.removeListener('it_is_time', ctx.rotate);
};
[/js]

Note that we<strong> must remove the listeners we create</strong>, otherwise we'd get duplicates every time we press play!
<h2> Sending Data in Events</h2>
In addition to the channel name, we can send an Object with the emitted events. If we for example were sending messages every time entities in our scene collides, we could send the names of the colliding entities and the point of collision with the event. Expanding on the previous example, we can add some more code to let our time ticker send some extra data, and have the listening entity react to some of this data:

[js]
var setup = function(args, ctx, goo) {
	ctx.interval = 1;
	ctx.lastUpdate = ctx.world.time;
}

var update = function(args, ctx, goo) {
	var delta = ctx.world.time - ctx.lastUpdate;
	if (delta > ctx.interval) {
		var data = {
			delta: delta,
			parity: (Math.floor(ctx.world.time) % 2 === 0) ? "even" : "odd",
		};
		goo.SystemBus.emit('it_is_time', data);
		ctx.lastUpdate = ctx.world.time;
	}
};
[/js]

The listening entity:

[js]
var setup = function(args, ctx, goo) {
	ctx.rotate = function(data) {
		if (data.parity === 'even') {
			ctx.entity.addRotation(0, 0.1, 0);
		} else if (data.parity === 'odd') {
			ctx.entity.addRotation(0.1, 0, 0);
		}
	};
	goo.SystemBus.addListener('it_is_time', ctx.rotate);
};

var cleanup = function(args, ctx, goo) {
	goo.SystemBus.removeListener('it_is_time', ctx.rotate);
};
[/js]

The above additions sends some data about the event (whether the world time seconds are even or odd, and what the actual delta is), and the listening entity recieves this data and decides how to act on it.
<h2> Using the Bus to Trigger State Machine Transitions</h2>
In Create, pretty much anything can be done with scripts. However, sometimes the State Machine provides an easier and cleaner way of doing certain things. For example, setting animations or playing sounds takes a few lines of code but is really easy to do in the State Machine. With the power of the System Bus, we can set up transitions in the State Machine and trigger them with scrips. Here's how.
<h3>The Goon Machine</h3>
We'll start by importing our omnipresent Goon from the Asset Library, and add a State Machine component to the entity. We'll use one single behavior with two states, Idle and Running. We'll also add some <em>set animation</em> actions on the states. Need some refreshment on your State Machine skills? Check out <a title="The State Machine" href="http://www.goocreate.com/learn/the-state-machine/" target="_blank">the State Machine tutorial</a> before moving on! The Goon states will look like this:

<img class="size-full wp-image-1168 aligncenter" src="http://goocreate.com/wp-content/uploads/sites/3/2014/11/2014-11-11-11_42_10-Goo-Create.jpg" alt="2014-11-11 11_42_10-Goo Create" width="714" height="581" />

A good start! But let's also seize the moment and learn how to work with simple <strong>sounds</strong>! Let's add a sound component to the Goon and import two mp3 files, sigh.mp3 and run.mp3. Unzip the files, and drag them onto the sound component.
<h3 style="text-align: center;">[<a href="http://www.goocreate.com/learn/wp-content/uploads/sites/2/2014/11/systembus_sounds.zip" target="_blank">FILE HERE</a>]</h3>
<img class="size-full wp-image-1169 aligncenter" src="http://goocreate.com/wp-content/uploads/sites/3/2014/11/2014-11-11-12_22_17-Goo-Create.jpg" alt="2014-11-11 12_22_17-Goo Create" width="344" height="497" />

Now we'll use the State Machine to turn these on and off. Each state will have a <em>Sound Fade In</em> action and a <em>Sound Fade Out</em> action. The actions in the Idle state will fade <strong>out</strong> the run sound and fade <strong>in</strong> the sigh sound. The Run state will of course do the opposite. I've set all time parameters to 100 to fade in/out a little quicker than the standard 1000 ms.

[caption id="attachment_1170" align="alignnone" width="307"]<img class="size-full wp-image-1170" src="http://goocreate.com/wp-content/uploads/sites/3/2014/11/2014-11-11-12_25_05-Goo-Create.jpg" alt="The running state fades in the corresponding sound and fades out the other one." width="307" height="546" /> The running state fades in the corresponding sound and fades out the other one.[/caption]

Now we need to set up the transitions, and this is where the System Bus comes into play again. For both the states, we'll add a Listen action. This action will listen to the correct channel and perform a transition to another state. Note that both states will listen to the same channel!

[caption id="attachment_1171" align="alignnone" width="605"]<img class="size-full wp-image-1171" src="http://goocreate.com/wp-content/uploads/sites/3/2014/11/both.jpg" alt="The complete states, side by side" width="605" height="682" /> The complete states, side by side[/caption]

We can use the same event triggering mechanism as before, but I suggest changing the interval to be more than a second:

[js]
var setup = function(args, ctx, goo) {
	ctx.interval = 6;
	ctx.lastUpdate = ctx.world.time;
}

var update = function(args, ctx, goo) {
	var delta = ctx.world.time - ctx.lastUpdate;
	if (delta > ctx.interval) {
		var data = {
			delta: delta,
			parity: (Math.floor(ctx.world.time) % 2 === 0) ? "even" : "odd",
		};
		goo.SystemBus.emit('it_is_time', data);
		ctx.lastUpdate = ctx.world.time;
	}
};
[/js]

Note here that our State Machine does not use the data, only the channel name. We can still keep the data around in case other entities are interested! We should now be able to play our scene and have the Goon both switch animations and play different sounds. Here's a link to the published version - I've added some extra light effects using another state machine bus listener.
<h3 style="text-align: center;"><a href="https://goote.ch/c27b938433b34bbc8e99c5ce8c9460c1.scene/" target="_blank">Open the Scene</a></h3>
[caption id="attachment_1172" align="alignnone" width="803"]<a href="https://goote.ch/c27b938433b34bbc8e99c5ce8c9460c1.scene"><img class="size-full wp-image-1172" src="http://goocreate.com/wp-content/uploads/sites/3/2014/11/2014-11-11-12_39_27-Goo-Create.jpg" alt="Open the Scene" width="803" height="299" /></a> Click to open! Don't forget to turn up the volume :)[/caption]
<h2> Wrap-Up</h2>
This was a quick intro of what can be done with the System Bus. It has a lot of use cases. One can use it to react to colissions, trigger timed events (like above), react to user input, et cetera et cetera. It's a very useful weapon to have in the Goo arsenal, and hopefully it can make your apps faster, cleaner and simpler!

[author]
<h2></h2>
<h3></h3>