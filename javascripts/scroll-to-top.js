$(function() {
  if ($('#scroll-to-top').length) {
    var showBtn = 200, // displays the btn after 100px scroll
      scrollUp = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > showBtn) {
              $("a[href='#top']").fadeIn(500);
          } else {
              $("a[href='#top']").fadeOut(500);
          }
      };
    scrollUp();
    $(window).on('scroll', function () {
        scrollUp();
    });

    $("a[href='#top']").on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
  }
});
