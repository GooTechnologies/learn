---
layout: tutorial
title: Custom Components
weight: 2003
indent: 1
contains_scripts: true
---
At its core, Goo Engine implements an Entity-Component-System architecture. In this tutorial, we'll learn what an ECS is, and how it relates to Goo. We'll also cover the abstract functions available to these Objects, and explain their order of execution. Finally, we'll create our own Components and System.

## Object oriented programming vs Entity-Component

The main difference between an ECS and typical Inheritance programming, is that an Object is quite literally, the sum of its parts. Try thinking in the terms of 'has a' instead of 'is a'. In inheritance programming, an Entity could be an Object. Sub-classA would inherit from Object, adding its own layer of properties and functions. Yet another Sub-ClassB could inherit from Sub-ClassA, again adding its own layer of properties and functions. If you were to talk about the final Entity, you could say the Entity 'is a' Sub-ClassB. The Entity 'is a' Sub-ClassA. The Entity 'is a' Object.

![](oinheritance.jpg)

In the ECS approach, there is no inheritance. An entity is given various Components of data, based on what it is needed to do. Sometimes these Components will contain utility functions, to manipulate the data to make life easier. Finally, Systems process this data, adding functionality to the Entity. If we were to talk about the final Entity, we could say the Entity 'has a' MeshDataComponent. The Entity 'has a' TransformComponent'. The Entity 'has a' MeshRendererComponent.

![](ecs.jpg)

Through the ECS approach, Entities are no longer confined by rigid inheritance chains, and are more dynamic in nature. Systems can run more efficiently and independently from on another,  because they only interact with the Components they have an interest in.  Also, memory allocation and access is better, because Components are stored in an Array, instead of spread all over the place.

## Entity

The Entity is a container which stores the various Components. When you create a new Entity through 'ctx.world.createEntity()', a new Entity is created, and it is given a 'TransformComponent'. By using setComponent() and clearComponent(), you can add and remove various Components, altering the functionality of the Entity.

## Component

The Component is an Object which holds data, and could contain utility functions to help with manipulating that data. For example, theTransformComponent stores an Entities Transform, and WorldTransform. It also comes with lots of utility functions to manipulate these two objects, such as 'setRotation', 'attachChild', 'lookAt', etc. In order for an Entity to have an orientation in the world, it needs a TransformComponent.

## System

A System has a list of 'interested' Components, and once all of those Components exist on an Entity, the System kicks in and does something with the data provided on the Component. For example, if an Entity TransformComponent has been flagged as 'dirty', the TransformSystem will go through and update all the Transforms and WorldTransforms for the entity, moving it to the new position, rotation, or scale. **A closer look at the goo.Component:** There are two optional Abstract functions for the goo.Component: attached(entity), and detached(entity). attached(entity) is called right after entity.setComponent(new ComponentType()) is called, and is called BEFORE any System callbacks occur.

The Entity the Component was attached to is passed into the function, so it is a good place to handle Entity specific setup for the Component.

This is also a good place to assign the Entity to a variable on the Component, for example: this.entity = entity; detached(entity) is called right after entity.clearCompoennt('ComponentType') is called, and is called BEFORE any System callbacks occur.

The Entity the Component was remove from is passed into the function, so it is a good place to handle tearing down anything Entity specific for the Component. **A closer look at the goo.System:** There are three optional Abstract functions for the goo.System: inserted(entity), process(entityArray, tpf), and deleted(entity). inserted(entity) is called after EVERY interested Component is added to the Entity.

For example, if a system is interested in both 'TransformComponent' and 'MeshRendererComponent', the inserted function is called after BOTH components have been added.

The Entity these components were attached to is passed into the function, making this a great place to handle Entity specific setup for the System, or setup involving the various components as a whole. process(entityArray, tpf) is called every update cycle, and can have an explicit order, by setting the 'priority' of the system.

This will be covered more below.

An array of all of the Entities with the Systems interested Components is passed in as the first parameter.

For example, if the System is interested in Entities with both 'TransformComponent' and 'MeshRendererComnponent', the array will contain all of the entities in the world which have already had both Components added, and both of the Components .attached(), and the System .inserted() functions have been called on the Entities.

The second parameter passed in is the ctx.world.tpf(time per frame). deleted(entity) is called when an Entity no longer meets the list of interested Components required.

For example, if an Entity has both a 'TransformComponent' and a 'MeshRendererComponent', and then I remove the MeshRendererComponent from the Entity, now the Entity no longer meets the requirements for the System, so the .deleted function is called, and the Entity is no longer part of the entityArray in the process loop.

## Making our own Component and System

To help demonstrate how the ECS works as a whole, we'll be creating our own HealthComponent, RegenerationComponent, and HealthSystem.

The HealthComponent will store the currentHealth and maxHealth, as well as some utility functions to remove from or add to the currentHealth. The RegenerationComponent will store the amount of health to regenerate per 'tick'.

If the currentHealth is under maxHealth, the HealthSystem will increment the currentHealth back up to maxHealth by a set amount per 'tick'. **The first thing we will create is the HealthComponent:**

