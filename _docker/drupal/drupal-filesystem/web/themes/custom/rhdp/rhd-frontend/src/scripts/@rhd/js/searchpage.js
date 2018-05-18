/**
 * Created by danielcoughlin on 11/6/15.
 */

app.searchpage = {

    abort: function () {
        // abort previous request if we are running a new one
        if (app.searchpage.currentRequest && app.searchpage.currentRequest.readyState !== 4) {
            app.searchpage.currentRequest.abort();
        }
    },
    fetch: function (tmpl, container, query, itemCount, append, from) {

        itemCount = itemCount || 8;


        container.addClass('search-page-loading');


        // Pass search params to GTM for analytics
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'keyword': query});
        window.dataLayer.push({'event': 'website-search'});

        // perform ajax request
        $.ajax({
            url: app.dcp.url.search,
            dataType: 'json',
            data: {
                "field"  : ["sys_author", "target_product", "contributors", "duration", "github_repo_url", "level", "sys_contributors",  "sys_created", "sys_description", "sys_title", "sys_tags", "sys_url_view", "thumbnail", "sys_type", "sys_rating_num", "sys_rating_avg", "experimental"],
                "query": query,
                "content_provider" : ["jboss-developer", "rht", "openshift"],
                "size" : itemCount,
                "sortBy" : "new-create",
                "from" : from || 0 // for pagination

            },
            beforeSend: function () {
                app.searchpage.abort();
            },
            success: function (data) {
                var hits = data.hits.hits;

                var html = "";
                for (var i = 0; i < hits.length; i++) {
                    var d = hits[i].fields;
                    // This regex will parse an email like "John Smith <john.smith@acme.com>", giving you two matches "John Smith" and "john.smith@acme.corp"
                    var pat = /(?:([^"]+))? <?(.*?@[^>,]+)>?,? ?/g;
                    d.authorName = "";
                    d.authorMail = "";
                    while (m = pat.exec(d.sys_contributors)) {
                        d.authorName = m[1];
                        d.authorMail = m[2];
                    }
                    if(!d.authorName) {
                        d.authorName = d.author;
                    }
                    d.updatedDate = jQuery.timeago(new Date(d.sys_created));
                    //d.sys_description = d.sys_description.substr(0,197) + '...';
                    d.searchLink = d.sys_url_view;
                    html += tmpl.template(d);
                }

                    // Inject HTML into the DOM
                    // if(!html) {
                    //     html = "Sorry, no results to display.";
                    //     $('.loader').remove();
                    // }
                    if(append) {
                        container.append(html);
                    }
                    else {
                        container.html(html);
                    }


                    container.removeClass('search-page-loading');

            },
            error: function () {
                $(".searchpage-results-container").html(app.dcp.error_message);
            }
        });

    },


};

(function () {


    var $search = $('.searchpage-results-container');
    $('form.search-bar').on('submit', function (e) {
        e.preventDefault();
    });

    // listen to key events on the search form
    $('form.search-bar').on('keyup', 'input', function (e) {
        var form = $(this).parent();
        /*
         Check for enter / return key
         */
        if (e.keyCode == 13) {
            // Get search parameter to append to url
            var param = $('form.search-bar input').val();
            // Get base url from action attribute to form search url
            var url = $('form.search-bar').attr('action');
            window.location.assign(url+'?s=' + param);
            // .click();
            return;
        }

    });

    // Read the url
    var loc = window.location.toString();
    // Extract the search parameter from url bar
    var name = loc.substring(loc.indexOf("=")+1).replace('\/','');

    // Begin initial search
    app.searchpage.fetch(app.templates.searchpageTemplate, $search, name, 4);

    app.searchpage.infiniteScrollCalled = false;

    var searchFlag = true; // rate limiting
    var win = $(window);
    var offset = 700; // pixel offset

    win.on('scroll', function(){
        var scrollBottom = win.scrollTop() + win.height();
        var scrollTop = win.scrollTop();
        var searchBottom = $search.position().top + $search.height();

        if((scrollBottom + offset > searchBottom) && !app.search.infiniteScrollCalled && searchFlag) {

            searchFlag = false;
            window.setTimeout(function(){ searchFlag = true; },1000);

            app.searchpage.infiniteScrollCalled = true;
            var from = $('.searchpage-results-container > div').length;

            app.searchpage.fetch(app.templates.searchpageTemplate, $search, name, 8, true, from, function() {
                if(win.scrollTop() < 400){
                    win.scrollTop(scrollTop);


                }
            });
        }
    });



})();
