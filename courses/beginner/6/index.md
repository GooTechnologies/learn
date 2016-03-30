---
layout: coursepart
title: Hoist the flag
part: 6
thumbnail: /courses/beginner/6/thumbnail.jpg
scene_partfinished: f15efa108fec429aabc56a8a7bbb9ff0.scene
tags: assets, hierarchy, transform, rotate, translate, scale
achievements: State machine
description: In this part you will be introduced the State Machine component, a very important tool within Goo Create. The State Machine component enables you to visually program things without a single line of code
---

# What is a State Machine?

An example of a state machine is the flag in the scene above. It has two states: *up* and *down*. A *state* is simply a behavior of an object at a certain point in time. Click the flag a couple of times to see the transition between the two states.

Between the states, the flag has two *events* that make the *transition* from one state to another: *hoisting* and *lowering*. When the flag is in the *up* state, it is possible to use the *lowering* event, and when in the *down* state, it is possible to use the *hoisting* event.

A state machine is a collection of *States*, connected by *Transitions*. In Goo Create, a state machine is called a *Behavior*, and the entity needs a *State Machine Component* to add Behaviors to it.

# Creating a State Machine for the flag

## Add a State Machine Component and behavior to the flag

1. Select the 'Flag' entity in the hierarchy and click on the Frame Selection button in the top left corner to center the flag.
   ![](frameselection.jpg)
2. Unfold the 'Flag entity' and select 'Flag'
   ![](selectChild.gif)
3. In the panel on the left, click on *Add component* > *State machine*. When the State machine component is added, click on the **+** icon to create a new behavior.
   ![](createstatemachinebehavior.gif)

Now we're ready to add the different states to the flag

## Add States

In this part, we are going to add the states.

1. Rename the current state to 'Down'.
  ![](renamestate.gif)

2. To create the 'Up' state, click on *+ Add state* and change the name of the state to 'Up'.
  ![](addstate.jpg)

In the state graph (the window with the grid below the canvas) should now look like this:
  ![](stategraph.jpg)
The 'Down' state is blue because it is set as the initial state.

*__Hint:__ You can align the states by dragging and dropping them*

## Add click actions

The transition from 'up' to 'down' or 'down' to 'up' will be triggered by clicking the flag. To add this, we need to add an action to the state. The action we need is the *Pick* action. The pick action is a transition action that can trigger a transition when an entity is clicked. In this case, we add it to the state machine of the flag, so it will be triggered when you click the flag.

1. Select the 'Down' state in the state graph and click on *Add action* in the panel on the left.
  ![](addaction.jpg)
2. Type *Pick* in the search bar and double-click the *Pick* action or press *Add*.
  ![](addpick.gif)
3. Repeat step 1 and 2 for the 'Up' state.

## Add the transitions between the states

To create the transition from the 'down' to 'up' state, and the 'up' to 'down' state when clicking on the flag, we have to add transitions between the states. you can simply click on *On pick entity* in the state graph, hold down your mouse button , and let it go on the state where you want to make the transition to when the entity (in this case the flag) is clicked.
  ![](connectstates.gif)

Now when you click the *play* button and click on the flag, you can see the transition between the states with each click.
  ![](visualtransition.gif)

Of course the flag doesn't go up or down, because we didn't add an action that makes that possible yet.

## Hoist and lower the flag when it's clicked

Right now we have two states: 'Up' and 'Down'. On the moment we hoist or lower the flag, in which state will the flag be? In between those states, right?
To solve this problem, we are going to add two more states, namely 'Hoist' and 'Lower'.

1. To delete the current transitions (the arrows), click on them in the graph state
  ![](deletetransitions.gif)
2. Create two new states and call them 'Hoist' and 'Lower'
  ![](fourstates.jpg)

To make the transition from 'Down' to 'Up' and 'Up' to 'Down' look smooth, we are going to use the *Tween move* action in the 'Hoist' and 'Lower' states.

3. Select the 'Hoist' state in the state graph
4. Click on *Add action*
5. Type in *Tween move* and press Enter or click the *Add button*
6. Change the values of the tween move action to the following:
  ![](hoisttweenvalues.jpg)
  * The __translation__ values are for moving the entity
  * The __time__ is how long the animation is going to take
  * The __Easing type__ and __Direction__ defines *how* the entity moves. For instance, Quadratic InOut will make sure that the flag first moves slow, then fast and then slow again. This makes the transition very smooth.
7. Repeat step 3, 4, 5 and 6 for the 'Lower' state, but set the Y translation of the *Tween move* action to -2 instead of 2, otherwise it doesn't lower but hoist the flag.
8. In the state graph, create the transitions between the states. At the end, it should look like this:
![](finalstategraph.jpg)

Try it out by clicking the *play button* at the bottom center of the canvas!

# Creating a State Machine for the Satellite

In the finished scene you could see that the satellite rotates and moves up and down:
![](satellitemovement.gif)

We're going to make these movements with the *State Machine component* as well. Before we do this, we have to set the *X Rotation* of the satellite to '40'. Why we do this will become clear when creating the state machine.

1. Select the Satellite dish in the *Hierarchy panel*
![](selectsatellite.gif)
2. Unfold the *Transform component* in the *Inspector panel* and change the *X rotation* to '40'

Now we can add the state machine

1. In the *Inspector panel*, click on *Add component* > *State machine*. When the State machine component is added, click on the **+** icon to create a new behavior.
![](createstatemachinebehavior.gif)
2. Rename the behavior to 'Back and Forth'
![](backandforthrename.gif)
3. Rename the default state to 'Back'
4. Click *Add Action*
![](renamestateaddaction.gif)
5. Search for 'tween rotate' and add the *Tween rotate* Action
6. Set the *X Rotation* To '-80', the *Time (ms)* to '5000', the *Easing type* to 'Quadratic' and the *Direction* to 'InOut'
![](satellitetweenrotate.jpg)
7. Copy the 'Back' state by clicking *Duplicate state(s)* at the top left corner of the *State Graph*
![](duplicatestate.gif)
8. Drag the duplicated state next to the 'Back' state
9. Change the name of the duplicated state to 'Forth'
10. Change the *X Rotation* value of the *Tween move* action from '-80' to '80' so it moves forth instead of back
11. Connect the states
![](connectsatstates.gif)

Press the play button to check out the result! Looks pretty cool, don't you think?

![](result.gif)
