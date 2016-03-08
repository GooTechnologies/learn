---
title: Collider Component
menutitle: Collider
layout: manual
weight: 2500
indent: 3
---
The *Collider Component* adds collision geometry to the entity. If used together with a Rigid Body Component, you can create a dynamic, colliding entity.

![](collider-component-panel.png)

![](box-collider-on-mesh.png)

The collider shapes are rendered with a green wireframe in Create.


## Shape Types

The currently available shapes are:

* Box
* Sphere
* Plane
* Infinite plane


## Static Collider

If the collider doesn't have any Rigid Body Component, it will become a static collision geometry in the physics world. We call this a *Static Collider*.

## Dynamic Rigid Body Collider

If the entity with a Collider Component or any of its parents has a dynamic Rigid Body Component, it will turn into a dynamic collision geometry in the collision world.

## Kinematic Rigid Body Collider

If the entity with a Collider Component or any of its parents has a kinematic Rigid Body Component, we call it a kinematic collider.


## Friction

Friction is a number that can be set on the Collider. Zero means no friction. The final friction (and restitution) value used in a collision is computed using multiplication. For example, a sphere with friction=0.5 that collides with a plane with friction=0.5 will get a friction value of 0.25.

## Restitution (bounciness)

Restitution (a.k.a. bounciness) is a number that can be set on the Collider, and defines how much the collider should bounce. Zero is no bounce and one is maximum bounce. If you set restitution to a number larger than one, it will gain more and more energy for each bounce.

## Collision Events

If the collider is not a Trigger, it will emit these events during collisions:

* goo.physics.beginContact
* goo.physics.duringContact
* goo.physics.endContact

<table class="table table-bordered">
<thead>
<tr>
	<th colspan="7">
		Collision detection occurs and messages are sent upon collision
	</th>
</tr>
</thead>

<tbody>
<tr>
	<td></td>
	<td>Static Collider</td>
	<td>Rigidbody Collider</td>
	<td>Kinematic Rigidbody Collider</td>
	<td>Static Trigger Collider</td>
	<td>Rigidbody Trigger Collider</td>
	<td>Kinematic Rigidbody Trigger Collider</td>
</tr>
<tr>
	<td>Static Collider</td>
	<td></td>
	<td>Y</td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>Rigidbody Collider</td>
	<td>Y</td>
	<td>Y</td>
	<td>Y</td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>Kinematic Rigidbody Collider</td>
	<td></td>
	<td>Y</td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>Static Trigger Collider</td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>Rigidbody Trigger Collider</td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>Kinematic Rigidbody Trigger Collider</td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
</tbody>
</table>


## Triggers

If the collider is a trigger, then it will *not* collide with other physics objects. However, it will emit events when a physics object enters it. Available events are:

### Trigger events

* goo.physics.triggerEnter
* goo.physics.triggerStay
* goo.physics.triggerLeave

<table class="table table-bordered">
<thead>
<tr>
	<th colspan="7">
		Trigger messages are sent upon collision
	</th>
</tr>
</thead>

<tbody>
<tr>
	<td></td>
	<td>Static Collider</td>
	<td>Rigidbody Collider</td>
	<td>Kinematic Rigidbody Collider</td>
	<td>Static Trigger Collider</td>
	<td>Rigidbody Trigger Collider</td>
	<td>Kinematic Rigidbody Trigger Collider</td>
</tr>
<tr>
	<td>Static Collider</td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td>Y</td>
	<td><!-- TODO --></td>
</tr>
<tr>
	<td>Rigidbody Collider</td>
	<td></td>
	<td></td>
	<td></td>
	<td>Y</td>
	<td>Y</td>
	<td>Y</td>
</tr>
<tr>
	<td>Kinematic Rigidbody Collider</td>
	<td></td>
	<td></td>
	<td></td>
	<td><!-- todo --></td>
	<td>Y</td>
	<td><!-- todo --></td>
</tr>
<tr>
	<td>Static Trigger Collider</td>
	<td></td>
	<td>Y</td>
	<td><!-- todo --></td>
	<td></td>
	<td>Y</td>
	<td><!-- todo --></td>
</tr>
<tr>
	<td>Rigidbody Trigger Collider</td>
	<td>Y</td>
	<td>Y</td>
	<td>Y</td>
	<td>Y</td>
	<td>Y</td>
	<td>Y</td>
</tr>
<tr>
	<td>Kinematic Rigidbody Trigger Collider</td>
	<td><!-- todo --></td>
	<td>Y</td>
	<td><!-- todo --></td>
	<td><!-- todo --></td>
	<td>Y</td>
	<td><!-- todo --></td>
</tr>
</tbody>
</table>
