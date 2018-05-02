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
 * Additional JS files to be loaded BEFORE adobe-analytics.js:
 *
 * - http://www.redhat.com/j/s_code.js
 *
 * Additional JS files to be loaded AFTER adobe-analytics.js
 *
 * - http://www.redhat.com/j/rh_omni_footer.hs
 */


(function() {

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

})();

