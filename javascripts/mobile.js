/**
 * Dependencies: vendor/jquery.js, vendor/swipe.js
 */

app.createSlider = function($el) {
  var slider = Swipe($el[0], {
    auto : 0,
    transitionEnd : function() {
      $('.current-slide').text(slider.getPos() + 1);
      // $('.slider-pager-active').removeClass('slider-pager-active');
      // $('.slider-pager a:eq('+idx+')').addClass('slider-pager-active');
    }
  });
  // unbind the next/ prev icons
  $('.solutions-slider-controls a').unbind();

  // Bind the next / prev icons
  $('.solutions-slider-controls a').on('click',function(e){
    e.preventDefault();
    var el = $(this);
    var direction = (el.hasClass('next') ? 'next' : 'prev');
    slider[direction]();
  });

  // Update text
  $('span.current-slide').text('1');
  $('.total-slides').text(slider.getNumSlides());

  return slider;
};

(function() {
 /*
    initialize All sliders
  */
    var sliderEl = document.getElementById('slider');
    var $sliderEl = $(sliderEl);

    app.slider = Swipe(sliderEl, {
      auto : $(sliderEl).data('timeout') || 0,
      transitionEnd : function() {
        var idx = app.slider.getPos();
        $('.slider-pager-active').removeClass('slider-pager-active');
        $('.slider-pager a:eq('+idx+')').addClass('slider-pager-active');
      }
    });

    if(app.slider) {
      var numSlides = app.slider.getNumSlides(),
          pagerHtml = "";

      for (var i = 0; i < numSlides; i++) {
        pagerHtml+="<a href='#"+i+"'>"+(i+1)+"</a>";
      }

      $('.slider-pager').html(pagerHtml);
      $('.slider-pager a:first').addClass('slider-pager-active');

      /* Bind Arrows and pager */
      $('.slider-controls').on('click','a',function(e){
        var direction = $(this).data('direction');
        app.slider[direction]();
        e.preventDefault();
      });

      $('.slider-pager').on('click','a',function(e){
        e.preventDefault();
        var idx = this.href.split('#').pop();
        app.slider.slide(idx);
      });

      if($sliderEl.data('pause-on-hover')) {

        $sliderEl.on('mouseenter',function() {
          app.slider.stop();
        }).on('mouseleave',function(){
          app.slider.start();
        });
      }
    }


  /*
    Toggle mobile Nav
  */
  $('.nav-toggle').on('click touchend',function(){
     if (!app.fastClick) {
       // we're binding to touchstart and click. If we have a touchstart, don't also run on click
       app.fastClick = true;
       setTimeout(function(){ app.fastClick = false; }, 100);
       $('body').toggleClass('nav-open');
     }
    return false
  });

  /*
    Mobile Nav dropdown
  */
  
  $('li.has-dropdown span.drop-down-arrow').on('click touchend',function(e){
      if (!app.fastClick) {
        // we're binding to touchstart and click. If we have a touchstart, don't also run on click
        app.fastClick = true;
        setTimeout(function(){ app.fastClick = false; }, 100);
        $(this).parent().toggleClass('sub-nav-open');
      }
     return false
  });
})();

