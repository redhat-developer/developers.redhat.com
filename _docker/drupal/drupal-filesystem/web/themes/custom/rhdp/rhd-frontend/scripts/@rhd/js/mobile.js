app.createSlider = function ($el) {
    var slider = Swipe($el[0], {
        auto: 0,
        transitionEnd: function () {
            $('.current-slide').text(slider.getPos() + 1);
        }
    });
    $('.solutions-slider-controls a').unbind();
    $('.solutions-slider-controls a').on('click', function (e) {
        e.preventDefault();
        var el = $(this);
        var direction = (el.hasClass('next') ? 'next' : 'prev');
        slider[direction]();
    });
    $('span.current-slide').text('1');
    $('.total-slides').text(slider.getNumSlides());
    return slider;
};
(function () {
    var sliderEl = document.getElementById('slider');
    var $sliderEl = $(sliderEl);
    var shouldShuffle = $sliderEl.data('shuffle');
    if (shouldShuffle) {
        var slides = $sliderEl.find('.slide');
        slides = slides.sort(function () {
            return 0.5 - Math.random();
        });
        $sliderEl.find('.swipe-wrap').html(slides);
    }
    app.slider = Swipe(sliderEl, {
        auto: $(sliderEl).data('timeout') || 0,
        transitionEnd: function () {
            var idx = app.slider.getPos();
            $('.slider-pager-active').removeClass('slider-pager-active');
            $('.slider-pager a:eq(' + idx + ')').addClass('slider-pager-active');
            $('.slider-item a[data-index="' + idx + '"]').parent().addClass('slider-pager-active');
        }
    });
    if (app.slider) {
        $(sliderEl).addClass('slider-loaded');
        var numSlides = app.slider.getNumSlides(), pagerHtml = "";
        for (var i = 0; i < numSlides; i++) {
            pagerHtml += "<a href='#" + i + "'>" + (i + 1) + "</a>";
        }
        $('.slider-pager').html(pagerHtml);
        $('.slider-pager a:first').addClass('slider-pager-active');
        $('.slider-controls').on('click', 'a', function (e) {
            e.preventDefault();
            app.slider.stop();
            var el = $(this);
            var direction = el.data('direction');
            var index = el.data('index');
            if (index >= 0) {
                app.slider.slide(index);
            }
            else {
                app.slider[direction]();
            }
        });
        $('.slider-pager').on('click', 'a', function (e) {
            e.preventDefault();
            var idx = this.href.split('#').pop();
            app.slider.slide(idx);
        });
        if ($sliderEl.data('pause-on-hover')) {
            $sliderEl.on('mouseenter', function () {
                app.slider.stop();
            }).on('mouseleave', function () {
                app.slider.start();
            });
        }
    }
})();
app.touchSupport = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);
$('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('nav-open');
});
$('.has-sub-nav > a').on('click', function (e) {
    if (app.touchSupport || window.innerWidth <= 768) {
        e.preventDefault();
        $('.sub-nav-open').not($(this).parent()).removeClass('sub-nav-open');
        $(this).parent().toggleClass('sub-nav-open');
    }
});
$('a[href*="download-manager"]').on('click', function (e) {
    e.preventDefault();
    window.location.href = e.currentTarget.href;
});
