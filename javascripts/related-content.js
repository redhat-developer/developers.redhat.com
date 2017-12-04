/*
  Related Content Component
  Shows up on the 'More Like These' section of video pages
*/

app = window.app || {};

app.relatedContent = {};


app.relatedContent.fetch = function() {
  $("div.video-related-content.video-related-content-list").addClass('loading');
  
  var contentCount = $('#video-related-cont').find('.field--name-field-related-video .related-video-content-card').length;
  contentCount = 4 - contentCount;
  console.log(contentCount);
  var tags = ($('#video-related-cont').data('tags') || "")
  console.log(tags);
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
  $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&filter_out_excluded=true&size10=true&tag=' + tagsString, function(data){
    if(data.hits && data.hits.hits) {
      data.hits.hits.length = contentCount;
      app.relatedContent.render(data.hits.hits);
    }
  });

}

app.relatedContent.render = function(materials) {
  var html = [];
  materials.forEach(function(material){
    var type = material.fields.sys_type[0];
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
      title = title.replace("| Red Hat Developers", "");

      var item = [
        '<div class="large-6 columns related-video-content-card">',
        '<h6>Related ' + material.fields.sys_type + '</h6>',
        '<h4><span  >' + title + '</span></h4>',
        '<p class="description">',
        '<a href="' + material.fields.sys_url_view[0] + '">Read More &#x25B8;</a>',
        '</p>',
        '</div>'
      ].join('');

      html.push(item);
      $("div.video-related-content.video-related-content-list").removeClass('loading');
    }
  });

  $('.video-related-content-list').html(html.join(''));

}

$(function() {
  var $videoRelatedContentList = $('.video-related-content-list');
  // check if we are on a page that needs this to run
  if($videoRelatedContentList.length) {
    app.relatedContent.fetch();
  }
});
