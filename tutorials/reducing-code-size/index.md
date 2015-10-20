---
layout: tutorial
title: Reducing Code Size
weight: 5960
indent: 1
---
Once you are done programming a complex WebGL application, you probably have ten or maybe even one hundred little JavaScript files. They will all have to be loaded via HTTP requests from the server and parsed individually. This can have a considerable impact on the overall application loading time.  

The standard way to fix this situation is by using [code minification](https://en.wikipedia.org/wiki/Minification_(programming)). This process basically replaces all the non public names of your functions and variables with single or double letters. It also removes all spaces and replaces returns with semicolons. This typically reduces the size by around **50%**.  

As an interesting side effect of using code minification your source code is [obfuscated](http://en.wikipedia.org/wiki/Obfuscation_(software)), meaning it is hard to read for humans and is a way to **protect your intellectual property** to a certain degree.  

There are several different code minification engines available, the ones we have successfully used are:  

* [Google Closure](https://developers.google.com/closure/compiler/)
* [UglifyJS](https://github.com/mishoo/UglifyJS) in combination with [RequireJS](http://requirejs.org/docs/optimization.html)