{% highlight js %}var HealthComponent = function(maxHealth){
    goo.Component.apply(this, arguments);
    this.maxHealth = this.currentHealth = maxHealth;
    this.dead = false;
}

HealthComponent.prototype = Object.create(goo.Component.prototype);
HealthComponent.prototype.constructor = HealthComponent;
HealthComponent.prototype.type = 'HealthComponent';
{% endhighlight %}

The first thing to notice here, is that we are inheriting from the goo.Component.prototype, and our constructor is the HealthComponent.

To make the inheritance work, we need to apply 'this' to the goo.Component, and pass in the arguments Object.

This basically takes care of some internal engine code for the Component.

Next we set the current and max health to the maxHealth passed in.

Notice how we set the type of the component.prototype to 'HealthComponent'.

This is needed for Goo Engine to alert Systems when this Component has been attached to Entities.

{% highlight js %}HealthComponent.prototype.attached = function(entity){
    this.entity = entity;
};{% endhighlight %}

We're taking advantage of the Abstract 'attached' function here, by grabbing a reference to the entity this HealthComponent is attached to. We'll use this later.

{% highlight js %}HealthComponent.prototype.addHealth = function(amt){
    if(amt < 0){return;}
    console.log(this.entity.name+" Refilling "+amt+" hitpoints.");
    this.currentHealth = Math.min(this.currentHealth + amt, this.maxHealth);
};

HealthComponent.prototype.removeHealth = function(amt){
    if(amt < 0){return;}
    console.log(this.entity.name+" has taken "+amt+" damage!");
    this.currentHealth = Math.max(0, this.currentHealth - amt);
    if(this.currentHealth === 0){
        this.dead = true;
        console.log(this.entity.name+" has died :(");
    }
};{% endhighlight %}

These are utility functions to add and remove health. We make sure the user isn't passing in a negative value, then make sure the currentHealth is between 0 or maxHealth. If the currentHealth falls to 0, we set the 'dead' flag to true. We're also using the entity name to console log some feedback, to help us see what is happening.

*Next we'll create the RegenerationComponent:*

{% highlight js %}var RegenerationComponent = function(amount, tick){
    goo.Component.apply(this, arguments);
    this.amount = amount;
    this.tick = tick;
    this.nextTick = 0.0;
    this.hc = null;
    this.world = null;
}

RegenerationComponent.prototype = Object.create(goo.Component.prototype);
RegenerationComponent.prototype.constructor = RegenerationComponent;
RegenerationComponent.prototype.type = "RegenerationComponent";{% endhighlight %}

Most of this is identical to the HealthComponent, and will be identical to every single Component you make: Inherit from goo.Component, set the constructor to the RegenerationComponent, set the RegenerationComponent.prototype.type to the name of the RegenerationComponent, and call goo.Component.apply(this, arguments). For the RegenerationComponent, we also included to parameters: amount and tick. Amount is the amount of health to add every tick, and tick is the time between each application of health. 'this.hc' is a variable to store a reference to the 'HealthComponent'. We're not sure if the HealthComponent has been added or not yet, so we set this to null for now. 'this.world' is a variable to store a reference to the world the entity is attached to. We don't have access to this information yet, so we also set this variable to null.

{% highlight js %}RegenerationComponent.prototype.attached = function(entity){
    this.world = entity._world;
};{% endhighlight %}

In the attached() function, we now have access to the world the entity belongs to, because it is a variable on the entity passed in. We assign it to this.world and that's all for the RegenerationComponent!

*Next, we'll create the System:*

{% highlight js %}var HealthSystem = function(){
    goo.System.call(this, 'HealthSystem', ['HealthComponent', 'RegenerationComponent']);
}
HealthSystem.prototype = Object.create(goo.System.prototype);
HealthSystem.prototype.constructor = HealthSystem;
HealthSystem.prototype.priority = 1000;{% endhighlight %}

At first glance, this looks similar to the Component creation process, and it is, but there are a couple differences. The first is that we inherit from goo.System instead of goo.Component. The System has several built in functions the engine needs to operate, so we need those for sure. Instead of using 'apply' we use 'call'. This is because we are passing in a list of arguments, instead of the arguments Object. The first argument is the name used to represent the system to Goo. In this case, its 'HealthSystem'. The second argument is an array of the 'interested' Components. So the HealthSystem is interested in all Entities in the world with a HealthComponent and a RegenerationComponent. Notice we don't need to set the HealthSystem.prototype.type.

Every goo.System has a priority. The HealthSystem.prototype.priority is set to 1000. By default the goo.System.prototype sets the priority to 0. By setting the priority of our HealthSystem to 1000, we can be sure it is called after most other Systems which may influence the Entity. This priority value may become important if you have many Systems working together. For example, if we wanted add a 'CombatSystem', we would probably want that to have the CombatSystem process AFTER the HealthSystem. This way we could remove any Entities with 0 health.

{% highlight js %}HealthSystem.prototype.inserted = function(entity){
    entity.regenerationComponent.hc = entity.healthComponent;
};{% endhighlight %}

