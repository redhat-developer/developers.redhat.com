(function ($, Drupal) {
  Drupal.behaviors.showMore = {
    attach: function (context, settings) {
      $('.show-more-text', context).once('show-more-toggle').each(function () {
        var $showMoreElem = $(this);
        var $showMoreText = $($showMoreElem).text();
        var $showMoreButton = $($showMoreElem).next();

        if ($showMoreText.length >= 700) {
          $($showMoreButton).removeClass('hide');
        }

        $($showMoreButton).on('click', function() {
          $($showMoreElem).toggleClass('open');
          return $(this).find('span').toggle();
        });
      });
    }
  };
})(jQuery, Drupal);
