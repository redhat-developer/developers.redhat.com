/*
 * Set up namespace and static vars
 */

var app = window.app = {};

/*
  Base URL
*/
app.baseUrl = "#{site.base_url}";

/*
 Download Manager Base URL
 */
app.downloadManagerBaseUrl = "#{site.download_manager_base_url}";

/*
  Website Cache
*/
app.cache = {};


/*
  JS templates
*/
app.templates = {};
app.templates.searchpageTemplate = '#{partial "searchpage.html.slim"}';
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
app.dcp.url.search = '#{site.dcp_base_protocol_relative_url}v2/rest/search';
app.dcp.url.content = '#{site.dcp_base_protocol_relative_url}v2/rest/content';
app.dcp.url.auth_status = '#{site.dcp_base_protocol_relative_url}v2/rest/auth/status';
app.dcp.url.rating = '#{site.dcp_base_protocol_relative_url}v2/rest/rating';
app.dcp.url.project= '#{site.dcp_base_protocol_relative_url}v2/rest/search/suggest_project_name_ngram_more_fields';
app.dcp.url.events= '#{site.dcp_base_protocol_relative_url}v2/rest/search/events';
app.dcp.url.connectors= '#{site.dcp_base_protocol_relative_url}v2/rest/search/connectors';
app.dcp.error_message = "<div class='dcp-error-message'>It appears we're unable to access this data right now. Look at <a href='http://twitter.com/jbossorg' target=_blank>@jbossorg</a> to see if there is scheduled maintenance, or try again shortly.</div>";
app.dcp.url.developer_materials= '#{site.dcp_base_protocol_relative_url}v2/rest/search/developer_materials';
app.dcp.excludeResourceTags = ["red hat", "Red Hat", "redhat"];

app.dcp.availableTopics = #{JSON.dump(site.dev_mat_techs.flatten.uniq.sort)};
app.dcp.thumbnails = {
    // jboss
    "jbossdeveloper_quickstart" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_quickstart.png')}",
    "jbossdeveloper_archetype" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_archetype.png')}",
    "jbossdeveloper_bom" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_bom.png')}",
    "jbossdeveloper_demo" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_demo.png')}",
    // futurerproof for when jboss goes unprefixed
    "quickstart" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_quickstart.png')}",
    "archetype" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_archetype.png')}",
    "bom" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_bom.png')}",
    "demo" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_demo.png')}",
    // redhat
    "solution" : "#{cdn( site.base_url + '/images/design/get-started/solution.png')}",
    "article" : "#{cdn( site.base_url + '/images/design/get-started/article.png')}",
    // need icons?
    "rht_knowledgebase_article" : "#{cdn( site.base_url + '/images/design/get-started/article.png')}",
    "rht_knowledgebase_solution" : "#{cdn( site.base_url + '/images/design/get-started/solution.png')}",
    "jbossdeveloper_vimeo" : "#{cdn( site.base_url + '/images/design/get-started/article.png')}",
    "jbossdeveloper_connector" : "#{cdn( site.base_url + '/images/design/get-started/article.png')}"
};

/*
  Products
*/
app.products = #{JSON.dump(site.products.keys.inject({}) {|map, product| map[product] = {upstream: site.products[product]['upstream_projects'] || '_none'}; map; })};


/*
 * Marketing ops
 */
app.mktg_ops = {};
app.mktg_ops.elqFormName = "#{site.elq_form_name || %Q{jboss-org-integration-sandbox}}";


/*
 * Keycloak Config
 */
app.ssoConfig = {};
app.ssoConfig.account_url = '#{site.keycloak_account_url}';
app.ssoConfig.auth_url = '#{site.keycloak_auth_url}';
app.ssoConfig.confirmation = '#{site.base_url}/confirmation';

app.projects = {};
app.projects.defaultImage = "#{cdn( site.base_url + '/images/design/projects/default_200x150.png')}";
