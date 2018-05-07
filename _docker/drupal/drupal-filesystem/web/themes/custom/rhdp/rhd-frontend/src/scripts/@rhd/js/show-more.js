var showMoreText = $('.show-more-text').text();

// Minimum number of characters needed to display "Show More" button
var charCount = $('.show-more-text').attr('data-count');
var maxWidth = $('.show-more-text').attr('data-max-width');

if (showMoreText.length < charCount){
  $('a.show-more').hide();
}

$('.show-more').on('click', function() {

  var x = $(this);
  var $showMoreBtn = x.find('span');
  var $showMoreContent = x.prev();
  $showMoreContent.toggleClass('open');

  return $showMoreBtn.toggle();
});