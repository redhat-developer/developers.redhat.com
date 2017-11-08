$('.show-more').on('click', function() {

  var x = $(this);
  var $showMoreBtn = x.find('span');
  var $showMoreContent = x.prev();
  $showMoreContent.toggleClass('open');

  return $showMoreBtn.toggle();
});
