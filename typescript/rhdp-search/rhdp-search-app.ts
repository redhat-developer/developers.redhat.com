class RHDPSearchApp extends HTMLElement {
    constructor() {
        super();
    }

    _name = 'Search';
    //_url = 'http://dcp.stage.jboss.org/v2/rest/search';
    _url;

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

    template = `<div class="row">
    <div class="large-24 medium-24 small-24 columns searchpage-middle">
        <div class="row">
            <div class="large-24 medium-24 small-24 columns">
                <h2>${this.name}</h2>
            </div>
        </div>
        <div class="row">
            <div class="large-6 medium-8 small-24 columns"></div>
            <div class="large-18 medium-16 small-24 columns"</div>
        </div>
    </div></div>`;

    query = new RHDPSearchQuery();
    box = new RHDPSearchBox();
    count = new RHDPSearchResultCount();
    filters = new RHDPSearchFilters();
    active = new RHDPSearchFilters();
    modal = new RHDPSearchFilters();
    onebox = new RHDPSearchOneBox();
    results = new RHDPSearchResults();
    sort = new RHDPSearchSortPage();
    emptyQuery = new RHDPSearchEmptyQuery();

    filterObj = {
        term:'', 
        facets: [
            { name: 'CONTENT TYPE', key: 'sys_type', items: [
                {key: 'archetype', name: 'Archetype', value: ['jbossdeveloper_archetype'], type: ['jbossdeveloper_archetype']},
                {key: 'article', name: 'Article', value: ['article', 'solution'], type: ['rhd_knowledgebase_article', 'rht_knowledgebase_solution']},
                {key: 'blogpost', name: "Blog Posts", value: ['blogpost'], type: ['jbossorg_blog']},
                {key: 'book', name: "Book", value: ["book"], type: ["jbossdeveloper_book"]},
                {key: 'bom', name: "BOM", value: ["jbossdeveloper_bom"], type: ['jbossdeveloper_bom']},
                {key: 'cheatsheet', name: "Cheat Sheet", value: ['cheatsheet'], type: ['jbossdeveloper_cheatsheet']},
                {key: 'demo', name: 'Demo', value: ['demo'], type: ['jbossdeveloper_demo']},
                {key: 'event', name: 'Event', value: ['jbossdeveloper_event'], type: ['jbossdeveloper_event']},
                {key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"], type: ['jbossdeveloper_example'] },
                {key: 'quickstart', name: "Quickstart", value: ['quickstart'], type: ['jbossdeveloper_quickstart']},
                {key: 'stackoverflow', name: 'Stack Overflow', value: ['stackoverflow_thread'], type: ['stackoverflow_question']},
                {key: 'video', name: "Video", value: ["video"], type:['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'] },
                {key: 'webpage', name: "Web Page", value: ['webpage'], type: ['rhd_website']}
                ] 
            },
            {
                name:'PRODUCT', 
                key: 'product', 
                items: [
                {key: 'dotnet-product', name: '.NET Runtime for Red Hat Enterprise Linux', value: ['dotnet']},
                {key: 'amq', name: 'JBoss A-MQ', value: ['amq']},
                {key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite']},
                {key: 'brms', name: 'JBoss BRMS', value: ['brms']},
                {key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid']},
                {key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt']},
                {key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio']},
                {key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap']},
                {key: 'fuse', name: 'JBoss Fuse', value: ['fuse']},
                {key: 'webserver', name: 'JBoss Web Server', value: ['webserver']},
                {key: 'openjdk', name: 'OpenJDK', value: ['openjdk']},
                {key: 'rhamt', name: 'Red Hat Application Migration Toolkit', value: ['rhamt']},
                {key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk']},
                {key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset']},
                {key: 'devsuite', name: 'Red Hat Development Suite', value: ['devsuite']},
                {key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel']},
                {key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform']},
                {key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift']},
                {key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections']}
                ]
            },
            { name: 'TOPIC', key: 'tag', items: [
                {key: 'dotnet', name: '.NET', value: ['dotnet','.net','visual studio','c#']},
                {key: 'containers', name: 'Containers', value: ['atomic','cdk','containers']},
                {key: 'devops', name: 'DevOps', value: ['DevOps','CI','CD','Continuous Delivery']},
                {key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ','AMQP','apache camel','Arquillian','Camel','CDI','CEP','CXF','datagrid','devstudio','Drools','Eclipse','fabric8','Forge','fuse','Hawkular','Hawtio','Hibernate','Hibernate ORM','Infinispan','iPaas','java ee','JavaEE','JBDS','JBoss','JBoss BPM Suite','JBoss BRMS','JBoss Data Grid','jboss eap','JBoss EAP','']},
                {key: 'iot', name: 'Internet of Things', value: ['IoT','Internet of Things']},
                {key: 'microservices', name: 'Microservices', value: ['Microservices',' WildFly Swarm']},
                {key: 'mobile', name: 'Mobile', value: ['Mobile','Red Hat Mobile','RHMAP','Cordova','FeedHenry']},
                {key: 'web-and-api-development', name: 'Web and API Development', value: ['Web','API','HTML5','REST','Camel','Node.js','RESTEasy','JAX-RS','Tomcat','nginx','Rails','Drupal','PHP','Bottle','Flask','Laravel','Dancer','Zope','TurboGears','Sinatra','httpd','Passenger']},
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

        //document.querySelector('.wrapper').appendChild(this.modal);
        document.body.appendChild(this.modal);
        this.querySelector('.row .large-24 .row .large-24').appendChild(this.query);
        this.querySelector('.row .large-24 .row .large-24').appendChild(this.box);
        this.querySelector('.large-6').appendChild(this.filters);
        this.querySelector('.large-18').appendChild(this.active);
        this.querySelector('.large-18').appendChild(this.count);
        this.querySelector('.large-18').appendChild(this.sort);
        this.querySelector('.large-18').appendChild(this.onebox);
        this.querySelector('.large-18').appendChild(this.results);
        this.querySelector('.large-18').appendChild(this.emptyQuery);
        this.addEventListener('do-search', this.doSearch);
        this.addEventListener('search-complete', this.setResults);
        this.addEventListener('load-more', this.loadMore)
        this.addEventListener('sort-change', this.updateSort);
        document.addEventListener('toggle-modal', this.toggleModal);
        document.addEventListener('facetChange', this.updateFacets);

        /* To Do
          Set text and term from querystring "q" value if present
        */
        var loc = window.location.href.split('?'),
            term = loc.length > 1 ? loc[1].split('=')[1] : '';
        if (this.results.results == null && term.length == 0){
            this._displayEmptyQueryMessage(true);
        }

        if (term.length > 0) {
            term = term.replace(/\+/g, '%20');
            term = decodeURIComponent(term);
            this.box.term = term;
            this.onebox.term = term;
            this.count.term = term;
            this.query.search(this.box.term);
        }
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    doSearch(e) {
        this.count.term = e.detail ? e.detail.term : this.query.term;
        this.onebox.term = e.detail ? e.detail.term : this.query.term;
        this.query.from = 0;
        this.results.last = 0;
        this.query.search(e.detail ? e.detail.term : this.query.term);
    }

    loadMore(e) {
        this.query.from = e.detail.from;
        this.query.search(this.query.term);
    }

    setResults(e) {
        // If query is blank on landing, display message
        this._displayEmptyQueryMessage(false);
        if(this.query.from === 0) {
            this.results.results = e.detail.results;
        } else {
            this.results.more = e.detail.results;
        }
        
        this.count.count = e.detail.results.hits.total;
        this.results.classList.remove('loading');
    }

    toggleModal(e) {
        this.querySelector('rhdp-search-app')['modal'].toggle = e.detail.toggle;
    }

    updateSort(e) {
        this.query.sort = e.detail.sort;
        this.query.from = 0;
        this.results.last = 0;
        this.count.term = this.box.term;
        this.query.search(this.box.term);
    }

    updateFacets(e) {
        var facet = e.detail.facet.cloneNode(true),
            app = this.querySelector('rhdp-search-app'),
            len = app['filterObj'].facets.length;
        facet.bubble = false;
        facet.active = e.detail.facet.active;
        app['modal'].setActive(facet, false);
        app['filters'].setActive(facet, false);
        for(let i=0; i < len; i++) {
            var itemLen = app['filterObj'].facets[i].items.length;
            for(let j=0; j < itemLen; j++) {
                if(app['filterObj'].facets[i].items[j].key === facet.key) {
                    app['filterObj'].facets[i].items[j]['active'] = facet.active;
                }
            }
        }

        if (facet.active) {
            facet.inline = true;
            app['active'].addActive(facet, false);
        } else {
            app['active'].filters = app['filterObj'];
            app['active'].updateActiveFacets();
        }

        app['query'].filters = app['filterObj'];
        app['query'].from = 0;
        app['results'].last = 0;
        app['count'].term = app['box'].term;
        app['onebox'].term = app['box'].term;
        app['query'].search(app['box'].term);
    }

    _displayEmptyQueryMessage(display){
        if(!display){
            this.sort.style.display = 'block';
            this.results.style.display = 'block';
            this.count.style.display = 'block';
            this.emptyQuery.empty = false;
        }else{
            this.sort.style.display = 'none';
            this.results.style.display = 'none';
            this.count.style.display = 'none';
            this.emptyQuery.empty = true;
        }

    }
}