---
layout: tutorial
title: Highscore list
weight: 5750
indent: 1
---
This tutorial will show you how to (kind of) quickly set up a cloud-hosted server and database, create a simple API for sending and recieving data, and then use it in a Create project. I have used this setup to create a basic high-score list for the [Cube Clicker](//www.goocreate.com/learn/cube-clicker-game/ "Cube Clicker Game") game, but the concepts can of course be used as a foundation for lots more!

[![text5023](text50232.png)](text50232.png) We will:

*   Build a [Node.js](//nodejs.org) server
*   Host the server on [Heroku](//www.heroku.com/)
*   Set up a [MongoDB](//www.mongodb.com/) database and host it at [Mongolab](//mongolab.com)
*   Create a minimal [RESTful](//en.wikipedia.org/wiki/Representational_state_transfer) API to post and get game scores
*   Use [Postman](//chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) and [ngrok](//ngrok.com/) to make development and testing easier
*   Call this API from a Create project and use the data

We will NOT:

*   Create a robust and reliable server
*   Put effort into making nice modules and resusable code
*   End up with a _secure_ API

All the NOT:s can of course be fixed with a little more time and effort. With that in mind, let's start!

## Table of Contents

1.  [A Good Place to Start](#a-good-place)
2.  [Installing Node and Creating an App](#installing-node-and)
3.  [Setting Up the Database](#setting-up-the)
4.  [Connect to the Database](#connect-to-the)
5.  [Add More Routes](#add-more-routes)
6.  [Using the API in Create](#using-the-api)
7.  [Hosting the Highscore App on Heroku](#hosting-the-highscore)
8.  [Security Concerns](#security-concerns)
9.  [Wrap-Up](#wrap-up)

<a name="a-good-place"></a>

## A Good Place to Start

If you have never used Node.js, or have no idea what MongoDB is, I can highly recommend to start with quickly going through Christopher Buecheler's [excellent tutorial](//cwbuecheler.com/web/tutorials/2013/node-express-mongo/) on setting up the server and database. In fact, most of the tutorial you're reading is based on the setup there. Please go there, at least if any of the following steps seem quick to you. Christopher does a nice job of going over the details, so I won't.

## Installing Node and Creating an App

Assuming you have a grasp of the basics, these are the steps neccessary to get going with the development.

### Install Node.js and npm

First, get Node.js and npm (included) from [here](//nodejs.org/download/), and install it. If you're on Windows, make sure to add the node folder to your PATH so you can run the program from anywhere in your command prompt.

### Install Express

Use npm to get Express, a framework for quick web server development. Assuming that npm works as it should, you only need to run the commands

{% highlight js %}
npm install -g express
npm install -g express-generator
{% endhighlight %}

Note that -g makes the modules install globally. If you only want it in a specific directory, you can omit those flags.

### Use Express

Make use of the Express and create an app called _highscore_ (or something else). Navigate to the directory you want as _parent_ directory to your app and run

{% highlight js %}
express highscore
{% endhighlight %}

###  Add Some App Dependencies

Once the app is set up, it's easy to add more node modules to it. Navigate to the new app folder and open _package.json_ in a text editor. The file contains some app info as well as all modules that the project is dependent on, and we want to add two more of those. Add the following lines under _dependencies_:

{% highlight js %}
"mongodb": "*",
"monk": "*"
{% endhighlight %}

Then run the command

{% highlight js %}npm install{% endhighlight %}

in the directory and all the dependencies will be automatically installed!
<h3>Checkpoint: Start the App!</h3>
Now is a good place to stop and see how we're doing. Simply run

{% highlight js %}npm start{% endhighlight %}

and take a look at the command prompt or terminal output. If there seems to be no errors, open a web browser and navigate to _localhost:3000_. If you see a friendly message saying "Welcome to Express", you're doing good! If not, take a look at the error messages or refer to the [tutorial](//cwbuecheler.com/web/tutorials/2013/node-express-mongo/) mentioned above for more details.

[![welcome](welcome.jpg)](welcome.jpg) Hooray! <a name="setting-up-the"></a>

## Setting Up the Database

The server is up and running. Great! Now it's time to set up the database. If you want, you can set up a local database by installing some more stuff. I have chosen to skip this step and go straight for a web hosted solution. If you want to host the database locally, again refer to the [detailed tutorial](//cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

### Mongolab

Mongolab is a provider of MongoDB hosting, and then have a free "sandbox" version that suits our purposes very well. So first, [create an account](//mongolab.com/). Then, go ahead and create a new deployment.

[![mongodb](mongodb.jpg)](mongodb.jpg) The choice of _Cloud provider_ isn't super important, I went with _Amazon_ and the _EU Region_. Pick something that sounds nice. Next, select a **single-node**, **sandbox** plan and give your database a cool name.

[![plan](plan.jpg)](plan.jpg) You'll probably see a list of your deployments, so go ahead and click on your new database. Now it's time to add a _user_ to the database. Add a user with a name and password you'll remember. When you're done, it should look something like this:

[![user](user.jpg)](user.jpg) Awesome! One more thing. MongoDB databases use collections for storing stuff, so let's add one called _scores_.

[![coll](coll.jpg)](coll.jpg)

### Entering some Test Data

The first thing we want to do is make a simple GET function for the data, and for that to make sense we need to add some data to read. Open up the _scores _collection and click _Add document_. MongoDB uses pure JSON for storage, which makes web integration super easy! Our objects will just contain a name and a time for now. Enter something along the lines of this and click _Create and go back:_

[![adddoc](adddoc.jpg)](adddoc.jpg)

### Checkpoint: Look at that Data!

You should now see your freshly entered data. Note that MongoDB has also inserted an unique **_id** field for your entry!<a name="connect-to-the"></a>

## Connect to the Database

Alright! Time to open up the Node app again and see if we can connect to the database. The main app is handled in _app.js, _so open it up in a text editor. The parts are explained in the detailed tutorial, so I will go straight to the database stuff!

### Add the Database

First, we need to require a couple of things. Add these lines before the app is created:

{% highlight js %}
// app.js
var mongodb = require('mongodb');
var monk = require('monk'):
var credentials = require('./credentials');
var db = monk(credentials.uri);

// Add the above lines somewhere before this line
var app = express();
{% endhighlight %}

Committing the database credentials to an open repository is a <strong>bad idea</strong>. Therefore, I've created a very small module with this info in a separate file (credentials.js), to be able to skip that file when committing to git, for example. The file, added to .gitignore in my case, looks like this:

<a href="cred.jpg"><img class="alignnone size-full wp-image-1113" src="cred.jpg" alt="cred" /></a>

Where the database URI, user and password are changed for the ones you got from Mongolab earlier.

Next, we are going to intercept each request to the web server and attach our database to it. This is done in the following way:

{% highlight js %}

// Intercept the requests and attach the database object
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// Do the above before these lines
app.use('/', routes);
app.use('/users', users);
{% endhighlight %}

<h3>Add a Route</h3>
Alright, now let's hook up the GET route to use our database. Make a new file called scores.js and save it in the routes/ directory. The route will look like this:

{% highlight js %}
var express = require('express');
var router = express.Router();

// GET scores, sorted by time
router.get('/', function(req, res) {
  console.log('GET scores');
  // Get the database object we attached to the request
  var db = req.db;
  // Get the collection
  var collection = db.get('scores');
  // Find all entries, sort by time (ascending)
  collection.find({}, { sort: { time: 1 } }, function (err, docs) {
  	if (err) {
  		// Handle error
  		console.error('Failed to get scores', err);
  		res.status(500).send('Failed to get scores');
  	} else {
  		// Respond with the JSON object
  		res.json(docs);
  	}
  });
});

module.exports = router;
{% endhighlight %}

The route contains some syntax that might be new, please refer to the respective documentation for details. Basically, the <strong>find()</strong> function gets instructed to look for all entries (the empty object as search term), sort the entries by time and return the object as the variable <strong>docs</strong> in the callback. The server then sends the result using the nice <strong>json()</strong> function. Again, refer to the documentation of MongoDB, Monk, Express and Node.js for the inner workings!

Also note that the simple route has no error handling for when the database connection fails, or when the collection can't be found.

Now we need to tell the application yo use the route! We do this by following the already in-place pattern in app.js:

{% highlight js %}
// We don't really use the index and users routes,
// but we can leave them for now
var routes = require("./routes/index");
var users = require("./routes/users");
// Require our new and shiny route
var scores = require("./routes/scores");
{% endhighlight %}


{% highlight js %}
app.use('/', routes);
app.use('/users', users);
// Hook the route up
app.use('/scores', scores);
{% endhighlight %}

<h3>Checkpoint: Test the Route</h3>
This simple route can be tested in a browser, but I recomment using the Chrome plugin <a href="//www.getpostman.com/" target="_blank">Postman</a> (or something similar if you don't like Chrome) to make your route testing life easier. With it installed, one can easily connect to any URL and create GET, POST and other requests. If you choose to use Postman, start the server up and construct a simple GET request for <em>http://localhost:3000/scores</em>. If not, use your browser and navigate to the same URL. Watch your console for any debug output, and you should be able to see the test user we added to our cloud hosted database!

<a href="get.jpg"><img class="wp-image-1114 size-full" src="get.jpg" alt="get" /></a> Hooray!

<a name="add-more-routes"></a>
<h2>Add More Routes</h2>
To finish our simple API, we want to add some more routes. We need a way to add scores, and that's handled in a POST request. Also, assuming our game becomes a huge hit, we also want to add a way to just get the most important scores. We'll add some more routes for these two tasks. Let's start with the top scores route:

{% highlight js %}
// GET a number of top scores
// (the /top route without a number won't work unless we add it)
router.get("/top/:number", function(req, res) {
	console.log("GET top scores");
	// Read the request parameter
	var num = req.params.number;
	var db = req.db;
	var collection = db.get("scores");
	// Get all scores, but limit the number of results
	collection.find({}, { limit: num, sort: { time : 1 } }, function(err, docs) {
	  	if (err) {
  			console.error("Failed to get scores", err);
  			res.status(500).send("Failed to get scores");
	  	} else {
	  		res.json(docs);
	  	}
	});
});
{% endhighlight %}

<a href="2014-10-14-11_16_54-Postman.jpg"><img class="wp-image-1115 size-full" src="2014-10-14-11_16_54-Postman.jpg" alt="2014-10-14 11_16_54-Postman" /></a> Testing the GET top scores route.

After adding some more test users, we can test the route like so:
<a href="2014-10-14-11_16_54-Postman.jpg">
</a>Next, the POST route.

{% highlight js %}
// POST a score
router.post("/", function(req, res) {
	console.log("POST score");
	var name = req.body.name;
	var time = Number(req.body.time);
	if (!(name && time)) {
		console.error("Data formatting error");
		res.status(400).send("Data formatting error");
		return;
	}
	var db = req.db;
	var collection = db.get("scores");
	collection.insert({
		"name": name,
		"time": time
	}, function(err, doc) {
		if (err) {
			console.error("DB write failed", err);
			res.status(500).send("DB write failed");
		} else {
			// Return the added score
			res.json(doc);
		}
	});
});
{% endhighlight %}

When posting to the route, we'll use the x-www-form-encoded form of parameter key/value pairs. If you know that your amount of parameters will grow, it might be a good idea to just use one parameter and put all data in one single JSON object. That way one could insert new forms of data into the dabatase without changing the routes (for better or worse)! Here's how the current POST request format is tested in Postman:

<a href="post.jpg"><img class="wp-image-1116 size-full" src="post.jpg" alt="post" /></a> Testing the POST route, getting the inserted data back.

<a name="using-the-api"></a>
<h2>Using the API in Create</h2>
Phew, it's finally time to hook this up to a Create project! We have (almost) everything we need for reading and writing scores. We won't deploy the app itself to the cloud yet, since there's a really neat way of using your local server when developing. The secret is called <strong>ngrok</strong>.
<h3>Setting up ngrok</h3>
ngrok is a program/service that lets you expose a local web server to the internet. Very nice! Head over to <a href="//ngrok.com/" target="_blank">ngrok.com</a> and get ngrok going. There are plenty of instructions. Once you're done, you can simply start your Node.js server again, open a new terminal/command window, and launch ngrok:

{% highlight js %}ngrok -subdomain highscore 3000{% endhighlight %}

<a href="tunnel.jpg"><img class="alignnone size-full wp-image-1117" src="tunnel.jpg" alt="tunnel" /></a>

What this means is that you can open up Postman again and instead of using localhost:3000, enter https://highscore.ngrok.com and test the routes there instead. Neat, huh? This little tunneling exercise makes it easy to connect to your own server from Create (and debug using the console output in real time)!
<h3>The Create Project</h3>
We'll use the Cube Clicker game from <a title="Cube Clicker Game" href="http://www.goocreate.com/learn/cube-clicker-game/">this tutorial</a>. The goal is to add some methods to post and get scores, and modify the simple interface to display this. The project can be <a href="https://app.goocreate.com/tutorials/b5bb6d6a2f634e3280ad84c24060e250.project" target="_blank">duplicated from here</a>! Note that this tutorial won't focus on the game and display of the data, but only on the key functions needed. The complete project with all the code will be available for duplication and examination at the end of the tutorial!
<h3>Cross-Domain Problems</h3>
We won't be allowed to work with data from another domain unless the server says it's OK. This is done using <em>CORS headers</em>, and the simplest and quickest (but not the safest) way to do this is to use a node module called cors. Add the following to <em>package.json</em>:

{% highlight js %}"cors": "*"{% endhighlight %}

and run

{% highlight js %}npm install{% endhighlight %}

again. Then open up your scores.js routing file and add the following (to all routes);

{% highlight js %}

var express = require('express');
var router = express.Router();
var cors = require('cors');

// GET all scores, sorted by time
router.get('/', cors(), function(req, res) {
...{% endhighlight %}

<h3>The Request Functions</h3>
The two key functions will use <a href="//www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp" target="_blank">AJAX </a>requests, and for simplicity we'll use <a href="//api.jquery.com/jquery.ajax/" target="_blank">jQuery </a>to set these up quickly. These should be pretty self-explanatory if you've made it this far! Worth to notice is that we need to use HTTPS, that the URLs are hardcoded here but should probably be arguments, and that the functions naturally are asynchrynous.

{% highlight js %}
// ctx.topScores is defined in the setup() function and is used to cache and display the fetched results.

// Get a number of top scores
var getTopScores = function(ctx, num, callback) {
	console.log('Getting', num, 'top scores');
	if (!num) num = 3;

	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		url: 'https://highscore.ngrok.com/scores/top/'+num,
		success: function(data) {
			console.log('Scores downloaded', data);
			ctx.topScores = data;
			if (callback) callback();
		},
		error: function(xhr, msg) {
			console.error('AJAX error', xhr.status, msg);
		}
	});

};

// Post a score
var postScore = function(ctx, name, time, callback) {
	console.log('Posting score', name, time);

	$.ajax({
		type: 'POST',
		url: 'https://highscore.ngrok.com/scores/',
		data: {
			name: name,
			time: time,
		},
		success: function(data) {
			console.log('Score posted', data);
			if (callback) callback();
		},
		error: function(xhr, msg) {
			console.error('AJAX error', xhr.status, msg);
		}
	});

};
{% endhighlight %}

The previous setState() function will get a new state handler, responsible for getting the player's name and calling the post and get functions (in order, using callbacks).

{% highlight js %}
...
} else if (ctx.gameState === ctx.STATE_SUBMITTING) {
	if (!ctx.name) {
		ctx.name = prompt("Please enter your name");
	}
	postScore(ctx, ctx.name, ctx.playingTimer, function() {
		getTopScores(ctx, 10, function() {
			displaySubmitted(ctx);
		});
	});
	displaySubmitting(ctx);
}
{% endhighlight %}

Showing the highscores is done by functions like this one, simply manipulating the contents of defined GUI HTML elements.

{% highlight js %}
var updateSubmittedTopListDisplay = function(ctx) {
	var topList = '';
	ctx.topScores.forEach(function(v, i) {
		topList += i+1 + '. ' + v.name + ' ' + v.time.toFixed(2) + '<br />';
	});
	ctx.submittedTopListElement.innerHTML = topList;
};
{% endhighlight %}

<h3>The Complete App</h3>
There's of course more methods to make everything work. <a href="https://app.goocreate.com/tutorials/24503577d6724d18a60d1bddfa30648f.project" target="_blank">This project</a> is set up to display and submit scores. Beware of not-so-pretty code, as the integration was done during one of our <a href="//www.goocreate.com/learn/goofy-projects/" target="_blank">Goofy Days!</a> Also, as we'll touch on later, the security is clearly sub-par, so don't be surprised if something seems off.

<iframe src="https://goote.ch/24503577d6724d18a60d1bddfa30648f.project/"></iframe>

<a href="https://app.goocreate.com/4768/fd52a3558452455faa84a2453fd6f312.scene" target="_blank">Create scene</a></p>
<a name="hosting-the-highscore"></a>
<h2>Hosting the Highscore App on Heroku</h2>
If you take a look at the project linked above, you'll notice that the URLs are not ngrok anymore, but from Heroku. This is because we obviously want to host our Node.js app somewhere else than locally. Like Mongolab, Heroku has the option to host a free app, and the process is pretty straight forward.

First, sign up for a free account. Next, click the plus sign in the top right and create a new app. Give it a name, choose a region and hit <em>Create App</em>.

<a href="2014-10-14-14_29_21-Create-a-New-App-_-Heroku.jpg"><img class="size-full wp-image-1118 aligncenter" src="2014-10-14-14_29_21-Create-a-New-App-_-Heroku.jpg" alt="2014-10-14 14_29_21-Create a New App _ Heroku" /></a>

&nbsp;

Next, follow the instructions to install the Heroku Toolbelt, initialize a git repository and push your app to Heroku. Done! Now you can open the app by typing

{% highlight js %}heroku open{% endhighlight %}

in the command prompt. Should anything go wrong, access the server logs by typing

{% highlight js %}heroku logs{% endhighlight %}

<a name="security-concerns"></a>
<h2>Security Concerns</h2>
As you might have suspected by now, this app is in no way secure. The API is completely public, meaning that anyone with access to the API URLs can post any data they want and store it in your database. Furthermore, finding those URLs is really easy due to the nature of JavaScript. Making a secure high-score list is hard and out of the scope of this tutorial.

<a name="wrap-up"></a>
<h2>Wrap-Up</h2>
With stability and security concerns aside, we've built something pretty cool. Three different cloud services (the server, the database, and Create) are set up to communicate between each other. Hopefully this tutorials has given you some ideas of fun data-driven apps, and some insight in how one get get them up and running quickly. If there are any bugs, uncertainties or other thoughs, please let us know in the comments!

