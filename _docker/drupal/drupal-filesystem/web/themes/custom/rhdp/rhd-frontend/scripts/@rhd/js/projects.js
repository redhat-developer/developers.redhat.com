$(function () {
    $('ul.results, ul.featured-projects-results').on('click', '.upstream-toggle-more', function (e) {
        e.preventDefault();
        var el = $(this);
        el.toggleClass('upstream-toggle-open');
        el.prev('.upstream-more-content').slideToggle();
    });
    $('ul.results, ul.featured-projects-results').on('click', 'li.upstream a.solution-overlay-learn', function (e) {
        e.preventDefault();
        var html = $(this).parents('li').find('.project-content').html();
        app.overlay.open(html);
    });
});
