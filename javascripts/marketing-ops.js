/**
 * Scripts relating to marketing operations:
 * 
 * - Google Analytics
 * - Omniture
 * - Google Remarketing
 * - A/B testing
 * - Eloqua
 *
 * Marketing operations relies on extensively on third party SaaS. 
 *
 * This file provides any necessary customisations. Any global
 * variables required should be placed in the first section. Any
 * initialization scripts should be placed in the app.mktg_ops.init 
 * function, which will be called on page load.
 *
 */

/*******************
 * GLOBAL VARIABLES
 *******************
 */

/**
 * Google Ad Services - Remarketing
 * Remarketing tags may not be associated with personally identifiable information
 * or placed on pages related to sensitive categories. For instructions on adding
 * this tag and more information on the above requirements, read the setup guide: 
 * google.com/ads/remarketingsetup -->
 */

/**
 * Additional JS files to be loaded AFTER marketing-ops.js:
 * 
 * - http://www.googleadservices.com/pagead/conversion.js
 */

var google_conversion_id = 990030321;
var google_conversion_label = "rxV4CN_35QQQ8dOK2AM";
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;

/**
 * Eloqua
 *
 * Eloqua configuration is provided by Red Hat Marketing operations, and available
 * in elqCfg.js.
 */

/**
 * Additional JS files to be loaded BEFORE marketing-ops.js:
 * 
 * - http://www.redhat.com/j/elqNow/elqCfg.js
 */

/*
 * Copiued from elqImg.js to avoid loading issues
 */
var trackURL = document.URL;
if (trackURL.indexOf("?") != -1) {
	trackURL += "&async=true";
} else {
	trackURL += "?async=true";
}

var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', '1795']);
_elqQ.push(['elqTrackPageView', trackURL]);

(function () {
  var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
  s.src = '//img.en25.com/i/elqCfg.min.js';
  var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
})();

/** Copied from s_code.js **/
/*
 * Copy elqCustomerGUID value to a cookie so our servers can read it
 * Copied from elqCopyGUID.js
 */
app.mktg_ops.elqCookieCopy = function() {
  var cookieGUID = getCookie('elqGUID');
  if (!cookieGUID){
    var elqPPS = 70;
    // Copyright Eloqua Corporation.
    // patched 1-30-2013 gshereme@redhat.com to fix XSS vuln
    if ((typeof elqCurE != 'undefined') && (typeof elqPPS != 'undefined')){
      document.write('<SCR' + 'IPT TYPE="text/javascript" LANGUAGE="JavaScript" SRC="' + elqCurE + '?pps=' + elqPPS + '&siteid=' + elqSiteID + '&ref=' +
    elqReplace(elqReplace(elqReplace(elqReplace(elqReplace(elqReplace(location.href,'&','%26'),'#','%23'),'"','%22'),"'",'%27'),'<','%3C'),'>','%3E') 
    + '&ms=' + new Date().getMilliseconds() + '"><\/SCR' + 'IPT>');
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
};

/** 
 * Google Analytics
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount','UA-49596258-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/**
 * Adobe Analytics
 *
 * Variables reported to Adobe Analytics:
 *  -pageName
 *  -server
 *  -channel
 *  -first minor section
 *  -second minor section (if available)
 *  -third minor section (if available)
 *  -full URL (domain + path + query string)
 *  -base URL (domain + path)
 *  -language
 *  -country
 *
 */

/**
 * Additional JS files to be loaded BEFORE marketing-ops.js:
 *
 * - http://www.redhat.com/j/s_code.js
 *
 * Additional JS files to be loaded AFTER marketing-ops.js
 *
 * - http://www.redhat.com/j/rh_omni_footer.hs
 */


app.mktg_ops.aa = {};
app.mktg_ops.aa.setup = function() {

  // Load the path name, without it's inital /
  var arr = location.pathname.substr(1, location.pathname.length).toLowerCase().split('/');
  
  // If the path ends in index.html or whitespace, trim the array 
  if (arr[arr.length - 1] == "index.html" || arr[arr.length - 1] == "" ) {
    arr.pop();
  }
  
  /*
  * Assign values to Adobe Analytics properties
  */

  s.channel = "jboss | developer" // The channel is our top level classification
  s.server = "jboss" // The server is ???
  s.pageName = "jboss | developer | " + (arr[arr.length -1] || "homepage"); // pageName is jboss | developer | {page_name}. {page_name} has index.html removed
  s.prop2 = s.eVar22 = "en"; // prop2/eVar22 is the ISO 639-1 language code
  s.prop4 = s.eVar23 = encodeURI(location.search); //prop4/eVar23 is the query string of the page

  // Pad the array as needed, so we can shift away later
  for (var i = arr.length; i < 3; i++) {
    arr[i] = "";
  }

  s.prop14 = s.eVar27 = arr.shift(); // prop14/eVar27 is the first minor section (normally /{minor_section_1})
  s.prop15 = s.eVar28 = arr.shift(); // prop15/eVar28 is the second minor section (normally /a/{minor_section_2})
  s.prop16 = s.eVar29 = arr.shift(); // prop16/eVar29 is the third minor section (normally /a/b/{minor_section_3})
  s.prop21 = s.eVar18 = encodeURI(location.hostname+location.pathname).toLowerCase(); // prop21/eVar18 is the URL, less any query strings or fragments

  app.mktg_ops.elqCookieCopy('.jboss.org');

}

app.mktg_ops.aa.setup();


if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
  
/*****************
 * INIT FUNCTIONS
 *****************
 */

app.mktg_ops.init = function() {
  

};

/**************************
 * Marketing Ops Functions
 **************************
 */

app.mktg_ops.track = function(src) {
  _gaq.push(['_trackEvent', 'outbound', src.title, src.href]);
  // Eloqua will track the link
  _elq.trackEvent(src);
};

app.mktg_ops.elqFormSubmit = function (src) {
  var data = {
    "elqSiteID": "1795",
    "elqFormName": app.mktg_ops.elqFormName,
    "elqCustomerGUID": $.cookie('elqGUID'),
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

