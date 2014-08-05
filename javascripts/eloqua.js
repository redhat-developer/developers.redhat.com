(function() {

  var getCookie = function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
      }
      return "";
  }

  var formSubmit = function (src) {
    var data = {
      "elqSiteID": "1795",
      "elqFormName": app.mktg_ops.elqFormName,
      "elqCustomerGUID": getCookie('elqGUID'),
      //"C_EmailAddress": "", TODO
      "A_RedirectURL": src,
      "A_TacticID_Internal": "701600000InternalTactic",
      "A_TacticID_External": "701600000ExternalTactic",
      "A_ElqVisitorGuid":  $.cookie('elqGUID'),
      "F_FormData_Trigger": "Consumed through click",
      "nocache": new Date().getTime()
    };
    $.getJSON("http://query.yahooapis.com/v1/public/yql", {
      q: "select * from json where url=\"https://secure.eloqua.com/e/f2?" + decodeURIComponent($.param(data)) + "\"",
      format: "json"
    });
  };

  /*
   * Additional JS files to be loaded BEFORE marketing-ops.js:
   * 
   * - http://www.redhat.com/j/elqNow/elqCfg.js
   */

  /*
   * Copiued from http://www.redhat.com/j/elqNow/elqImg.js to avoid loading issues
   */
  var trackURL = document.URL;
  if (trackURL.indexOf("?") != -1) {
    trackURL += "&async=true";
  } else {
    trackURL += "?async=true";
  }

  window._elqQ = window._elqQ || [];
  window._elqQ.push(['elqSetSiteId', '1795']);
  window._elqQ.push(['elqTrackPageView', trackURL]);

  var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
  s.src = '//img.en25.com/i/elqCfg.min.js';
  var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);


  var cookieGUID = getCookie('elqGUID');
  if (!cookieGUID){
    var elqPPS = 70;
    // Copyright Eloqua Corporation.
    // patched 1-30-2013 gshereme@redhat.com to fix XSS vuln
    if ((typeof elqCurE != 'undefined') && (typeof elqPPS != 'undefined')){
      var firstScript = document.getElementsByTagName('script')[0], tag = document.createElement('script');
      tag.src =  elqCurE + '?pps=' + elqPPS + '&siteid=' + elqSiteID + '&ref=' +
    elqReplace(elqReplace(elqReplace(elqReplace(elqReplace(elqReplace(location.href,'&','%26'),'#','%23'),'"','%22'),"'",'%27'),'<','%3C'),'>','%3E') 
    + '&ms=' + new Date().getMilliseconds();
      firstScript.parentNode.insertBefore(tag, firstScript);
    }
    var _onload = function() {
      if (typeof GetElqCustomerGUID == 'function') {
        document.cookie = 'elqGUID' + "=" + escape(GetElqCustomerGUID()) + ";expires=" + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toGMTString() + ";path=/";
      }
    }
    if (window.addEventListener) {
      window.addEventListener('load', _onload, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', function() { return _onload.apply(window, new Array(window.event)); });
    }
  }

  // TODO Call formSubmit if necessary
})();

