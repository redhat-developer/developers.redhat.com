/* 
  Social Media Share Buttons 
*/
$(function() {
  $('.share-this').on('click mouseover', function()
  {
      Socialite.load($(this)[0]);
  });
});

