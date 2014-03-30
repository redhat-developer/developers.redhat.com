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

app.mktg_ops = {};

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
 * Additional JS files to be loaded AFTER marketing-ops.js:
 * 
 * - http://www.redhat.com/j/elqNow/elqCfg.js
 * - http://www.redhat.com/j/elqNow/elqImg.js
 */

/** 
 * Google Analytics
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount','UA-49376381-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/**
 * Omniture
 */
/**
 * Additional JS files to be loaded BEFORE marketing-ops.js:
 *
 * - http://www.redhat.com/j/s_code.js
 */

var s_code=s.t();
if(s_code)document.write(s_code);
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
  // Eloqua will track the link and perform a redirect
  _elq.trackOutboundLink(src);
};

