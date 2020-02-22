/**
 * @file
 * Related Content Component
 * Shows up on the 'More Like These' section of video pages
 */

(function ($, Drupal) {

  app = window.app || {};
  app.relatedContent = {};

  app.relatedContent.fetch = function ($parent) {
    $($parent).addClass('loading');

    // @TODO: This field not formatted correctly and the logic for it is currently disabled via comments.
    //var contentCount = $('.field--name-field-related-content .related-content-card', $parent).length;
    //contentCount = 4 - contentCount;

    var typeString = '&sys_type=cheatsheet&sys_type=video&sys_type=book&sys_type=article&sys_type=blogpost';
    var tags = ($parent.data('tags') || '');
    var tagsString = '';

    try {
      tags = JSON.parse(tags.replace(/'/g, '\"'));
    } catch (e) {
      tags = '';
    }

    if (tags) {
      for (var i = 0; i < tags.length; i++) {
        if (i > 0) {
          tags[i] = '&tag=' + tags[i];
        }
        tagsString += (tags[i]).toLowerCase();
      }
    }

    $.getJSON(app.dcp.url.search + '/developer_materials?tags_or_logic=true&filter_out_excluded=true&size10=true&tag=' + tagsString + typeString, function (data) {
      if (data.hits && data.hits.hits) {

        // Set this equal to contentCount if we return to supporting other cards in this field.
        data.hits.hits.length = 4;
        app.relatedContent.render(data.hits.hits, $parent);
      }
    });
  };

  app.relatedContent.render = function (materials, $parent) {
    var html = [];
    materials.forEach(function (material) {
      var type = material.fields.sys_type[0];
      var canDisplay = material.fields.sys_title && material.fields.sys_description && material.fields.sys_description.length > 0;
      if (canDisplay) {
        if (material.fields.sys_type[0] == 'blogpost') {
          if (material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog') || material.fields.sys_url_view[0].startsWith('https://developers.redhat.com/blog')) {
            material.fields.sys_url_view[0] = material.fields.sys_url_view[0];
          }
          else if (material.fields.sys_url_view[0].match(/http(s?):\/\/developerblog.redhat.com\/.*/g)) {
            material.fields.sys_url_view[0] = material.fields.sys_url_view[0].replace(/http(s?):\/\/developerblog.redhat.com\//, 'https://developers.redhat.com/blog/')
          }

          else {
            var post_id = /-(.+)/.exec(material._id)[1];
            material.fields.sys_url_view[0] = '//planet.jboss.org/post/' + post_id;
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
        title = title.replace('| Red Hat Developer Program', '');

        var item = [
          '<div class="pf-c-card rhd-c-card">',
          '  <div class="rhd-c-card__tag">' + material.fields.sys_type + '</div>',
          '  <div class="rhd-c-card-content">',
          '    <h3 class="rhd-c-card__title rhd-m-card-title__no-image">',
          '    <span class="line-clamp-2">' + title + '</span></h3>',
          '    <div class="rhd-c-card__footer">',
          '      <a class="rhd-m-link" href="' + material.fields.sys_url_view[0] + '">Read More <i class="fas fa-arrow-right"></i></a>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('');

        html.push(item);
        $($parent).removeClass('loading');
      }
    });

    // $($parent).html(html.join(''));
    $(html.join('')).appendTo($parent);
    var $clampItems = $('.line-clamp-2', $parent);
    $clampItems.each(function () {
      var $tmpItem = $(this);
      $clamp($tmpItem.get(0), { clamp: 2, useNativeClamp: true });
    });
  };

  Drupal.behaviors.rhd_videoRelatedContent = {
    attach: function (context, settings) {
      var $videoRelatedContentList = $('#video-related-cont', context);
      if ($videoRelatedContentList.length) {
        app.relatedContent.fetch($videoRelatedContentList);
      }
    }
  }
})(jQuery, Drupal);
