---
layout: tutorial
title: Helicopter Goon
lastupdated: 2016-03-30
weight: 150
indent: 1
difficulty_overall: 0
contains_scripts: false
tags: physics, state machine, mini game, hierarchy panel, inspector panel, rigid body, collider
achievements: Creating entities, Importing assets, Physics, State Machine
duration: 10 minutes
short_description: Welcome to Goo Create! In this first tutorial you will make a mini game in which you can fly with the Goon, our beloved mascot.<br><img src="preview.gif">
thumbnail: tutorials/create/introduction-tutorial/thumbnail.jpg
scene: 64f9a993b79c4a2e81dca58025348f12.scene
startscene: 74814fdb81274f03bdd01d24854108bf.scene
---

## Step 1: Add a box to the scene

**1.** Click *+ CREATE ENTITY* at the top center

![](11.jpg)

**2.** Click on the box in the popup menu

![](12.jpg)

You've now added a box to your scene.

**HINT:** Change your point of view by holding the right mouse button + moving the mouse. Scroll to zoom in/out.

## Step 2: Change the dimension of the box

**1.** Select the box you've just added in the hierarchy panel on the right

![](21.gif)

**2.** Unfold *Transform* in the inspector panel on the left

![](22.gif)

**3.** Add the following values to the *Transform* settings

![](23.jpg)

The box should now look like this

![](24.jpg)

## Step 3: Import the Goon with the helicopter backpack

**1.** Click *IMPORT ASSETS* at the top center of the screen

![](31.jpg)

**2.** Type *Helicopter goon* in the search box

![](32.jpg)

**3.** Add the Helicopter Goon by double-clicking it

![](33.jpg)

It's correct that the Helicopter Goon isn't visible in your scene yet. We will do that in the next step!

## Step 4: Add the Helicopter Goon to the scene

**1.** Drag the Helicopter Goon from the *bin* to the scene. The *bin* is located at the bottom right of the screen.

![](41.gif)

The Helicopter Goon should now be added to the scene

![](42.jpg)


## Step 5: Drag the Goon on top of the box

**1.** Make sure the Helicopter Goon is still selected. If not, select it in the Hierarchy panel on the right

**2.** Click the arrow pointing upwards and hold your mousebutton down.

![](52.jpg)

**3.** Move your mouse up until the Goon floats above the box

![](53.gif)

Click the *Play button* at the bottom center to see the Helicopter Goon in action!

![](54.jpg)

**HINT:** If you want to continue editing, press the *Stop button* next to the *Play button*

![](55.jpg)

## Step 6:  Add a *rigid body* to the Goon

To expose the Helicopter Goon to gravity, we're going to add a rigid body to the Goon

**1.** Make sure the Goon is still selected, and click *Add component* in the inspector panel on the left

![](61.gif)

**2.** Click *Rigid body*

![](62.jpg)

**3.** Check *Freeze Rotation X*, *Freeze Rotation Y*, and *Freeze Rotation Z* to prevent the Goon for rotating in the air

![](63.jpg)

Press the *play button* and see what happens!

As you can see, the Goon falls and moves through the box. In the next step we're going to do something about this!

## Step 7:  Add a *collider* to the box

To prevent that the Goon moves through the box, we're going to add a collider

**1.** Select the box in the *Hierarchy panel* on the right

![](71.gif)

**2.** Click *Add component* in the Inspector panel on the left

**3.** Click *Collider*

![](73.jpg)

**4.** Select the Goon in the Hierarchy panel

**5.** Repeat **2.** and **3.**

You've now added a collider to the box and the Goon! Press the *play button* to see the result

## Step 8:  Adding a state machine

To 'program' the movement of the Goon and connecting it to the W, A and D buttons on the keyboard, we're going to use the State machine component, which enables you to program things in a visual way

**1.** Select the Helicopter Goon in the *Hierarchy panel* on the right

**2.** Click *Add component* in the Inspector panel on the left

**3.** Click *State machine*

