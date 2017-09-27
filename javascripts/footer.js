jQuery(function() {
  console.log("in footer.js");
  if ($(window).width() < 769) {
   $('.footer-collapse').prop('checked', true);
  }
  else {
     $('.footer-collapse').prop('checked', false);
  }
});
