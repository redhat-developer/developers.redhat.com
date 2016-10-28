(function() {
  $(function() { 
    var referrerHTML = $('<section id="referral-alert"><div class="row content"><div class="large-24 columns"><div class="large-24 columns"><div class="alert-box info radius"><h4>You have been redirected from JBoss.org to Red Hat Developers.</h4><p>It'+"'"+'s true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="http://developers.redhat.com/">developers.redhat.com.</a></p><a class="close">x</a></div></div></div></div></section>');
    if(isReferrer('jbd')) {
      switch (getPrimaryCategory()) {
        case 'products': // before class .mobile.product-header
          referrerHTML.insertBefore('.mobile.product-header');
          break;
        case 'downloads': // before class most-popular-downloads
          referrerHTML.insertBefore('.most-popular-downloads');
          break;
        case 'containers': // first of class topics-main
          referrerHTML.insertBefore('.topics-main div:first');
          break;
        case 'community': // after class contributors-main
          referrerHTML.insertAfter('.contributors-main');
          break;
        case 'quickstarts': // after id start
          referrerHTML.insertAfter('#start');
          break;
        case 'events': // after class hero
          referrerHTML.insertAfter('.hero');
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
    return window.location.href.split('?')[0].split('/')[3];
  }
}());
