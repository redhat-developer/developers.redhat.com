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
app.templates.productBuzzTemplate = '#{partial "product_buzz_template.html.slim"}';
app.templates.buzzTemplate = '#{partial "buzz_template.html.slim"}';
app.templates.termsAndConditionsTemplate = '#{partial "terms_and_conditions.html.slim"}';
app.templates.bookTemplate = '#{partial "book.html.slim"}';
app.templates.connectorTemplate = '#{partial "product-connectors-item.html.slim"}';

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
// app.dcp.url.search = 'http://dcp.jboss.org/';
app.dcp.url.content = '#{site.dcp_base_protocol_relative_url}v1/rest/content';
app.dcp.url.auth_status = '#{site.dcp_base_protocol_relative_url}v1/rest/auth/status';
app.dcp.url.rating = '#{site.dcp_base_protocol_relative_url}v1/rest/rating';
app.dcp.url.project= '#{site.dcp_base_protocol_relative_url}v1/rest/suggestions/project';
app.dcp.error_message = "<div class='dcp-error-message'>It appears we're unable to access this data right now. Look at <a href='http://twitter.com/jbossorg' target=_blank>@jbossorg</a> to see if there is scheduled maintenance, or try again shortly.</div>";

/*
  Temporary variables to use DCP v2 early. When the full site moves to DCP v2, remove these variables and update the 'app.dcp' variables (above) to use DCP v2 URLS.
*/
app.dcp2 = {};
app.dcp2.url = {};
app.dcp2.url.search = '#{site.dcp2_base_protocol_relative_url}v2/rest/search';
app.dcp2.url.project= '#{site.dcp2_base_protocol_relative_url}v2/rest/search/suggest_project_name_ngram_more_fields';
app.dcp2.url.events= '#{site.dcp2_base_protocol_relative_url}v2/rest/search/events';
app.dcp2.url.connectors= '#{site.dcp2_base_protocol_relative_url}v2/rest/search/connectors';

/*
  Products
*/

app.products = #{JSON.dump(site.products.keys.inject({}) {|map, product| map[product] = {upstream: site.products[product]['upstream_projects'] || '_none'}; map; })}


/*
 * Marketing ops
 */
app.mktg_ops = {};
app.mktg_ops.elqFormName = "#{site.elq_form_name || %Q{jboss-org-integration-sandbox}}"


/*
 * Keycloak Config
 */
app.ssoConfig = {};
app.ssoConfig.account_url = '#{site.keycloak_account_url}';
app.ssoConfig.auth_url = '#{site.keycloak_auth_url}';
