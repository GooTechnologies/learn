---
layout: page
title: Procedural geometry
weight: 5500
indent: 1
---
A great way to reduce load times is to use procedurally generated geometry. There are many ways to generate geometry. Let’s go over the most important ones:

## Direct

The most basic approach is to generate the vertices directly. Here is a simple example generating the data for a 3D <a href="https://github.com/evanw/csg.js/blob/master/csg.js#L173">cube</a>.

The resulting data includes the vertices, the normals and the texture coordinates.
<pre><code>function pushVertices( obj, v, n) {
  for ( var i = 0; i&lt;v.length; i++) {
    obj.v.push( 2*!(v[i]&amp;1)-1, 2*!(v[i]&amp;2)-1, 2*!(v[i]&amp;4)-1 ); // vertices
    obj.n.push.apply( obj.n, n); // normals
  }
  obj.t.push( 0,0,1,0,1,1,0,1 ); // uv mapping
}

function generateCube() {
  var obj = { v : [], n : [], t : [], i : []};
  var van = [ // vertices and normals
    [[0, 4, 6, 2], [-1, 0, 0]],
    [[1, 3, 7, 5], [+1, 0, 0]],
    [[0, 1, 5, 4], [0, -1, 0]],
    [[2, 6, 7, 3], [0, +1, 0]],
    [[0, 2, 3, 1], [0, 0, -1]],
    [[4, 5, 7, 6], [0, 0, +1]]
  ];
  for ( var i = 0; i&lt;van.length; i++) {
    pushVertices( obj, van[i][0], van[i][1] );
    obj.i.push( 4*i+0, 4*i+1, 4*i+2, 4*i+0, 4*i+2, 4*i+3);
  }
  return obj;
}
</code></pre>
Similar code can be used to generate <a href="https://github.com/evanw/csg.js/blob/master/csg.js#L210">spheres</a> and <a href="https://github.com/evanw/csg.js/blob/master/csg.js#L252">cylinders</a> and many other basic shapes.
<h2>Surface of Revolution (or Lathe)</h2>
The <a href="http://en.wikipedia.org/wiki/Surface_of_revolution">surface of revolution</a> technique uses a line or a spline curve and rotates it around an axis, for example the vertical axis. This technique is also known as lathing.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_0.png"><img class="size-full wp-image-522 aligncenter" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_0.png" alt="proc_geom_0" /></a>

Here is an example using Goo Engine: <a href="http://goote.ch/b3ddad02a95e44eb7d85e6f99540650dc9aa6def/">http://goote.ch/b3ddad02a95e44eb7d85e6f99540650dc9aa6def/</a>

The relevant code is this:
<pre><code>var section = goo.PolyLine.fromCubicSpline([
  3 + 0, -1, 0,
  3 + 1,  0, 0,
  3 + 1,  1, 0,
  3 + 0,  1, 0,
  3 - 1,  1, 0,
  3 - 1,  2, 0,
  3 + 0,  3, 0
  ], 20);
var latheMeshData = section.lathe(20);
var material = new goo.Material(goo.ShaderLib.simpleLit);
material.cullState.enabled = false;
ctx.world.createEntity(latheMeshData, material).addToWorld();
</code></pre>
Note: Because we can see the inside of the geometry the code turns of back face culling.
<h2>Heightmap</h2>
Another great option especially for terrain is to use a heightmap to generate geometry. The basic task of a 3D heightmap function is to convert a map of values to an area of triangles. Here is an <a href="http://code.gooengine.com/latest/visual-test/goo/geometrypack/Surface/HeightMap-vtest.html">example</a> using Goo Engine:

The relevant code for this is:
<pre><code>function getHeightMap(nLin, nCol) {
    var matrix = [];
    for (var i = 0; i &lt; nLin; i++) {
        matrix.push([]);
        for (var j = 0; j &lt; nCol; j++) {
            matrix[i].push(Math.sin(i * 0.3) + Math.cos(j * 0.3)
            + Math.sin(Math.sqrt(i*i + j*j) * 0.7) * 2);
        }
    }
    return matrix;
}
var matrix = getHeightMap(64,64);
var meshData = Surface.createFromHeightMap(matrix);
var material = new Material(ShaderLib.simpleLit);
world.createEntity(meshData, material).addToWorld();
</code></pre>
In this example the heightmap is generated using sine and cosine values. But you can also use gray scale images as input.
<h2>Constructive Solid Geometry (CSG)</h2>
<a href="http://en.wikipedia.org/wiki/Constructive_solid_geometry">CSG</a> is a process where one can use shapes and combine them together or subtract them from one another. The basic operations are <strong>union</strong>, <strong>subtract</strong>, and <strong>intersect</strong>.

A great option for a library that provides CSG is <a href="http://evanw.github.io/csg.js/">CSG.js</a> from Evan Wallace.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_1.png"><img class="size-full wp-image-523 aligncenter" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_1.png" alt="proc_geom_1" /></a>
<h2>Extrusion</h2>
Extrusion is another great technique to generate 3D geometry from basic shapes like splines.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_2.gif"><img class="size-full wp-image-524 aligncenter" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_2.gif" alt="proc_geom_2" /></a>

A great demo of this technique can be found at the great site <a href="http://acko.net">acko.net</a>

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_3.png"><img class="size-full wp-image-525 aligncenter" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/proc_geom_3.png" alt="proc_geom_3" /></a>

Just note how fast the site loads and displays 3D content. This is a perfect example on how to use WebGL efficiently.
<h4>Further Reading</h4>
There are many more ways to procedurally generate 3D content, like fractals and NURBS and <a href="http://www.clicktorelease.com/code/bumpy-metaballs/">meta balls</a> just to name a few. Here are some links to learn more:

<a href="http://en.wikipedia.org/wiki/Polygonal_modeling">Polygonal Modeling</a>

<a href="http://en.wikipedia.org/wiki/Procedural_generation#Video_games">Procedural Generation</a>

<a href="http://http.developer.nvidia.com/GPUGems3/gpugems3_ch01.html">GPU Gems 3 ch01</a>

<a href="http://learningthreejs.com/blog/2013/08/02/how-to-do-a-procedural-city-in-100lines/">How To Do a Procedural City in 100 Lines</a>
<h4>Third Party Libraries That Implement Many Methods to Generate Geometry</h4>
<a href="http://haptic-data.com/toxiclibsjs/">http://haptic-data.com/toxiclibsjs/</a>

<a href="http://verbnurbs.com/">http://verbnurbs.com/</a>

<a href="https://github.com/pboyer/verb">https://github.com/pboyer/verb</a>
