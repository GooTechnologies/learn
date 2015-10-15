---
layout: page
title: Engine Intro
weight: 5500
indent: 1
---
Hello and welcome, this tutorial will show you how to create a simple solar system using Goo Engine. Please note that it much easier to <a href="http://create.goocreate.com">create this scene in Goo Create</a> and that it is recommended to use Goo Create for most use cases anyways. But if you really want to or must use the Goo Engine directly this tutorial will get you started.
<h2>Introduction</h2>
Goo Engine is built using what many consider the holy grail of game engine design: The Entity-Component-System. The <a href="http://en.wikipedia.org/wiki/Entity_component_system">Entity-Component-System</a> is a software design pattern that favors <strong>composition over inheritance</strong>. Users instantiate simple <a href="//code.gooengine.com/latest/docs/Entity.html"><strong>entities</strong></a> and then add powerful but focused <a href="//code.gooengine.com/latest/docs/Component.html"><strong>components</strong></a> to enable specific features. Finally, single purpose <a href="//code.gooengine.com/latest/docs/System.html"><strong>systems</strong></a> update all entities which have a matching <strong>component</strong>.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/ECS.png"><img class="size-medium wp-image-397 aligncenter" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/ECS-300x231.png" alt="ECS" /></a>
<h2>Now contrast this with the traditional way of thinking:</h2>
<em>"The traditional way of thinking about games is fairly intuitive. You represent objects in the game as objects in code. If you have a player, you'll create a player class that contains all the player's attributes; things like position, health, ammo, etc. Then you create an update() method that calls other methods like shoot() or jump() that read and change those attributes. To avoid repeating yourself, you'll probably end up creating some base classes because entities in a game often have many different variations with small differences."</em>
<h2>The problem</h2>
<em>"The problem with this, however, is that in order to actually reuse code as much as possible, you end up being forced into deep unnatural object hierarchies with lots of overridden methods. With thousands of entities in a game, you lose all sense of where things are defined, how they're changed deeper in the hierarchy, and where the best place to add something really is. This approach also means new combinations of functionality have to be written by programmers, forcing game designers to ask for different variations."</em> (Quoted from the excellent article <a href="http://www.chris-granger.com/2012/12/11/anatomy-of-a-knockout/">anatomy-of-a-knockout</a> by Chris Granger)
<h2>The solution</h2>
An Entity-Component-System provides the ultimate flexibility in game design: Mix and match the pre-built functionality (components) to suit your needs. Want an object that emits sound? Add a SoundComponent. Want the same object to be acting as a light source? Simply add a LightComponent. Use one of the pre-packaged components or simply <a href="http://labs.gooengine.com/examples/ECSDemo.zip">write your own</a>.
<h2>Let's get started</h2>
In this tutorial we will create a little solar system with a sun, a world and a moon. Here is a preview: [advanced_iframe securitykey="iframe" src="//labs.gooengine.com/learn/GooFiddle/" width="600" height="300"] [alert type="danger"]You should see a yellow sun orbited by a world looking like earth which in turn is orbited by a little moon. If you don't see this, check if you have a WebGL compatible browser: <a href="http://get.webgl.org">get.webgl.org</a>[/alert] To the left you should see the code for the demo in an online code editor. [alert type="info" heading="Please Notice"]If you change something in the code, the demo above should update after half a second. If you break something and can't fix it, don't worry, just reload this tutorial to reset the code. Feel free to experiment![/alert]

