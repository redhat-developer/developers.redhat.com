(function ($, Drupal) {
  Drupal.behaviors.showMore = {
    attach: function (context, settings) {
      $('.show-more-text', context).once('show-more-toggle').each(function () {
        var $showMoreElem = $(this);
        var $showMoreText = $($showMoreElem).text();
        var $showMoreButton = $($showMoreElem).next();

        if ($showMoreText.length <= 2000) {
          $(this).css('max-height', 'unset');
        } else {
          $($showMoreButton).removeClass('pf-u-hidden');
        }

        $($showMoreButton).on('click', function() {
          $($showMoreElem).toggleClass('open');
          return $(this).find('span').toggle();
        });
      });
    }
  };
})(jQuery, Drupal);
