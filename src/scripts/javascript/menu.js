(function ($, Drupal) {
  Drupal.behaviors.menuDropdown = {
    attach: function (context, settings) {
      $('.menu-toggle').click(function() {
        $('body').toggleClass('mobile-tray-open');
        $('.rhd-mobile-tray').slideToggle(250);
      });
      $('.rhd-mobile-overlay').click(function() {
        $('body').toggleClass('mobile-tray-open');
        $('.rhd-mobile-tray').slideToggle(250);
      });
    }
  };
  Drupal.behaviors.menuSearch = {
    attach: function (context, settings) {
      var toggleSearch = function () {
        $('.rhd-header .rhd-nav-search').toggleClass('open');
        $('.rhd-header').toggleClass('rhd-search-open');
        $('.rhd-search-toggle-overlay').toggle('open');
      };
      $('.rhd-search-toggle').click(function() {
        toggleSearch();
      });
      $('.rhd-search-toggle-overlay').click(function(){
        toggleSearch();
      });
    }
  };
})(jQuery, Drupal);
