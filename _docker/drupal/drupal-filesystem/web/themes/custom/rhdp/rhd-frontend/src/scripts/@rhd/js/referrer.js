(function() {
  $(function() { 
    var referrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>You have been redirected from JBoss.org to Red Hat Developers.</h3><p>It'+"'"+'s true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a></p><a class="close"><i class="fas fa-times"></i></a></div></div></div></section>');
    var jbdReferrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>Welcome jboss.org members!</h3><p>It'+"'"+'s true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a></p></div></div></div></section>');
    if(isReferrer('jbd')) {
      switch (getPrimaryCategory()) {
        case 'middleware': // before class rh-jboss-middleware
          jbdReferrerHTML.insertBefore('main');
          break;
        default:
          referrerHTML.insertBefore('main');
          break;
      }
      
      $('#referral-alert .close').on("click", function() {
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
    var bc = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//,'').replace(/\/$/,'').split('?')[0].split('#')[0].split(/\//);
    return bc[0]; 
  }
}());
