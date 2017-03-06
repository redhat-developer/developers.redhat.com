"use strict";
/* global app, Socialite */
/*
 * Buzz
 * Dependencies: vendor/jQuery.js, vendor/jQuery.XDomainRequest.js, namespace.js
 * DOM Ready dependencies: vendor/jquery.timeago.js
 */
app.buzz = {
    filter: function(tmpl, container, itemCount, append, from, dataIndex, callback) {
        var keyword = $('input[name="buzz-filter-text"]').val(),
            filters = {"keyword": keyword}, // Keyword
            currentFilters = {},
            query = [], // Prep each filter
            tags = container.data('tags') || "", // Pull the json array, switch back to double quotes, then parse it.
            tagsString = "";

        itemCount = itemCount || 8; // set a default item count of 8

        // append loading class to wrapper
        container.addClass('buzz-loading');

        $.each(filters, function(key, val) {
            // if its empty, or undefined, remove it from the filters
            if (val && val.length) {
                currentFilters[key] = val;
            }
        });

        // Pass search params to GTM for analytics
        window.dataLayer = window.dataLayer || [];

        if (currentFilters.keyword) {
            query.push(keyword);
            window.dataLayer.push({'keyword': keyword});
        } else {
            window.dataLayer.push({'keyword': null});
        }

    // Trim the whitespace from entries
        if (Array.isArray(tags)) {
            tags = tags.map(Function.prototype.call, String.prototype.trim);
        }

        try {
            if (typeof tags === "string") {
                tags = JSON.parse(tags.replace(/'/g, "\""));
            }
        } catch (e) {
            tags = "";
        }

        if (tags){
            for (var i = 0; i < tags.length; i++) {
                if (i > 0) {
                    tagsString += " ";
                }
                tagsString += tags[i];
            }
            window.dataLayer.push({'tags': tags});
        } else {
            window.dataLayer.push({'tags': null});
        }

        window.dataLayer.push({'event': 'buzz-search'});

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
                "from": dataIndex // for pagination
            },
            beforeSend: function() {
          // check if there is a previous ajax request to abort
                if (app.buzz.currentRequest && app.buzz.currentRequest.readyState !== 4) {
                    app.buzz.currentRequest.abort();
                }
            },
            error: function() {
                $('.buzz-filters').html(app.dcp.error_message);
                $('.mini-buzz-container').html(app.dcp.error_message);
                $('.buzz-loading').removeClass('buzz-loading');
            }
        }).done(function(data){
            // Delay loading this until the DOM is ready
            // PLM: Do we really need to do this?
            $( function() {
                var hits = data.hits.hits,
                    html = "",
                    pat = /(?:([^"]+))? <?(.*?@[^>,]+)>?,? ?/g, // This regex will parse an email like "John Smith <john.smith@acme.com>", giving you two matches "John Smith" and "john.smith@acme.corp"
                    d, m;
                app.buzz.infiniteScrollCalled = false;
                app.buzz.noScroll = false;

                if (hits.length < 8) {
                    app.buzz.noScroll = true;
                }
                if (keyword && keyword.length) {
                    app.search.format(keyword, hits, $('.buzz-filters .searchResults'));
                }

                for (var i = 0; i < hits.length; i++) {
                    d = hits[i].fields;
                    m = pat.exec(d.sys_contributors);
                    d.authorName = "";
                    d.authorMail = "";
                    if (m) {
                        d.authorName = m[1];
                        d.authorMail = m[2];
                    }
                    if (!d.authorName) {
                        d.authorName = d.author;
                    }
                    d.updatedDate = jQuery.timeago(new Date(d.sys_created));
                    d.sys_description = d.sys_description[0].substr(0, 197) + '...';
                    if (d.sys_url_view[0].startsWith('https://developers.redhat.com/blog/') || d.sys_url_view[0].startsWith('https://developers.redhat.com/blog/')) {
                        d.permanentLink = d.sys_url_view;
                    } else if (d.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)){
                        d.permanentLink = d.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/')
                    } else {
                        d.permanentLink = "//planet.jboss.org/post/" + d.sys_content_id;
                    }
                    html += tmpl.template(d);
                }

                // Inject HTML into the DOM
                if (!html) {
                    html = "Sorry, no results to display.";
                }
                if (append) {
                    container.append(html);
                } else {
                    container.html(html);
                }

                container.removeClass('buzz-loading');

                $('.share-this').on('click mouseover', function() {
                    Socialite.load($(this)[0]);

                });
            });

        }); // end ajax done
    },

    init: function() {
    /*
      "Mini" Buzz, for the homepage
    */
        var $mbuzz = $('.mini-buzz-container');
        var dataIndex = 0;
        var $buzz = $('.buzz-container, .product-buzz-container'); // Full Buzz, for the buzz page
        var currentPagination = 0;
        var buzzFlag = true; // rate limiting
        var win = $(window);
        var offset = 700; // pixel offset
        var $pbuzz = $('.product-buzz-container');
        var timeOut;
        var lastSearch = "";

        if ($mbuzz.length) {
            app.buzz.filter(app.templates.miniBuzzTemplate, $mbuzz);
        }

        if ($buzz.length) {
            app.buzz.filter(app.templates.buzzTemplate, $buzz, 8);

            // infinite scroll for full buzz page

            app.buzz.infiniteScrollCalled = false;
            win.on('scroll', function() {
                var scrollBottom = win.scrollTop() + win.height();
                var scrollTop = win.scrollTop();
                var buzzBottom = $buzz.position().top + $buzz.height();
                var from = $('.buzz-container > div').length;

                if (scrollBottom + offset > buzzBottom && !app.buzz.infiniteScrollCalled && buzzFlag && !app.buzz.noScroll) {
                    // limit the number of times it can be called to once per second
                    buzzFlag = false;
                    window.setTimeout(function(){ buzzFlag = true; }, 1000);

                    app.buzz.infiniteScrollCalled = true;

                    dataIndex += 8;
                    //console.log("dataIndex: " + dataIndex);
                    // load in more
                    app.buzz.filter(app.templates.buzzTemplate, $buzz, 8, true, from, dataIndex, function() {
                        if (win.scrollTop() < 400){
                            win.scrollTop(scrollTop);
                        }
                    });
                }
            });
        }

    /*
      Product Page Buzz by tag
    */
        if ($pbuzz.length) {
            app.buzz.filter(app.templates.productBuzzTemplate, $pbuzz);
        }

    // Event Listeners for Buzz Filter
    // When the buzz filter input is changed, search
        $('form.buzz-filters').on('keyup', 'input', function(e){
            var el = $(this);
            var query = el.val();
            clearTimeout(timeOut);
      // throttle ajax requests
            timeOut = setTimeout(function() {
                var $buzz = $('.buzz-container');
                if (lastSearch !== query) {
                    app.buzz.filter(app.templates.buzzTemplate, $buzz);
                    app.utils.updatePageHash(el);
                }
                lastSearch = query;
            }, 300);
        });

        $('form.buzz-filters').on('submit', function(e) {
            e.preventDefault();
        });

    }
};

// Call app.buzz.init() straight away. The call is slow, and anything which requires render dependencies is
// in jQuery DOM ready callbacks
app.buzz.init();

