---
layout: page
title: Reducing Code Size
weight: 6000
indent: 1
---

Once you are done programming a complex WebGL application, you probably have ten or maybe even one hundred little JavaScript files. They will all have to be loaded via HTTP requests from the server and parsed individually. This can have a considerable impact on the overall application loading time.

The standard way to fix this situation is by using <a title="programming" href="http://en.wikipedia.org/wiki/Minification_">code minification</a>. This process basically replaces all the non public names of your functions and variables with single or double letters. It also removes all spaces and replaces returns with semicolons. This typically reduces the size by around <strong>50%</strong>.

As an interesting side effect of using code minification your source code is <a title="software" href="http://en.wikipedia.org/wiki/Obfuscation_">obfuscated</a>, meaning it is hard to read for humans and is a way to <strong>protect your intellectual property</strong> to a certain degree.

There are several different code minification engines available, the ones we have successfully used are:

<a href="https://developers.google.com/closure/compiler/">Google Closure</a>

<a href="https://github.com/mishoo/UglifyJS">UglifyJS</a> in combination with <a href="http://requirejs.org/docs/optimization.html">RequireJS</a>

Next: <a href="../reducing-texture-size/">Reducing Texture Size</a>