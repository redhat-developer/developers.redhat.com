var app = app || {};
app.abTest = {
    swap: function (path, selector) {
        var url = app.baseUrl + '/' + path;
        $.get(url)
            .then(function (html) {
            $(selector).html(html);
        });
    }
};
