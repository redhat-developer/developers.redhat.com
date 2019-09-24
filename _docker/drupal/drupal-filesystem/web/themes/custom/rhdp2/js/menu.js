(function ($, Drupal) {
  // Drupal.behaviors.menuSearch = {
  //   attach: function (context, settings) {
  //     var toggleSearch = function () {
  //       $('.rhd-header .rhd-nav-search').toggleClass('open');
  //       $('.rhd-header').toggleClass('rhd-search-open');
  //       $('.rhd-search-toggle-overlay').toggle('open');
  //     };
  //     $('.rhd-search-toggle').click(function() {
  //       toggleSearch();
  //       if ($('.rhd-nav-search').hasClass('open')) {
  //         $('#search_list_text').focus();
  //       }
  //     });
  //     $('.rhd-search-toggle-overlay').click(function(){
  //       toggleSearch();
  //     });
  //   }
  // };

  Drupal.behaviors.topicsMobileScroll = {
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
