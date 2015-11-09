---
layout: tutorial
title: Particles in Goo Engine
weight: 2010
indent: 1
---
<p style="color: #363b40">In this tutorial we will learn how to put particles on the screen.</p>

<h2 id="setup" style="font-weight: 300;color: #363b40">Setup</h2>
<p style="color: #363b40">In order for us to see any particles whatsoever, we first need to do a little bit of setup. First off, we have the standard goo world creation recipe:</p>


{% highlight js %}
var goo = new GooRunner();
goo.renderer.domElement.id = 'goo';
document.body.appendChild(goo.renderer.domElement);
{% endhighlight %}

<p style="color: #363b40">Next, we will need some particle material. There are 2 essential components to bear in mind here: the<code style="color: #c7254e">particles</code> shader and the texture.</p>


{% highlight js %}
// Particle material
material = Material.createMaterial(ShaderLib.particles);
var texture = new TextureCreator().loadTexture2D(resourcePath + '/flare.png');
texture.wrapS = 'EdgeClamp';
texture.wrapT = 'EdgeClamp';
texture.generateMipmaps = true;
material.textures.push(texture);
material.blendState.blending = 'AlphaBlending';
material.cullState.enabled = false;
material.depthState.write = false;
{% endhighlight %}

<p style="color: #363b40">Ultimately you can skip the texture - in case you want your particles to have a blocky feel - but for the purpose of this tutorial we'll consider a nice flare-y texture because we'll want to light a fire after all. Another two factors that you want to keep in mind are that you usually want some form of blending (and textures with an alpha channel) and to have mipmaps generated beforehand to speed up the rendering process.</p>
<p style="color: #363b40">The last step in the setup phase is telling the Goo World how to handle particles. This is where the particle system fits in:</p>


{% highlight js %}
// Add a particles system to world.
var particles = new ParticlesSystem();
goo.world.setSystem(particles);
{% endhighlight %}

<h2 id="let-s-start-a-fire-" style="font-weight: 300;color: #363b40">Let's Start a Fire!</h2>
<p style="color: #363b40">Now that we have all the materials, all we need is to light them up. Don't forget that everything in the Goo Universe is an entity. Even particles need to be represented by an entity.</p>


{% highlight js %}
// Create the particle cloud entity
var entity = goo.world.createEntity();

// Create particle component of the particle cloud entity
var particleComponent = new ParticleComponent({
    timeline : [{
        timeOffset : 0.0,
        spin : 0,
        mass : 1,
        size : 2.0,
        color : [1, 1, 0, 0.5]
    }, {
        timeOffset : 0.25,
        color : [1, 0, 0, 1]
    }, {
        timeOffset : 0.25,
        color : [0, 0, 0, 0.7]
    }, {
        timeOffset : 0.5,
        size : 3.0,
        color : [0, 0, 0, 0]
    }],
    emitters : [{
        totalParticlesToSpawn : -1,
        releaseRatePerSecond : 5,
        minLifetime : 1.0,
        maxLifetime : 2.5,
        getEmissionPoint : function (particle, particleEntity) {
            var vec3 = particle.position;
            return ParticleUtils.applyEntityTransformPoint(vec3.set(0, 0, 0), particleEntity);
        },
        getEmissionVelocity : function (particle, particleEntity) {
            var vec3 = particle.velocity;
            return ParticleUtils.getRandomVelocityOffY(vec3, 0, Math.PI * 15 / 180, 5);
        }
    }],
});
entity.setComponent(particleComponent);

// Create meshData component using particle data
var meshDataComponent = new MeshDataComponent(particleComponent.meshData);
entity.setComponent(meshDataComponent);

// Create meshRenderer component with material and shader
var meshRendererComponent = new MeshRendererComponent();
meshRendererComponent.materials.push(material);
entity.setComponent(meshRendererComponent);

entity.addToWorld();
{% endhighlight %}