If you want the editor to be bigger, open up this link in a new tab: <a href="http://labs.gooengine.com/learn/GooFiddle/">GooFiddle</a>.
<h4>Code explanation</h4>
<pre><code>"use strict";</code></pre>
This line tells the JavaScript parser in the browser to be less forgiving of programming mistakes. This helps us to avoid hard-to-find bugs and is recommended for any JavaScript program. You can read more about it <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode">here</a>.
<pre><code>var gooRunner = new goo.GooRunner(), world = gooRunner.world;
</code></pre>
This line instantiates <a href="http://code.gooengine.com/latest/docs/GooRunner.html">GooRunner</a> - a class that holds the main game loop. This loop will try to render our 3D scene at a silky smooth 60 frames per second. It also creates a reference to the <a href="http://code.gooengine.com/latest/docs/World.html">world</a> instance which contains the list of all entities in a scene.
<pre><code>document.body.appendChild(gooRunner.renderer.domElement);
</code></pre>
The GooRunner internally creates a new <a href="http://code.gooengine.com/latest/docs/Renderer.html">Renderer</a> instance, the renderer in turn creates a new <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement">HTMLCanvasElement</a> and creates the <a href="http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14">WebGLRenderingContext</a> for us. In our case we just append it to the body element of our document, but if you want to use CSS to style it, it is better to give it an ID and then append it:
<pre><code>goo.renderer.domElement.id = 'goo';
</code></pre>
Alternatively you can also pass in a canvas you created like this:
<pre><code>var gooRunner = new GooRunner({canvas: myCanvas});
</code></pre>
Also, if you want the scene background to be a different color, you can call setClearColor on the renderer like this:
<pre><code>gooRunner.renderer.setClearColor(0, 0, 0, 1); // parameters are RGBA, this would be black.
</code></pre>
<h2>Textures part 1</h2>
Next we load 3 textures:
<pre><code>var tc = new TextureCreator()
var sunTex = tc.loadTexture2D('sun.png');
var earthTex = tc.loadTexture2D('earth.jpg');
var moonTex = tc.loadTexture2D('moon.jpg');
</code></pre>
<strong>Textures</strong> are usually images that will be wrapped around our 3D models and usually define the color. Technically, textures used for colors are called <a href="http://en.wikipedia.org/wiki/Diffuse_reflection">diffuse maps</a>.
<pre><code>function createAstronomicalEntity(radius, texture, color) {
    var meshData = new goo.Sphere(24, 24, radius);
    var material = new goo.Material(goo.ShaderLib.uber);
    material.uniforms.materialAmbient = color;
    material.setTexture('DIFFUSE_MAP', texture);
    return world.createEntity(meshData, material, function (entity, tpf) {
       entity.addRotation(0, 0.5*tpf, 0);
    }).addToWorld();
}
</code></pre>
We want to create three spheres for our scene. So in order to not repeat code we collect the code that can be shared for all three spheres in a utility function called <strong>createAstronomicalEntity</strong>. It takes three parameters: the sphere radius, the texture that shall be used for the sphere and the ambient color. Let's go over it line by line:
<pre><code>var meshData = new goo.Sphere(24, 24, radius);
</code></pre>
This line creates new <a href="http://code.gooengine.com/latest/docs/MeshData.html">MeshData</a> in the form of a <a href="http://code.gooengine.com/latest/docs/Sphere.html">sphere</a>. You can also create <a href="http://code.gooengine.com/latest/docs/Box.html">boxes</a>, <a href="http://code.gooengine.com/latest/docs/Torus.html">tori</a>, <a href="http://code.gooengine.com/latest/docs/Cylinder.html">cylinders</a> and <a href="http://code.gooengine.com/latest/docs/Quad.html">quads</a> among others. <strong>Sphere</strong> takes four parameters: zSamples, radialSamples, radius and texture mode. The first two parameters basically tell how many triangles the sphere should be created from. High values look better but cost a bit more performance. Try setting the values to 4 or 3 and see what happens.
<h2>MeshData</h2>
<strong>new goo.Sphere</strong> returns an object of type <a href="http://code.gooengine.com/latest/docs/MeshData.html"><strong>MeshData</strong></a> which contains an <strong>attributeMap</strong> and the actual <strong>vertexData.</strong> MeshData is a real powerhouse and contains some cool code to make rendering complex 3D objects fast by interleaving all vertex data. But what is <strong>vertex data</strong>? Vertex data is at the <strong>heart</strong> of rendering objects, it is the reason why Mozilla invented the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Float32Array">Float32Array</a> and all the other <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays">typed arrays</a>. The <strong>most important</strong> things vertex data contain are the <strong>x, y and z</strong> <strong>coordinates of the vertex.</strong> Three vertex positions form a <strong>triangle</strong> and triangles are what all models are made of in WebGL. But there is more, next to the position of the vertex you can define the <strong>color</strong> and multiple <a href="http://en.wikipedia.org/wiki/UV_Mapping">texture coordinates</a> and the <a href="http://en.wikipedia.org/wiki/Normal_(geometry)">normal vector</a> (which is really useful for lighting models realistically). What is the <strong>attributeMap?</strong> The attributeMap contains name mappings from the names for the different vertex data types in the shader code  to the JavaScript names for them in MeshData. If you use shaders from the Goo <a href="http://code.gooengine.com/latest/docs/ShaderLib.html">ShaderLibrary</a> <strong>you don't need to worry about this,</strong> but sometimes you want to use a shader you found online or wrote in the past and with setting the attributeMap you can use them with the Goo Engine. Just map the names that are used in the shader to the fields in MeshData. (<a href="http://jsfiddle.net/WL8rH/6/">Example</a>)
<h2>Material</h2>
<pre><code>var material = new goo.Material(goo.ShaderLib.uber);
</code></pre>
This line creates a new <a href="http://code.gooengine.com/latest/docs/Material.html"><strong>Material</strong></a> instance using the awesome <strong>uber shader</strong> provided by the Goo shader library. A <strong>Material</strong> instance primarily contains the used <a href="http://en.wikipedia.org/wiki/OpenGL_Shading_Language">WebGL Shader</a> code, <strong>uniforms</strong> and a <strong>map of textures</strong>.
<h2>Shader</h2>
<em>Uber</em> is a reference to the German word <a href="http://en.wikipedia.org/wiki/%C3%9Cber">über</a> which means above and is a <a href="https://www.google.de/search?q=ubershader">common name</a> for shaders that supports many features. You can also think of it as a super shader :-) Our <strong>uber</strong> shader contains beautiful light and shadow calculations recognizing different light types (point, directional or spot), material features like ambient colors, specular colors or shininess, powerful texture maps for <strong>diffuse</strong>, <strong>normal</strong>, <strong>specular</strong> and <strong>depth</strong> calculations and many more features.
<h2>Uniforms</h2>
<strong>Uniforms</strong> are variables that are used in the shader that can be set from JavaScript. Some uniform variables we use are <strong>viewMatrix, projectionMatrix, worldMatrix, cameraPosition, lightPosition, materialAmbient, materialDiffuse and materialSpecular</strong>.
<h2>Textures part 2</h2>
Next you can see how you can set an ambient color and add a texture to the <strong>map of textures</strong> in the Material.
<pre><code>material.uniforms.materialAmbient = color;
material.setTexture('DIFFUSE_MAP', texture);
</code></pre>
The second line tells the material instance to use the provided <strong>texture</strong> as it's diffuse map. Remember that diffuse simply stands for the <strong>basic colors</strong> an object has for each surface pixel. If we wanted some cool bump mapping effects we could similarly set a different texture as a depth or normal map. Other texture map names in uberShader are: NORMAL_MAP, SPECULAR_MAP, LIGHT_MAP, EMISSIVE_MAP, DEPTH_MAP
<h2>Entities</h2>
<pre><code>return world.createEntity(meshData, material, function (entity) {
    entity.addRotation(0, 0.5*tpf, 0);
}).addToWorld();
</code></pre>
This piece of code creates our first <strong><a href="http://code.gooengine.com/latest/docs/Entity.html">Entity</a> </strong>by calling <strong>createEntity</strong> on the <a href="http://code.gooengine.com/latest/docs/World.html"><strong>world</strong></a> object. As we read above in an <strong>ECS</strong> an entity is very <strong>simple</strong>. In Goo it only contains an <strong>ID</strong>, a <strong>name</strong> and a <strong>collection</strong> of assigned <strong>components.</strong> <strong>createEntity</strong> hides all of the boilerplate code that is needed to be able to render an entity. The minimum components needed to render an entity are: <a href="http://code.gooengine.com/latest/docs/TransformComponent.html"><strong>TransformComponent</strong></a>, <a href="http://code.gooengine.com/latest/docs/MeshDataComponent.html"><strong>MeshDataComponent</strong></a> and <a href="http://code.gooengine.com/latest/docs/MeshRendererComponent.html"><strong>MeshRendererComponent</strong></a>. So the way we call it world.createEntity basically does this for us:
<pre><code>var entity = new goo.Entity(world);
entity.setComponent(new goo.TransformComponent());
entity.setComponent(new goo.MeshDataComponent(meshData));
entity.setComponent(new goo.MeshRendererComponent(material));
entity.setComponent(new goo.ScriptComponent(script));
</code></pre>
So you can see using createEntity saves us from typing a lot of lines, <strong>but what are all these components? </strong>Let's take a look!
<h2>TransformComponent</h2>
The <a href="http://code.gooengine.com/latest/docs/TransformComponent.html"><strong>TransformComponent</strong></a> contains the information where an entity is located (<strong>translation</strong>), if and how it is re-sized (<strong>scale</strong>) and where it is looking at (<strong>rotation</strong>). Together these three properties form what is called a <strong>transform</strong> in the math world. You can access these properties like this:
<pre><code>entity.transformComponent.transform.translation.set(x, y, z);
entity.transformComponent.transform.scale.set(xs, ys, zs);
entity.transformComponent.transform.rotation.fromAngles(yaw, roll, pitch)
</code></pre>
after changing these properties you will need to inform the engine about changes by calling
<pre><code>entity.transformComponent.setUpdated();
</code></pre>
And last but not least <strong>TransformComponent</strong> is the component you will use to <strong>link entities together</strong> to form a <strong>scene graph:</strong>
<pre><code>entity.transformComponent.attachChild(entity2.transformComponent);
</code></pre>
When you do this, every change to the entity1 transform will be applied to the entity2 transform <strong>before</strong> applying it's own transformation. This is incredibly useful for our example, because now we can simply attach the <strong>earth</strong> entity to the <strong>sun</strong> entity and if we now rotate the sun around it's center the earth will appear to fly around the sun. Of course we use the same trick with the <strong>moon</strong>. All these functions can look a bit scary but <strong>fear not</strong>, the TransformComponent injects many <strong>helper functions</strong> into the entity it is assigned to for the most common use cases, so you don't have to type so much:
<pre><code>entity.setTranslation(x, y, z);
entity.addTranslation(x, y, z);
entity.getTranslation();
entity.setScale(xs, ys, zs);
entity.getScale();
entity.setRotation(yaw, roll, pitch);
entity.addRotation(yaw, roll, pitch);
entity.getRotation();
entity.lookAt(position, up);
entity.attachChild(entity2);
</code></pre>
These helper functions also call <strong>setUpdated</strong> for you when needed and best of all <strong>you can chain them</strong>:
<pre><code>entity.setTranslation(0, 0, -10).setScale(2,2,2).setRotation(Math.PI, 0,0);
</code></pre>
<h2>MeshDataComponent</h2>
Next a <a href="http://code.gooengine.com/latest/docs/MeshDataComponent.html"><strong>MeshDataComponent</strong></a> is added. This component simply contains the <strong>MeshData</strong> instance we created above using the <strong>Sphere</strong> class.
<h2>MeshRendererComponent</h2>
Now a <a href="http://code.gooengine.com/latest/docs/MeshRendererComponent.html"><strong>MeshRendererComponent</strong></a> is added. This component is a bit more interesting - not only does it contain the <strong>Material</strong> instance we created above using the <strong>Material</strong> class but also a couple of very useful settings. They are <strong>cullMode</strong> ('Dynamic' or 'Never') and the boolean settings <strong>castShadows</strong>, <strong>receiveShadows</strong>, <strong>isPickable</strong>, <strong>isReflectable</strong> and <strong>hidden</strong>. (boolean settings can only take the value <strong>true</strong> or <strong>false</strong>). Also keep in mind that a MeshRendererComponent can contain more than one material. That is why <strong>entity.meshRendererComponent.materials</strong> is an array. Finally, the MeshRendererComponent contains the field <strong>worldBound</strong> which is an instance of the class <strong>BoundingVolume</strong> that can be used for <a href="http://en.wikipedia.org/wiki/Collision_detection">collision detection</a>.
<h2>ScriptComponent</h2>
<pre><code>function (entity, tpf) {
    entity.addRotation(0, 0.5*tpf, 0);
}
</code></pre>
The last component that is added to our astronomical entity is a <a href="http://code.gooengine.com/latest/docs/ScriptComponent.html"><strong>ScriptComponent</strong></a>. These components can store one or more objects which contain a <strong>run</strong> method that take two parameters: The entity to which the script is connected to and the time it took to render the last frame (<strong>tpf</strong> for short). The script is called every frame and can be used for an infinite amount of things. In our case we use it to rotate the entity around it's local <strong>Y</strong> axis. Incorporating the <strong>tpf</strong> value in movement and rotation calculations is a good idea for all things <strong>animation</strong> because then you are frame rate independent, i.e. it doesn't matter how long it took to render the last frame because the <strong>tpf</strong> will reflect it and your animation moves at the same speed even on lower performing computers. (At 60 FPS the value for <strong>tpf</strong> will be around 0.016 in seconds) Finally, we add the entity to the world with the call: <strong>addToWorld().</strong>

