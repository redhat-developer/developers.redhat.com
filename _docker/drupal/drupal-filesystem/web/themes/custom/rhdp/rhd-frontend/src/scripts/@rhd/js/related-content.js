/*
  Related Content Component
  Shows up on the 'More Like These' section of video pages

  sys_type:
  cheatsheet
  // webpage
  // event
  // forumthread
  // stackoverflow_thread
  // quickstart
  //  demo  
  // jbossdeveloper_bom
  // jbossdeveloper_archetype
  // jbossdeveloper_example
  video
  book
  article
  //solution
  blogpost

  // excluded
*/

app = window.app || {};

app.relatedContent = {};


app.relatedContent.fetch = function() {
  $("div.video-related-content.video-related-content-list").addClass('loading');
  
  var contentCount = $('#video-related-cont').find('.field--name-field-related-content .related-content-card').length;
  contentCount = 4 - contentCount;
  var typeString = '&sys_type=cheatsheet&sys_type=video&sys_type=book&sys_type=article&sys_type=blogpost';
  var tags = ($('#video-related-cont').data('tags') || "");
  var tagsString = "";

  try {
    tags = JSON.parse(tags.replace(/'/g, "\""));
  } catch (e) {
    tags = "";
  }

  if(tags){   
    for (var i = 0; i < tags.length; i++) {
      if (i > 0) {
        tags[i] = "&tag=" + tags[i];
      }
      tagsString += (tags[i]).toLowerCase();
    }
  }

  $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&filter_out_excluded=true&size10=true&tag=' + tagsString + typeString, function(data){
    if(data.hits && data.hits.hits) {
      data.hits.hits.length = contentCount;
      app.relatedContent.render(data.hits.hits);
    }
  });
};

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

      switch (material.fields.sys_type[0]) {
        case 'blogpost':
          material.fields.sys_type[0] = 'Blog Post';
          break;
        case 'jbossdeveloper_archetype':
          material.fields.sys_type[0] = 'Archetype';
          break;
        case 'jbossdeveloper_bom':
          material.fields.sys_type[0] = 'Bom';
          break;
        case 'cheatsheet':
          material.fields.sys_type[0] = 'Cheat Sheet';
          break;
        case 'forumthread':
          material.fields.sys_type[0] = 'Forum Thread';
          break;
        case 'jbossdeveloper_example' || 'quickstart_early_access':
          material.fields.sys_type[0] = 'Demo';
          break;
        case 'solution':
          material.fields.sys_type[0] = 'Article';
          break;
        case 'stackoverflow_thread':
          material.fields.sys_type[0] = 'Stack Overflow';
          break;
        case 'webpage' || 'website':
          material.fields.sys_type[0] = 'Web Page';
          break;
      }

      var title = material.fields.sys_title[0];
      title = title.replace("| Red Hat Developer Program", "");

      var item = [
        '<div class="large-6 columns related-content-card">',
        '<h6>Related ' + material.fields.sys_type + '</h6>',
        '<h4><span class="line-clamp-2">' + title + '</span></h4>',
        '<p class="description">',
        '<a class="light-cta" href="' + material.fields.sys_url_view[0] + '">Read More</a>',
        '</p>',
        '</div>'
      ].join('');

      html.push(item);
      $("div.video-related-content.video-related-content-list").removeClass('loading');
    }
  });

  $('.video-related-content-list').html(html.join(''));
  var $clampItems = $('.video-related-content-list').find(".line-clamp-2");
  $clampItems.each(function() {
      var $tmpItem = $(this);
      $clamp($tmpItem.get(0), {clamp: 2, useNativeClamp: true});      
  });
};

$(function() {
  var $videoRelatedContentList = $('.video-related-content-list');
  // check if we are on a page that needs this to run
  if($videoRelatedContentList.length) {
    app.relatedContent.fetch();
  }
});
