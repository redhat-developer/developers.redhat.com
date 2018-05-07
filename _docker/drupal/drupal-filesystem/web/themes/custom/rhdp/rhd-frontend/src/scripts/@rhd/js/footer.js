$(function() {
  $(".rhd-menu .menu-item--expanded > a").each(function(){
    $(this).replaceWith("<h3 class='section-toggle'>" + $(this).text() + "</h3>")
  })
});

$(function() {
  $(".rhd-menu .menu-item--expanded h3").on("click", function(){
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
      $(".menu-item--expanded").addClass("collapsed");
    }else {
      $(".menu-item--expanded").removeClass("collapsed");
    }
};

checkWidth();

$(window).on("resize", checkWidth);
