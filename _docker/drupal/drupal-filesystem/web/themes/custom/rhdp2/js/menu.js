/**
 * @file
 * Menu custo behaviors
 */

(function ($, Drupal) {
  Drupal.behaviors.rhd_menuSearch = {
    attach: function (context, settings) {
      $('[data-rhd-nav-search-toggle]').once('menuSearch').each(function() {
        $(this).on('click touch', function(e) {
          e.preventDefault();
          var $input = $(this).siblings('.rhd-nav-search').addClass('shown').find('[data-rhd-nav-search-input]');
          // Need a set timeout b/c otherwise .focus() will cause scrolling inside the container
          window.setTimeout(function() {
            $input.focus()
          }, 220);
        })
      });
      $('[data-rhd-nav-search-close]').once('menuSearch').each(function() {
        $(this).on('click touch', function(e) {
          e.preventDefault();
          $(this).parents('.rhd-nav-search').removeClass('shown');
        })
      });
    }
  };

  Drupal.behaviors.rhd_topicsMobileScroll = {
    attach: function(context, settings) {
      $('.rhd-l-topics').once('topicsMobileScroll').each(function() {
        var $this = $(this);
        var $left = $this.find('[data-topics-scroll-left]');
        var $right = $this.find('[data-topics-scroll-right]');
        var content = $this.find('.rhd-c-nav--topics-wrapper')[0];
        var updateScrollButtons = function() {
          if (content.clientWidth >= content.scrollWidth) {
            $left.hide(); $right.hide();
            return;
          }
          $left.toggle(content.scrollLeft !== 0);
          $right.toggle(content.scrollLeft < content.scrollWidth - content.clientWidth);
        };
        var step = 100;
        $left.on('click touch', function() {
          $(content).animate({scrollLeft: content.scrollLeft - 100 }, {complete: updateScrollButtons});
        });
        $right.on('click touch', function() {
          $(content).animate({scrollLeft: content.scrollLeft + 100 }, {complete: updateScrollButtons});
        });
        updateScrollButtons();
        $(window).resize(updateScrollButtons);
        $(content).scroll(updateScrollButtons);
      });
    }
  }
})(jQuery, Drupal);
