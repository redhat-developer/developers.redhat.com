/*
 * Set up namespace and static vars
 */

var app = window.app = {};

/*
  Base URL
*/
app.baseUrl = drupalSettings.path.baseUrl;

/*
 Download Manager Base URL
 */
app.downloadManagerBaseUrl = drupalSettings.rhd.downloadManager.baseUrl;

/*
  Website Cache
*/
app.cache = {};


/*
  JS templates
*/
app.templates = {};
app.templates.miniBuzzTemplate = drupalSettings.rhd.templates.miniBuzz;
app.templates.productBuzzTemplate = drupalSettings.rhd.templates.productBuzz;
app.templates.buzzTemplate = drupalSettings.rhd.templates.buzz;
app.templates.termsAndConditionsTemplate = drupalSettings.rhd.templates.termsConditions;
app.templates.bookTemplate = drupalSettings.rhd.templates.book;
app.templates.connectorTemplate = drupalSettings.rhd.templates.connector;

/*
  FastClick variable for faster tapping on touch devices
*/
app.fastClick = false;

/*
  DCP setup
*/

app.dcp = {};
app.dcp.url = {};
app.dcp.url.search = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search';
app.dcp.url.content = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/content';
app.dcp.url.auth_status = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/auth/status';
app.dcp.url.rating = drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/rating';
app.dcp.url.project= drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/suggest_project_name_ngram_more_fields';
app.dcp.url.events= drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/events';
app.dcp.url.connectors= drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/connectors';
app.dcp.error_message = "<div class='dcp-error-message'>It appears we're unable to access this data right now. Look at <a href='http://twitter.com/jbossorg' target=_blank>@jbossorg</a> to see if there is scheduled maintenance, or try again shortly.</div>";
app.dcp.url.developer_materials= drupalSettings.rhd.dcp.baseProtocolRelativeUrl + '/v2/rest/search/developer_materials';
app.dcp.excludeResourceTags = ["red hat", "Red Hat", "redhat"];

// TODO: I pulled this from another file, we should find a better way to keep these up to date
app.dcp.availableTopics = ["AOP", "ActiveMQ", "ActiveMQ Endpoint", "Android", "AngularJS", "Apache Cordova",
        "Apache Deltaspike", "AppClient", "Arquillian", "Asynchronous EJB", "Asynchronous Servlet", "BMT", "BPMS", "BRMS",
        "BV", "Backbone", "Batch", "Batch 1.0", "Bean Validation 1.1", "Bundle packaging and deployment", "CDI", "CDI 1.1",
        "CEP", "CMT", "CXF", "CXFRS Endpoint", "Camel", "Concurrency Utilities", "Content Base Routing", "Cordova",
        "Crash Recovery", "DOM", "DOM4J", "Dandellion", "DeltaSpike", "Deltaspike", "Drools", "EAR",
        "EE Concurrency Utilities", "EJB", "EJB 3.1 Timer", "EJB 3", "EL 3.0", "Fabric8", "File Endpoint", "Forge", "Fuse",
        "GWT", "Github API", "H2", "HASingleton", "HTML5", "Hibernate", "Hibernate 3", "Hibernate 4", "HornetQ", "Hot Rod",
        "HotRod", "Http4 Endpoint", "Infinispan", "Interceptor 1.2", "Interceptors", "JAAS", "JACC", "JASPIC", "JAX-RS",
        "JAX-RS 2.0", "JAX-RS Client API", "JAX-WS", "JAX-WS 2.2", "JAXB transformation", "JAXP", "JBoss BPM Suite",
        "JBoss BRMS", "JBoss Data Grid", "JBoss DataVirt", "JBoss EAP", "JBoss Fuse", "JBoss Logging Tools", "JBoss Modules",
        "JBoss ON", "JCA 1.7", "JMS", "JMS 2.0", "JMX", "JNDI", "JPA", "JPA 2.0", "JPA 2.1", "JQuery", "JSF", "JSF 2.2", "JSF2",
        "JSON", "JSON-P", "JSON-P 1.0", "JSP", "JSTL", "JTA", "JTA 1.2", "JTS", "JUnit", "JWS", "JWT", "Java", "Java EE 7",
        "Java Servlet", "JavaMail", "JavaScript", "JavaScript Cordova", "Javamail 1.5", "Jenkins", "Junit", "Logging", "MBean",
        "MDB", "Maven", "Memcached", "Nexus", "OAuth", "OSGi", "Objective-C", "Optaplanner", "PicketLink",
        "PicketLink Federation", "PicketLink IDM", "Portal Container", "Portal Extension", "Portlet", "Portlet Bridge",
        "REST", "RESTful", "RF4", "RecipientList Endpoint with dynamic Restful URL",
        "Red Hat JBoss Enterprise Application Platform (JBoss EAP)", "Red Hat JBoss Portal", "Remote Query", "RestEasy",
        "Resteasy", "RichFaces", "SAML", "SAML v2.0", "SAX", "SFSB EJB", "SLSB EJB", "SQL Endpoint", "Security", "Servlet",
        "Servlet 3.1", "Servlet Filter", "Servlet Listener", "Servlets", "Set up the activemq for messaging broker.",
        "Shrinkwrap", "Singleton", "Sonar", "Spring", "Spring Boot", "Spring Data", "Spring MVC", "Spring MVC Annotations",
        "Topcoat", "Transactions", "Unified Push Java Client", "WAR", "WS-AT", "WS-BA", "WS-Trust", "WebSocket",
        "WebSocket through STOMP", "Websocket 1.0", "i18n", "iOS", "jBPM", "jQuery", "jQuery Mobile", "l10n", "webjars"];

