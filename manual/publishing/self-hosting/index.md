---
title: Export webpage / self hosting
indent: 2
weight: 5002
layout: manual
---
In order to host a Goo 3D Scene yourself, you need to export the scene as a webpage and put it on a web server.

1. Open your scene in Create.
2. Open the Scene menu in the top bar.
3. Click *Export*.
4. Choose *Export as Webpage*.

![](export.png)

![](export-webpage.png)

Wait for the scene to download as a zip-file. The contents of this file is ready to put on any web server.

## Running the exported webpage locally

To run the exported webpage locally, you need to use a local web server. It will not work by just opening `index.html` file in a browser.

We recommend using Node.js to start a web server locally. Follow these steps.

1. Install [Node.js](http://nodejs.org).
2. Open the command prompt to run following commands.
	* Windows: Open Start and write `cmd` into the search and press enter.
	* Windows XP: Open Start and select Run and write `cmd` and press enter.
	* OSX: Open the Terminal app.
	* Linux: Open a new terminal.
3. Run this command to install a server: `npm install st -g`
4. Start the server by running: `st /path/to/exported/webpage` with a path to the folder you want to open.
5. Now just open [http://localhost:1337/](http://localhost:1337/) in your browser.