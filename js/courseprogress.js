/* global ProgressBar, $ */

// Set current tutorial/page as "done"
function setTutorialDoneStatus(pageUrl){
    if(typeof(localStorage) !== 'undefined'){
        try {
            localStorage.setItem(pageUrl, 'done');
        } catch(err){
            console.error('Could not save tutorial progress.');
        }
    }
}

// Check if the tutorial/page is "done"
function getTutorialDoneStatus(pageUrl){
    if(typeof(localStorage) !== 'undefined'){
        try {
            return !!localStorage.getItem(pageUrl);
        } catch(err){
            console.error('Could not get tutorial progress.');
            return false;
        }
    }
}

function getResumeURL(){
    try {
        return !!localStorage.getItem("lastvisitedurl");
    } catch(err){
        console.error('Could not get last visited coursepart.');
        return false;
    }
}

function replacehref(){
  var courseurl = document.getElementById("buttonlink").href;
  if (getResumeURL.indexOf(courseurl)){
    document.getElementById("buttonlink").href = courseurl;
  }
}

$(document).ready(function(){
  var courses = document.getElementsByClassName('course');

  var container = document.querySelector('.progressbarcontainer');
  if(!container) return;

  var urls = container.dataset.tutorials.split(/\s+/g).filter(function(url){
    return url;
  });

  var numTotal = urls.length;
  var numCompleted = urls.map(function(url){
      return url && getTutorialDoneStatus(url) ? 1 : 0;
  }).reduce(function(a,b){
      return a + b;
  });
  var percent = numCompleted / numTotal;

<<<<<<< HEAD

  if (percent == 0) {
    $(".coursebutton").html("Start course");
  }
  else {
    $(".coursebutton").html("Continue where you left");
  }


=======
  var button = document.getElementsByClassName('button');
>>>>>>> d7c04cad306437ca0ae27488f3be44f3ff7e98f2

  var elements = document.getElementsByClassName('progressbarcontainer');
  for (var i = 0; i < elements.length; i++){
    var circle = new ProgressBar.Circle(elements[i], {
        color: '#38b3f6',
        strokeWidth: 5,
        duration: 1500,
        trailWidth: 5,
        trailColor: '#a3b1bf',
        text: {
            value: '0'
        },
        step: function(state, bar) {
            bar.setText((bar.value() * 100).toFixed(0));
        }
    });
    circle.animate(percent, function() {
        // circle.animate(0);
    });
  }
});
