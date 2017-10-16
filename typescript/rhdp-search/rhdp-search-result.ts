class RHDPSearchResult extends HTMLElement {
    _result;
    _url = ['',''];
    _title;
    _kind;
    _created;
    _description;
    _premium;
    _thumbnail;

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

    get premium() {
        return this._premium;
    }

    set premium(val) {
        if (this._premium === val) return;
        this._premium = val;
    }

    get thumbnail() {
        return this._thumbnail;
    }
    set thumbnail(val) {
        if (this._thumbnail === val) return;
        this._thumbnail = val;
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
        this.computePremium(val);
        this.computeThumbnail(val);
        this.renderResult();

    }

    constructor() {
        super();
    }

    template = (strings, url0, url1, title, kind, created, description, premium, thumbnail) => {
        return `<div>
            <h4>${url0}${title}${url1}</h4>
            <p ${premium ? 'class="result-info subscription-required" data-tooltip="" title="Subscription Required" data-options="disable-for-touch:true"' : 'class="result-info"'}>
                <span class="caps">${kind}</span>
                ${created}
            </p>
            <p class="result-description">${description}</p>
        </div>
        ${thumbnail ? `<div class="thumb"><img src="${thumbnail.replace('http:','https:')}"></div>` : ''}`; 
    };

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['result']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    renderResult() {
        this.innerHTML = this.template`${this.url[0]}${this.url[1]}${this.title}${this.kind}${this.created}${this.description}${this.premium}${this.thumbnail}`;
    }

    computeThumbnail(result) {
        if (result.fields.thumbnail) {
            this.thumbnail = result.fields.thumbnail[0];
        }
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
            webpage: 'Web Page',
            website: 'Web Page'
        };
        this.kind = map[kind] || 'Webpage';
    }
    computeCreated(result) {
        var options = { month: 'long', day: 'numeric', year: 'numeric' };
        var created = result.fields.sys_created ? `- <rh-datetime datetime="${result.fields.sys_created[0]}" type="local" day="numeric" month="long" year="numeric">${result.fields.sys_created[0]}</rh-datetime>` : "";
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

    computePremium(result) {
        var premium = false;
        if(result._type === "rht_knowledgebase_article" || result._type === "rht_knowledgebase_solution"){
            premium = true;
        }
        this.premium = premium;
    }

}

customElements.define('rhdp-search-result', RHDPSearchResult);