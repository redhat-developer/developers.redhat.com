app.init = function () {
    $(document).foundation();
    $('table.demos a.view-more').on('click', function (e) {
        e.preventDefault();
        var el = $(this);
        el.toggleClass('open');
        el.parent().parent().next().find('p').slideToggle();
    });
    $('input[name="referrer"]').val(document.referrer);
};
app.equalizeBottoms = function ($selector) {
    $selector.first().on('resize', function (e) {
        $selector.css('height', 'auto');
        var heights = [];
        $selector.each(function () {
            var h = $(this).outerHeight();
            heights.push(h);
        });
        var maxHeight = Math.max.apply(Math, heights);
        $selector.css('height', maxHeight);
    });
    $selector.first().trigger('resize');
};
app.stickyNav = function (className, headerElement) {
    var nav = $('.' + className + '-nav'), win = $(window);
    if (!nav.length) {
        return;
    }
    var html = "", top = nav.offset().top, select = $("<select>").append('<option selected value="">Choose a section</option>');
    $('.' + className + ' ' + headerElement).each(function (i, el) {
        var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
        $(this).attr('id', replace_id);
        html += "<li><a href='#" + replace_id + "'>" + $(this).text() + "</a></li>";
        select.append("<option value='" + replace_id + "'>" + $(this).text() + "</option>");
    });
    nav.html(html);
    nav.after(select);
    win.on("scroll", function () {
        if (win.scrollTop() >= (top)) {
            var width = nav.parent().width();
            nav.addClass(className + "-nav-fixed").css('width', width);
        }
        else {
            nav.removeClass(className + "-nav-fixed").css('width', 'auto');
        }
        $('.' + className + ' ' + headerElement).each(function (i, el) {
            var el = $(this), top = el.offset().top, id = el.attr('id');
            if (win.scrollTop() >= (el.offset().top - 15)) {
                $('a[href="#' + id + '"]').addClass('past-block');
            }
            else {
                $('a[href="#' + id + '"]').removeClass('past-block');
            }
        });
        $('.past-block').not(':last').removeClass('past-block');
    });
    $(select).on('change', function () {
        var header = $(this).find('option:selected').val();
        window.location.hash = header;
    }).wrap('<div class="styled-select mobile-selector">');
    $('.transcript-toggle-more').on('click', function (e) {
        e.preventDefault();
        $('.transcript-wrap').toggleClass('transcript-wrap--open');
    });
};
app.stickyFooter = function () {
    var bodyHeight = $('body').height(), windowHeight = $(window).height(), wrapper = $('.wrapper');
    if (bodyHeight < windowHeight) {
        var headerHeight = $('header.main').outerHeight() + $('nav.top-bar').outerHeight(), footerHeight = $('footer.bottom').outerHeight(), devHeight = $('.under-development').outerHeight(), wrapperHeight = windowHeight - headerHeight - footerHeight - devHeight;
        wrapper.css('min-height', wrapperHeight);
    }
};
app.sideNav = function () {
    $('.side-nav-toggle a').on('click', function (e) {
        e.preventDefault();
        $('.side-nav').toggleClass('side-nav-open');
    });
};
$(function () {
    app.init();
    app.sideNav();
    stickySections = { 'faq': 'h2', 'gsi': 'h2' };
    for (var key in stickySections) {
        app.stickyNav(key, stickySections[key]);
    }
    app.stickyFooter();
});