app.dcp.thumbnails = {
    // jboss
    "jbossdeveloper_quickstart" : "/images/design/get-started/jbossdeveloper_quickstart.png",
    "jbossdeveloper_archetype" : "/images/design/get-started/jbossdeveloper_archetype.png",
    "jbossdeveloper_bom" : "/images/design/get-started/jbossdeveloper_bom.png",
    "jbossdeveloper_demo" : "/images/design/get-started/jbossdeveloper_demo.png",
    // futurerproof for when jboss goes unprefixed
    "quickstart" : "/images/design/get-started/jbossdeveloper_quickstart.png",
    "archetype" : "/images/design/get-started/jbossdeveloper_archetype.png",
    "bom" : "/images/design/get-started/jbossdeveloper_bom.png",
    "demo" : "/images/design/get-started/jbossdeveloper_demo.png",
    // redhat
    "solution" : "/images/design/get-started/solution.png",
    "article" : "/images/design/get-started/article.png",
    // need icons?
    "rht_knowledgebase_article" : "/images/design/get-started/article.png",
    "rht_knowledgebase_solution" : "/images/design/get-started/solution.png",
    "jbossdeveloper_vimeo" : "/images/design/get-started/article.png",
    "jbossdeveloper_connector" : "/images/design/get-started/article.png"
};

/*
  Products
  TODO: I pulled this from another file, we may need to figure out a better way to keep these up to date.
*/
app.products = {
        "amq": {"upstream": ["activemq", "fabric8"]},
        "bpmsuite": {"upstream": ["drools", "guvnor", "optaplanner", "jbpm"]},
        "brms": {"upstream": ["optaplanner", "drools", "guvnor"]},
        "cdk": {"upstream": "_none"},
        "datagrid": {"upstream": ["infinispan", "jgroups", "hibernate_subprojects_search"]},
        "datavirt": {"upstream": ["teiid", "teiiddesigner", "modeshape"]},
        "developertoolset": {"upstream": "_none"},
        "devstudio": {"upstream": ["jbosstools"]},
        "eap": {"upstream": ["wildfly", "jgroups", "hibernate", "hornetq", "jbossclustering", "jbossmc", "narayana", "jbossweb", "jbossws", "ironjacamar", "jgroups", "mod_cluster", "jbossas_osgi", "jbosssso", "picketlink", "resteasy", "weld", "wise", "xnio"]},
        "fuse": {"upstream": ["camel", "karaf", "activemq", "cxf", "fabric8"]},
        "mobileplatform": {"upstream": "_none"},
        "openshift": {"upstream": "_none"},
        "rhel": {"upstream": ["fedora"]},
        "softwarecollections": {"upstream": "_none"},
        "webserver": {"upstream": ["tomcat", "httpd", "mod_cluster"]}
    };

/*
 * Marketing ops
 */
app.mktg_ops = {};
//app.mktg_ops.elqFormName = "#{site.elq_form_name || %Q{jboss-org-integration-sandbox}}"; // TODO we don't appear to be using this


/*
 * Keycloak Config
 */
app.ssoConfig = {};
app.ssoConfig.account_url = drupalSettings.rhd.keycloak.accountUrl;
app.ssoConfig.auth_url = drupalSettings.rhd.keycloak.authUrl;
app.ssoConfig.confirmation = '/confirmation';

app.projects = {};
app.projects.defaultImage = "/images/design/projects/default_200x150.png";

