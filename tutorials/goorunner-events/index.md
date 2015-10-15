---
layout: page
title: GooRunner events
weight: 5500
indent: 1
---
Hello! We recommend that you are somewhat familiar with the basics of the DOM Event Listeners first, so please check out the tutorial <a title="DOM Event Listeners" href="http://goolabs.wpengine.com/learn/dom-event-listeners/">DOM Event Listeners</a> if you haven't already. Now, assuming that's done, let's learn how to use event listeners to do some more advanced interaction with Goo scenes.
<p style="text-align: center;">[advanced_iframe securitykey="iframe" style="width:640px;" src="//goote.ch/3140d3c9a48ea9bc3b8897827f690e9243aa9b74/" width="640" height="480"]
Click around!</p>
The GooRunner event listeners work like regular DOM event listeners (and even contains the standard events), but also add some very useful stuff:
<ul>
	<li>The picked entity.</li>
	<li>The point of intersection in the 3D scene.</li>
	<li>The depth of the intersection.</li>
</ul>
[alert type="success, info, warning, danger, muted" close="true"]<a href="http://code.gooengine.com/latest/docs/GooRunner.html#addEventListener" target="_blank">Read about the details and available event types here!</a>[/alert]
<h2>Performance Warning</h2>
A very important point - <strong>using GooRunner event listeners is considerably slower than using regular DOM event listeners!</strong> Always use the regular events if you can. For example, it's probably not a good idea to attach a GooRunner <em>mousemove </em>event unless you really have to, since that will fire all the picking and intersection logic as soon as the cursor is moved! again, remember that the GooRunner events do everything that regular events do, plus a lot more.
<h2>A Simple Example</h2>
The functionality is obvisously best illustrated with an example.
<h3>Scene Setup</h3>
The scene does not really matter. Create any scene with a few entities or use an existing one!
<h3>Adding Listeners to GooRunner</h3>
Add an empty entity, attach a script component, and add an empty script. We'll start by adding a simple event listener in the setup function, in the same manner as in the DOM Event Listener tutorial:

<pre><code>
var setup = function(args, ctx, goo) {
    console.clear();
    ctx.runnerListeners = {
        click: function(evt) {
        console.log('Click event', evt);
    }
};

for (var l in ctx.runnerListeners) {
    ctx.world.gooRunner.addEventListener(l, ctx.runnerListeners[l]);
}
</code></pre>

Also, let's remember to clean up after ourselves:

<pre><code>
var cleanup = function(args, ctx, goo) {
	for (var l in ctx.runnerListeners) {
		ctx.world.gooRunner.removeEventListener(l, ctx.runnerListeners[l]);
	}
};
</code></pre>

You can pause here, click around in your scene and explore the printed event details using the developer console in your browser. We have all the info we need, but we'll do something a little more visual with it in a minute.

<img class="wp-image-193 size-full" src="picking-console1.jpg" alt="picking-console" /> Console printed picking event information
<h3>A Small GUI</h3>
We'll create an HTML entity to display the intersection information. Create an HTML entity and uncheck the box <em>Move with Transform</em>. Open the editor and enter this simple HTML (we are not breaking exciting web design ground right now):

<pre><code>
<style>
	#intersection-info {
		font-family: Verdana;
		font-size: 16px;
	}
</style>

<div id="intersection-info">
	Screen coords: <span id="intersection-screen">(?, ?)</span><br />
	Entity: <span id="intersection-entity">?</span><br />
	Point: <span id="intersection-point">?</span><br />
	Depth: <span id="intersection-depth">?</span><br />
</div>
</code></pre>

This should give you this little information area in the top left corner:

<a href="html-info.jpg"><img class="size-full wp-image-191 aligncenter" src="html-info.jpg" alt="html-info" /></a>
Now we need to add a simple function to our script in order to display the info we got from the event object.

<pre><code>
var displayIntersectionInfo = function(screenCoords, entity, point, depth) {
	var coordsDiv = document.getElementById('intersection-screen');
	var entityDiv = document.getElementById('intersection-entity');
	var pointDiv = document.getElementById('intersection-point');
	var depthDiv = document.getElementById('intersection-depth');
	coordsDiv.innerHTML = '(' + screenCoords[0] + ', ' + screenCoords[1] + ')';
	entityDiv.innerHTML = entity;
	pointDiv.innerHTML = '(' + point[0].toFixed(2) + ', ' +
            point[1].toFixed(2) + ', ' + point[2].toFixed(2) + ')';
	depthDiv.innerHTML = depth.toFixed(2);
};
</code></pre>

And then, of course, we add some code to the event listener callback to pass the variables. We also do some checking to handle the case where a pick ray misses all entities, or picks an HTML entity which has no 3D point.

<pre><code>
ctx.runnerListeners = {
	click: function(evt) {
		console.log('Click event', evt);
		var name, point, depth;
		if (evt.entity) {
			name = evt.entity.name;
			point = evt.intersection ? evt.intersection : [0, 0, 0];
			depth = evt.depth;
		} else {
			name = 'None';
			depth = 0;
			point = [0, 0, 0];
		}
		displayIntersectionInfo([evt.x, evt.y], name, point, depth);
	}
};
</code></pre>

Firing this script up and clicking any entity in the scene, we should now have the HTML entity populated:

