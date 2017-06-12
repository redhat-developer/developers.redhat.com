class RHDPSearchApp extends HTMLElement {
    constructor() {
        super();
    }

    _name = 'Search';
    _url = 'http://dcp.stage.jboss.org/v2/rest/search/developer_materials';

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
        this.setAttribute('name', this.url);
    }

    template = `<div class="row">
    <div class="large-24 medium-24 small-24 columns searchpage-middle">
        <div class="row">
            <div class="large-24 medium-24 small-24 columns">
                <h1>${this.name}</h1>
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
    results = new RHDPSearchResults();
    sort = new RHDPSearchSortPage();

    filterObj = {
        term:'', 
        facets: [
            { name: 'CONTENT TYPE', key: 'sys_type', items: [
                {key: 'blogpost', name: "Blog Posts", value: ['blogpost']},
                {key: 'book', name: "Book", value: ["jbossdeveloper_book", "book"]},
                {key: 'code', name: "Code Artifact", value: ["demo", "jbossdeveloper_archetype", "jbossdeveloper_bom"]},
                {key: 'quickstart', name: "Quickstart", value: ['quickstart', 'quickstart_early_access']},
                {key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"] },
                {key: 'article-solution', name: "Knowledgebase Article / Solution", value: ["solution", "article"]},
                {key: 'video', name: "Video", value: ["video"] }
                ] 
            },
            {
                name:'PRODUCT', 
                key: 'type', 
                items: [
                {key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap']},
                {key: 'webserver', name: 'JBoss Web Server', value: ['webserver']},
                {key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid']},
                {key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt']},
                {key: 'fuse', name: 'JBoss Fuse', value: ['fuse']},
                {key: 'amq', name: 'JBoss A-MQ', value: ['amq']},
                {key: 'brms', name: 'JBoss BRMS', value: ['brms']},
                {key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite']},
                {key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio']},
                {key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk']},
                {key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset']},
                {key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel']},
                {key: 'softwarecollections', name: 'Red Hat Software Collections', value: ['softwarecollections']},
                {key: 'mobileplatform', name: 'Red Hat Mobile Application Platform', value: ['mobileplatform']},
                {key: 'openshift', name: 'Red Hat OpenShift Container Platform', value: ['openshift']}
                ]
            },
            { name: 'TOPIC', key: 'tag', items: [
                {key: 'containers', name: 'Containers', value: ['atomic','cdk','containers']},
                {key: 'devops', name: 'DevOps', value: ['DevOps','CI','CD','Continuous Delivery']},
                {key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ','AMQP','apache camel','Arquillian','Camel','CDI','CEP','CXF','datagrid','devstudio','Drools','Eclipse','fabric8','Forge','fuse','Hawkular','Hawtio','Hibernate','Hibernate ORM','Infinispan','iPaas','java ee','JavaEE','JBDS','JBoss','JBoss BPM Suite','JBoss BRMS','JBoss Data Grid','jboss eap','JBoss EAP','']},
                {key: 'iot', name: 'Internet of Things', value: ['IoT','Internet of Things']},
                {key: 'microservices', name: 'Microservices', value: ['Microservices',' WildFly Swarm']},
                {key: 'mobile', name: 'Mobile', value: ['Mobile','Red Hat Mobile','RHMAP','Cordova','FeedHenry']},
                {key: 'web-and-api-development', name: 'Web and API Development', value: ['Web','API','HTML5','REST','Camel','Node.js','RESTEasy','JAX-RS','Tomcat','nginx','Rails','Drupal','PHP','Bottle','Flask','Laravel','Dancer','Zope','TurboGears','Sinatra','httpd','Passenger']},
                {key: 'dotnet', name: '.NET', value: ['dotnet','.net','visual studio','c#']}
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
        this.querySelector('.large-18').appendChild(this.results);

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
        if (term.length > 0) {
            this.box.term = term;
            this.count.term = term;
            this.query.search(this.box.term);
        }
    }

    doSearch(e) {
        this.count.term = e.detail.term;
        this.query.from = 0;
        this.results.last = 0;
        this.query.search(e.detail.term);
    }

    loadMore(e) {
        this.query.from = e.detail.from;
        this.query.search(this.query.term);
    }

    setResults(e) {
        if(this.query.from === 0) {
            this.results.results = e.detail.results;
        } else {
            this.results.more = e.detail.results;
        }
        
        this.count.count = e.detail.results.hits.total;
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
        facet.active = e.detail.facet.active;
        app['modal'].setActive(facet);
        app['filters'].setActive(facet);
        if (facet.active) {
            facet.inline = true;
            app['active'].addActive(facet);
        } else {
            app['active'].removeItem(facet);
        }
        for(let i=0; i < len; i++) {
            var itemLen = app['filterObj'].facets[i].items.length;
            for(let j=0; j < itemLen; j++) {
                if(app['filterObj'].facets[i].items[j].key === facet.key) {
                    app['filterObj'].facets[i].items[j]['active'] = facet.active;
                }
            }
        }
        app['query'].filters = app['filterObj'];
        app['query'].from = 0;
        app['results'].last = 0;
        app['count'].term = app['box'].term;
        app['query'].search(app['box'].term);
    }
}

class RHDPSearchFilters extends HTMLElement {
    _type = '';
    _title = 'Filter By';
    _filters;
    _toggle = false;
    _modal;

    get type() {
        return this._type;
    }

    set type(val) {
        if (this._type === val) return;
        this._type = val;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    get toggle() {
        return this._toggle;
    }

    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        if(this._toggle) {
            this.querySelector('.cover').className = 'cover modal';
            window.scrollTo(0,0);
            document.body.style.overflow = 'hidden';
            this.style.height = window.innerHeight + 'px';
        } else {
            this.querySelector('.cover').className = 'cover';
            document.body.style.overflow = 'auto';
        }
    }

    constructor() {
        super();
    }
    modalTemplate = (string, title) => {
        return `<div class="cover" id="cover">
            <div class="title">${title} <a href="#" class="cancel" id="cancel">Close</a></div>
            <div class="groups">
            </div>
            <div class="footer">
            <a href="#" class="clearFilters">Clear Filters</a> 
            <a href="#" class="applyFilters">Apply</a>
            </div>
        </div>`;
    }
    activeTemplate = (strings, title) => {
        return `<div class="active-type">
        <strong>${title}</strong>
        <div class="activeFilters"></div>
        <a href="#" class="clearFilters">Clear Filters</a>
      </div>`;
    }
    template = (strings, title) => {
        return `<a class="showBtn">Show Filters</a>
        <div class="control" id="control">
            <div class="title">${title}</div>
            <div class="groups">
            </div>
        </div>`; 
    };

    connectedCallback() {
        if (this.type === 'active') {
            this.innerHTML = this.activeTemplate`${this.title}`;
            this.addAllActive();
        } else if (this.type === 'modal') {
            this.innerHTML = this.modalTemplate`${this.title}`;
            this.addGroups();
        } else {
            this.innerHTML = this.template`${this.title}`;
            this.addGroups();
        }

        this.addEventListener('click', e => {
            e.preventDefault();
            if ( e.target['className'] === 'showBtn' ) {
                this.toggleModal(true);
            } else if ( e.target['className'] === 'cancel' || e.target['className'] === 'applyFilters') {
                this.toggleModal(false);
            } else if ( e.target['className'] === 'clearFilters') {
                this.clearFilters();
            }
        });

    }

    static get observedAttributes() { 
        return ['type', 'title', 'filters', 'toggle']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addGroups() {
        var groups = this.filters.facets,
            len = groups.length;
        for(let i=0; i < len; i++) {
            var group = new RHDPSearchFilterGroup(),
                groupInfo = groups[i];
            group.key = groupInfo.key;
            group.name = groupInfo.name;
            group.items = groupInfo.items;
            this.querySelector('.groups').appendChild(group);
        }

    }

    addActive(item) {
        var facet = this.querySelector(`.filter-item-${item.key}`);
        if(!facet) {
            this.querySelector('.activeFilters').appendChild(item);
            this.style.display = 'block';
        }
    }

    addAllActive() {
        var groups = this.filters.facets;
        for(let i=0; i < groups.length; i++) {
            var items = groups[i].items;
            for(let j=0; j < items.length; j++) {
                var item = new RHDPSearchFilterItem();
                item.name = items[j].name;
                item.value = items[j].value;
                item.inline = true;
                item.active = items[j].active;
                item.key = items[j].key;
                if(item.active) {
                    this.addActive(item);
                }
            }
        }
    }

    removeItem(item) {
        var facet = this.querySelector(`.filter-item-${item.key}`);
        if (facet) {
            facet.remove();
        } 
        if (!this.querySelector('.activeFilters').hasChildNodes()) {
            this.style.display = 'none';
        }
    }

    setActive(item) {
        this.querySelector(`.filter-item-${item.key}`)['active'] = item.active;
    }

    toggleModal(val) {
        this.dispatchEvent(new CustomEvent('toggle-modal', {
            detail: { 
                toggle: val 
            }, 
            bubbles: true 
        }));
    }

    applyFilters() {
        this.dispatchEvent(new CustomEvent('apply-filters', {
            bubbles: true
        }));
    }

    clearFilters() {
        var items = this.querySelectorAll('rhdp-search-filter-item[active]'),
            len = items.length;

        for(let i=0; i < len; i++) {
            items[i]['active'] = false;
        }
    }
}

class RHDPSearchFilterGroup extends HTMLElement {
    _key;
    _name;
    _items;
    _toggle = false;
    _more = false;

    get key() {
        return this._key;
    }

    set key(val) {
        if (this._key === val) return;
        this._key = val;
    }

    get name() {
        return this._name;
    }

    set name(val) {
        if (this._name === val) return;
        this._name = val;
    }

    get items() {
        return this._items;
    }

    set items(val) {
        if (this._items === val) return;
        this._items = val;
    }

    get toggle() {
        return this._toggle;
    }

    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        this.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
        this.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
        this.querySelector('.more').innerHTML = this.more ? 'Show Less' : 'Show More';
        this.querySelector('.secondary').className = this.more ? 'secondary' : 'secondary hide';
    }

    constructor() {
        super();
    }

    template = (strings, name) => {
        return `<h6 id="heading" class="showFilters">${name}<span class="toggle"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>
        <div class="group hide">
            <div class="primary"></div>
            <div class="secondary hide"></div>
            <a href="#" class="more">Show More</a>
        </div>`; 
    };

    connectedCallback() {
        this.innerHTML = this.template`${this.name}`;

        this.renderItems();

        this.querySelector('h6').addEventListener('click', e => {
            e.preventDefault();
            this.toggle = !this.toggle;
        });
        this.querySelector('.more').addEventListener('click', e => {
            this.more = !this.more;
        });

        this.toggle = true;
    }

    static get observedAttributes() { 
        return ['name', 'key', 'toggle', 'items', 'more']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    renderItems() {
        var groupNode = this.querySelector('.group');
        var primaryFilters = this.querySelector('.primary');
        var secondaryFilters = this.querySelector('.secondary');
        var len = this.items.length;
        if (len <= 5) {
            groupNode.removeChild(groupNode.lastChild);
        }
        for(let i=0; i < len; i++) {
            var item = new RHDPSearchFilterItem();
            item.name = this.items[i].name;
            item.value = this.items[i].value;
            item.active = this.items[i].active;
            item.key = this.items[i].key;
            if (i < 5) {
                primaryFilters.appendChild(item);
            } else {
                secondaryFilters.appendChild(item);
            }
        }        
    }
}

class RHDPSearchFilterItem extends HTMLElement {
    _key;
    _name;
    _active = false;
    _value;
    _inline = false;

    get name() {
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.setAttribute('name', this.name);
    }
    get key() {
        return this._key;
    }
    set key(val) {
        if (this._key === val) return;
        this._key = val;
        this.className = `filter-item-${this.key}`;
        this.setAttribute('key', this.key);
    }
    get active() {
        return this._active;
    }
    set active(val) {
        if(typeof val === 'string') {
            val = true;
        } 
        if (this._active === val) return;
        this._active = val;
        if(this.active) { this.setAttribute('active','active'); } 
        else { this.removeAttribute('active'); }
        this.innerHTML = this.template`${this.name}${this.key}${this.active}`;
        this.dispatchEvent(new CustomEvent('facetChange', {detail: {facet: this}, bubbles: true}));
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (this._value === val) return;
        this._value = val;
        this.setAttribute('value', this.value);
    }
    get inline() {
        return this._inline;
    }
    set inline(val) {
        if (this._inline === val) return;
        this._inline = val;
    }

    constructor() {
        super();
    }

    template = (strings, name, key, active) => {
        var checked = active ? 'checked' : '';
        return `<div class="list"><span>${name}</span><input type="checkbox" ${checked} id="filter-item-${key}"><label for="filter-item-${key}">${name}</label></div>`; 
    };
    
    inlineTemplate = (strings, name) => {
        return `<div class="inline">${name} <i class="fa fa-times clearItem" aria-hidden="true"></i></div>`
    }

    connectedCallback() {
        if (this.inline) {
            this.innerHTML = this.inlineTemplate`${this.name}`;
            this.querySelector('.clearItem').addEventListener('click', e => { this.active = !this.active; });
        } else {
            this.innerHTML = this.template`${this.name}${this.key}${this.active}`;
            this.addEventListener('click', e => { this.active = !this.active; });
        }
    }

    static get observedAttributes() { 
        return ['name', 'active', 'value', 'inline', 'key']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

class RHDPSearchResults extends HTMLElement {
    _results;
    _more;
    _last = 0;

    get results() {
        return this._results;
    }

    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this.renderResults(false);
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
        this.renderResults(true);
    }

    get last() {
        return this._last;
    }

    set last(val) {
        if (this._last === val) return;
        this._last = val ? val : 0;
        this.setAttribute('last', val.toString())
    }

    loadMore = document.createElement('a');

    constructor() {
        super();
    }

    connectedCallback() {
        this.loadMore.className = 'moreBtn hide';
        this.loadMore.innerText = 'Load More';

        this.loadMore.addEventListener('click', e => {
            e.preventDefault();
            console.log(this.last);
            this.dispatchEvent(new CustomEvent('load-more', {
                detail: {
                    from: this.last
                },
                bubbles: true
            }));
        });
    }

    static get observedAttributes() { 
        return ['results']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addResult(result) {
        var item = new RHDPSearchResult();
        item.result = result;
        this.appendChild(item);
    }

    renderResults(add) {
        if(!add) {
            while (this.hasChildNodes()) {
                this.removeChild(this.lastChild);
            }
            this.addResults(this.results);
        } else {
            this.addResults(this.more);
        }
    }

    addResults(results) {
        if (this.results && this.results.hits && this.results.hits.hits) {
            let hits = this.results.hits.hits;
            let l = hits.length;
            for( let i = 0; i < l; i++ ) {
                this.addResult(hits[i]);
            }
            if (l > 0 && this.last+1 < this.results.hits.total) {
                this.appendChild(this.loadMore);
                this.last = this.last + l - 1;
            } else if (this.querySelector('.moreBtn')) {
                this.removeChild(this.loadMore);
            }
        }
    }
}

class RHDPSearchResult extends HTMLElement {
    _result;
    _url = ['',''];
    _title;
    _kind;
    _created;
    _description;

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._url === val) return;
        this._url = val;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get kind() {
        return this._kind;
    }

    set kind(val) {
        if (this._kind === val) return;
        this._kind = val;
    }

    get created() {
        return this._created;
    }

    set created(val) {
        if (this._created === val) return;
        this._created = val;
    }

    get description() {
        return this._description;
    }

    set description(val) {
        if (this._description === val) return;
        this._description = val;
    }

    get result() {
        return this._result;
    }

    set result(val) {
        if (this._result === val) return;
        this._result = val;
        this.computeTitle(val);
        this.computeKind(val);
        this.computeCreated(val);
        this.computeDescription(val);
        this.computeURL(val);
        this.renderResult();
    }

    constructor() {
        super();
    }

    template = (strings, url0, url1, title, kind, created, description) => {
        return `<div class="result result-search" >
        <h4>${url0}${title}${url1}</h4>
        <p class="result-info">
            <span class="caps">${kind}</span>
            <span>${created}</span>
        </p>
        <p class="result-description">${description}</p>
    </div>`; };

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['result']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    renderResult() {
        this.innerHTML = this.template`${this.url[0]}${this.url[1]}${this.title}${this.kind}${this.created}${this.description}`;
    }

    computeTitle(result) { 
        var title = '';
        if(result.highlight && result.highlight.sys_title) {
            title = result.highlight.sys_title[0];
        } else {
            title = result.fields.sys_title[0];
        }
        this.title = title; 
    }
    computeKind(result) {
        var kind = result.fields.sys_type || "webpage",
        map = {
            video: 'Video',
            blogpost: 'Blog Post',
            book: 'Book',
            article: 'Article',
            solution: 'Article',
            demo: 'Demo',
            event: 'Event',
            quickstart: 'Quickstart',
            quickstart_early_access: 'Demo',
            forumthread: 'Forum Thread',
            stackoverflow_thread: 'Stack Overflow',
            webpage: 'Webpage',

            jbossdeveloper_quickstart: 'Quickstart',
            jbossdeveloper_demo: 'Demo',
            jbossdeveloper_bom: 'Bom',
            jbossdeveloper_archetype: 'Archetype',
            jbossdeveloper_example: 'Demo',
            jbossdeveloper_vimeo: 'Video',
            jbossdeveloper_youtube: 'Video',
            jbossdeveloper_book: 'Book',
            jbossdeveloper_event: 'Event',
            rht_knowledgebase_article: 'Article',
            rht_knowledgebase_solution: 'Article',
            stackoverflow_question: 'Stack Overflow',
            jbossorg_sbs_forum: 'Forum Thread',
            jbossorg_blog: 'Blog Post',
            rht_website: 'Website',
            rht_apidocs: 'Docs & APIs'
        };
        this.kind = map[kind];
    }
    computeCreated(result) {
        var options = { month: 'long', day: 'numeric', year: 'numeric' }
        var created = result.fields.sys_created ? '- ' + new Intl.DateTimeFormat('en-US', options).format(new Date(result.fields.sys_created[0])) : "";
        this.created = created;
    }
    computeDescription(result) {
        var description = '';
        if(result.highlight && result.highlight.sys_description) {
            description = result.highlight.sys_description[0];
        } else if( result.highlight && result.highlight.sys_content_plaintext) {
            description = result.highlight.sys_content_plaintext[0];               
        } else if (result.fields && result.fields.sys_description) {
            description = result.fields.sys_description[0];
        } else {
            description = result.fields.sys_content_plaintext[0];
        }

        this.description = description;
    }
    computeURL(result) {
        var url = ['',''];
        if(result.fields && result.fields.sys_url_view) {
            url[0] = `<a href="${result.fields.sys_url_view}">`;
            url[1] = '</a>';
        }
        this.url = url;
    }
}

class RHDPSearchResultCount extends HTMLElement {
    _count = 0;
    _term = '';

    get count() {
        return this._count;
    }

    set count(val) {
        if (this._count === val) return;
        this._count = val;
        this.setAttribute('count', val.toString());
        this.setText();
    }

    get term() {
        return this._term;
    }

    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.setAttribute('term', val);
        this.setText();
    }

    constructor() {
        super();
    }

    template = (strings, count, term) => {
        return `${count} results found for ${term}`; 
    };

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['count', 'term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    setText() {
        if (this.term.length > 0 ) {
            this.innerHTML = this.template`${this.count}${this.term}`;
        }
    }
}

class RHDPSearchBox extends HTMLElement {
    _term = '';

    get term() {
        return this._term;
    }
    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.querySelector('input').setAttribute('value', val);
    }

    name = 'Search Box';
    template = (strings, name, term) => {
        return `<form class="search-bar" role="search">
        <div class="input-cont">
            <input value="${term}" class="user-success user-search" type="search" id="query" placeholder="Enter your search term">
        </div>
        <button id="search-btn"><span>SEARCH</span><i class='fa fa-search' aria-hidden='true'></i></button>
        </form>`;
    };

    constructor() {
        super();

    }

    connectedCallback() {
        this.innerHTML = this.template`${this.name}${this.term}`;

        this.querySelector('input').addEventListener('keyup', e => { 
            if(e.target['id'] === 'query') {
                if(e.key == 'Enter') { 
                    this.doSearch();
                } else {
                    this.term = e.target['value'];
                }
            }
        });

        this.addEventListener('submit', e => {
            e.preventDefault();
            return false;
        });

        this.querySelector('#search-btn').addEventListener('click', e => { 
            this.doSearch();
        });
    }

    static get observedAttributes() { 
        return ['term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    doSearch() {
        history.pushState({}, `Red Hat Developer Program Search: ${this.term}`, `?q=${this.term}`);
        this.dispatchEvent(new CustomEvent('do-search', {
            detail: { 
                term: this.term 
            }, 
            bubbles: true 
        }));
    }
}

class RHDPSearchQuery extends HTMLElement {
    _filters;
    _limit = 10;
    _from = 0;
    _sort = 'relevance';
    _results;
    _term = '';
    _url = 'http://dcp.stage.jboss.org/v2/rest/search/developer_materials';
    params;

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
        this.setFilters();
    }

    get from() {
        return this._from;
    }
    set from(val) {
        if (this._from === val) return;
        this._from = val;
        this.setAttribute('from', val.toString());
    }

    get limit() {
        return this._limit;
    }
    set limit(val) {
        if (this._limit === val) return;
        this._limit = val;
        this.setAttribute('limit', val.toString());
    }

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.setAttribute('sort', val);
    }
    
    get results() {
        return this._results;
    }
    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this.dispatchEvent(new CustomEvent('search-complete', {
            detail: { 
                results: this.results,
                term: this.term,
                from: this.from,
                filters: this.filters
            }, 
            bubbles: true 
        }));
    }

    get term() {
        return this._term;
    }

    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.setAttribute('term', val.toString());
    }

    get url() {
        return this._url;
    }

    set url(val) {
        if (this._results === val) return;
        this._url = val;
        this.setAttribute('url', val.toString());
    }

    get typeString() {
        return this.valStrings('tag', this.filters.facets[1].items);
    }

    get tagString() {
        return this.valStrings('tag', this.filters.facets[2].items);
    }
    get sysTypeString() {
        return this.valStrings('sys_type', this.filters.facets[0].items);
    }

    valStrings(txt, items) {
        var len = items.length,
            typeString = '';
        for(let i=0; i < len; i++) {
            var t = (items[i].value.join(`&${txt}=`)).toLowerCase().replace(' ', '+');
            typeString += items[i].active ? `&${txt}=${t}` : '';
        }
        return typeString;
    }

    urlTemplate = (strings, url, term, from, limit, sort, types, tags, sys_types) => {
        var order = '';
        if(sort === 'most-recent') {
            order = '&newFirst=true';
        } 
        return `${url}?tags_or_logic=true&filter_out_excluded=true&from=${from}${order}&project=&query=${term}&query_highlight=true&size${limit}=true${types}${tags}${sys_types}&type=rht_website&type=jbossdeveloper_quickstart&type=jbossdeveloper_demo&type=jbossdeveloper_bom&type=jbossdeveloper_archetype&type=jbossdeveloper_example&type=jbossdeveloper_vimeo&type=jbossdeveloper_youtube&type=jbossdeveloper_book&type=jbossdeveloper_event&type=rht_knowledgebase_article&type=rht_knowledgebase_solution&type=stackoverflow_question&type=jbossorg_sbs_forum&type=jbossorg_blog&type=rht_apidocs`;
    };

    constructor() {
        super();
    }

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['term','sort','limit','results','filters','url']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    search(term) {
        if (term && term !== '') {
            this.term = term;
        }

        fetch(this.urlTemplate`${this.url}${this.term}${this.from}${this.limit}${this.sort}${this.typeString}${this.tagString}${this.sysTypeString}`)
        .then((resp) => resp.json())
        .then((data) => { this.results = data; });
    }

    setFilters() {
        return;
    }
}

class RHDPSearchSortPage extends HTMLElement {
    _sort;

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.querySelector('select').value = val;
    }
    constructor() {
        super();
    }

    template = `<p>
        <span>Sort results by</span>
        <select>
        <option value="relevance">Relevance</option>
        <option value="most-recent">Most Recent</option>
        </select>
        </p>`; 

    connectedCallback() {
        this.innerHTML = this.template;
        this.addEventListener('change', e => {
            this.sort = e.target['options'][e.target['selectedIndex']].value;
            this.setSort();
        });
    }

    static get observedAttributes() { 
        return ['name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    setSort() {
        this.dispatchEvent(new CustomEvent('sort-change', {
            detail: { 
                sort: this.sort 
            }, 
            bubbles: true 
        }));
    }
}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);
    customElements.define('rhdp-search-query', RHDPSearchQuery);
    customElements.define('rhdp-search-box', RHDPSearchBox);
    customElements.define('rhdp-search-result-count', RHDPSearchResultCount);
    customElements.define('rhdp-search-result', RHDPSearchResult);
    customElements.define('rhdp-search-results', RHDPSearchResults);
    customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
    customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
    customElements.define('rhdp-search-filters', RHDPSearchFilters);
    customElements.define('rhdp-search-app', RHDPSearchApp);
});
