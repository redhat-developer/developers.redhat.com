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
app.templates.basicContributorTemplate = '#{partial "basic_contributor.html.slim"}';
app.templates.socialContributorTemplate = '#{partial "social_contributor.html.slim"}';

/*
  FastClick variable for faster tapping on touch devices
*/
app.fastClick = false;

/* 
  DCP setup
*/

app.dcp = {};
app.dcp.url = {};
app.dcp.url.search = '#{site.dcp_base_protocol_relative_url}v1/rest/search';
app.dcp.url.content = '#{site.dcp_base_protocol_relative_url}v1/rest/content';
app.dcp.url.auth_status = '#{site.dcp_base_protocol_relative_url}v1/rest/auth/status';
app.dcp.url.rating = '#{site.dcp_base_protocol_relative_url}v1/rest/rating';
app.dcp.error_message = "<div class='dcp-error-message'>It appears we're unable to access this data right now. Look at <a href='http://twitter.com/JBossDeveloper' target=_blank>@JBossDeveloper</a> to see if there is scheduled maintenance, or try again shortly.</div>";

/*
  Products
*/

app.products = #{JSON.dump(site.products.keys.inject({}) {|map, product| map[product] = {upstream: site.products[product]['upstream_projects'] || '_none'}; map; })}

