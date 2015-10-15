---
layout: page
title: Multiplayer FPS
weight: 5999
indent: 1
---
Today we'll have a look a few interesting topics and techniques involved in crafting a multiplayer first-person-shooter game using Goo Create and Node.js. Here's what the gameplay looks like!

[advanced_iframe securitykey="iframe" src="//player.vimeo.com/video/114006218" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen]

Prefer playing live? Try this project, and invite a friend or two. Press arrow up/down to increase/decrease the number of bots. Press F to re-lock the mouse if needed.
<p style="text-align: center"><a href="https://goote.ch/30fda7504cc04fa1b5ddde499eb88f28.scene/" target="_blank">[PUBLISHED SCENE]</a></p>
<p style="text-align: left">The article won't go into all the implementation details, but don't worry! The complete and commented source code can be found here:</p>
<p style="text-align: center">[<a href="http://www.goocreate.com/learn/wp-content/uploads/sites/2/2014/12/server.zip">SERVER CODE</a>]</p>
<p style="text-align: center"><a href="https://create.goocreate.com/56434/30fda7504cc04fa1b5ddde499eb88f28.scene" target="_blank">[CREATE SCENE]</a></p>
A word of warning and encouragement - there is a lot of room for improvements in the implementation. Be wary of bugs! This example has been made to be illustrative, it is neither the most efficient nor a very elegant implementation. With that said, hopefully you'll be inspired to build an improved version!
<h2>Problem Statement</h2>
The concepts we'll have a look at all deal with problems originating from the following key points:

1. The server should be <strong>authorative.</strong> It needs to have the final regarding the rules and mechanics for a fair game.
2. The serves will not be able to provide game state updates as fast as the client can render frames.
3. The server-client and client-server communication will have some latency.

If we could disregard the points above, designing a multiplayer game would be considerably easier. We could construct the <em>naive approac</em>h and be done with it.
<h3>The Naive Approach</h3>
The simple solution - which could be a good idea to implement first in order to see for yourself - goes as follows:

1. A client presses a key that performs some action, like moving or firing a weapon.
2. A client instantly sends a message to the server, informing the server about the desired action.
3. The server processes the input and changes the game state accordingly - updates a position or health, for example.
4. The server sends a message to all connected clients about the updates game state.
5. The clients all recieve the message and renders the updated the state.
6. The loop starts over.

It's very simple. The server is in charge, so the client's will have a hard time to cheat. The game state will be fair. But what happens with the above approach? The answer is obvious - we will have a very laggy experience. Let's say that there is a 50 ms latency in each communication direction. That means that we won't see our own actions reflected until 100 ms after we pressed a button, and we won't see what the other players are doing right now - only what they were doing 100 ms ago. Additionally, the server might only have time to send 10 updates or so per second. Not only will we have lag (and have a hard time to aim because of it), but also very choppy movements. Not fun!
<h2>Better Approaches</h2>
To deal with some of the problems, there are a few techniques that go a long way. How does games like Quake III arena or Counter-Strike do it? If you've played Counter-Strike, you'll know that when you shoot an enemy with the AWP, you don't have to think about the lag too much. You also know that your and your opponents's movements are smooth. How do they do it? We'll look at three techniques.

<strong>Client (Input) Prediction </strong>ensures that your own movements and actions will be smooth and snappy, while still keeping the server in charge.
<strong>Entity Interpolation</strong> makes your opponent or other entities move smoothly, even if the server updates are few and far inbetween.
<strong>Lag Compensation</strong> is a requirement for things like firing a weapon without having to aim way ahead of the player because of lag.

When used together, the three techniques can enable a very nice FPS experience even with having to deal with a server. Here are some excellent resources to read up on:
<a href="https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking" target="_blank">Source Multiplayer Networking</a>, article about the general techniques by Valve Software
<a href="http://buildnewgames.com/real-time-multiplayer/" target="_blank">Real Time Multiplayer in HTML5</a>, article and implementation example by Sven Bergström
<a href="http://www.gabrielgambetta.com/fpm1.html" target="_blank">Fast-Paced Multiplayer</a>, four-part article series by Gabriel Gambretta