![](83.jpg)

**4.** Click the **+** next to *Drop behavior*

![](84.jpg)

You've now entered the state machine editor

## Step 9:  Creating the the vertical movement p1

**1.** On the left side of the screen, unfold *Details*

**2.** Change the name from 'Behavior' to 'Vertical movement'

![](92.jpg)

**3.** Unfold *Selected state*

**4.** Rename the state to *No movement*

![](94.jpg)

## Step 10:  Creating the the vertical movement p2

**1.** Click *Add action*

![](101.jpg)

**2.** Type *Key down* in the search box

**3.** Add the *Key down* action by double-clicking it

![](103.jpg)

**4.** Change the Key from 'A' to 'W', since we want the Goon to move up when the 'W' button is pressed

![](104.gif)

**HINT:** The *Key down* action enables to make a transition to another state when a button is pressed

## Step 11:  Creating the the vertical movement p3

**1.** Click 'Add state'

![](111.jpg)

**2.** Rename the state to 'Move up'

![](112.gif)

**3.** Click *Add action*

![](113.jpg)

**4.** Type *Key up* in the search box

**5.** Add the *Key up* action by double-clicking it

**6.** Change the key to 'W'

![](116.gif)

**7.** Connect the states with arrows, like this:

![](117.gif)

Press the *Play button* and see the transition between the states when you press 'W' on your keyboard

## Step 12:  Creating the the vertical movement p4

We're now going to add a *force* to the 'Move up' state to let the Goon move up when the state is active.

**1.** Select the 'Move up' state by clicking on it

![](121.gif)

**2.** Click *Add action*

![](122.jpg)

**3.** Type 'Apply force' in the search box

![](123.jpg)

**4.** Double click the *Apply force on rigid body* action

![](124.jpg)

**5.** Change the second *Force* value to '20'

![](125.jpg)

Press the play button and press 'W' to fly with the Goon!

## Step 13:  Creating the horizontal movement p1

The Horizontal movement state machine is going to be very similar to the Vertical movement state machine. That's why we're going to copy the Vertical movement state machine and then edit the copied version.

**1.** Press the state machine logo in the Bin at the bottom right of the screen

![](131.gif)

**2.** Hover with your mouse over the *Vertical movement* state machine and click the copy icon

![](132.gif)

**3.** There should appear a *Vertical movement 2* in the Bin. Hover over it and click on the pencil icon.

![](133.gif)

## Step 14:  Creating the horizontal movement p2

**1.** Change the name of the state machine from 'Vertical movement 2' to 'Horizontal movement'

**2.** Select the *Move up* state

![](141.gif)

**3.** Change the name to 'move left'

![](142.gif)

**4.** Set the second force value to '0' and the first to '-8'

![](143.jpg)

**5.** Change the *Key up* key to 'A'

![](144.gif)

## Step 15:  Creating the horizontal movement p3

**1.** Copy the 'move left' state by clicking *DUPLICATE STATE*, which is located next to the *+ ADD STATE* button

![](151.jpg)

**2.** Change the name of the copied state to 'move right'

![](152.gif)

**3.** Set the first *Force* value from '-8' to '8'

![](153.jpg)

**4.** Change the *Key up* key to 'D'

![](154.gif)

**5.** Drag the 'move right' state down

![](155.gif)

## Step 16:  Creating the horizontal movement p4

**1.** Select the 'No movement' state

![](161.gif)

**2.** Click *Add action*

**3.** Type 'Key down' in the search box and add the action

You should now have two *Key down* actions in the 'No movement' state

## Step 17:  Creating the horizontal movement p5

**1.** Change one *Key down* key to 'A', and one to 'D'

![](171.jpg)

**2.** Connect *On key D down* to the *move right* state

**3.** Connect *On key A down* to the *move left* state

**4.** Connect the *move left* and *move right* states to the *No movement* state

![](174.jpg)

**Congratulations!! You've just made your first (mini)game in Goo Create!**