<em>It might be interesting to know, that this line does <strong>not</strong> add the entity right away but rather it <strong>schedules</strong> it for addition on the next render call. You can force this by calling:</em>
<pre><code>world.process(); // don't call this in Goo Create scripts however or you get an endless loop.
</code></pre>
You can get all entities by calling
<pre><code>world.getEntities();
</code></pre>
<h4>Checkpoint, great job!!</h4>
We covered a lot of ground but we are not done yet, luckily with all that you learned the rest of this tutorial is a piece of cake!
<h2>Sun</h2>
<pre><code>var sun = createAstronomicalEntity(1, sunTex, [1,1,0.3,1]);
</code></pre>
So with our awesome helper function <strong>createAstronomicalEntity</strong>, it's easy to create our sun entity. We pass in 1 as the radius and sunTex as the texture. The texture is a bit too white for my taste so I adjusted the final appearance using the <strong>materialAmbient</strong> uniform. It expects an array with 4 values in RGBA (red, green, blue, alpha) order and I set it to a bright yellow. Keep in mind that in WebGL colors range from 0.0 to 1.0 and not from 0 to 255!
<h2>Earth</h2>
<pre><code>var earth = createAstronomicalEntity(0.5, earthTex, [1,1,1,1]);
earth.setTranslation(5, 0, 0);
sun.attachChild(earth);
</code></pre>
Here we create earth, at half the size of the sun. Yes, I know this is slightly inaccurate :-). We also pass in the earth texture we loaded before. Then we translate the entity 5 units to the right - along the X axis. Goo by default uses a <em>right hand</em> coordinate system:

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/coords.gif"><img class="alignnone size-medium wp-image-398" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/coords-300x254.gif" alt="coords" /></a>

