import {RHDPSearchQuery} from './rhdp-search-query';
import {RHDPSearchBox} from './rhdp-search-box';
import {RHDPSearchFilters} from './rhdp-search-filters';
import {RHDPSearchFilterGroup} from './rhdp-search-filter-group';
import {RHDPSearchFilterItem} from './rhdp-search-filter-item';
import {RHDPSearchResults} from './rhdp-search-results';
import {RHDPSearchResultCount} from './rhdp-search-result-count';
import {RHDPSearchSortPage} from './rhdp-search-sort-page';

export class RHDPSearchApp extends HTMLElement {
    name = 'Search';
    template = `<div class="row">
    <div class="large-24 columns searchpage-middle">
        <div class="row">
            <div class="large-24 columns">
                <h1>${this.name}</h1>
            </div>
        </div>
        <div class="row">
            <div class="large-6 columns"></div>
            <div class="large-18 columns"</div>
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
                {key: 'eap', name: 'JBoss Enterprise Application Platform', value: ['eap'], active: true},
                {key: 'webserver', name: 'JBoss Web Server', value: ['webserver']},
                {key: 'datagrid', name: 'JBoss Data Grid', value: ['datagrid']},
                {key: 'datavirt', name: 'JBoss Data Virtualization', value: ['datavirt']},
                {key: 'fuse', name: 'JBoss Fuse', value: ['fuse'], active: true},
                {key: 'amq', name: 'JBoss A-MQ', value: ['amq']},
                {key: 'brms', name: 'JBoss BRMS', value: ['brms']},
                {key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite']},
                {key: 'devstudio', name: 'JBoss Developer Studio', value: ['devstudio']},
                {key: 'cdk', name: 'Red Hat Container Development Kit', value: ['cdk']},
                {key: 'developertoolset', name: 'Red Hat Developer Toolset', value: ['developertoolset']},
                {key: 'rhel', name: 'Red Hat Enterprise Linux', value: ['rhel'], active: true},
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

    constructor() {
        super();

        this.addEventListener('do-search', this.doSearch);
        this.addEventListener('search-complete', this.setResults);
        this.addEventListener('toggle-modal', e => this.toggleModal);
        this.addEventListener('sort-change', this.updateSort);
        this.addEventListener('facetChange', this.updateFacets);
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.active.setAttribute('type', 'active');
        this.active.title = 'Active Filters:';
        this.modal.setAttribute('type', 'modal');
        this.modal.filters = this.filterObj;
        this.active.filters = this.filterObj;
        this.filters.filters = this.filterObj;
        this.query.filters = this.filterObj;
        
        document.querySelector('.wrapper').appendChild(this.modal);
        this.querySelector('.row .large-24 .row .large-24').appendChild(this.query);
        this.querySelector('.row .large-24 .row .large-24').appendChild(this.box);
        this.querySelector('.large-6').appendChild(this.filters);
        this.querySelector('.large-18').appendChild(this.active);
        this.querySelector('.large-18').appendChild(this.count);
        this.querySelector('.large-18').appendChild(this.sort);
        this.querySelector('.large-18').appendChild(this.results);

        /* To Do
          Set text and term from querystring "q" value if present
        */
        var loc = window.location.href.split('?'),
            term = loc.length > 1 ? loc[1].split('=')[1] : '';
        if (term.length > 0) {
            this.box.term = term;
            this.query.search(term);
        }
    }

    doSearch(e) {
        this.query.search(e.detail.term);
    }

    setResults(e) {
        this.count.term = e.detail.term;
        this.results.results = e.detail.results;
        this.count.count = e.detail.results.hits.total;
    }

    toggleModal(e) {
        this.modal.toggle = e.detail.toggle;
    }

    updateSort(e) {
        this.query.sort = e.detail.sort;
        this.query.search(this.box.term);
    }

    updateFacets(e) {
        var facet = e.detail.facet.cloneNode(true),
            len = this.filterObj.facets.length;
        facet.active = e.detail.facet.active;
        this.modal.setActive(facet);
        this.filters.setActive(facet);
        if (facet.active) {
            facet.inline = true;
            this.active.addActive(facet);
        } else {
            this.active.removeItem(facet);
        }
        for(let i=0; i < len; i++) {
            var itemLen = this.filterObj.facets[i].items.length;
            for(let j=0; j < itemLen; j++) {
                if(this.filterObj.facets[i].items[j].key === facet.key) {
                    this.filterObj.facets[i].items[j]['active'] = facet.active;
                }
            }
        }
        this.query.filters = this.filterObj;
        this.query.search(this.box.term);
    }
}

customElements.define('rhdp-search-app', RHDPSearchApp);