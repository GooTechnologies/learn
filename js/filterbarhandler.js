document.addEventListener("DOMContentLoaded", function(event) {
  function getPosts(allposts) {
      console.log(allposts);
  };

  function filterPosts(allposts) {

  };

  $( ".reset" ).click(function() {
    $(".overviewblock").hide();
    $(".overviewblock").fadeIn();
    $(".difficulty").val($(".difficulty option:first").val());
    $(".usecase").val($(".usecase option:first").val());
    $(".coding").val($(".coding option:first").val());
});

  $('.difficulty,.usecase,.coding').on('change', function (e) {
    $(".overviewblock").hide();
    var selecteddifficulty = $(".difficulty option:selected").text().trim();
    if (selecteddifficulty == "Select difficulty"){
      selecteddifficulty = "";
    }
    else {
      selecteddifficulty = "." + selecteddifficulty;
    }

    var selectedusecase = $(".usecase option:selected").text().trim();
    if (selectedusecase == "Select usecase"){
      selectedusecase = "";
    }
    else if (selectedusecase == "Other usecases"){
      selectedusecase = ".Else";
    }
    else {
      selectedusecase = "." + selectedusecase ;
    }

    var selectedcodeoption = $(".coding option:selected").text().trim();
    if (selectedcodeoption == "Coding options" || selectedcodeoption == "Both"){
      selectedcodeoption = "";
    }
    if (selectedcodeoption == "Code"){
      selectedcodeoption = ".code";
    }
    else if (selectedcodeoption == "No code"){
      selectedcodeoption = ".nocode";
    }
    var classes = ".overviewblock" + selecteddifficulty + selectedusecase+ selectedcodeoption;
    $(classes).fadeIn();
  });




});
