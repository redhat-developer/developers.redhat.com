import RHDPSearchURL from './rhdp-search-url';
import RHDPSearchQuery from './rhdp-search-query';
import RHDPSearchBox from './rhdp-search-box';
import RHDPSearchResultCount from './rhdp-search-result-count';
import RHDPSearchFilters from './rhdp-search-filters';
import RHDPSearchOneBox from './rhdp-search-onebox';
import RHDPSearchResults from './rhdp-search-results';
import RHDPSearchSortPage from './rhdp-search-sort-page';

export default class RHDPSearchApp extends HTMLElement {
    constructor() {
        super();
    }

    _name = 'Search';
    _url;
    _oburl = '../rhdp-apps/onebox/onebox.json';

    get name() {
        return this._name;
    }

    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.setAttribute('name', this.name);
    }

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._url === val) return;
        this._url = val;
        this.query.url = this.url;
        this.setAttribute('url', this.url);
    }

    get oburl() {
        return this._oburl;
    }
    set oburl(val) {
        if (this._oburl === val) return;
        this._oburl = val;
    }

    template = `<div class="rhd-c-search-page">
    <span class="rhd-c-search-outage-message search-outage-msg"></span>
    <div class="searchpage-middle">
        <div class="rhd-c-search-page-header">
          <h2>${this.name}</h2></div>
        </div>
        <div class="rhd-c-search-body pf-l-grid pf-m-gutter">
            <div class="rhd-c-search-body-left pf-l-grid__item pf-m-4-col-on-md pf-m-12-col-on-sm"></div>
            <div class="rhd-c-search-body-right pf-l-grid__item pf-m-8-col-on-md pf-m-12-col-on-sm"></div>
        </div>
    </div>
    <a href="#top" id="scroll-to-top"><i class="fas fa-arrow-circle-up"></i></a>
    </div>`;

    urlEle = new RHDPSearchURL();
    query = new RHDPSearchQuery();
    box = new RHDPSearchBox();
    count = new RHDPSearchResultCount();
    filters = new RHDPSearchFilters();
    active = new RHDPSearchFilters();
    modal = new RHDPSearchFilters();
    onebox = new RHDPSearchOneBox();
    results = new RHDPSearchResults();
    sort = new RHDPSearchSortPage();

    filterObj = {
        term: '',
        facets: [
            {
                name: 'Topics', key: 'tag', items: [
                    /*
                    Architecture
                    Big Data
                    CI/CD
                    Containers
                    DevOps
                    Integration
                    Internet of Things
                    Java
                    Kubernetes
                    Linux
                    Microservices
                    Performance
                    Programming Languages
                    Security
                    Serverless
                    Service Mesh
                    Spring Boot
                    */
                    { key: 'dotnet', name: '.NET', value: ['dotnet', '.net', 'visual studio', 'c#'] },
                    { key: 'containers', name: 'Containers', value: ['atomic', 'cdk', 'containers'] },
                    { key: 'devops', name: 'DevOps', value: ['devops', 'CI', 'CD', 'Continuous Delivery'] },
                    { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'Red Hat Decision Manager', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                    { key: 'iot', name: 'Internet of Things', value: ['iot', 'Internet of Things'] },
                    { key: 'microservices', name: 'Microservices', value: ['microservices', ' WildFly Swarm'] },
                    { key: 'mobile', name: 'Mobile', value: ['mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
                    { key: 'web-and-api-development', name: 'Web and API Development', value: ['Web', 'API', 'HTML5', 'REST', 'Camel', 'Node.js', 'RESTEasy', 'JAX-RS', 'Tomcat', 'nginx', 'Rails', 'Drupal', 'PHP', 'Bottle', 'Flask', 'Laravel', 'Dancer', 'Zope', 'TurboGears', 'Sinatra', 'httpd', 'Passenger'] },
                ]
            },
            {
                name: 'Content type', key: 'type', items: [
                    { key: 'apidocs', name: 'APIs and Docs', value: ['rht_website', 'rht_apidocs'], type: ['apidocs'] },
                    { key: 'archetype', name: 'Archetype', value: ['jbossdeveloper_archetype'], type: ['jbossdeveloper_archetype'] },
                    { key: 'article', name: 'Article', value: ['rht_knowledgebase_article', 'rht_knowledgebase_solution'], type: ['rht_knowledgebase_article', 'rht_knowledgebase_solution'] },
                    { key: 'blogpost', name: "Blog Posts", value: ['jbossorg_blog'], type: ['jbossorg_blog'] },
                    { key: 'book', name: "Book", value: ["jbossdeveloper_book"], type: ["jbossdeveloper_book"] },
                    { key: 'bom', name: "BOM", value: ["jbossdeveloper_bom"], type: ['jbossdeveloper_bom'] },
                    { key: 'cheatsheet', name: "Cheat Sheet", value: ['jbossdeveloper_cheatsheet'], type: ['jbossdeveloper_cheatsheet'] },
                    { key: 'demo', name: 'Demo', value: ['jbossdeveloper_demo'], type: ['jbossdeveloper_demo'] },
                    { key: 'event', name: 'Event', value: ['jbossdeveloper_event'], type: ['jbossdeveloper_event'] },
                    { key: 'forum', name: 'Forum', value: ['jbossorg_sbs_forum'], type: ['jbossorg_sbs_forum'] },
                    { key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"], type: ['jbossdeveloper_example'] },
                    { key: 'quickstart', name: "Quickstart", value: ['jbossdeveloper_quickstart'], type: ['jbossdeveloper_quickstart'] },
                    { key: 'stackoverflow', name: 'Stack Overflow', value: ['stackoverflow_question'], type: ['stackoverflow_question'] },
                    { key: 'video', name: "Video", value: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'], type: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'] },
                    { key: 'webpage', name: "Web Page", value: ['rht_website'], type: ['rht_website'] }
                ]
            },
            {
                name: 'Products &amp; Project',
                key: 'project',
                items: [
                    { key: 'dotnet1', name: '.NET Runtime for Red Hat Enterprise Linux', value: ['dotnet'] },
                    { key: 'amq', name: 'JBoss A-MQ', value: ['amq'] },
                    { key: 'rhpam', name: 'Red Hat Process Automation Manager', value: ['rhpam', 'bpmsuite'] },
                    { key: 'brms', name: 'Red Hat Decision Manager', value: ['brms'] },
                    { key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid'] },
                    { key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt'] },
                    { key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio'] },
                    { key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap'] },
                    { key: 'fuse', name: 'JBoss Fuse', value: ['fuse'] },
                    { key: 'webserver', name: 'JBoss Web Server', value: ['webserver'] },
                    { key: 'openjdk', name: 'OpenJDK', value: ['openjdk'] },
                    { key: 'rhamt', name: 'Red Hat Application Migration Toolkit', value: ['rhamt'] },
                    { key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk'] },
                    { key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset'] },
                    { key: 'devsuite', name: 'Red Hat Development Suite', value: ['devsuite'] },
                    { key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel'] },
                    { key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform'] },
                    { key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift'] },
                    { key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections'] }
                ]
            }
        ]
    };

    connectedCallback() {
        this.innerHTML = this.template;
        this.active.setAttribute('type', 'active');
        this.active.title = 'Active Filters:';
        this.modal.setAttribute('type', 'modal');
        this.modal.filters = this.filterObj;
        this.active.filters = this.filterObj;
        this.filters.filters = this.filterObj;
        this.query.filters = this.filterObj;
        this.onebox.url = this.oburl;

        document.body.appendChild(this.modal);
        this.querySelector('.rhd-c-search-page-header').appendChild(this.query);
        this.querySelector('.rhd-c-search-page-header').appendChild(this.box);
        this.querySelector('.rhd-c-search-body-left').appendChild(this.filters);
        this.querySelector('.rhd-c-search-body-right').appendChild(this.active);
        this.querySelector('.rhd-c-search-body-right').appendChild(this.sort);
        this.querySelector('.rhd-c-search-body-right').appendChild(this.count);
        this.querySelector('.rhd-c-search-body-right').appendChild(this.onebox);
        this.querySelector('.rhd-c-search-body-right').appendChild(this.results);
        document.body.appendChild(this.urlEle);
    }

    static get observedAttributes() {
        return ['url', 'name', 'oburl'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    toggleModal(e) {
        this.modal.toggle = e.detail.toggle;
    }

    updateSort(e) {
        this.query.sort = e.detail.sort;
        this.query.from = 0;
        this.results.last = 0;
        this.count.term = this.box.term;
    }
}

customElements.define('rhdp-search-app', RHDPSearchApp);
