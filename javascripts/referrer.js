(function() {
  $(function() { 
    if(isReferrer('jbd')) {
      $('#referral-alert').removeClass('hide');
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
}());