<p style="color: #363b40">The most interesting parameters to feast you eyes on are the ones you feed the particle component with. Here is where you define the behaviour of the particles.</p>
<p style="color: #363b40">First, there's the <code style="color: #c7254e">timeline</code> array which defines how a particle should evolve as it gets older. You can see that at the moment a particle is born (the first entry has <code style="color: #c7254e">timeOffset</code> equal to 0.0), it is given its spin (whether it spins or not), its mass, size and color. After exactly 0.25 seconds (notice the second entry's <code style="color: #c7254e">timeOffset</code>) the particle needs to transition to a different size and color and so on until it dies.</p>
<p style="color: #363b40">Second, there's the emitter array. A particle component may have more than one emitter, but our little camp fire has only one single fire source.</p>
<p style="color: #363b40">The first parameter we've used (<code style="color: #c7254e">totalParticlesToSpawn</code>) sets exactly how many particles we want this emitter to spawn. If it's -1 then it's going to keep spawning particles forever.</p>
<p style="color: #363b40">The second parameter (<code style="color: #c7254e">releaseRatePerSecond</code>) tells the particle emitter how many particles it should spawn every second. 5 is a good value for our fireplace (we're not burning rocket fuel). If you're dealing with situations like exploding fireworks then you'll probably want to crank this number up to 100 and have the <code style="color: #c7254e">totalParticlesToSpawn</code> also set to 100 as you'll want a single big release of magical glittery particles.</p>
<p style="color: #363b40">The next two parameters (<code style="color: #c7254e">minLifetime</code> and <code style="color: #c7254e">maxLifetime</code>) give the expected age range of the particles this emitter is going to spawn.</p>
<p style="color: #363b40">The second-to-last parameter we're using for our fire place is <code style="color: #c7254e">getEmissionPoint</code> which is a function and not a value. As it is in the code it does absolutely nothing, but I've left it there so that you can get a feel of how configurable an emitter is. Replace the last statement of that function with</p>

{% highlight js %}
var randomAngle = Math.random() * Math.PI * 2;
return ParticleUtils.applyEntityTransformPoint(
    vec3.set(Math.cos(randomAngle) * 5, 0, Math.sin(randomAngle) * 5), particleEntity);
{% endhighlight %}

<p style="color: #363b40">and increase the <code style="color: #c7254e">releaseRatePerSecond</code> to about 50. Voilà, you now have yourself a fire-circle!</p>
<p style="color: #363b40">And finally, the last parameter and the one that gives a more lively feel is <code style="color: #c7254e">getEmissionVelocity</code> which is also a function and is responsible for assigning newly born particles a speed.</p>
<p style="color: #363b40">There, the fire is up and running (burning).</p>

<h2 id="don-t-forget-the-camera" style="font-weight: 300;color: #363b40">Don't Forget the Camera</h2>
<p style="color: #363b40">Of course, we still have the camera to add and, as a little extra, I've set up a camera control script. Now you'll be able to control the view by dragging the mouse or hitting the WASD to walk round the campfire.</p>


{% highlight js %}
// Add camera
var camera = new Camera(45, 1, 1, 1000);
var cameraEntity = goo.world.createEntity("CameraEntity");
cameraEntity.transformComponent.transform.translation.set(0, 0, 20);
cameraEntity.transformComponent.transform.lookAt(new Vector3(0, 0, 0), Vector3.UNIT_Y);
cameraEntity.setComponent(new CameraComponent(camera));
cameraEntity.addToWorld();

// Camera control set up
var scripts = new ScriptComponent();
scripts.scripts.push(new WASDControlScript({
    domElement : goo.renderer.domElement,
    walkSpeed : 25.0,
    crawlSpeed : 10.0
}));
scripts.scripts.push(new MouseLookControlScript({
    domElement : goo.renderer.domElement
}));
cameraEntity.setComponent(scripts);
{% endhighlight %}

<h2 id="orientation-orientation-orientation" style="font-weight: 300;color: #363b40">Orientation, Orientation, Orientation</h2>
<p style="color: #363b40">Particles need not always look the same from every angle. Take for example the tiny water ripples that form in pools when it rains - they are aligned to the surface of the water and not always facing the camera. The way to change the default always-face-the-camera orientation is to add the <code style="color: #c7254e">getParticleBillboardVectors</code> property to the emitter. Here's an example:</p>

{% highlight js %}
getParticleBillboardVectors : function (particle, particleEntity) {
    particle.bbX.set(-1, 0, 0);
    particle.bbY.set(0, 0, -1);
}
{% endhighlight %}

<p style="color: #363b40">To get nice watter ripples you'll also need to have a water ripple texture (concentric circles), the particles staying still, growing in size while they fade and using <code style="color: #c7254e">AlphaBlending</code> instead of <code style="color: #c7254e">AdditiveBlending</code>. This is left as an exercise to the reader.</p>