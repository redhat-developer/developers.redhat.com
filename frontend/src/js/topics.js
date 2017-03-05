"use strict";
/* global app */
/*
  Topics  Component
  Shows up on the bottom part of each Topic's page
*/

window.app = window.app || {};

app.topics = {};


app.topics.fetch = function() {
    var tags = $('#topic-resources').data('tags') || "",
        tagsString = "", i;
    // var tags = container.data('tags') || "";
    $("ul.topic-resources.topic-resources-list").addClass('loading');
    try {
        tags = JSON.parse(tags.replace(/'/g, "\""));
    } catch (e) {
        tags = "";
    }

    if (tags){
        tagsString = "";
        for (i = 0; i < tags.length; i++) {
            if (i > 0) {
                tags[i] = "&tag=" + tags[i];
            }
            tagsString += tags[i].toLowerCase();
        }
    }
    $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&newFirst=true&size25=true&tag=' + tagsString + '&&type=jbossdeveloper_vimeo&type=jbossdeveloper_youtube&type=jbossdeveloper_book&type=jbossorg_blog', function(data){
        if (data.hits && data.hits.hits) {
            app.topics.render(data.hits.hits);
        }
    });
}

app.topics.render = function(materials) {
    var html = [];
    materials.forEach(function(material){
        var sys_type = material.fields.sys_type[0],
            timeStamp = new Date(material.fields.sys_created[0]),
            timeAgo = $.timeago(timeStamp),
            canDisplay = material.fields.sys_title
                && material.fields.sys_description
                && material.fields.sys_description.length > 0,
            sys_url_view = material.fields.sys_url_view[0],
            post_id, title, tags, item;
        if (canDisplay) {
            if (sys_type === 'blogpost'){
                if (sys_url_view.startsWith('https://developers.redhat.com/blog')) {
                    material.fields.sys_url_view[0] = sys_url_view;
                } else if (material.fields.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)){
                    material.fields.sys_url_view[0] = sys_url_view.replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/')
                } else {
                    post_id = /-(.+)/.exec(material._id)[1];
                    material.fields.sys_url_view[0] = "//planet.jboss.org/post/" + post_id;
                }
            }

            title = material.fields.sys_title[0];
      //if (title.length > 46) {
      //  title = title.substring(0, 46).trim() + "..."
      //}
            tags = material.fields.sys_tags.join(', ').substr(0, 30);
      // Make sure that we only display full words.
            tags = tags.substr(0, Math.min(tags.length, tags.lastIndexOf(",")));
            item = [
                '<a href="' + material.fields.sys_url_view[0] + '">',
                '<li class="large-6 columns">',
                '<h5>',
                title,
                '</h5>',
                '<p class="description">',
                material.fields.sys_description[0],
                '</p>',
                '</li>',
                '</a>'
            ].join('');

            html.push(item);
            $("ul.topic-resources.topic-resources-list").removeClass('loading');
        }
    });

    $('.topic-resources-list').html(html.join(''));

}

$(function() {
    var $topicsResourceList = $('.topic-resources-list');
  // check if we are on a page that needs this to run
    if ($topicsResourceList.length) {
        app.topics.fetch();
    }
});