All the sources above go into deeper detail than we do here, so it's <span style="color: #ff0000"><strong>highly recommended</strong></span> to dig into them first!
<h2>Implementation Overview</h2>
The example application is a classic FPS shooter. The playing field is small and simple. The opponents (and yourself) are represented by simple spheres, and the radius is used for both collission with walls, obstacles and bullets. The playing field also has some obstacles which we can't move or shoot through. These are, again, represented by spheres. Spheres are simple to collide with!

For game client, our obvious choice is <em>Goo Create</em>. The server is a <em>Node.js</em> server, and communication between the two is done by the <em>WebSockets</em> protocol. WebSockets is native to the browser, which means that integration in Create scripts it easy. Also, there are tons of great tools for socket communication in the Node stack.
<h3>Client-Side Communication and Events</h3>
On the Create side, things are (somewhat) organized into scripts, and sending messages to the server is done with a global (ctx.worldData scope) function:

<pre><code>
ctx.worldData.pushMessage = function(message, data) {
	ctx.ws.send(JSON.stringify({message: message, data: data}));
	ctx.seq++;
};
</code></pre>

As you can tell, a message may and often will come with some data. More about that later. The important point is that the communication is handled using JSON.

When a message comes back from the server, something similar happens:

<pre><code>
ctx.ws.onmessage = function(messageString) {
	var message = JSON.parse(messageString.data).message;
	var data = JSON.parse(messageString.data).data;
	handleMessage(ctx, message, data);
};
</code></pre>

The message is split up into the actual message and the data, and then a function is called to handle the message. The <strong>handleMessage</strong> function makes heavy use of the System Bus to first set some state from the server and then emit a message that something changed. The rest of the scripts may then do as they please with the information. Look at the <em>Connection and Messaging</em> script to get the general idea.
<h3>Server Connections</h3>
The Node server uses the ws module for WebSockets communication. After setting up the server (please refer to the source code) the server is ready to accept events.

<pre><code>

wss.on('connection', function(ws) {
	var socket_id, player, init_data;

	socket_id = socket_id_counter++;
	sockets[socket_id] = ws;
	player = core.newPlayer(socket_id);

	ws.onmessage = function(messageString) {
		var message, data, seq;
		message = JSON.parse(messageString.data).message;
		data = JSON.parse(messageString.data).data;
		handle_message(socket_id, message, data, seq);
	};

	ws.on('close', function() {
		delete sockets[socket_id];
		core.removePlayer(socket_id);
		send_to_all('s_player_disconnected', socket_id);
	});

	init_data = {
		player: player,
		players: core.players,
		constants: core.constants,
		occluders: core.occluders,
		control_number: core.controlNumber
	};

	send_to_one(socket_id, 's_init', init_data);
	send_to_all('s_player_connected', player);
});
</code></pre>

The main flow of events when a client connects is:
1. The connection (the ws object) it stored by a simple ID.
2. Event handlers are set up on the connection object.
3. An init message with some important data is sent to the <em>new</em> client, and a message about the new player is sent to <em>all</em> clients.

Note that the game state is handled in the <strong>core</strong>, and that the <strong>handle_message</strong> function is similar to the one on the client side.
<h3>Server Game Loop and Events</h3>
The server game state is handled by the core (separate module), and the server takes care of updating the game loop. The loop is fairly straightforward. At the end of each loop iteration, a message is sent to all clients. This message contains the current game state and some important things (hits, kills, shots) that have accumulated since the last update. For the purpose of lag compensation, the server (and the client) keeps track of the average update time (tick length) and client latency.
<h3>Deployment</h3>
The the Node server app is deployed on Heroku. For development, check out Ngrok for the ability to tunnel a local Node server (localhost) to the public internet. This means you can see logs in real time, very useful when debugging! With that said, deploying the app to Heroku or something similar will probably give you considerably smaller latency.
<h3>Bots</h3>
Feel alone? Press arrow up to spawn a bot. Press arrown down to remove a bot. These bots move randomly and shoots at random targets, but they are very good at aiming. Not so good at deciding if their target is visible or not.
<h2>Client Prediction</h2>
Remember that the server needs to be authorative, but also that we would like to move smoothly. This is achieved using by continiously storing all inputs in a queue on the client. When it's time to send an update to the server, this queue is sent to the server which processes it. While the client is waiting for the server to respond, more client inputs are stored in the queue. For example, say that we send 10 inputs to the server. While we're waiting for the authorative response, we record an additional 5 actions. Our queue is now 15 actions long. Now the server responds! It has processed the 10 first inputs and <em>sets the state authoratively</em>. On the client, we then replay the unhandled events. We start from the state we just got handed, and process the 5 actions that were not included. Assuming the server responded in reasonable time and that the server and client move by the same rules, we should be in the correct spot.

