---
interpolate: true
---

/*
 * Set up namespace and static vars
 */

var app = window.app = {};
/* 
  Website Cache
*/
app.cache = {};

/*
  JS templates
*/
app.templates = {};
app.templates.miniBuzzTemplate = '#{partial "mini_buzz_template.html.slim"}';
app.templates.buzzTemplate = '#{partial "buzz_template.html.slim"}';


/*
  FastClick variable for faster tapping on touch devices
*/
app.fastClick = false;

/* 
  DCP setup
*/

app.dcp = {};
app.dcp.url = '#{URI.join site.dcp_base_url, "v1/rest/search"}';

