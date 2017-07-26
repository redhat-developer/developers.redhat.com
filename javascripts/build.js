var DevNationLiveSession = (function () {
    function DevNationLiveSession(obj) {
        var _this = this;
        this._title = '';
        this._date = '';
        this._youtube_id = '';
        this._speaker = '';
        this._twitter_handle = '';
        this._offer_id = '';
        this._abstract = '';
        this._confirmed = false;
        this._register = true;
        this._eloqua = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
    }
    Object.defineProperty(DevNationLiveSession.prototype, "offer_id", {
        get: function () {
            return this._offer_id;
        },
        set: function (val) {
            if (this._offer_id === val)
                return;
            this._offer_id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            if (this._title === val)
                return;
            this._title = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (val) {
            if (this._date === val)
                return;
            this._date = val;
            // try {
            //     var timeStamp = new Date(val);
            //     var timeString = timeStamp.toString();
            //     var x = timeString.split(' ', 4).join(' ');
            //     var t = timeStamp.toLocaleTimeString();
            //     var timezone = (String(String(timeStamp).split("(")[1]).split(")")[0]);
            //     this._date = x + " " + t + " " + timezone;
            // } catch(e) {
            //     this._date = 'Date TBD';
            // }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "youtube_id", {
        get: function () {
            return this._youtube_id;
        },
        set: function (val) {
            if (this._youtube_id === val)
                return;
            this._youtube_id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "speaker", {
        get: function () {
            return this._speaker;
        },
        set: function (val) {
            if (this._speaker === val)
                return;
            this._speaker = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "twitter_handle", {
        get: function () {
            return this._twitter_handle;
        },
        set: function (val) {
            if (this._twitter_handle === val)
                return;
            this._twitter_handle = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "abstract", {
        get: function () {
            return this._abstract;
        },
        set: function (val) {
            if (this._abstract === val)
                return;
            this._abstract = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "register", {
        get: function () {
            return this._register;
        },
        set: function (val) {
            if (this._register === val)
                return;
            this._register = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "confirmed", {
        get: function () {
            return this._confirmed;
        },
        set: function (val) {
            if (this._confirmed === val)
                return;
            this._confirmed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "eloqua", {
        get: function () {
            return this._eloqua;
        },
        set: function (val) {
            if (this._eloqua === val)
                return;
            this._eloqua = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSession;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DevNationLiveApp = (function (_super) {
    __extends(DevNationLiveApp, _super);
    function DevNationLiveApp() {
        var _this = _super.call(this) || this;
        _this._src = '../rhdp-apps/devnationlive/devnationlive.json';
        _this._form = '../rhdp-apps/devnationlive/';
        _this._mode = 'cors';
        _this.nextSession = function (strings, next) {
            return "<section>\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <h5 class=\"caps session-label\">Next Live Session</h5>\n                </div>\n                <div class=\"large-17 small-24 columns\">\n                    <h2 class=\"caps\">" + next.title + "</h2>\n                </div>\n                <div class=\"large-7 small-24 columns devnation-live-date\" data-tags=\"" + next.date + "\">\n                    <div class=\"session-date\"><span><i class=\"fa fa-calendar fa-2x right\"></i></span> " + next.date + "</div>\n                </div>\n            </div>\n            <div class=\"row\" data-video=\"" + next.youtube_id + "\">\n                <div class=\"medium-14 columns event-video\">\n                    " + (_this.getCookie('dn_live_' + next.offer_id) || !next.register ? "\n                    <div class=\"flex-video\">\n                        <iframe src=\"https://www.youtube.com/embed/" + next.youtube_id + "?rel=0&autoplay=1\" width=\"640\" height=\"360\" frameborder=\"0\" allowfullscreen></iframe>\n                    </div>" : "\n                    <img width=\"640\" height=\"360\" src=\"../images/design/devnationlive_herographic_0.jpg\" alt=\"" + next.title + "\">\n                    ") + "\n                </div>\n                <div class=\"medium-10 columns event-chat\" data-chat=\"" + next.youtube_id + "\">\n                    " + (_this.getCookie('dn_live_' + next.offer_id) || !next.register ? "\n                    <iframe class=\"embedded-chat\" src=\"https://www.youtube.com/live_chat?v=" + next.youtube_id + "&embed_domain=" + window.location.href.replace(/http(s)?:\/\//, '').split('/')[0] + "\"></iframe>\n                    " : "\n                    <iframe class=\"session-reg\" src=\"" + _this.form + "?id=" + next.offer_id + "\"></iframe>\n                    ") + "\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-24 columns divider\">\n                    <p>Speaker: <strong>" + next.speaker + "</strong> \n                    " + (next.twitter_handle ? "\n                    (<a href=\"https://twitter.com/" + next.twitter_handle + "\" target=\"_blank\" class=\"external-link\"> @" + next.twitter_handle + "</a>)"
                : '') + "\n                    </p>\n                    <p>" + next.abstract + "</p>\n                </div>\n            </div>\n        </section>";
        };
        _this.upcomingSession = function (strings, sess) {
            return "\n        " + (sess.confirmed ? "\n            <li class=\"single-event\">\n                <div class=\"row\">\n                    <div class=\"large-16 columns\">\n                        <h4 class=\"caps\">" + sess.title + "</h4>\n                        " + (sess.speaker ? "\n                            <p>Speaker: <strong>" + sess.speaker + "</strong>\n                                " + (sess.twitter_handle ? "\n                                    (<a href=\"https://twitter.com/" + sess.twitter_handle + "\" target=\"_blank\" class=\"external-link\"> @" + sess.twitter_handle + "</a>)"
                : '') + "\n                            </p>"
                : '') + "\n                        <p>" + sess.date + "</p>\n                        <p>" + sess.abstract + "</p>\n                    </div>\n                    " + (sess.register ? "\n                        <div class=\"large-8 columns align-center\">\n                        " + (_this.getCookie('dn_live_' + sess.offer_id) ? "\n                            <div class=\"button disabled\">You are Registered</div>"
                : "<iframe class=\"session-reg\" src=\"" + _this.form + "?id=" + sess.offer_id + "\"></iframe>\n                            </div>")
                : '') + "\n                </div>\n            </li>"
                : '');
        };
        _this.pastSession = function (strings, sess) {
            return "\n        " + (sess.confirmed ? "\n            <li class=\"single-event\">\n                <div class=\"row\">\n                    <div class=\"large-16 columns\">\n                        <h4 class=\"caps\">" + sess.title + "</h4>\n                        " + (sess.speaker ? "\n                        <p>Speaker: <strong>" + sess.speaker + "</strong>\n                            " + (sess.twitter_handle ? "\n                            (<a href=\"https://twitter.com/" + sess.twitter_handle + "\" target=\"_blank\" class=\"external-link\"> @" + sess.twitter_handle + "</a>)"
                : '') + "\n                        </p>"
                : '') + "\n                        <p>" + sess.date + "</p>\n                        <p>" + sess.abstract + "</p>\n                    </div>\n                    <div class=\"large-8\">\n                        <a href=\"https://youtu.be/" + sess.youtube_id + "\" class=\"button external-link\">VIDEO</a>\n                    </div>\n                </div>\n            </li>"
                : '');
        };
        _this.template = function (strings, next, upcoming, past) {
            return "<div class=\"wide wide-hero devnation-live\">\n        <div class=\"row\">\n            <div class=\"large-24 columns\">\n                <img class=\"show-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_desktop_logo_r4v1.png\" alt=\"DevNation Live logo\">\n                <img class=\"hide-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_mobile_logo_r4v1.png\" alt=\"DevNation Live logo\">\n            </div>\n        </div>\n    </div>\n    <div id=\"devnationLive-microsite\">\n        " + (_a = ["", ""], _a.raw = ["", ""], _this.nextSession(_a, next)) + "\n        <section>\n            <div class=\"row\">\n                " + (past.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Upcoming Sessions</h5>\n                    <br>\n                    <ul class=\"events-list\">\n                    " + upcoming.map(function (sess) {
                return (_a = ["", ""], _a.raw = ["", ""], _this.upcomingSession(_a, sess));
                var _a;
            }).join('') + "\n                    </ul>\n                </div>\n                " + (past.length > 0 ? "\n                    <div class=\"large-12 columns\">\n                    <h5 class=\"caps\">Past Sessions</h5>\n                        <br>\n                        <ul class=\"events-list\">\n                        " + past.map(function (sess) {
                return (_a = ["", ""], _a.raw = ["", ""], _this.pastSession(_a, sess));
                var _a;
            }).join('') + "\n                        </ul>\n                    </div>"
                : '') + "\n            </div>\n        </section>\n    </div>";
            var _a;
        };
        return _this;
    }
    Object.defineProperty(DevNationLiveApp.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (val) {
            if (this._next === val)
                return;
            this._next = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "past", {
        get: function () {
            return this._past;
        },
        set: function (val) {
            if (this._past === val)
                return;
            this._past = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (val) {
            if (this._src === val)
                return;
            this._src = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (val) {
            if (this._mode === val)
                return;
            this._mode = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (val) {
            if (this._form === val)
                return;
            this._form = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            if (this._upcoming === val)
                return;
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            if (this._data === val)
                return;
            this._data = val['sessions'] ? val['sessions'].sort(this.sortSessions) : [];
            this.next = this.getNextSession();
            this.upcoming = this.getUpcoming();
            this.past = this.getPast();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp, "observedAttributes", {
        get: function () {
            return ['src', 'form', 'mode'];
        },
        enumerable: true,
        configurable: true
    });
    DevNationLiveApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    DevNationLiveApp.prototype.connectedCallback = function () {
        var _this = this;
        var fHead = new Headers();
        var fInit = {
            method: 'GET',
            headers: fHead,
            mode: this.mode,
            cache: 'default'
        };
        this.addEventListener('registered', this.setRegistered);
        fetch(this.src, fInit)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            _this.data = data;
            _this.innerHTML = (_a = ["", "", "", ""], _a.raw = ["", "", "", ""], _this.template(_a, _this.next, _this.upcoming, _this.past));
            var _a;
        });
    };
    DevNationLiveApp.prototype.getCookie = function (name) {
        var re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    };
    DevNationLiveApp.prototype.setRegistered = function (e) {
        this.innerHTML = (_a = ["", "", "", ""], _a.raw = ["", "", "", ""], this.template(_a, this.next, this.upcoming, this.past));
        var _a;
    };
    DevNationLiveApp.prototype.sortSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return da - db;
    };
    DevNationLiveApp.prototype.getNextSession = function () {
        for (var i = 0; i < this.data.length; i++) {
            var dt = Date.parse(this.data[i].date);
            if (dt && dt > Date.now() - 3600000) {
                return this.data[i];
            }
        }
    };
    DevNationLiveApp.prototype.getUpcoming = function () {
        var upcoming = [];
        var first = true;
        for (var i = 0; i < this.data.length; i++) {
            var dt = Date.parse(this.data[i].date);
            if (dt && (dt > Date.now() || dt > Date.now() - 3600000)) {
                if (!first && this.data[i].offer_id.length > 0) {
                    upcoming.push(this.data[i]);
                }
                else {
                    first = false;
                }
            }
        }
        return upcoming;
    };
    DevNationLiveApp.prototype.getPast = function () {
        var past = [];
        for (var i = 0; i < this.data.length; i++) {
            var dt = Date.parse(this.data[i].date);
            if (dt && dt + 3600000 < Date.now()) {
                past.push(this.data[i]);
            }
        }
        return past;
    };
    return DevNationLiveApp;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
    customElements.define('devnation-live-app', DevNationLiveApp);
});
var RHDPSearchApp = (function (_super) {
    __extends(RHDPSearchApp, _super);
    function RHDPSearchApp() {
        var _this = _super.call(this) || this;
        _this._name = 'Search';
        _this.template = "<div class=\"row\">\n    <div class=\"large-24 medium-24 small-24 columns searchpage-middle\">\n        <div class=\"row\">\n            <div class=\"large-24 medium-24 small-24 columns\">\n                <h2>" + _this.name + "</h2>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"large-6 medium-8 small-24 columns\"></div>\n            <div class=\"large-18 medium-16 small-24 columns\"</div>\n        </div>\n    </div></div>";
        _this.query = new RHDPSearchQuery();
        _this.box = new RHDPSearchBox();
        _this.count = new RHDPSearchResultCount();
        _this.filters = new RHDPSearchFilters();
        _this.active = new RHDPSearchFilters();
        _this.modal = new RHDPSearchFilters();
        _this.results = new RHDPSearchResults();
        _this.sort = new RHDPSearchSortPage();
        _this.filterObj = {
            term: '',
            facets: [
                { name: 'CONTENT TYPE', key: 'sys_type', items: [
                        { key: 'archetype', name: 'Archetype', value: ['jbossdeveloper_archetype'], type: ['jbossdeveloper_archetype'] },
                        { key: 'article', name: 'Article', value: ['article', 'solution'], type: ['rhd_knowledgebase_article', 'rht_knowledgebase_solution'] },
                        { key: 'blogpost', name: "Blog Posts", value: ['blogpost'], type: ['jbossorg_blog'] },
                        { key: 'book', name: "Book", value: ["book"], type: ["jbossdeveloper_book"] },
                        { key: 'bom', name: "BOM", value: ["jbossdeveloper_bom"], type: ['jbossdeveloper_bom'] },
                        { key: 'cheatsheet', name: "Cheat Sheet", value: ['cheatsheet'], type: ['jbossdeveloper_cheatsheet'] },
                        { key: 'demo', name: 'Demo', value: ['demo'], type: ['jbossdeveloper_demo'] },
                        { key: 'event', name: 'Event', value: ['jbossdeveloper_event'], type: ['jbossdeveloper_event'] },
                        { key: 'get-started', name: "Get Started", value: ["jbossdeveloper_example"], type: ['jbossdeveloper_example'] },
                        { key: 'quickstart', name: "Quickstart", value: ['quickstart'], type: ['jbossdeveloper_quickstart'] },
                        { key: 'stackoverflow', name: 'Stack Overflow', value: ['stackoverflow_thread'], type: ['stackoverflow_question'] },
                        { key: 'video', name: "Video", value: ["video"], type: ['jbossdeveloper_vimeo', 'jbossdeveloper_youtube'] },
                        { key: 'webpage', name: "Web Page", value: ['webpage'], type: ['rhd_website'] }
                    ]
                },
                {
                    name: 'PRODUCT',
                    key: 'product',
                    items: [
                        { key: 'dotnet-product', name: '.NET Runtime for Red Hat Enterprise Linux', value: ['dotnet'] },
                        { key: 'amq', name: 'JBoss A-MQ', value: ['amq'] },
                        { key: 'bpmsuite', name: 'JBoss BPM Suite', value: ['bpmsuite'] },
                        { key: 'brms', name: 'JBoss BRMS', value: ['brms'] },
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
                },
                { name: 'TOPIC', key: 'tag', items: [
                        { key: 'dotnet', name: '.NET', value: ['dotnet', '.net', 'visual studio', 'c#'] },
                        { key: 'containers', name: 'Containers', value: ['atomic', 'cdk', 'containers'] },
                        { key: 'devops', name: 'DevOps', value: ['DevOps', 'CI', 'CD', 'Continuous Delivery'] },
                        { key: 'enterprise-java', name: 'Enterprise Java', value: ['ActiveMQ', 'AMQP', 'apache camel', 'Arquillian', 'Camel', 'CDI', 'CEP', 'CXF', 'datagrid', 'devstudio', 'Drools', 'Eclipse', 'fabric8', 'Forge', 'fuse', 'Hawkular', 'Hawtio', 'Hibernate', 'Hibernate ORM', 'Infinispan', 'iPaas', 'java ee', 'JavaEE', 'JBDS', 'JBoss', 'JBoss BPM Suite', 'JBoss BRMS', 'JBoss Data Grid', 'jboss eap', 'JBoss EAP', ''] },
                        { key: 'iot', name: 'Internet of Things', value: ['IoT', 'Internet of Things'] },
                        { key: 'microservices', name: 'Microservices', value: ['Microservices', ' WildFly Swarm'] },
                        { key: 'mobile', name: 'Mobile', value: ['Mobile', 'Red Hat Mobile', 'RHMAP', 'Cordova', 'FeedHenry'] },
                        { key: 'web-and-api-development', name: 'Web and API Development', value: ['Web', 'API', 'HTML5', 'REST', 'Camel', 'Node.js', 'RESTEasy', 'JAX-RS', 'Tomcat', 'nginx', 'Rails', 'Drupal', 'PHP', 'Bottle', 'Flask', 'Laravel', 'Dancer', 'Zope', 'TurboGears', 'Sinatra', 'httpd', 'Passenger'] },
                    ]
                }
            ]
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchApp.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            if (this._name === val)
                return;
            this._name = val;
            this.setAttribute('name', this.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchApp.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            if (this._url === val)
                return;
            this._url = val;
            this.query.url = this.url;
            this.setAttribute('url', this.url);
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchApp.prototype.connectedCallback = function () {
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
        this.addEventListener('load-more', this.loadMore);
        this.addEventListener('sort-change', this.updateSort);
        document.addEventListener('toggle-modal', this.toggleModal);
        document.addEventListener('facetChange', this.updateFacets);
        /* To Do
          Set text and term from querystring "q" value if present
        */
        var loc = window.location.href.split('?'), term = loc.length > 1 ? loc[1].split('=')[1] : '';
        if (term.length > 0) {
            term = term.replace(/\+/g, '%20');
            term = decodeURIComponent(term);
            this.box.term = term;
            this.count.term = term;
            this.query.search(this.box.term);
        }
    };
    Object.defineProperty(RHDPSearchApp, "observedAttributes", {
        get: function () {
            return ['url', 'name'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchApp.prototype.doSearch = function (e) {
        this.count.term = e.detail ? e.detail.term : this.query.term;
        this.query.from = 0;
        this.results.last = 0;
        this.query.search(e.detail ? e.detail.term : this.query.term);
    };
    RHDPSearchApp.prototype.loadMore = function (e) {
        this.query.from = e.detail.from;
        this.query.search(this.query.term);
    };
    RHDPSearchApp.prototype.setResults = function (e) {
        if (this.query.from === 0) {
            this.results.results = e.detail.results;
        }
        else {
            this.results.more = e.detail.results;
        }
        this.count.count = e.detail.results.hits.total;
        this.results.classList.remove('loading');
    };
    RHDPSearchApp.prototype.toggleModal = function (e) {
        this.querySelector('rhdp-search-app')['modal'].toggle = e.detail.toggle;
    };
    RHDPSearchApp.prototype.updateSort = function (e) {
        this.query.sort = e.detail.sort;
        this.query.from = 0;
        this.results.last = 0;
        this.count.term = this.box.term;
        this.query.search(this.box.term);
    };
    RHDPSearchApp.prototype.updateFacets = function (e) {
        var facet = e.detail.facet.cloneNode(true), app = this.querySelector('rhdp-search-app'), len = app['filterObj'].facets.length;
        facet.bubble = false;
        facet.active = e.detail.facet.active;
        app['modal'].setActive(facet, false);
        app['filters'].setActive(facet, false);
        for (var i = 0; i < len; i++) {
            var itemLen = app['filterObj'].facets[i].items.length;
            for (var j = 0; j < itemLen; j++) {
                if (app['filterObj'].facets[i].items[j].key === facet.key) {
                    app['filterObj'].facets[i].items[j]['active'] = facet.active;
                }
            }
        }
        if (facet.active) {
            facet.inline = true;
            app['active'].addActive(facet, false);
        }
        else {
            app['active'].filters = app['filterObj'];
            app['active'].updateActiveFacets();
        }
        app['query'].filters = app['filterObj'];
        app['query'].from = 0;
        app['results'].last = 0;
        app['count'].term = app['box'].term;
        app['query'].search(app['box'].term);
    };
    return RHDPSearchApp;
}(HTMLElement));
var RHDPSearchBox = (function (_super) {
    __extends(RHDPSearchBox, _super);
    function RHDPSearchBox() {
        var _this = _super.call(this) || this;
        _this._term = '';
        _this.name = 'Search Box';
        _this.template = function (strings, name, term) {
            return "<form class=\"search-bar\" role=\"search\">\n        <div class=\"input-cont\">\n            <input value=\"" + term + "\" class=\"user-success user-search\" type=\"search\" id=\"query\" placeholder=\"Enter your search term\">\n        </div>\n        <button id=\"search-btn\"><span>SEARCH</span><i class='fa fa-search' aria-hidden='true'></i></button>\n        </form>";
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchBox.prototype, "term", {
        get: function () {
            if ((this._term === null) || (this._term === '')) {
                return this._term;
            }
            else {
                return this._term.replace(/(<([^>]+)>)/ig, '');
            }
        },
        set: function (val) {
            if (this._term === val)
                return;
            this._term = val;
            this.querySelector('input').setAttribute('value', val);
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchBox.prototype.connectedCallback = function () {
        var _this = this;
        this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.name, this.term));
        this.querySelector('input').addEventListener('keyup', function (e) {
            if (e.target['id'] === 'query') {
                if (e.key == 'Enter') {
                    _this.doSearch();
                }
                else {
                    _this.term = e.target['value'];
                    if (_this.term === '') {
                        _this.doSearch();
                    }
                }
            }
        });
        this.addEventListener('submit', function (e) {
            e.preventDefault();
            return false;
        });
        this.querySelector('#search-btn').addEventListener('click', function (e) {
            _this.doSearch();
        });
        var _a;
    };
    Object.defineProperty(RHDPSearchBox, "observedAttributes", {
        get: function () {
            return ['term'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchBox.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchBox.prototype.doSearch = function () {
        this.dispatchEvent(new CustomEvent('do-search', {
            detail: {
                term: this.term
            },
            bubbles: true
        }));
    };
    return RHDPSearchBox;
}(HTMLElement));
var RHDPSearchFilterGroup = (function (_super) {
    __extends(RHDPSearchFilterGroup, _super);
    function RHDPSearchFilterGroup() {
        var _this = _super.call(this) || this;
        _this._toggle = false;
        _this._more = false;
        _this.template = function (strings, name) {
            return "<h6 id=\"heading\" class=\"showFilters\">" + name + "<span class=\"toggle\"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>\n        <div class=\"group hide\">\n            <div class=\"primary\"></div>\n            <div class=\"secondary hide\"></div>\n            <a href=\"#\" class=\"more\">Show More</a>\n        </div>";
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchFilterGroup.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (val) {
            if (this._key === val)
                return;
            this._key = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterGroup.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            if (this._name === val)
                return;
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterGroup.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (val) {
            if (this._items === val)
                return;
            this._items = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterGroup.prototype, "toggle", {
        get: function () {
            return this._toggle;
        },
        set: function (val) {
            if (this._toggle === val)
                return;
            this._toggle = val;
            this.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
            this.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterGroup.prototype, "more", {
        get: function () {
            return this._more;
        },
        set: function (val) {
            if (this._more === val)
                return;
            this._more = val;
            this.querySelector('.more').innerHTML = this.more ? 'Show Less' : 'Show More';
            this.querySelector('.secondary').className = this.more ? 'secondary' : 'secondary hide';
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilterGroup.prototype.connectedCallback = function () {
        var _this = this;
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.template(_a, this.name));
        this.renderItems();
        this.querySelector('h6').addEventListener('click', function (e) {
            e.preventDefault();
            _this.toggle = !_this.toggle;
        });
        this.querySelector('.more').addEventListener('click', function (e) {
            _this.more = !_this.more;
        });
        this.toggle = true;
        var _a;
    };
    Object.defineProperty(RHDPSearchFilterGroup, "observedAttributes", {
        get: function () {
            return ['name', 'key', 'toggle', 'items', 'more'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilterGroup.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchFilterGroup.prototype.renderItems = function () {
        var groupNode = this.querySelector('.group');
        var primaryFilters = this.querySelector('.primary');
        var secondaryFilters = this.querySelector('.secondary');
        var len = this.items.length;
        if (len <= 5) {
            groupNode.removeChild(groupNode.lastChild);
        }
        for (var i = 0; i < len; i++) {
            var item = new RHDPSearchFilterItem();
            item.name = this.items[i].name;
            item.value = this.items[i].value;
            item.active = this.items[i].active;
            item.key = this.items[i].key;
            if (i < 5) {
                primaryFilters.appendChild(item);
            }
            else {
                secondaryFilters.appendChild(item);
            }
        }
    };
    return RHDPSearchFilterGroup;
}(HTMLElement));
var RHDPSearchFilterItem = (function (_super) {
    __extends(RHDPSearchFilterItem, _super);
    function RHDPSearchFilterItem() {
        var _this = _super.call(this) || this;
        _this._active = false;
        _this._inline = false;
        _this._bubble = true;
        _this.template = function (strings, name, key, active) {
            var checked = active ? 'checked' : '';
            return "<div class=\"list\"><span>" + name + "</span><input type=\"checkbox\" " + checked + " id=\"filter-item-" + key + "\"><label for=\"filter-item-" + key + "\">" + name + "</label></div>";
        };
        _this.inlineTemplate = function (strings, name) {
            return "<div class=\"inline\">" + name + " <i class=\"fa fa-times clearItem\" aria-hidden=\"true\"></i></div>";
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchFilterItem.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            if (this._name === val)
                return;
            this._name = val;
            this.setAttribute('name', this.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (val) {
            if (this._key === val)
                return;
            this._key = val;
            this.className = "filter-item-" + this.key;
            this.setAttribute('key', this.key);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (val) {
            if (typeof val === 'string') {
                val = true;
            }
            if (this._active === val)
                return;
            this._active = val;
            if (this.active) {
                this.setAttribute('active', 'active');
            }
            else {
                this.removeAttribute('active');
            }
            this.innerHTML = (_a = ["", "", "", ""], _a.raw = ["", "", "", ""], this.template(_a, this.name, this.key, this.active));
            this.dispatchEvent(new CustomEvent('facetChange', { detail: { facet: this }, bubbles: this.bubble }));
            this.bubble = true;
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            if (this._value === val)
                return;
            this._value = val;
            this.setAttribute('value', this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "inline", {
        get: function () {
            return this._inline;
        },
        set: function (val) {
            if (this._inline === val)
                return;
            this._inline = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilterItem.prototype, "bubble", {
        get: function () {
            return this._bubble;
        },
        set: function (val) {
            if (this._bubble === val)
                return;
            this._bubble = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilterItem.prototype.connectedCallback = function () {
        var _this = this;
        if (this.inline) {
            this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.inlineTemplate(_a, this.name));
            this.querySelector('.clearItem').addEventListener('click', function (e) { _this.active = !_this.active; });
        }
        else {
            this.innerHTML = (_b = ["", "", "", ""], _b.raw = ["", "", "", ""], this.template(_b, this.name, this.key, this.active));
            this.addEventListener('click', function (e) { _this.active = !_this.active; });
        }
        var _a, _b;
    };
    Object.defineProperty(RHDPSearchFilterItem, "observedAttributes", {
        get: function () {
            return ['name', 'active', 'value', 'inline', 'key'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilterItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    return RHDPSearchFilterItem;
}(HTMLElement));
var RHDPSearchFilters = (function (_super) {
    __extends(RHDPSearchFilters, _super);
    function RHDPSearchFilters() {
        var _this = _super.call(this) || this;
        _this._type = '';
        _this._title = 'Filter By';
        _this._toggle = false;
        _this.modalTemplate = function (string, title) {
            return "<div class=\"cover\" id=\"cover\">\n            <div class=\"title\">" + title + " <a href=\"#\" class=\"cancel\" id=\"cancel\">Close</a></div>\n            <div class=\"groups\">\n            </div>\n            <div class=\"footer\">\n            <a href=\"#\" class=\"clearFilters\">Clear Filters</a> \n            <a href=\"#\" class=\"applyFilters\">Apply</a>\n            </div>\n        </div>";
        };
        _this.activeTemplate = function (strings, title) {
            return "<div class=\"active-type\">\n        <strong>" + title + "</strong>\n        <div class=\"activeFilters\"></div>\n        <a href=\"#\" class=\"clearFilters\">Clear Filters</a>\n      </div>";
        };
        _this.template = function (strings, title) {
            return "<a class=\"showBtn\">Show Filters</a>\n        <div class=\"control\" id=\"control\">\n            <div class=\"title\">" + title + "</div>\n            <div class=\"groups\">\n            </div>\n        </div>";
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchFilters.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (val) {
            if (this._type === val)
                return;
            this._type = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilters.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            if (this._title === val)
                return;
            this._title = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilters.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (val) {
            if (this._filters === val)
                return;
            this._filters = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchFilters.prototype, "toggle", {
        get: function () {
            return this._toggle;
        },
        set: function (val) {
            if (this._toggle === val)
                return;
            this._toggle = val;
            if (this._toggle) {
                this.querySelector('.cover').className = 'cover modal';
                window.scrollTo(0, 0);
                document.body.style.overflow = 'hidden';
                this.style.height = window.innerHeight + 'px';
            }
            else {
                this.querySelector('.cover').className = 'cover';
                document.body.style.overflow = 'auto';
            }
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilters.prototype.connectedCallback = function () {
        var _this = this;
        if (this.type === 'active') {
            this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.activeTemplate(_a, this.title));
            this.addAllActive();
            if (!this.querySelector('.activeFilters').hasChildNodes()) {
                this.style.display = 'none';
            }
        }
        else if (this.type === 'modal') {
            this.innerHTML = (_b = ["", ""], _b.raw = ["", ""], this.modalTemplate(_b, this.title));
            this.addGroups();
        }
        else {
            this.innerHTML = (_c = ["", ""], _c.raw = ["", ""], this.template(_c, this.title));
            this.addGroups();
        }
        this.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target['className'] === 'showBtn') {
                _this.toggleModal(true);
            }
            else if (e.target['className'] === 'cancel' || e.target['className'] === 'applyFilters') {
                _this.toggleModal(false);
            }
            else if (e.target['className'] === 'clearFilters') {
                _this.clearFilters();
            }
        });
        var _a, _b, _c;
    };
    Object.defineProperty(RHDPSearchFilters, "observedAttributes", {
        get: function () {
            return ['type', 'title', 'filters', 'toggle'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchFilters.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchFilters.prototype.addGroups = function () {
        var groups = this.filters.facets, len = groups.length;
        for (var i = 0; i < len; i++) {
            var group = new RHDPSearchFilterGroup(), groupInfo = groups[i];
            group.key = groupInfo.key;
            group.name = groupInfo.name;
            group.items = groupInfo.items;
            this.querySelector('.groups').appendChild(group);
        }
    };
    RHDPSearchFilters.prototype.addActive = function (item) {
        var facet = this.querySelector(".filter-item-" + item.key);
        if (!facet) {
            this.querySelector('.activeFilters').appendChild(item);
            this.style.display = 'block';
        }
    };
    RHDPSearchFilters.prototype.addAllActive = function () {
        var groups = this.filters.facets;
        for (var i = 0; i < groups.length; i++) {
            var items = groups[i].items;
            for (var j = 0; j < items.length; j++) {
                var item = new RHDPSearchFilterItem();
                item.name = items[j].name;
                item.value = items[j].value;
                item.inline = true;
                item.active = items[j].active;
                item.key = items[j].key;
                if (item.active) {
                    this.addActive(item);
                }
            }
        }
    };
    RHDPSearchFilters.prototype.updateActiveFacets = function () {
        this.innerHTML = (_a = ["", ""], _a.raw = ["", ""], this.activeTemplate(_a, this.title));
        this.addAllActive();
        if (!this.querySelector('.activeFilters').hasChildNodes()) {
            this.style.display = 'none';
        }
        var _a;
    };
    RHDPSearchFilters.prototype.setActive = function (item, bubble) {
        var upd = this.querySelector(".filter-item-" + item.key);
        upd['bubble'] = bubble;
        upd['active'] = item.active;
    };
    RHDPSearchFilters.prototype.toggleModal = function (val) {
        this.dispatchEvent(new CustomEvent('toggle-modal', {
            detail: {
                toggle: val
            },
            bubbles: true
        }));
    };
    RHDPSearchFilters.prototype.applyFilters = function () {
        this.dispatchEvent(new CustomEvent('apply-filters', {
            bubbles: true
        }));
    };
    RHDPSearchFilters.prototype.clearFilters = function () {
        var items = this.querySelectorAll('rhdp-search-filter-item[active]'), len = items.length;
        for (var i = 0; i < len; i++) {
            items[i]['bubble'] = i !== 1 - len ? false : true;
            items[i]['active'] = false;
        }
    };
    return RHDPSearchFilters;
}(HTMLElement));
var RHDPSearchQuery = (function (_super) {
    __extends(RHDPSearchQuery, _super);
    function RHDPSearchQuery() {
        var _this = _super.call(this) || this;
        _this._limit = 10;
        _this._from = 0;
        _this._sort = 'relevance';
        _this.urlTemplate = function (strings, url, term, from, limit, sort, types, tags, sys_types) {
            var order = '';
            if (sort === 'most-recent') {
                order = '&newFirst=true';
            }
            return url + "?tags_or_logic=true&filter_out_excluded=true&from=" + from + order + "&query=" + term + "&query_highlight=true&size" + limit + "=true" + types + tags + sys_types;
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchQuery.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (val) {
            if (this._filters === val)
                return;
            this._filters = val;
            this.setFilters();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "from", {
        get: function () {
            return this._from;
        },
        set: function (val) {
            if (this._from === val)
                return;
            this._from = val;
            this.setAttribute('from', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (val) {
            if (this._limit === val)
                return;
            this._limit = val;
            this.setAttribute('limit', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        set: function (val) {
            if (this._sort === val)
                return;
            this._sort = val;
            this.setAttribute('sort', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "results", {
        get: function () {
            return this._results;
        },
        set: function (val) {
            if (this._results === val)
                return;
            this._results = val;
            this.dispatchEvent(new CustomEvent('search-complete', {
                detail: {
                    results: this.results,
                    term: this.term,
                    from: this.from,
                    filterStr: this.filterString(this.filters.facets),
                    filters: this.filters,
                    sort: this.sort,
                    limit: this.limit
                },
                bubbles: true
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (val) {
            if (this._term === val)
                return;
            this._term = val;
            this.setAttribute('term', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            if (this._url === val)
                return;
            this._url = val;
            this.setAttribute('url', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "productString", {
        get: function () {
            var defaults = [{ active: true, value: [
                        'eap',
                        'webserver',
                        'datagrid',
                        'datavirt',
                        'fuse',
                        'amq',
                        'brms',
                        'bpmsuite',
                        'devstudio',
                        'cdk',
                        'developertoolset',
                        'rhel',
                        'softwarecollections',
                        'mobileplatform',
                        'openshift',
                        'rhamt'
                    ] }], products = this.valStrings('project', this.filters.facets[1].items);
            return products.length > -1 ? products : this.valStrings('project', defaults);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "tagString", {
        get: function () {
            return this.valStrings('tag', this.filters.facets[2].items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchQuery.prototype, "sysTypeString", {
        get: function () {
            var defaults = [{ active: true, value: [
                        'jbossdeveloper_archetype',
                        'article',
                        'blogpost',
                        'jbossdeveloper_bom',
                        'book',
                        'cheatsheet',
                        'demo',
                        'event',
                        'forumthread',
                        'jbossdeveloper_example',
                        'quickstart',
                        'solution',
                        'stackoverflow_thread',
                        'video',
                        'website',
                        'webpage'
                    ] }], sysTypes = this.valStrings('sys_type', this.filters.facets[0].items);
            return sysTypes.length > -1 ? sysTypes : this.valStrings('sys_type', defaults);
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchQuery.prototype.valStrings = function (txt, items) {
        var len = items.length, typeString = '';
        for (var i = 0; i < len; i++) {
            var t = (items[i].value.join("&" + txt + "=")).toLowerCase().replace(' ', '+');
            typeString += items[i].active ? "&" + txt + "=" + t : '';
        }
        return typeString;
    };
    RHDPSearchQuery.prototype.filterString = function (facets) {
        var len = facets.length, filterArr = [];
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < facets[i].items.length; j++) {
                if (facets[i].items[j].active) {
                    var idx = 0;
                    while (idx < facets[i].items[j].value.length) {
                        filterArr.push(facets[i].items[j].value[idx]);
                        idx = idx + 1;
                    }
                }
            }
        }
        return filterArr.join(', ');
    };
    RHDPSearchQuery.prototype.connectedCallback = function () {
    };
    Object.defineProperty(RHDPSearchQuery, "observedAttributes", {
        get: function () {
            return ['term', 'sort', 'limit', 'results', 'filters', 'url'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchQuery.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchQuery.prototype.search = function (term) {
        var _this = this;
        this.term = term;
        var searchResults = document.getElementsByTagName('rhdp-search-results')[0];
        while (searchResults.firstChild && this.from === 0) {
            searchResults.removeChild(searchResults.firstChild);
        }
        searchResults.setAttribute('class', 'loading');
        fetch((_a = ["", "", "", "", "", "", "", "", ""], _a.raw = ["", "", "", "", "", "", "", "", ""], this.urlTemplate(_a, this.url, this.term, this.from, this.limit, this.sort, this.productString, this.tagString, this.sysTypeString)))
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            _this.results = data;
            history.pushState({}, "Red Hat Developer Program Search: " + _this.term, "?q=" + decodeURIComponent(_this.term).replace(' ', '+'));
        });
        var _a;
    };
    RHDPSearchQuery.prototype.setFilters = function () {
        return;
    };
    return RHDPSearchQuery;
}(HTMLElement));
var RHDPSearchResultCount = (function (_super) {
    __extends(RHDPSearchResultCount, _super);
    function RHDPSearchResultCount() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._term = '';
        _this.template = function (strings, count, term) {
            return count + " results found for " + term;
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchResultCount.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            if (this._count === val)
                return;
            this._count = val;
            this.setAttribute('count', val.toString());
            this.setText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResultCount.prototype, "term", {
        get: function () {
            return this._term;
        },
        set: function (val) {
            if (this._term === val)
                return;
            this._term = val;
            this.setAttribute('term', val);
            this.setText();
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResultCount.prototype.connectedCallback = function () {
    };
    Object.defineProperty(RHDPSearchResultCount, "observedAttributes", {
        get: function () {
            return ['count', 'term'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResultCount.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchResultCount.prototype.setText = function () {
        if (this.term.length > 0) {
            this.innerHTML = (_a = ["", "", ""], _a.raw = ["", "", ""], this.template(_a, this.count, this.term));
        }
        var _a;
    };
    return RHDPSearchResultCount;
}(HTMLElement));
var RHDPSearchResult = (function (_super) {
    __extends(RHDPSearchResult, _super);
    function RHDPSearchResult() {
        var _this = _super.call(this) || this;
        _this._url = ['', ''];
        _this.template = function (strings, url0, url1, title, kind, created, description) {
            return "<div class=\"result result-search\" >\n        <h4>" + url0 + title + url1 + "</h4>\n        <p class=\"result-info\">\n            <span class=\"caps\">" + kind + "</span>\n            <span>" + created + "</span>\n        </p>\n        <p class=\"result-description\">" + description + "</p>\n    </div>";
        };
        return _this;
    }
    Object.defineProperty(RHDPSearchResult.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            if (this._url === val)
                return;
            this._url = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResult.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            if (this._title === val)
                return;
            this._title = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResult.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        set: function (val) {
            if (this._kind === val)
                return;
            this._kind = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResult.prototype, "created", {
        get: function () {
            return this._created;
        },
        set: function (val) {
            if (this._created === val)
                return;
            this._created = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResult.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (val) {
            if (this._description === val)
                return;
            this._description = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResult.prototype, "result", {
        get: function () {
            return this._result;
        },
        set: function (val) {
            if (this._result === val)
                return;
            this._result = val;
            this.computeTitle(val);
            this.computeKind(val);
            this.computeCreated(val);
            this.computeDescription(val);
            this.computeURL(val);
            this.renderResult();
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResult.prototype.connectedCallback = function () {
    };
    Object.defineProperty(RHDPSearchResult, "observedAttributes", {
        get: function () {
            return ['result'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResult.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchResult.prototype.renderResult = function () {
        this.innerHTML = (_a = ["", "", "", "", "", "", ""], _a.raw = ["", "", "", "", "", "", ""], this.template(_a, this.url[0], this.url[1], this.title, this.kind, this.created, this.description));
        var _a;
    };
    RHDPSearchResult.prototype.computeTitle = function (result) {
        var title = '';
        if (result.highlight && result.highlight.sys_title) {
            title = result.highlight.sys_title[0];
        }
        else {
            title = result.fields.sys_title[0];
        }
        this.title = title;
    };
    RHDPSearchResult.prototype.computeKind = function (result) {
        var kind = result.fields.sys_type || "webpage", map = {
            jbossdeveloper_archetype: 'Archetype',
            article: 'Article',
            blogpost: 'Blog Post',
            jbossdeveloper_bom: 'Bom',
            book: 'Book',
            cheatsheet: 'Cheat Sheet',
            demo: 'Demo',
            event: 'Event',
            forumthread: 'Forum Thread',
            jbossdeveloper_example: 'Demo',
            quickstart: 'Quickstart',
            quickstart_early_access: 'Demo',
            solution: 'Article',
            stackoverflow_thread: 'Stack Overflow',
            video: 'Video',
            webpage: 'Webpage',
            website: 'Webpage'
        };
        this.kind = map[kind] || 'Webpage';
    };
    RHDPSearchResult.prototype.computeCreated = function (result) {
        var options = { month: 'long', day: 'numeric', year: 'numeric' };
        var created = result.fields.sys_created ? '- ' + new Intl.DateTimeFormat('en-US', options).format(new Date(result.fields.sys_created[0])) : "";
        this.created = created;
    };
    RHDPSearchResult.prototype.computeDescription = function (result) {
        var description = '';
        if (result.highlight && result.highlight.sys_description) {
            description = result.highlight.sys_description[0];
        }
        else if (result.highlight && result.highlight.sys_content_plaintext) {
            description = result.highlight.sys_content_plaintext[0];
        }
        else if (result.fields && result.fields.sys_description) {
            description = result.fields.sys_description[0];
        }
        else {
            description = result.fields.sys_content_plaintext[0];
        }
        this.description = description;
    };
    RHDPSearchResult.prototype.computeURL = function (result) {
        var url = ['', ''];
        if (result.fields && result.fields.sys_url_view) {
            url[0] = "<a href=\"" + result.fields.sys_url_view + "\">";
            url[1] = '</a>';
        }
        this.url = url;
    };
    return RHDPSearchResult;
}(HTMLElement));
var RHDPSearchResults = (function (_super) {
    __extends(RHDPSearchResults, _super);
    function RHDPSearchResults() {
        var _this = _super.call(this) || this;
        _this._last = 0;
        _this.loadMore = document.createElement('a');
        return _this;
    }
    Object.defineProperty(RHDPSearchResults.prototype, "results", {
        get: function () {
            return this._results;
        },
        set: function (val) {
            if (this._results === val)
                return;
            this._results = val;
            this.renderResults(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResults.prototype, "more", {
        get: function () {
            return this._more;
        },
        set: function (val) {
            if (this._more === val)
                return;
            this._more = val;
            this.renderResults(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDPSearchResults.prototype, "last", {
        get: function () {
            return this._last;
        },
        set: function (val) {
            if (this._last === val)
                return;
            this._last = val ? val : 0;
            this.setAttribute('last', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResults.prototype.connectedCallback = function () {
        var _this = this;
        this.loadMore.className = 'moreBtn hide';
        this.loadMore.innerText = 'Load More';
        this.loadMore.addEventListener('click', function (e) {
            e.preventDefault();
            _this.dispatchEvent(new CustomEvent('load-more', {
                detail: {
                    from: _this.last
                },
                bubbles: true
            }));
        });
    };
    Object.defineProperty(RHDPSearchResults, "observedAttributes", {
        get: function () {
            return ['results'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchResults.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchResults.prototype.addResult = function (result) {
        var item = new RHDPSearchResult();
        item.result = result;
        this.appendChild(item);
    };
    RHDPSearchResults.prototype.renderResults = function (add) {
        if (!add) {
            while (this.hasChildNodes()) {
                this.removeChild(this.lastChild);
            }
            this.addResults(this.results);
        }
        else {
            this.addResults(this.more);
        }
    };
    RHDPSearchResults.prototype.addResults = function (results) {
        if (results && results.hits && results.hits.hits) {
            var hits = results.hits.hits;
            var l = hits.length;
            for (var i = 0; i < l; i++) {
                this.addResult(hits[i]);
            }
            this.last = this.last + l;
            if (l > 0 && this.last < results.hits.total) {
                this.appendChild(this.loadMore);
            }
            else if (this.querySelector('.moreBtn')) {
                this.removeChild(this.loadMore);
            }
        }
    };
    return RHDPSearchResults;
}(HTMLElement));
var RHDPSearchSortPage = (function (_super) {
    __extends(RHDPSearchSortPage, _super);
    function RHDPSearchSortPage() {
        var _this = _super.call(this) || this;
        _this.template = "<p>\n        <span>Sort results by</span>\n        <select>\n        <option value=\"relevance\">Relevance</option>\n        <option value=\"most-recent\">Most Recent</option>\n        </select>\n        </p>";
        return _this;
    }
    Object.defineProperty(RHDPSearchSortPage.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        set: function (val) {
            if (this._sort === val)
                return;
            this._sort = val;
            this.querySelector('select').value = val;
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchSortPage.prototype.connectedCallback = function () {
        var _this = this;
        this.innerHTML = this.template;
        this.addEventListener('change', function (e) {
            _this.sort = e.target['options'][e.target['selectedIndex']].value;
            _this.setSort();
        });
    };
    Object.defineProperty(RHDPSearchSortPage, "observedAttributes", {
        get: function () {
            return ['name'];
        },
        enumerable: true,
        configurable: true
    });
    RHDPSearchSortPage.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    RHDPSearchSortPage.prototype.setSort = function () {
        this.dispatchEvent(new CustomEvent('sort-change', {
            detail: {
                sort: this.sort
            },
            bubbles: true
        }));
    };
    return RHDPSearchSortPage;
}(HTMLElement));
window.addEventListener('WebComponentsReady', function () {
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
