---
title: Inspector
indent: 2
weight: 902
layout: manual
---
The Inspector, or the Entity Inspector, is used to inspect and edit an entity in the scene. The Inspector shows the entity and its components.

![](inspector.jpg)

At the top, the entity name and metadata can be viewed and edited. At the bottom, all the components of the entity are listed. Click a component to expand its panel.

To add a component, click the plus button at the top, or the "Add component" button at the bottom. To remove a component, click the cog wheel button on the component and then *Remove*.

## Tags

The tags are a special kind of meta data that you can use in scripting. A tag is a string of letters, and you can get all entities with this tag by running the following in a script:

{% highlight js %}
var entities = ctx.world.by.tag('myTag');
{% endhighlight %}