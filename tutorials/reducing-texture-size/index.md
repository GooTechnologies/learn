---
layout: tutorial
title: Reducing Texture Size
weight: 6000
indent: 1
---
One of the easiest things to do, to cut down on load times, is to reduce the file size of your textures.  

There are many ways to do so:  

## Reducing the resolution

Say your texture is 1024 pixels wide and 1024 pixels high. Changing the resolution to 512 by 512 removes **three quarters** of the pixels without too much of a quality loss.  
The exception is the case where the user will see an object very closely. Otherwise lowering the resolution will have a great effect on file size, but a small effect on image quality in the context of WebGL.  

Important: Just make sure to use a high quality resampling algorithm to calculate the lower resolution. The naive approach would be to just remove every second pixel row and column in the example above. But high quality resampling algorithms recalculate the new pixel colors by merging the old pixel colors. One of the best algorithms to lower the resolution is to use **the bicubic algorithm**. The free image editor [Paint.NET](http://www.getpaint.net) automatically uses this algorithm for example.  

## Changing the compression

For textures with many small details that look blurry when compressed with JPG you will probably prefer **PNG**. But for most other textures **JPG** is a great choice that yields a drastically lower file size than PNG. If you are not using many different colors you can even consider the color palette based **GIF** format. And keep in mind that Paint.NET and many other image editors have a compression level dialog when saving as JPG to further influence the file size at the cost of image quality.  

## Recompressing

Sometimes recompressing an image can further reduce the file size. For example with PNG it is possible to remove up to 30% more bytes using special advanced recompressors like [TinyPNG](https://tinypng.com/) or [pngout](http://advsys.net/ken/utils.htm). It can also be worth a try to recompress JPG. But keep in mind that JPG is a lossy file format and you don't want to recompress JPG more than once or image quality suffers a lot.  

Mozilla is currently working on further improving JPG compression: [Introducing the Mozjpeg Project](https://blog.mozilla.org/research/2014/03/05/introducing-the-mozjpeg-project/) (see also: [About Mozjpeg](http://www.libjpeg-turbo.org/About/Mozjpeg))  

## Combining textures into texture atlases

To remove file header overhead and load requests it can very much make sense to create [texture atlases](http://en.wikipedia.org/wiki/Texture_atlas) by combining multiple textures into one.