Here we can safely reference the HealthComponent from within the RegenerationComponent, because if they both didn't exist, this function wouldn't have been called yet. So we apply the hc variable on the RegenerationComponent to the HealthComponent.

{% highlight js %}HealthSystem.prototype.process = function(entityList, tpf){
    for(var i = entityList.length; i--;){
        var entity = entityList[i];
        var regen = entity.regenerationComponent;
        if(regen.hc.currentHealth < regen.hc.maxHealth){
            if(regen.world.time > regen.nextTick){
                regen.nextTick = regen.world.time + regen.tick;
                regen.hc.addHealth(regen.amount);
            }
        }
    }
};{% endhighlight %}

We first iterate through the entityList. I chose to do it backwards, in case we decide to remove an entity while the list is iterating, we don't need to worry about 'index out of range' or other array related issues. Next, we check if the time in the world is greater than the time of the nextTic on the RegenerationComponent. If the time has expired, we add some health to the HealthComponent, and set the nextTic time.

Now all that is left is to test it out!

To package all of these scripts up into an easy to use 'drag and drop' asset, lets go ahead and combine them into a single self invoking function, and give them a namespace. I chose 'HealthPack'.

Here is the final code to copy and paste into an external script, or else right inside a Custom Script(outside of any functions):


{% highlight js %}(function(window, undefined){
    var HealthComponent = function(maxHealth){
        goo.Component.apply(this, arguments);
        this.maxHealth = this.currentHealth = maxHealth;
        this.dead = false;
    }

    HealthComponent.prototype = Object.create(goo.Component.prototype);
    HealthComponent.prototype.constructor = HealthComponent;
    HealthComponent.prototype.type = 'HealthComponent';

    HealthComponent.prototype.attached = function(entity){
        this.entity = entity;
    };

    HealthComponent.prototype.addHealth = function(amt){
        if(amt < 0){return;}
        console.log(this.entity.name+" Refilling "+amt+" hitpoints.");
        this.currentHealth = Math.min(this.currentHealth + amt, this.maxHealth);
    };

    HealthComponent.prototype.removeHealth = function(amt){
        if(amt < 0){return;}
        console.log(this.entity.name+" has taken "+amt+" damage!");
        this.currentHealth = Math.max(0, this.currentHealth - amt);
        if(this.currentHealth === 0){
            this.dead = true;
            console.log(this.entity.name+" has died :(");
        }
    };

    var RegenerationComponent = function(amount, tick){
        goo.Component.apply(this, arguments);
        this.amount = amount;
        this.tick = tick;
        this.nextTick = 0.0;
        this.hc = null;
        this.world = null;
    }

    RegenerationComponent.prototype = Object.create(goo.Component.prototype);
    RegenerationComponent.prototype.constructor = RegenerationComponent;
    RegenerationComponent.prototype.type = "RegenerationComponent";

    RegenerationComponent.prototype.attached = function(entity){
        this.world = entity._world;
    };

    var HealthSystem = function(){
        goo.System.call(this, 'HealthSystem', ['HealthComponent', 'RegenerationComponent']);
    }

    HealthSystem.prototype = Object.create(goo.System.prototype);
    HealthSystem.prototype.constructor = HealthSystem;

    HealthSystem.prototype.inserted = function(entity){
        entity.regenerationComponent.hc = entity.healthComponent;
    };

    HealthSystem.prototype.process = function(entityList, tpf){
        for(var i = entityList.length; i--;){
            var entity = entityList[i];
            var regen = entity.regenerationComponent;
            if(regen.hc.currentHealth < regen.hc.maxHealth){
                if(regen.world.time > regen.nextTick){
                    regen.nextTick = regen.world.time + regen.tick;
                    regen.hc.addHealth(regen.amount);
                }
            }
        }
    };
    window.HealthPack = {
        HealthComponent:HealthComponent,
        RegenerationComponent:RegenerationComponent,
        HealthSystem:HealthSystem
    };
}(window));{% endhighlight %}

Here is a demo of just this code, I've removed 70 health at the start of the document, so in the console, you will first see that the cube has taken 70 damage, then you will see the HealthSystem tick off 7 times as it refills the health.

**Demo:** [https://goote.ch/f7fd0ce269e448138f35121f0cf841ed.scene](https://goote.ch/f7fd0ce269e448138f35121f0cf841ed.scene)

**Project:** [https://create.goocreate.com/edit/f7fd0ce269e448138f35121f0cf841ed.scene](https://create.goocreate.com/edit/f7fd0ce269e448138f35121f0cf841ed.scene)

Here is a demo where I've taken these Components and System, and added a new Component: HealthBarComponent. Click around on the different cubes, to see their health go down, and the HealthSystem will regenerate it back up over time. If you get down to 0 health, the Entity will be hidden.

**Demo:** [https://goote.ch/137636966eb04006a8930d53d963376d.scene](https://goote.ch/137636966eb04006a8930d53d963376d.scene)

**Project:**[https://create.goocreate.com/edit/137636966eb04006a8930d53d963376d.scene](https://create.goocreate.com/edit/137636966eb04006a8930d53d963376d.scene)