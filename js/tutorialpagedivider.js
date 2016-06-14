//add 'next' buttons between every H2 and hide all except one h2 part
function tutorialPageDivider(){
  $(document).ready(function () {
    $('.content h2').each(function(){
      var $set = $(this).nextUntil("h2").andSelf();
      $set.wrapAll('<div class="pagepart" />');
    });
    var pageparts = document.getElementsByClassName('pagepart');
    var nextppbutton;
    var previousppbutton;
    for (var i = 0; i < pageparts.length; i++){
    }

    nextppbutton = document.createElement('div');
    nextppbutton.className = 'nextpagepart';
    nextppbutton.innerHTML = 'Next step';
    previousppbutton = document.createElement('div');
    previousppbutton.className = 'previouspagepart';
    previousppbutton.innerHTML = 'Previous step';
    document.getElementById('createbuttons').appendChild(nextppbutton);
    document.getElementById('createbuttons').appendChild(previousppbutton);

    var i = 0;
    pageparts[i].style.display = 'block';
    for (var ii= 0; ii < pageparts.length; ii++){
      if (ii !== i){
        pageparts[ii].style.display = 'none';
      }
    }
    $('.previouspagepart').hide();

    $('.nextpagepart').click(function(){
      i++;
      $('.previouspagepart').show();
      pageparts[i].style.display = 'block';
      for (var ii= 0; ii < pageparts.length; ii++){
        if (ii !== i){
          pageparts[ii].style.display = 'none';
        }
      }
      if (i === pageparts.length - 1){
        $('.nextpagepart').hide();
      }
      else {
        $('.nextpagepart').show();
      }
      if (i > 0){
        $('.hidefromsecondstep').hide()
      }
      else {
        $('.hidefromsecondstep').show()
      }

    });

    $('.previouspagepart').click(function(){
      i--;
      if (i === 0){
        $('.previouspagepart').hide();
      }
      else {
        $('.previouspagepart').show();
      }
      if (i !== pageparts.length - 1){
        $('.nextpagepart').show();
      }
      pageparts[i].style.display = 'block';
      for (var ii= 0; ii < pageparts.length; ii++){
        if (ii !== i){
          pageparts[ii].style.display = 'none';
        }
      }

    });
  });
}
