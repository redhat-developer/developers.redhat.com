export default class RHDPSearchResult extends HTMLElement {
    _result;
    _url;
    _title;
    _kind;
    _created;
    _description;
    _premium;
    _thumbnail;

    get url() {
        const stage = window.location.href.indexOf('stage') >= 0 || window.location.href.indexOf('developers') < 0 ? '.stage' : '';
        return !this.premium ? this._url : `https://developers${stage}.redhat.com/download-manager/link/3867444?redirect=${encodeURIComponent(this._url)}`;
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
        this._description = val.replace('>','&gt;').replace('<','&lt;');
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

    template = (strings, url, title, kind, created, description, premium, thumbnail) => {
        return `<div>
            <h4>${url ? `<a href="${url}">${title}</a>` : title}</h4>
            <p ${premium ? 'class="result-info subscription-required" data-tooltip="" title="Subscription Required" data-options="disable-for-touch:true"' : 'class="result-info"'}>
                <span class="caps">${kind}</span>
                ${created ? `- <pfe-datetime datetime="${created}" type="local" day="numeric" month="long" year="numeric">${created}</pfe-datetime>` : ''}
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
        this.innerHTML = this.template`${this.url}${this.title}${this.kind}${this.created}${this.description}${this.premium}${this.thumbnail}`;
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
        this.kind = map[kind] || 'Web Page';
    }

    computeCreated(result) {
        this.created = result.fields.sys_created && result.fields.sys_created.length > 0 ? result.fields.sys_created[0] : '';
    }

    computeDescription(result) {
        var description = '';
        if(result.highlight && result.highlight.sys_description) {
            description = result.highlight.sys_description[0];
        } else if( result.highlight && result.highlight.sys_content_plaintext) {
            description = result.highlight.sys_content_plaintext[0];
        } else if (result.fields && result.fields.sys_description) {
            description = result.fields.sys_description[0];
        } else if (result.fields && result.fields.sys_content_plaintext) {
            description = result.fields.sys_content_plaintext[0];
        }

        // Removes all HTML tags from description.
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = description;
        description = tempDiv.innerText;
        this.description = description;
    }

    computeURL(result) {
        if (result.fields && result.fields.sys_type === 'book' && result.fields.field_book_url) {
            this.url = result.fields.field_book_url ? result.fields.field_book_url : '';
        } else {
            this.url = (result.fields && result.fields.sys_url_view) ? result.fields.sys_url_view : '';
        }
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
