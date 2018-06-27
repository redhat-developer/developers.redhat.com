app.buzz = {
    filter: function (tmpl, container, itemCount, append, from, dataIndex, callback) {
        itemCount = itemCount || 8;
        container.addClass('buzz-loading');
        var keyword = $('input[name="buzz-filter-text"]').val();
        var filters = {
            "keyword": keyword
        };
        var currentFilters = {};
        $.each(filters, function (key, val) {
            if (val && val.length) {
                currentFilters[key] = val;
            }
        });
        var query = [];
        window.dataLayer = window.dataLayer || [];
        if (currentFilters.keyword) {
            query.push(keyword);
            window.dataLayer.push({ 'keyword': keyword });
        }
        else {
            window.dataLayer.push({ 'keyword': null });
        }
        var tags = container.data('tags') || "";
        if (Array.isArray(tags)) {
            tags = tags.map(Function.prototype.call, String.prototype.trim);
        }
        try {
            if (typeof tags === "string") {
                tags = JSON.parse(tags.replace(/'/g, "\""));
            }
        }
        catch (e) {
            tags = "";
        }
        if (tags) {
            var tagsString = "";
            for (var i = 0; i < tags.length; i++) {
                if (i > 0) {
                    tagsString += " ";
                }
                tagsString += tags[i];
            }
            window.dataLayer.push({ 'tags': tags });
        }
        else {
            window.dataLayer.push({ 'tags': null });
        }
        window.dataLayer.push({ 'event': 'buzz-search' });
        $.ajax({
            url: app.dcp.url.search,
            dataType: 'json',
            data: {
                "field": ["sys_url_view", "sys_title", "sys_contributors", "sys_description", "sys_created", "author", "sys_tags", "sys_content_id"],
                "query": query,
                "tag": tags,
                "size": itemCount,
                "sys_type": "blogpost",
                "sortBy": "new-create",
                "from": dataIndex
            },
            beforeSend: function () {
                if (app.buzz.currentRequest && app.buzz.currentRequest.readyState != 4) {
                    app.buzz.currentRequest.abort();
                }
            },
            error: function () {
                $('.buzz-filters').html(app.dcp.error_message);
                $('.mini-buzz-container').html(app.dcp.error_message);
                $('.buzz-loading').removeClass('buzz-loading');
            }
        }).done(function (data) {
            $(function () {
                app.buzz.infiniteScrollCalled = false;
                app.buzz.noScroll = false;
                var hits = data.hits.hits;
                if (hits.length < 8) {
                    app.buzz.noScroll = true;
                }
                if (keyword && keyword.length) {
                    app.search.format(keyword, hits, $('.buzz-filters .searchResults'));
                }
                var html = "";
                for (var i = 0; i < hits.length; i++) {
                    var d = hits[i].fields;
                    var pat = /(?:([^"]+))? <?(.*?@[^>,]+)>?,? ?/g;
                    d.authorName = "";
                    d.authorMail = "";
                    while (m = pat.exec(d.sys_contributors)) {
                        d.authorName = m[1];
                        d.authorMail = m[2];
                    }
                    if (!d.authorName) {
                        d.authorName = d.author;
                    }
                    d.updatedDate = jQuery.timeago(new Date(d.sys_created));
                    d.sys_description = d.sys_description[0].substr(0, 197) + '...';
                    if (d.sys_url_view[0].startsWith('https://developers.redhat.com/blog/') || d.sys_url_view[0].startsWith('http://developers.redhat.com/blog/')) {
                        d.permanentLink = d.sys_url_view;
                    }
                    else if (d.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)) {
                        d.permanentLink = d.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/');
                    }
                    else {
                        d.permanentLink = "//planet.jboss.org/post/" + d.sys_content_id;
                    }
                    html += tmpl.template(d);
                }
                if (!html) {
                    html = "Sorry, no results to display.";
                }
                if (append) {
                    container.append(html);
                }
                else {
                    container.html(html);
                }
                container.removeClass('buzz-loading');
            });
        });
    },
    init: function () {
        var $mbuzz = $('.mini-buzz-container');
        var dataIndex = 0;
        if ($mbuzz.length) {
            app.buzz.filter(app.templates.miniBuzzTemplate, $mbuzz);
        }
        var $buzz = $('.buzz-container, .product-buzz-container');
        if ($buzz.length) {
            app.buzz.filter(app.templates.buzzTemplate, $buzz, 8);
            app.buzz.infiniteScrollCalled = false;
            var currentPagination = 0;
            var buzzFlag = true;
            var win = $(window);
            var offset = 700;
            win.on('scroll', function () {
                var scrollBottom = win.scrollTop() + win.height();
                var scrollTop = win.scrollTop();
                var buzzBottom = $buzz.position().top + $buzz.height();
                if ((scrollBottom + offset > buzzBottom) && !app.buzz.infiniteScrollCalled && buzzFlag && !app.buzz.noScroll) {
                    buzzFlag = false;
                    window.setTimeout(function () { buzzFlag = true; }, 1000);
                    app.buzz.infiniteScrollCalled = true;
                    var from = $('.buzz-container > div').length;
                    dataIndex += 8;
                    app.buzz.filter(app.templates.buzzTemplate, $buzz, 8, true, from, dataIndex, function () {
                        if (win.scrollTop() < 400) {
                            win.scrollTop(scrollTop);
                        }
                    });
                }
            });
        }
        var $pbuzz = $('.product-buzz-container');
        if ($pbuzz.length) {
            app.buzz.filter(app.templates.productBuzzTemplate, $pbuzz);
        }
        var timeOut;
        var lastSearch = "";
        $('form.buzz-filters').on('keyup', 'input', function (e) {
            var el = $(this);
            var query = el.val();
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                var $buzz = $('.buzz-container');
                if (lastSearch !== query) {
                    app.buzz.filter(app.templates.buzzTemplate, $buzz);
                    app.utils.updatePageHash(el);
                }
                lastSearch = query;
            }, 300);
        });
        $('form.buzz-filters').on('submit', function (e) {
            e.preventDefault();
        });
    }
};
app.buzz.init();
