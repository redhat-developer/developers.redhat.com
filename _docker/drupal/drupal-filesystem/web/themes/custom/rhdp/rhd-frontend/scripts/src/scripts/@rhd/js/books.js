app.books = {
    supportsLocalStorage: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e) {
            return false;
        }
    },
    restoreFilter: function (hashParams) {
        if (!this.supportsLocalStorage()) {
            return;
        }
        var filterKeys = [
            "keyword",
        ];
        var hashParams = hashParams || app.utils.getParametersFromHash();
        $.each(filterKeys, function (idx, key) {
            if ($.isEmptyObject(hashParams)) {
                var formValue = window.localStorage.getItem("booksFilter." + key);
            }
            else {
                var formValue = hashParams[key];
            }
            if (formValue === 'undefined') {
                formValue = '';
            }
            if (formValue) {
                switch (key) {
                    case "keyword":
                        $('input[name="filter-text"]').val(formValue).trigger('change');
                        break;
                }
            }
        });
    },
    performFilter: function () {
        var bookTemplate = app.templates.bookTemplate;
        var contributorTemplate = "<span class=\"contributor\" data-sys-contributor=\"<!=author!>\">" +
            "<a class=\"name link-sm\"><!=normalizedAuthor!></a>" +
            "</span>";
        $('ul.book-list').empty();
        filters = typeof filters !== 'undefined' ? filters : {};
        if (!maxResults) {
            var maxResults = 500;
        }
        var keyword = $('input[name="filter-text"]').val();
        $.extend(filters, {
            "keyword": keyword,
        });
        var formValues = {
            "keyword": keyword,
        };
        if (this.supportsLocalStorage()) {
            $.each(formValues, function (key, val) {
                window.localStorage.setItem("booksFilter." + key, val);
            });
        }
        var currentFilters = {};
        $.each(filters, function (key, val) {
            if (val.length) {
                currentFilters[key] = val;
            }
        });
        var query = [];
        if (currentFilters['keyword']) {
            query.push(keyword);
        }
        $("ul.book-list").addClass('loading');
        var data = {
            "field": ["preview_link", "thumbnail", "sys_title", "sys_contributor", "average_rating", "sys_created", "sys_description", "sys_url_view", "isbn", "authors"],
            "query": query,
            "size": maxResults,
            "sys_type": "book",
            "sortBy": "new-create"
        };
        app.books.currentRequest = $.ajax({
            dataType: 'json',
            url: app.dcp.url.search,
            data: data,
            beforeSend: function () {
                if (app.books.currentRequest && app.books.currentRequest.readyState != 4) {
                    app.books.currentRequest.abort();
                }
            },
            error: function () {
                $("ul.book-list").html(app.dcp.error_message);
            }
        }).done(function (data) {
            var results = data.hits.hits;
            for (var k = 0; k < results.length; k++) {
                var book = results[k].fields;
                var authors = "";
                if (!book.sys_url_view) {
                    book.sys_url_view = "";
                }
                if (book.sys_contributor) {
                    if (book.sys_contributor.length == 1) {
                        authors += "Author: ";
                    }
                    else {
                        authors += "Authors: ";
                    }
                    for (var i = 0; i < book.sys_contributor.length; i++) {
                        authors += contributorTemplate.template({ "author": book.sys_contributor[i], "normalizedAuthor": app.dcp.getNameFromContributor(book.sys_contributor[i]) });
                        if (i < (book.sys_contributor.length - 1)) {
                            authors += ", ";
                        }
                    }
                }
                else if (book.authors) {
                    var str = "";
                    if (book.authors.length == 1) {
                        authors += "Author: ";
                    }
                    else {
                        authors += "Authors: ";
                    }
                    for (var i = 0; i < book.authors.length; i++) {
                        authors += book.authors[i];
                        if (i < (book.authors.length - 1)) {
                            authors += ", ";
                        }
                    }
                }
                book.authors = authors;
                book.average_rating = roundHalf(book.average_rating) || "";
                book.sys_description = book.sys_description || "";
                if (book.sys_created) {
                    var published = new Date(book.sys_created);
                    var now = new Date();
                    var oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
                    if (published > oneYearAgo) {
                        book.published = "Published: " + jQuery.timeago(published);
                    }
                    else {
                        book.published = "Published: " + published.getFullYear() + "-" + published.getMonth() + "-" + published.getDate();
                    }
                }
                else {
                    book.published = "";
                }
                $('ul.book-list').append(bookTemplate.template(book));
            }
            $("ul.book-list").removeClass('loading');
        });
    }
};
(function () {
    var timeOut;
    $('form.books-filters').on('change keyup', 'input, select', function (e) {
        var keys = [37, 38, 39, 40, 9, 91, 92, 18, 17, 16];
        if (e.type === "keyup" && ($(this).attr('name') !== 'filter-text' || keys.indexOf(e.keyCode) !== -1)) {
            return;
        }
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            app.books.performFilter();
        }, 300);
    });
    $('form.books-filters').on('submit', function (e) {
        e.preventDefault();
    });
    if ($('[data-set]').length) {
        app.utils.parseDataAttributes();
    }
    else if (window.location.search && !!window.location.search.match(/_escaped_fragment/)) {
        var hashParams = app.utils.getParametersFromHash();
        app.utils.restoreFromHash();
        app.books.restoreFilter(hashParams);
    }
    else if (window.location.hash) {
        app.utils.restoreFromHash();
        app.books.restoreFilter();
    }
    else if ($('form.books-filters').length) {
        app.books.restoreFilter();
    }
})();
