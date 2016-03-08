---
title: Script Component
menutitle: Script
layout: manual
weight: 2300
indent: 3
---
The *Script Component* allows you to add [Script Assets]({{ '/manual/assets/scripts' | append: site.baseurl }}) to your entity. The component can hold zero or many Script Assets.

![Script component panel](script-panel.png)

## Script Instance vs Script Asset

A Script Component contains a list of "Script Instances". The instances contains some parameter values and a reference to a Script Asset. This allows you to re-use a Script several times on the same or on different entities, but with different parameters.

## Sorting and execution order

You can sort the scripts in the panel by dragging and dropping the scripts. The execution order will be from top to bottom.

## Enabling or disabling a Script

The checkbox allows you to toggle individual scripts.

## "Instance Of"

Each script instance in the list has a reference to the script it is using. Clicking the script will take you to the scripts' own panel.

## Script parameters

Each script instance will list the available parameters for the script asset. The parameters are unique for each script and are discussed in the Scripting section.