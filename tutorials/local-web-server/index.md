---
layout: page
title: Local Web Server
weight: 5500
indent: 1
---
When developing a Goo Engine application it is very handy to have a local web server so that the test cycles are very short. With a local web server you can edit a script or HTML file and reload the browser and immediately see your change.

I will list some common ways to make this happen for the most common operating systems.
<h2 id="windows">HFS (Windows)</h2>
My favorite free web server on Windows is <a href="http://www.rejetto.com/hfs/">HFS</a>.

<img class="alignnone size-medium wp-image-338" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/hfs-300x266.png" alt="hfs" />

You basically drag and drop a project folder on the HFS window and it will get served.

To make using HFS more streamlined I have set some options:
<ul>
	<li>Always serve index.html</li>
	<li>Always quit without saving or confirmations</li>
	<li>Always use real folders (instead of the virtual folder option from HFS)</li>
</ul>
The benefit of HFS: You can serve and work with multiple projects at the same time.
<h2>Mongoose (Windows)</h2>
Alternatively you can use the free edition mongoose:

<a href="http://cesanta.com/mongoose.shtml">http://cesanta.com/mongoose.shtml</a>

This one is really simple, just execute the program and it will serve the files in the current directory and below.

<a href="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/mongoose.png"><img class="alignnone size-full wp-image-339" src="http://goolabs.wpengine.com/learn/wp-content/uploads/sites/2/2014/07/mongoose.png" alt="mongoose" /></a>

You will get a little Systray icon where you can stop it or edit settings.
<h2 id="operating-system-independent">NodeJS</h2>
If you already have NodeJS installed locally this is a good choice:

<a href="https://www.npmjs.org/package/http-server">https://www.npmjs.org/package/http-server</a>

Summary:
npm install http-server
node bin/http-server

Now you can visit <a href="http://localhost:8080">http://localhost:8080</a> to view your server.
<h2 id="python">Python</h2>
If you already have Python installed locally this is a good choice:

python -m SimpleHTTPServer # python 2.x

python -m http.server # python 3.x

And of course you can always use a full blown production grade web server like <a href="http://httpd.apache.org">Apache</a> or <a href="http://nginx.org">nginx</a>.