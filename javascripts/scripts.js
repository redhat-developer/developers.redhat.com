var app = window.app = {};

/* 
  Website Cache
*/
app.cache = {};

/* 
  Website Init 
*/ 
app.init = function() {
  
  $(document).foundation();

  /*
    initialize All sliders
  */
  
    app.slider = Swipe(document.getElementById('slider'), {
      auto : 0,
      transitionEnd : function() {
        var idx = app.slider.getPos();
        $('.slider-pager-active').removeClass('slider-pager-active');
        $('.slider-pager a:eq('+idx+')').addClass('slider-pager-active');
      }
    });
    

    var numSlides = app.slider.getNumSlides(),
        pagerHtml = "";

    for (var i = 0; i < numSlides; i++) {
      pagerHtml+="<a href='#"+i+"'>"+(i+1)+"</a>";
    };

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


  /*
    Toggle mobile Nav
  */
  $('.nav-toggle').click(function(){
    $('body').toggleClass('nav-open');
  });

  /*
    Mobile Nav dropdown
  */ 
  $('li.has-dropdown').on('click touchend',function(e){
    $(this).toggleClass('sub-nav-open');
  });

  /*
    Developer Materials Slider Filter
  */
  $('form.filters input[type=range]').on('change mousemove',function() {
    // we bind to change and mousemove because Firefox doesn't fire change until mouse is dropped.
    // convert step and total to number of options
    var el = $(this),
        step = el.attr('step'),
        max = el.attr('max') || 100,
        value = this.value,
        labels = el.data('labels').split(','),
        idx = value / step;
    el.next('.skill-display').text( labels[idx] );
  });

  /*
    Developer Materials Rating Filter
  */
  $('input[name="filter-rating"]').on('change input',function() {
    var val = this.value;
    $('.filter-rating-active').removeClass('filter-rating-active');
    $('input[name="filter-rating"]').each(function() {
      if(this.value <= val) {
        $(this).parent().addClass('filter-rating-active');
      }
    });
  });

  /*
    Developer Materials form Reset
  */
  $('.filters-clear').on('click',function(e){
    e.preventDefault();
    app.clearFilters($(this));
  });

};


/*
  Clear All Filters
*/
app.clearFilters = function($el) {
  var form = $('form.filters');
  form[0].reset();
  form.find('input[type=range]').each(function(i,el){
    $(el).attr('value',0);
  });
  $('form.filters input:checked').removeAttr('checked');
  $('.filter-rating-active').removeClass('filter-rating-active');
}

$(function() {
  app.init();
});