<a href="html-populated.jpg"><img class="size-full wp-image-194 aligncenter" src="html-populated.jpg" alt="html-populated" /></a>
<h3>An Intersection Marker</h3>
Something you might want to do is to manipulate your 3D scene depending on a picking result. For example, you could move the camera to a point of interest, make a game character move or fire a weapon, or maybe setting the point of gravity! One simple thing we can do to visualize the point is to add a simple intersection marker. We'll use a sphere for this.

Start by creating some mesh data and a simple material for the sphere in the setup function:

<pre><code>
var setup = function(args, ctx, goo) {
	console.clear();

	ctx.markerMeshData = new goo.Sphere(16, 16, 0.14);
	ctx.markerMaterial = new goo.Material(goo.ShaderLib.uber);
	ctx.markerMaterial.uniforms.materialDiffuse = [1, 0, 0, 1];
	ctx.markerMaterial.uniforms.materialEmissive = [0.7, 0, 0, 1];
	ctx.markerMaterial.uniforms.materialSpecular = [0, 0, 0, 1];

    // ...
</code></pre>

Then, write functions to create and/or show the sphere at a certain point, or remove it.

<pre><code>
var showMarker = function(ctx, pos) {
	if (!ctx.markerEntity) {
		ctx.markerEntity = ctx.world.createEntity(
			ctx.markerMeshData,
			ctx.markerMaterial,
			'Intersection Marker');
	}
	ctx.markerEntity.addToWorld();
	ctx.markerEntity.setTranslation(pos);
};

var hideMarker = function(ctx) {
	if (ctx.markerEntity) ctx.markerEntity.removeFromWorld();
};
</code></pre>

Finally, hook these funcions up in the event callback:

<pre><code>
ctx.runnerListeners = {
		click: function(evt) {
			console.log('Click event', evt);
			var name, point, depth;
			if (evt.entity) {
				showMarker(ctx, evt.intersection);   // <----- here
				name = evt.entity.name;
				point = evt.intersection ? evt.intersection : [0, 0, 0];
				depth = evt.depth;
			} else {
				hideMarker(ctx);                     // <----- and here
				name = 'None';
				depth = 0;
				point = [0, 0, 0];
			}
			displayIntersectionInfo([evt.x, evt.y], name, point, depth);
		}
	};
</code></pre>

When picking entities now, the small red sphere should show up at the picked point, just like in the example project at the top of this page.
<h2>Done!</h2>
Sometimes it's useful to see the complete script. Check it out! And as always, <a href="https://app.goocreate.com/4768/236807da94f14e82b50867556e32289f.scene" target="_blank">here's a complete scene</a> in case you want to duplicate it.

<pre><code>
var setup = function(args, ctx, goo) {
	console.clear();

	ctx.markerMeshData = new goo.Sphere(16, 16, 0.14);
	ctx.markerMaterial = new goo.Material(goo.ShaderLib.uber);
	ctx.markerMaterial.uniforms.materialDiffuse = [1, 0, 0, 1];
	ctx.markerMaterial.uniforms.materialEmissive = [0.7, 0, 0, 1];
	ctx.markerMaterial.uniforms.materialSpecular = [0, 0, 0, 1];

	ctx.runnerListeners = {
		click: function(evt) {
			console.log('Click event', evt);
			var name, point, depth;
			if (evt.entity) {
				console.log(evt);
				showMarker(ctx, evt.intersection);
				name = evt.entity.name;
				point = evt.intersection ? evt.intersection : [0, 0, 0];
				depth = evt.depth;
			} else {
				hideMarker(ctx);
				name = 'None';
				depth = 0;
				point = [0, 0, 0];
			}
			displayIntersectionInfo(
				[evt.x, evt.y], name, point, depth);
		}
	};

	for (var l in ctx.runnerListeners) {
		ctx.world.gooRunner.addEventListener(l, ctx.runnerListeners[l]);
	}
};

var cleanup = function(args, ctx, goo) {
	for (var l in ctx.runnerListeners) {
		ctx.world.gooRunner.removeEventListener(l, ctx.runnerListeners[l]);
	}
	if (ctx.markerEntity) ctx.markerEntity.removeFromWorld();
};

var showMarker = function(ctx, pos) {
	if (!ctx.markerEntity) {
		ctx.markerEntity = ctx.world.createEntity(
			ctx.markerMeshData,
			ctx.markerMaterial,
			'Intersection Marker');
	}
	ctx.markerEntity.addToWorld();
	ctx.markerEntity.setTranslation(pos);
};

var hideMarker = function(ctx) {
	if (ctx.markerEntity) ctx.markerEntity.removeFromWorld();
};

var displayIntersectionInfo = function(screenCoords, entity, point, depth) {
	var coordsDiv = document.getElementById('intersection-screen');
	var entityDiv = document.getElementById('intersection-entity');
	var pointDiv = document.getElementById('intersection-point');
	var depthDiv = document.getElementById('intersection-depth');
	coordsDiv.innerHTML = '(' + screenCoords[0] + ', ' + screenCoords[1] + ')';
	entityDiv.innerHTML = entity;
	pointDiv.innerHTML = '(' + point[0].toFixed(2) + ', ' +
		point[1].toFixed(2) + ', ' + point[2].toFixed(2) + ')';
	depthDiv.innerHTML = depth.toFixed(2);
};
</code></pre>
