---
layout: page
title: HTML Components alongside screen
weight: 6000
indent: 1
---
This tutorial will explain how to place HTML Entities along the border of the screen.
<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/08/side-buttons.png"><img class="size-medium wp-image-1001 aligncenter" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/side-buttons-300x236.png" alt="side buttons" /></a>
This is the first tutorial of a four part tutorial series:
1. Placing HTML Entities Along the Borders of the Screen
2. <a href="http://goolabs.wpengine.com/learn/?p=1025">Using HTML Buttons to Affect the Scene</a>
3. <a href="http://goolabs.wpengine.com/learn/?p=1026">Using Entities to Interact With an HTML Entity</a>
4. <a href="http://goolabs.wpengine.com/learn/?p=1030">Using Images With HTML Entities</a>

<hr />

&nbsp;

In this example, we will be placing four buttons, along the sides of the screen.  First, we will need to create a new HTML Entity.  We do this by clicking '<strong>+ Create</strong>' at the top, center of the screen.  Next, we choose the HTML Entity inside the list.

&nbsp;

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/08/htmlEntity.png"><img class="alignnone size-medium wp-image-999" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/htmlEntity-256x300.png" alt="htmlEntity" /></a>

&nbsp;

This gives us an HTML Entity inside our project.  By default, the HTML Entity will be placed in 3d space.  For our purposes, we will need to set it to 2d space.  We do this by taking the check mark out of the 'Move with Transform' check box.

In order to have our buttons align with the sides of the screen, inside the HTML Entity code, we'll need to set the CSS style and positioning for each button.  We do this by clicking the button 'Open in Editor':

&nbsp;

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/08/openInEditor.png"><img class="alignnone size-medium wp-image-1000" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/openInEditor-300x182.png" alt="openInEditor" /></a>

&nbsp;

Once the editor is open clear out the existing code and replace it with the following:

&nbsp;

<pre><code>
<style type="text/css">
#button1{
	position:absolute;
	top:10px;
	left:50%;
}
#button2{
	position:absolute;
	right:10px;
	top:50%;
}
#button3{
	position:absolute;
	left:50%;
	bottom:10px;
}
#button4{
	position:absolute;
	left:10px;
	top:50%;
}
</style>
<button id='button1'>Test Button 1</button>
<button id='button2'>Test Button 2</button>
<button id='button3'>Test Button 3</button>
<button id='button4'>Test Button 4</button>
</code></pre>

&nbsp;

The explanation for CSS and how it works is outside of the scope of this tutorial.  A summary of what we did: We told the CSS to position one button on each of the sides of the screen.

Due to the current Parent - Child relationship the HTML Entity has with the ctx.domElement, we will need to add a Custom script to handle transferring the buttons to the ctx.domElement.parentNode. First, click the 'Add Component' button:

&nbsp;

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/08/addComponent.png"><img class="alignnone size-medium wp-image-1002" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/addComponent-300x189.png" alt="addComponent" /></a>

&nbsp;

Next choose 'Script' from the drop down list which pops up. When the Script category appears on the left panel, click the 'Add Script' button:

&nbsp;

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/08/addScript.png"><img class="alignnone size-medium wp-image-1003" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/08/addScript-300x82.png" alt="addScript" /></a>

&nbsp;

In the list of scripts which comes up, choose 'Custom' from the choices. This will add a Custom script to the ScriptComponent, which we can edit by clicking the icon which looks like a pencil inside of a square:

&nbsp;

<a href="http://goocreate.com/wp-content/uploads/sites/3/2014/08/edit-script.png"><img class="alignnone size-full wp-image-995" src="http://goocreate.com/wp-content/uploads/sites/3/2014/08/edit-script.png" alt="edit script" /></a>

&nbsp;

Once the code editor opens, clear out what is already there, and paste the following code:

<pre><code>var setup = function(args, ctx, goo){
  ctx.children = [];
  var parent = ctx.entity.htmlComponent.domElement;
  for(var i = parent.children.length; i >= 0; i--){
    var child = parent.children[i];
    if(child !== undefined){
      ctx.children.push(child);
      ctx.domElement.parentNode.appendChild(child);
    }
  }
}

var cleanup = function(args, ctx, goo){
  var parent = ctx.entity.htmlComponent.domElement;
  for(var i = ctx.children.length; i >= 0; i--){
    var child = ctx.children[i];
    if(child !== undefined){
      parent.appendChild(child);
    }
  }
  ctx.children.length = 0;
}</code></pre>

In the setup function, we take all the children elements in the HTML Entity, and transfer them to the ctx.domElement.parentNode.  It also stores references to each element in the array ctx.children.  We put this variable on the 'ctx' scope, so we can reference it later in the cleanup function.

In the cleanup function(when we press 'Stop'), it puts them back onto the HTML Entity.  We can do this because of the ctx.children variable we created in the setup.

Also note, we use the ctx.domElement.parentNode instead of the document.body, in case the project is being published on an iFrame or other situation. That is it!  Now when you run the project, the buttons should appear along the sides of the screen, like they appear in the screen shot.