/* eslint-disable strict */
var $window = $(window);

$(function() {
    $(".rhd-menu .menu-item--expanded > a").each(function(){
        $(this).replaceWith("<h3 class='section-toggle'>" + $(this).text() + "</h3>")
    })
});

$(function() {
    $(".rhd-menu .menu-item--expanded h3").on("click", function(){
      var windowsize = $(document).width();
      if (windowsize <= 1024) {
        $(this).parent().toggleClass("collapsed");
      } else {
        return false;
      }
    })
  });
  
  function checkWidth() {
      var windowsize = $(document).width();
      if (windowsize <= 1024) {
        $(".menu-item--expanded").addClass("collapsed");
      } else {
        $(".menu-item--expanded").removeClass("collapsed");
      }
  };

checkWidth();

$(window).on("resize", checkWidth);
