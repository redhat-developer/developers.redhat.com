"use strict";
/* global app */
app.project = {
    getCorrectUrl: function (linkUrl) {
        if ($.isArray(linkUrl) && linkUrl.length > 0) {
            linkUrl = linkUrl[0];
        }
        if (linkUrl.indexOf("/") > 0) {
            return linkUrl;
        }
        return "https://jboss.org" + linkUrl;

    },
    jbossLink: function (linkUrl) {
        if (linkUrl.indexOf("jboss.org") > 0) {
            return true;
        }
        return false;

    },
    projectFilter: function(filters, keyword, container, thumbnailSize) {
        var url = app.dcp.url.project,
            currentFilters = {},
            request_data = {},
            filter_products = $('select[name="filter-products"]'),
            product, query;

        keyword = keyword || $('input[name="filter-text"]').val();
        filters = $.extend(filters, {"keyword": keyword});


    // Pass search params to GTM for analytics
        window.dataLayer = window.dataLayer || [];

        if (filter_products.length && filter_products.val() !== "") {
            product = filter_products.val();
            filters.project = app.products[product].upstream;
            window.dataLayer.push({'product': product});
        } else {
            window.dataLayer.push({'product': null});
        }

    // sort by sys_title
        filters.sort = 'sys_title';

        $.each(filters, function(key, val) {
      // if its empty, remove it from the filters
            if (val !== undefined && val.length) {
                currentFilters[key] = val;
            }
        });

        query = [];

        if (currentFilters.keyword) {
            window.dataLayer.push({'keyword': query});
            query.push(keyword);
            delete currentFilters.keyword
        } else {
            window.dataLayer.push({'keyword': null});
        }

    // append loading class to wrapper
        $("ul.results").addClass('loading');
        $.extend(request_data, currentFilters);
        request_data.query = query.join(" AND ");

        window.dataLayer.push({'event': 'projects-search'});

        $.ajax({
            url: url,
            dataType: 'json',
            data: request_data,
            container: container,
            thumbnailSize: thumbnailSize,
            error: function() {
                $('ul.results').html(app.dcp.error_message);
            }
        }).done(function(data){
            var container = this.container || $('ul.results');
            var thumbnailSize = this.thumbnailSize || "200x150";
            app.project.format(data, container, thumbnailSize);
        });
    },
    clearFilters: function($el) {
        var form = $('form.project-filters');
        form[0].reset();
        this.projectFilter();
    },
    fallbackImage: function(el) {
        el.src = app.projects.defaultImage;
    },
    format: function(data, container, thumbnailSize) {
        var hits = data.hits.hits,
            html = "", i, props, imgsrc, template,
            list = "<div class=\"upstream-more-content\">" + "<ul class='project-details-list'>",
            correctLink, viewLink,
            projectContent = $('<div class="project-content row" />'),
            projectContentLeft,
            projectContentRight = $('<div class="large-18 project-content-right  columns">'),
            social = $('<ul class="project-social" />'); // social links
        if (data.responses) {
            hits = data.responses[0].hits.hits;
        }

    // loop over every hit
        for (i = 0; i < hits.length; i++) {
            props = hits[i].fields;

            imgsrc = "https://static.jboss.org/" + (props.specialIcon || props.sys_project) + "/images/" + (props.specialIcon || props.sys_project) + "_" + thumbnailSize + ".png";

            template = "<li class=\"upstream\">"
        + "<div class=\"defaultprojectimage\">"
        + "<p class=\"image-link\"><img onerror=\"app.project.fallbackImage(this)\" src='" + imgsrc + "' alt='" + props.projectName + "'></p></div>"
        + "<h5 class=\"solution-name\"><p class=\"solution-name-link\">"
        + props.projectName + "</p></h3><p></p><a class=\"solution-overlay-learn link-sm\">Learn more</a>";

            if (props.downloadsLink) {
                template += " | <a href=\""
          + app.project.getCorrectUrl(props.downloadsLink) + "\" class=\"link-sm\">Download</a>";
            }

            if (props.docsLink) {
                correctLink = app.project.getCorrectUrl(props.docsLink);
                list += "<li>Docs: <a href='"+correctLink+"'>Documentation</a></li>";
            }
            if (props.communityLink) {
                correctLink = app.project.getCorrectUrl(props.communityLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Community: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.knowledgeBaseLink) {
                correctLink = app.project.getCorrectUrl(props.knowledgeBaseLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>KnowledgeBase: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.userForumLink) {
                correctLink = app.project.getCorrectUrl(props.userForumLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>User Forum: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.devForumLink) {
                correctLink = app.project.getCorrectUrl(props.devForumLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Dev Forum: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.mailingListLink) {
                correctLink = app.project.getCorrectUrl(props.mailingListLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Mailing List: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.chatLink) {
                correctLink = app.project.getCorrectUrl(props.chatLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Chat: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.blogLink) {
                correctLink = app.project.getCorrectUrl(props.blogLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Blog: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.issueTrackerLink) {
                correctLink = app.project.getCorrectUrl(props.issueTrackerLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Issue: <a href='"+correctLink+"'>"+ viewLink +"</a></li>";
            }
            if (props.jiraLink) {
                correctLink = app.project.getCorrectUrl(props.jiraLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>JIRA: <a href='"+correctLink+"'>"+ viewLink +"</a></li>";
            }
            if (props.srcLink) {
                correctLink = app.project.getCorrectUrl(props.srcLink);
                list += "<li>Source: <a href='"+correctLink+"'>"+ correctLink +"</a></li>";
            }
            if (props.anonymousLink) {
                correctLink = app.project.getCorrectUrl(props.anonymousLink);
                list += "<li>Anonymous Source: <a href='"+correctLink+"'>"+ correctLink +"</a></li>";
            }
            if (props.commiterLink) {
                correctLink = app.project.getCorrectUrl(props.commiterLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Committer Source Access: <a href='"+correctLink+"'></a></li>";
            }
            if (props.fisheyeLink) {
                correctLink = app.project.getCorrectUrl(props.fisheyeLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>FishEye: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.viewvcLink) {
                correctLink = app.project.getCorrectUrl(props.viewvcLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>View Source<a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.githubLink) {
                correctLink = app.project.getCorrectUrl(props.githubLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Github: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.anonymousGitLink) {
                correctLink = app.project.getCorrectUrl(props.anonymousGitLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Anonymous Git: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.committerGitLink) {
                correctLink = app.project.getCorrectUrl(props.committerGitLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Committer Git: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.buildLink) {
                correctLink = app.project.getCorrectUrl(props.buildLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Build: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }
            if (props.hudsonLink) {
                correctLink = app.project.getCorrectUrl(props.hudsonLink);
                viewLink = correctLink.replace(/https?:\/\//, '');
                list += "<li>Jenkins: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
            }

            list += "</ul></div>";

            // modal overlay content
            projectContentLeft = $('<div>').addClass('large-6 project-content-left columns').html("<img src='"+imgsrc+"' alt='" + props.projectName + "'>");

            // downloads link
            if (props.downloadsLink) {
                projectContentLeft.append("<p><a class='upstream-download' href=\""+ app.project.getCorrectUrl(props.downloadsLink) + "\"><i class=\"fa fa-download\"></i> Download</a></p>");
            }

            // project url
            projectContentLeft.append("<p><a href='"+app.project.getCorrectUrl(props.sys_url_view)+"'>Visit home page</a></p>");

            if (props.twitterLink) {
                correctLink = app.project.getCorrectUrl(props.twitterLink);
                social.append("<li><a href='"+props.twitterLink+"'><i class='fa fa-twitter'></i></a></li>");
            }

            projectContentLeft.append(social);

            projectContentRight.append( $("<h3>").html("<a href='"+app.project.getCorrectUrl(props.sys_url_view)+"'>"+props.sys_project_name+"</a>") );
            projectContentRight.append( $("<p>").text(props.description) );
            projectContentRight.append(list);
            projectContent.append(projectContentLeft);
            projectContent.append(projectContentRight);

            template += $('<div>').append(projectContent.clone()).html();

            // close the list item
            template += "</li>";
            // Append template to HTML
            html += template;
        }

        // Inject HTML into the DO<
        if (!html) {
            html = "Sorry, no results to display. Please modify your search.";
        }
        container.html(html).removeClass('loading');
        container.prev().find("#results-label").html(hits.length);

    }
};

// Event Listeners
$(function() {
    var timeOut, product_id,
        featuredProjectIds = $('.featured-project-ids'); // Featured Projects

    $('form.project-filters').on('keyup', 'input', function(){
        var el = $(this);
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            app.project.projectFilter();
            app.utils.updatePageHash(el);
        }, 300);
    });

    $('form.project-filters').on('submit', function(e) {
        e.preventDefault();
    });

    $('select[name="filter-products"]').on('change', function(e) {
        var el = $(this);
        e.preventDefault();
        app.project.projectFilter();
        app.utils.updatePageHash(el);
    });

    $('.project-filters-clear').on('click', function(e){
        e.preventDefault();
        app.project.clearFilters($(this));
    });

    if ($('.project-filters').length) {
        if (window.location.search) {
            product_id = app.utils.getQueryVariable('included-in');
            $('option[value="'+product_id+'"]').attr('selected', 'selected');
            app.project.projectFilter({project: app.products[product_id].upstream});
        } else {
            app.project.projectFilter();
        }
    }
    if ($('.community-projects').length) {
        app.project.projectFilter({project: app.products[$('.community-projects').data('product-id')].upstream});
    }

  /*
     Upstream Solutions View More Link
   */
    $('ul.results, ul.featured-projects-results').on('click', '.upstream-toggle-more', function(e){
        var el = $(this);
        e.preventDefault();
        el.toggleClass('upstream-toggle-open');
        el.prev('.upstream-more-content').slideToggle();
    });

  /*
    Modal Box
  */

    $('ul.results, ul.featured-projects-results').on('click', 'li.upstream a.solution-overlay-learn', function(e) {
        var html = $(this).parents('li').find('.project-content').html();
        e.preventDefault();
        app.overlay.open(html);
    });

    if (featuredProjectIds.length) {
        //var queryVal = JSON.parse(featuredProjectIds.text()).join(' OR ');
        //var query = "sys_content_id:("+queryVal+")";
        //app.project.projectFilter(null, query, $('ul.featured-projects-results'), '500x400');
    }

});

