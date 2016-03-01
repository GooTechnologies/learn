
var elements = document.getElementsByClassName('progressbarcontainer');
for (var i = 0; i < elements.length; i++){
  var circle = new ProgressBar.Circle(elements[i], {
      color: '#38b3f6',
      strokeWidth: 5,
      trailWidth: 1,
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
  circle.animate(0.5, function() {
      // circle.animate(0);
  })
}