The earth texture was fine, but because we only have one light in the scene, earth was a bit dark, so I set the ambient color to white. Finally, we attach the earth entity to the sun. So if we rotate or move the sun, earth will be rotated and moved as well. In our case it will be rotated.
<h2>Moon</h2>
<pre><code>var moon = createAstronomicalEntity(0.15, moonTex, [1,1,1,1]);
moon.setTranslation(1.4, 0, 0);
earth.attachChild(moon);
</code></pre>
For the moon we do almost the same steps as with the earth. We just make it smaller yet again and give it the moon texture. And of course we attach it to the earth.
<h2>Let's get some sunlight!</h2>
<pre><code>var light = new goo.PointLight();
light.color.set(1,1,0);
world.createEntity(light).addToWorld();
</code></pre>
Here you see how light is added to the world. There are 3 different types of light built into Goo: <a href="http://code.gooengine.com/latest/docs/PointLight.html"><strong>PointLight</strong></a>, <a href="http://code.gooengine.com/latest/docs/DirectionalLight.html"><strong>DirectionalLight</strong></a> and <a href="http://code.gooengine.com/latest/docs/SpotLight.html"><strong>SpotLight</strong></a>. The light position together with the normal vectors of a model's surface are used in the uber shader to calculate the brightness of the surface. Roughly speaking, the more a surface is turned towards the light, the brighter it will be. A <strong>SpotLight</strong> is a cone of light, where the apex is the light's position. You can think of it like a flashlight. Some of it's properties are <strong>range</strong>, <strong>angle</strong> and <strong>exponent</strong>. The angle sets the angle of the cone's apex. Exponent sets the angle of an inner cone called the <strong>hotspot</strong>. Entities in the hotspot get the full light, the light then falls off linearly to the outer angle. PointLight and SpotLight both have a <strong>range</strong> field that is used to limit the area of effect, both defaulting to 1000 units. A <strong>PointLight</strong> acts like a light bulb. It shines light in all directions starting from the light position. A <strong>DirectionalLight</strong> acts like the sun. It is meant to imitate parallel light rays. It only has one property: <strong>direction</strong>. Example:
<pre><code>var light = new goo.DirectionalLight();
light.direction.set(-1,-1,-1); // shines a bit down, to the left and to the front.
world.createEntity( light).addToWorld();
</code></pre>
All lights share a couple of properties: <strong>color (r,g,b), intensity</strong> (0..1), <strong>specularIntensity</strong> (0..1), <strong>shadowCaster</strong> (true or false), <strong>shadowSettings</strong> and <strong>lightCookie</strong>. Because we simulate a solar system, at this scale, our sun acts like a light bulb, shining lights in all directions. For that, we use a <strong>PointLight</strong>. We should set the <strong>color</strong> to white to be more realistic, but it looks more interesting to set it to yellow. Also the default is white, so this gives me a chance to show you how the color is set. Try setting it to red like this:
<pre><code>light.color.set(1,0,0);
</code></pre>
Then we use our friendly little helper <strong>createEntity</strong> again. In this case, this happens under the hood:
<pre><code>var entity = new goo.Entity(world);
entity.setComponent(new goo.TransformComponent());
entity.setComponent(new goo.LightComponent(light));
</code></pre>
A <a href="http://code.gooengine.com/latest/docs/LightComponent.html"><strong>LightComponent</strong></a> is very simple and only contains a reference to the used light.
<h2>And finally we add the camera</h2>
<pre><code>var camera = new goo.Camera(45, 1, 0.1, 1000);
var orbitScript = goo.Scripts.create(goo.OrbitCamControlScript, {lookAtDistance:15});
world.createEntity(camera, orbitScript, [0,0,15]).addToWorld();
</code></pre>
The <a href="http://code.gooengine.com/latest/docs/Camera.html">camera</a> is arguably the most important part of a scene. Without it you can't see anything. The scene will be rendered from the perspective of the camera. The parameters for the Camera constructor are <strong>fov, aspect, near </strong>and<strong> far</strong>. <strong>Fov</strong> stands for <a href="http://en.wikipedia.org/wiki/Field_of_view">field-of-view</a> and is the extent of the observable world that is seen at any given moment. Here it is set in degrees. Try setting it to 90! <strong>Aspect</strong> stands for <a href="http://en.wikipedia.org/wiki/Aspect_ratio">Aspect-Ratio</a> and this parameter reflects the ratio of the width of the WebGL canvas to its height. It used to be an important parameter, but now the system automatically checks and sets it, so we and you can just pass 1. <strong>near</strong> and <strong>far</strong> determine the distances at which entities will still be rendered. Usually 0.1 and 1000 are good values. After we have our <strong>camera</strong> instance we pass it over to our trusty helper <strong>createEntity</strong> of course. But we also give it two more parameters, namely an<strong> OrbitCamControlScript</strong> and the array <strong>[0, 0, 15]</strong>. This is what happens under the covers:
<pre><code>var entity = new goo.Entity(world);
entity.setComponent(new TransformComponent());
entity.setComponent(new CameraComponent(camera));
entity.setComponent(new ScriptComponent(orbitScript));
entity.setTranslation([0,0,15]);
</code></pre>
The <strong>TransformComponent</strong> is useful, of course, to position the camera in and make it look at our scene. The <a href="http://code.gooengine.com/latest/docs/CameraComponent.html"><strong>CameraComponent</strong></a> is very simple again and (almost) only contains the reference to our camera. Next, we set a <strong>ScriptComponent</strong> with an instance of an <strong>OrbitCamControlScript </strong>created by the Goo Scripts class. The <strong>OrbitCamControlScript</strong> allows you to <strong>orbit</strong> the camera <strong>around a point</strong> in space if you drag the mouse or to <strong>zoom</strong> in and out using the mouse wheel. Try removing the script, like this and see what happens:
<pre><code>world.createEntity( camera, [0,0,15]).addToWorld();
</code></pre>
The last line shows you what happens when you pass an array with 3 elements to <strong>createEntity</strong>: It will be used to call <strong>setTranslation</strong>. It is a nice little trick to set the initial position of an entity.

Finally we <strong>add</strong> the cameraEntity to the <strong>world</strong> and we are...
<h4>Done!</h4>
That's it, you've done it! Please take a moment to pat yourself on the back.
If you have any questions about this or your own project please send it to us on our <a href="https://answers.goocreate.com/">QA section</a>.

[vc_row][vc_column width="1/1"][/vc_column][/vc_row]