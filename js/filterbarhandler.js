/* global $ */

document.addEventListener("DOMContentLoaded", function() {
  $(".reset").click(function() {
    $(".overviewblock").hide().fadeIn();
    $(".difficulty").val($(".difficulty option:first").val());
    $(".usecase").val($(".usecase option:first").val());
    $(".coding").val($(".coding option:first").val());
  });

  $('.difficulty,.usecase,.coding').on('change', function () {
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

    var filterSelector = ".overviewblock" + difficultySelector + usecaseSelector + codeSelector;
    $(filterSelector).fadeIn();
  });
});
