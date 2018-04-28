$(function() {
  $(".collapsible-section h3").on("click", function(){
    var windowsize = document.body.clientWidth;
    if (windowsize <= 1170) {
      $(this).parent().toggleClass("collapsed");
    } else {
      return false;
    }
  })
});

var $window = $(window);

function checkWidth() {
    var windowsize = document.body.clientWidth;;

    if (windowsize <= 1170) {
      $(".collapsible-section").addClass("collapsed");
    }else {
      $(".collapsible-section").removeClass("collapsed");
    }
};

checkWidth();

$(window).on("resize", checkWidth);
