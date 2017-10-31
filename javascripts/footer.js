$(function() {
  $(".collapsible-section").on("click", function(){
    $(this).toggleClass("collapsed");
  })
});

var $window = $(window);

function checkWidth() {
    var windowsize = $window.width();

    if (windowsize <= 1170) {
      $(".collapsible-section").addClass("collapsed");
    }else {
      $(".collapsible-section").removeClass("collapsed");
    }
};

checkWidth();

$(window).on("resize", checkWidth);
