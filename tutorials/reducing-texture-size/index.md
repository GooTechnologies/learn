---
layout: tutorial
title: Reducing Texture Size
weight: 6000
indent: 1
---
One of the easiest things to do, to cut down on load times, is to reduce the file size of your textures.

There are many ways to do so:

<strong>1. Reducing the resolution:</strong>

Say your texture is 1024 pixels wide and 1024 pixels high. Changing the resolution to 512 by 512 removes <strong>three quarters</strong> of the pixels without too much of a quality loss.
The exception is the case where the user will see an object very closely. Otherwise lowering the resolution will have a great effect on file size, but a small effect on image quality in the context of WebGL.

Important: Just make sure to use a high quality resampling algorithm to calculate the lower resolution. The naive approach would be to just remove every second pixel row and column in the example above. But high quality resampling algorithms recalculate the new pixel colors by merging the old pixel colors. One of the best algorithms to lower the resolution is to use <strong>the bicubic algorithm</strong>. The free image editor <a href="http://www.getpaint.net">Paint.NET</a> automatically uses this algorithm for example.

<strong>2. Changing the compression</strong>

For textures with many small details that look blurry when compressed with JPG you will probably prefer <strong>PNG</strong>. But for most other textures <strong>JPG</strong> is a great choice that yields a drastically lower file size than PNG. If you are not using many different colors you can even consider the color palette based <strong>GIF</strong> format. And keep in mind that Paint.NET and many other image editors have a compression level dialog when saving as JPG to further influence the file size at the cost of image quality.

<strong>3. Recompressing</strong>

Sometimes recompressing an image can further reduce the file size. For example with PNG it is possible to remove up to 30% more bytes using special advanced recompressors like <a href="https://tinypng.com/">TinyPNG</a> or <a href="http://advsys.net/ken/utils.htm">pngout</a>. It can also be worth a try to recompress JPG. But keep in mind that JPG is a lossy file format and you don't want to recompress JPG more than once or image quality suffers a lot.

Mozilla is currently working on further improving JPG compression: <a href="https://blog.mozilla.org/research/2014/03/05/introducing-the-mozjpeg-project/">Introducing the Mozjpeg Project</a> (see also: <a href="http://www.libjpeg-turbo.org/About/Mozjpeg">About Mozjpeg</a>)

<strong>4. Combining textures into texture atlases</strong>

To remove file header overhead and load requests it can very much make sense to create <a href="http://en.wikipedia.org/wiki/Texture_atlas">texture atlases</a> by combining multiple textures into one. We will go over this in detail in <a href="#">reducing draw calls</a>.

Next: <a href="../procedurally-generated-geometry/">Procedurally Generated Geometry</a>