Some important points:
<ul>
	<li>The moving logic needs to be mirrored on the server and client. If an action results in a certain outcome, the outcome should be the same on the client and server for best results.</li>
	<li>If the outcome is NOT the same, the server stays in charge. If there are slight differences in the move handling, the client moves too fast, or something similar, the state will be adjusted at every update. There will be no drifting and accumulating errors.</li>
</ul>
The function <strong>updatePlayer</strong> in the client script <em>Player Move, Prediction, Fire, Death</em> first checks the key state and executes a move in the same way the server core player update loop does. However, it does not move the player immediately. It instead calculcates <em>deltas </em>which are pushed onto a queue. At the end of the update loop, the player position is set to the last known server position. Then, all unhandled deltas are applied from that position. When the server has handled more deltas, these deltas are removed from the queue.
<h2>Entity Interpolation</h2>
Great, now we move smoothly ourselved. But we can't use client prediction on our opponents, so how do we make them not stutter forward with a horrible delay? The answer that is that we actually lie about the state a little. This is a technique that sacrifices some correctness in order to provide a better gaming experience. What happens is that we store the last two known opponent states (the position of all players in the game) and interpolate between them, using an estimated server update time to get a good interpolation constant. Here's an example. Our server responds every 100 ms. At the second to last update, player X was at position (5, 0, 0). At the last update, the player had moved to (10, 0, 0). It was 20 ms since we last got an update from the server, and we can assume that there are 80 ms left until our next update. Where do we render player X? We use linear interpolation to move the player to (6, 0, 0)! We used the interpolation factor 0.2 (20 ms of an estimated 100 had elapsed since last update) to get there. The result is that the player will smoothly move from (5, 0, 0) to (10, 0, 0) while we wait for the server to update. The sacrifice is that we are actually looking at our opponents in the past! That might seem weird, but together with lag compensation, it works very nicely.

In the Create project, the script <em>Opponent Entities</em> handles the interpolation, as well as detecting new or removed players and handle their entities.
<h2>Lag Compensation</h2>
If we look at our opponents in the past, how do we make sure we can still shoot them? The answer is simple - <em>we shoot at them in the past</em>! When we shoot, we see the interpolated version of the player. If the server also stores the previous state, it can perform the hit check using interpolated values too! The server thereby does the hit check with the same data as we see. To keep things in order, we still let the hit confirmation come from the server as the interpolation values will very slightly because of the everchanging latency. We shoot, we let the server use the past data to see if we hit something, and then we render a hit confirmation (a sound, some blood, or similar) when the server has told us that our aim was good. Again - authorative server.

This approach works well for most players, exepect the poor fellow who got hit even though he/she just moved behind cover. That's the downside or lag compensation we'll have to live with, and the benefits are much greater. An FPS without sharp aim is not that fun, after all.
<h2> TODO Suggestions</h2>
The code if full of TODOs. Here are some suggestions for improvement.
<ul>
	<li>Implement the server-side validation of move deltas and position when firing.</li>
	<li>Make the client and server share the core code instead of replicating it on the client.</li>
	<li>Profile the client and server and start optimizing performance.</li>
	<li>Add models with animations and more complex hit zones.</li>
	<li>Make the server aware of rotation and render the entities' orientation.</li>
	<li>Implement nice particle effects.</li>
	<li>Add a FPS-style weapon to the client.</li>
	<li>Implement power-ups (new weapons, health packs, super powers).</li>
	<li>Add jumping.</li>
	<li>Implement better (any) physics.</li>
	<li>... plus lots more!</li>
</ul>
<h2>Wrap-Up</h2>
The article is not very exhaustive, but should have briefed you about the most imporant techniques. The code is fairly well-commented, and the sources mentioned above should bring give you deeper knowledge about the networking tricks. We'ld love to hear your comments and see your improvements!

