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

function markTutorialsAsFinished() {
  var completionmarks = document.getElementsByClassName('completionmark');
  for (var i = 0; i < completionmarks.length; i++) {
    url = completionmarks[i].dataset.url;
    var completed = getTutorialDoneStatus(url);
    if (completed){
      completionmarks[i].style.display = "block";
    }
  }
}

function getResumeURL(){
    try {
        return localStorage.getItem("lastvisitedurl");
    } catch(err){
        console.error('Could not get last visited URL.');
        return false;
    }
}

function setResumeURL(url){
    try {
        localStorage.setItem("lastvisitedurl", url);
    } catch(err){
        console.error('Could not set last visited URL.');
    }
}

$(document).ready(function(){

  var resumeURL = getResumeURL();
  if(resumeURL)
    $('.continue-button').show().attr('href', resumeURL);

  var courses = document.getElementsByClassName('course');

  for (var ii = 0; ii < courses.length; ii++) {

    var container = courses[ii].querySelector('.progressbarcontainer');

    if ( $(courses[ii]).css('display') == 'none' ){
      continue;
    }

    if(!container) continue;

    var urls = container.dataset.tutorials.split(/\s+/g).filter(function(url){
      return url;
    });
    var numTotal = urls.length;

    if(!numTotal) continue;

    var numCompleted = urls.map(function(url){

        return url && getTutorialDoneStatus(url) ? 1 : 0;
    }).reduce(function(a,b){
        return a + b;
    });

    var percent = Math.abs(numCompleted / numTotal);

    var coursecompletionmarks = courses[ii].getElementsByClassName('coursecompletionmark');
    if (percent === 1 && coursecompletionmarks.length !== 0){
      for (var i = 0; i < coursecompletionmarks.length; i++) {
          coursecompletionmarks[i].style.display = "block";
      }
    }
    else {
      var elements = courses[ii].getElementsByClassName('progressbarcontainer');
      for (var i = 0; i < elements.length; i++){
        var circle = new ProgressBar.Circle(elements[i], {
            color: '#38b3f6',
            strokeWidth: 8,
            duration: 1500,
            trailWidth: 8,
            trailColor: '#a3b1bf',
            text: {
                value: '0'
            },
            step: function(state, bar) {
                bar.setText((Math.abs(bar.value()) * 100).toFixed(0));
            }
        });
        circle.animate(percent, function() {
            // circle.animate(0);
        });
      }
    }
  }
});
