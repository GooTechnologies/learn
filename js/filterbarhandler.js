/* global $ */

document.addEventListener("DOMContentLoaded", function() {
  $('.noresults').hide();

  // Reset the filter to first option
  $(".reset").click(function() {
    $(".overviewblock").hide().fadeIn();
    $(".difficulty").val($(".difficulty option:first").val());
    $(".usecase").val($(".usecase option:first").val());
    $(".coding").val($(".coding option:first").val());
  });

  // Listen for change
  $('.difficulty,.usecase,.coding').on('change', function () {
    $('.noresults').hide();
    // Hide all blocks
    $(".overviewblock").hide();

    var difficultySelector = $(".difficulty option:selected").val();
    if (difficultySelector !== ''){
      difficultySelector = '.difficulty' + difficultySelector;
    }

    var usecaseSelector = $(".usecase option:selected").val();
    if (usecaseSelector !== ""){
      usecaseSelector = ".usecase" + usecaseSelector;
    }

    var codeSelector = $(".coding option:selected").val();
    if (codeSelector !== ""){
      codeSelector = ".code" + codeSelector;
    }

    // Show filtered blocks
    var filterSelector = ".overviewblock" + difficultySelector + usecaseSelector + codeSelector;
    console.log(filterSelector);
    $(filterSelector).fadeIn();

    if ($(".overviewblock:visible").length === 0){
      $('.noresults').show();
    }
  });
});
