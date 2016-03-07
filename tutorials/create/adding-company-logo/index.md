---
layout: tutorial
title: Adding Company Logo
weight: 2000
indent: 1
difficulty_overall: 1
contains_scripts: true
---

Sometimes you may want to display your own company's logotype in a published scene instead of Goo's logotype.
There are two options to do this.

## Option 1

Add the following CSS to the Custom CSS area in the Publish Dialog:

{% highlight css %}#canvas-outer::after {
    content: '';
    width: 50px;
    height: 50px;
    /* So that the logo can be placed anyhere with top, left, right, bottom.*/
    position: absolute;
    /* Place the logo 20 pixels from the top of the canvas.*/
    top: 20px;
    /* Place the logo 20 pixels from the left of the canvas. */
    left: 20px;
    /* Replace <logo url> with the URL of the logo you want to display. */
    background-image: url('<logo url>');
    /* Make sure the logo is stretched or shrinked to fit the element. */
    background-size: contain;
    /* Align the logo so that it is placed in the middle of the element. */
    background-position: 50%;
    /* Make sure the logo is not repeated. */
    background-repeat: no-repeat;
}{% endhighlight %}

Unfortunately, the logo has to be stored in some other server and available publicly.
You also need to have a subscription that gives you access to the Custom CSS and
JS options of the Publish Dialog. If this option does not work for you, you can
try the next, more advanced option below.

## Option 2

The second option consists in adding an HTML component to an entity and placing the logo there.
This solution does not require the logo to be hosted in another service but is a bit more involved.

1. Create an HTML entity by clicking ```Create Entity``` in the top bar and then ```</>``` in the Create Entity dialog.
2. Open the HTML in the text editor by clicking "Open in Editor" in the inspector panel for the HTML component.
3. On the left side of the text editor there is a section called "Images". There you can browse for the logo you want to add to the scene and add it.
4. Goo Create will automatically add an image tag to the end of the HTML code.
5. Edit the code so that it looks something like the following (naturally, the data-id of the image should be the one of the image you just uploaded):

{% highlight html %}<style>
    .custom-logo {
        position: absolute;
        display: block;
        width: 80px;
        top: 20px;
        left: 20px;
    }
</style>

<img class="custom-logo" data-id="dd6e72ac902e3ea325d1ca3cc61edbb01653bb00.png" />{% endhighlight %}