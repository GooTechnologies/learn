---
title: The goo object
indent: 2
weight: 900
---
The <strong>goo </strong>object provides access to most of the <a href="http://code.gooengine.com/latest/docs/" target="_blank">Goo Engine API</a>. For example, one can create entities and access math functions.

<pre><code>
// Creating a disc entity with mesh data and a material
var discMeshData = new goo.Torus(32, 12, ctx.tubeRadius, ctx.centerRadius);
var discMaterial = new goo.Material(goo.ShaderLib.simpleLit);
var discEntity = ctx.world.createEntity(discMeshData, discMaterial, 'Disc ' + number).addToWorld();
</code></pre>


<pre><code>
// Part of an application using Goo math classes
var diff = goo.Vector3.sub(ctx.addedObjects[i].endPos, ctx.addedObjects[i].getTranslation());
if (diff.length() > ctx.threshold) {
	ctx.addedObjects[i].addTranslation(goo.Vector3.mul(diff, ctx.offset));
}
</code></pre>
