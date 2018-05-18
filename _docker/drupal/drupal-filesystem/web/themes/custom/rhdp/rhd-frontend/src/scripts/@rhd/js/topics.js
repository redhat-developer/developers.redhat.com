/*
  Topics  Component
  Shows up on the bottom part of each Topic's page
*/

app = window.app || {};

app.topics = {};


app.topics.fetch = function() {
  $("ul.topic-resources.topic-resources-list").addClass('loading');
  var tags = ($('#topic-resources').data('tags') || "")
  // var tags = container.data('tags') || "";
    try {
      tags = JSON.parse(tags.replace(/'/g, "\""));
    } catch (e) {
      tags = "";
    }

    if(tags){
      var tagsString = "";
      for (var i = 0; i < tags.length; i++) {
        if (i > 0) {
          tags[i] = "&tag=" + tags[i];
        }
        tagsString += (tags[i]).toLowerCase();
      }
    }
  $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&newFirst=true&size15=true&type=jbossdeveloper_vimeo&type=jbossdeveloper_youtube&type=jbossdeveloper_book&type=jbossorg_blog&tag=' + tagsString, function(data){
    if(data.hits && data.hits.hits) {
      app.topics.render(data.hits.hits);
    }
  });
}

app.topics.render = function(materials) {
  var html = [];
  materials.forEach(function(material){
    var type = material.fields.sys_type[0];
    var timeStamp = new Date(material.fields.sys_created[0]);
    var timeAgo = $.timeago(timeStamp);
    var canDisplay = material.fields.sys_title && material.fields.sys_description && material.fields.sys_description.length > 0;
    if (canDisplay) {
      if (material.fields.sys_type[0] == 'blogpost'){
        if (material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog') || material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog')) {
          material.fields.sys_url_view[0] = material.fields.sys_url_view[0];
        }
        else if(material.fields.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)){
          material.fields.sys_url_view[0] = material.fields.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/')
        }

        else {
          var post_id = /-(.+)/.exec(material._id)[1];
          material.fields.sys_url_view[0] = "//planet.jboss.org/post/" + post_id;
        }
      }

      var title = material.fields.sys_title[0];
      //if (title.length > 46) {
      //  title = title.substring(0, 46).trim() + "..."
      //}
      var tags = material.fields.sys_tags.join(', ').substr(0, 30);
      // Make sure that we only display full words.
      tags = tags.substr(0, Math.min(tags.length, tags.lastIndexOf(",")));
      var item = [
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
  if($topicsResourceList.length) {
    app.topics.fetch();
  }
});

