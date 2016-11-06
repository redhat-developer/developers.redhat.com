(function() {
  $(function() { 
    var referrerHTML = $('<section id="referral-alert"><div class="row content"><div class="large-24 columns"><div class="alert-box info radius"><h4>You have been redirected from JBoss.org to Red Hat Developers.</h4><p>It'+"'"+'s true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="http://developers.redhat.com/">developers.redhat.com.</a></p><a class="close">x</a></div></div></div></section>');
    if(isReferrer('jbd')) {
      switch (getPrimaryCategory()) {
        case 'products': // before class .mobile.product-header
          if ($('.mobile.product-header').length > 0) {
            referrerHTML.insertBefore('.mobile.product-header');
          } else {
            referrerHTML.insertAfter('.hero');
          }
          break;
        case 'downloads': // before class most-popular-downloads
          referrerHTML.insertBefore('.most-popular-downloads');
          break;
        case 'devops':
        case 'enterprise-java':
        case 'iot':
        case 'microservices':
        case 'mobile':
        case 'web-and-api-development':
        case 'dotnet':
        case 'containers': // first of class topics-main
          referrerHTML.insertBefore('.topics-main div:first');
          break;
        case 'community': // after class contributors-main
          referrerHTML.insertAfter('.contributors-main');
          break;
        case 'about':
        case 'books': 
        case 'articles':
        case 'quickstarts': // after id start
          referrerHTML.insertBefore('.node__content');
          break;
        case 'spotlights':
        case 'variants':
        case 'vjbug':
        case 'terms-and-conditions':
        case 'ticket-monster':
        case 'archetypes':
        case 'boms':
        case 'demos':
        case 'general-error':
        case 'video':
        case 'promotions':
        case 'webinars':
        case 'devnation2015':
        case 'forums':
        case 'events': // after class hero
          if ($('.hero').length > 0) {
            referrerHTML.insertAfter('.hero');
          } else { 
            referrerHTML.insertBefore('#page');
          }
          break;
        case 'projects':
        case 'resources':
        case 'stack-overflow':
          referrerHTML.insertAfter('header:first');
          break;
        case '':
          referrerHTML.insertAfter('.spotlights-wrap');
          break;
      }
      
      $('#referral-alert .close').click(function() {
        $('#referral-alert').addClass('hide');
      });
    }
  });

  function isReferrer(ref) {
    var referrer = false, 
      url = window.location.href,
      querystring = url.split('?').pop(),
      qsList = [],
      vals = {};
    if(querystring !== url) {
      qsList = querystring.split('&');
      for (var i=0, o=qsList.length; i<o; i++) {
        vals[qsList[i].split('=')[0]] = qsList[i].split('=')[1];
      }
      referrer = vals['referrer'] === ref;
    }
    return referrer;
  }

  function getPrimaryCategory() {
    return window.location.href.split('?')[0].split('#')[0].split('/')[3];
  }
}());
