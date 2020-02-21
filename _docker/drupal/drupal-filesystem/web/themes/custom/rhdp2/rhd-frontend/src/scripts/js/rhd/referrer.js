(function () {
  $(function () {
    var referrerHTML = $('<section id="referral-alert" class="component"><div class="pf-c-alert pf-m-info pf-m-inline component-limit-width" aria-label="Information alert"><div class="pf-c-alert__icon"><i class="fas fa-info-circle" aria-hidden="true"></i></div><h3 class="pf-c-alert__title">You have been redirected from JBoss.org to Red Hat Developers.</h3><div class="pf-c-alert__description"><p>It' + "'" + 's true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a></p></div><div class="pf-c-alert__action"><button class="pf-c-button pf-m-plain" type="button" aria-label="Close alert: You have been redirected"><i class="fas fa-times" aria-hidden="true"></i></button></div></div></section>');
    var jbdReferrerHTML = $('<section id="referral-alert" class="component"><div class="pf-c-alert pf-m-info pf-m-inline component-limit-width aria-label="Information alert""><div class="pf-c-alert__icon"><i class="fas fa-info-circle" aria-hidden="true"></i></div><h3 class="pf-c-alert__title">Welcome jboss.org members!</h3><div class="pf-c-alert__description"><p>It' + "'" + 's true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a></p></div><div class="pf-c-alert__action"><button class="pf-c-button pf-m-plain" type="button" aria-label="Close alert: You have been redirected"><i class="fas fa-times" aria-hidden="true"></i></button></div></div></section>');
    if (isReferrer('jbd')) {
      switch (getPrimaryCategory()) {
        case 'middleware': // before class rh-jboss-middleware
          jbdReferrerHTML.insertBefore('main');
          break;
        default:
          referrerHTML.insertBefore('main');
          break;
      }
      $('#referral-alert .pf-c-alert__action').on("click", function() {
        $('#referral-alert').addClass('pf-u-display-none');
      });
    }
  });

  function isReferrer(ref) {
    var referrer = false,
      url = window.location.href,
      querystring = url.split('?').pop(),
      qsList = [],
      vals = {};
    if (querystring !== url) {
      qsList = querystring.split('&');
      for (var i = 0, o = qsList.length; i < o; i++) {
        vals[qsList[i].split('=')[0]] = qsList[i].split('=')[1];
      }
      referrer = vals['referrer'] === ref;
    }
    return referrer;
  }

  function getPrimaryCategory() {
    var bc = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//, '').replace(/\/$/, '').split('?')[0].split('#')[0].split(/\//);
    return bc[0];
  }
}());
