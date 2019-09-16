(function() {
    if (URL) {
        var url = new URL(location.href);
        var loc = url.searchParams.get('loc');
        var lessonLinks = document.querySelectorAll('.lesson-link a[href*="courses"]');
        lessonLinks.forEach(function(el) { el.href += '?loc=' + loc; });
    }
}());