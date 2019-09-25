(function ($, Drupal) {
  Drupal.behaviors.disqusCommentCountLinks = {
    attach: function attach(context, settings) {
      if (!settings.rhdDisqus.apiKey || !settings.rhdDisqus.shortName || !settings.rhdDisqus.disqusCommentCounter) {
        return false;
      }

      var params = { api_key: settings.rhdDisqus.apiKey, forum: settings.rhdDisqus.shortName };
      $('[data-disqus-comment-count]').once('disqusCommentCountLinks').each(function (key, commentCountContainer) {

        var commentCountSuccess = function(thread) {
          if (thread.posts <= 0) {
            return false;
          }
          $(commentCountContainer).find('[data-disqus-comment-count-number]').html(thread.posts);
          if (thread.posts === 1 || thread.posts === '1') {
            $(commentCountContainer).find('[data-disqus-comment-count-verbage]').html('Comment');
          }
          $(commentCountContainer).removeClass('hidden');
        }

        var link = $(commentCountContainer).attr('data-disqus-thread-link');
        var liveLink = "developers.redhat.com";
        params['thread:link'] = link;

        // check if link is on same domain or or live domain
        if(link.indexOf(liveLink) >= 0) {
          getThreadInfo(params, commentCountSuccess);
        }
      });
    }
  };

  Drupal.behaviors.disqusRecentComments = {
    attach: function attach(context, settings) {
      if (!settings.rhdDisqus.apiKey || !settings.rhdDisqus.shortName) {
        return false;
      }

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      $('[data-rhd-disqus-recent-comments]').once('disqusRecentComments').each(function(key, instance) {
        var getRecentCommentThreads = function(params, commentData) {
          if (commentData.length === 0) {
            return false;
          }

          $(instance).html('');

          $(commentData).each(function (key, comment) {
            var parseThreadInfo = function(thread) {
              comment.threadLink = thread.link;
              comment.threadTitle = thread.title;
              themeRecentComment(comment);
            };

            params.thread = comment.thread;

            getThreadInfo(params, parseThreadInfo);
          });
        };

        var themeRecentComment = function(comment) {
          var template = $(instance).siblings('.template--rhd-disqus--comment--latest').children().clone(); // get template
          var date = new Date(comment.createdAt); // convert date string to object
          var formattedDate = monthNames[date.getMonth()] + ' ' + date.getDate() + '&comma; ' + date.getFullYear(); // format date

          $(template).find('.comment-body').html(comment.raw_message); // replace body
          $(template).find('.comment-body').succinct({ size: 177 }).prepend('&ldquo;').append('&rdquo;'); // truncate and add quotes
          $(template).find('.date').html(formattedDate);
          $(template).find('.comment-title').html(comment.threadTitle);
          $(template).find('.reply-link').attr('href', comment.threadLink + '#comment-' + comment.id);

          $(template).removeClass('hidden').appendTo(instance); // add new comment markup to DOM
        };

        var recentCommentsFail = function(response) {
          if (typeof(comments) === 'undefined' || comments === false) {
            $(instance.element).html('Oops! We were unable to retrieve comments at this time.');
          }
        }
        getComments({ api_key: settings.rhdDisqus.apiKey, forum: settings.rhdDisqus.shortName, limit: $(instance).data('rhd-disqus-limit') ? $(instance).data('rhd-disqus-limit') : 4 }, getRecentCommentThreads, recentCommentsFail);
      });
    }
  };

  function getTrustedDomains(params, callback) {
    $.ajax({
      url: "https://disqus.com/api/3.0/forums/trustedDomain/list.json",
      type: "get",
      data: params,
      success: function(response) {
        var data = response.response;
        callback(data);
      }
    });
  }

  function getComments(params, successCallback, failureCallback) {
    $.ajax({
      url: "https://disqus.com/api/3.0/posts/list.json",
      type: "get",
      data: params,
      success: function(response) {
        var data = response.response;

        if (data.length === 0) {
          failureCallback(data);
        }
        else {
          successCallback(params, data);
        }
      },
      error: function(response) {
        failureCallback(response);
      }
    });
  };

  function getThreadInfo(params, successCallback, failureCallback) {
    var threadParams = Object.assign(params);
    if (threadParams.limit) {
      delete threadParams.limit;
    }
    $.ajax({
      url: "https://disqus.com/api/3.0/threads/details.json",
      type: "get",
      data: threadParams,
      success: function(response) {
        if (successCallback) {
          var data = response.response;
          successCallback(data);
        }
      },
      error: function(response) {
        if (failureCallback) {
          var data = response.response;
          failureCallback(data);
        }
      }
    });
  };
})(jQuery, Drupal);

/*
 * Copyright (c) 2014 Mike King (@micjamking)
 *
 * jQuery Succinct plugin
 * Version 1.1.0 (October 2014)
 *
 * Licensed under the MIT License
 */
/*global jQuery*/
!function(a){"use strict";a.fn.succinct=function(b){var c=a.extend({size:240,omission:"...",ignore:!0},b);return this.each(function(){var b,d,e=a(this),f=/[!-\/:-@\[-`{-~]$/,g=function(){e.each(function(){b=a(this).html(),b.length>c.size&&(d=a.trim(b).substring(0,c.size).split(" ").slice(0,-1).join(" "),c.ignore&&(d=d.replace(f,"")),a(this).html(d+c.omission))})};g()})}}(jQuery);
