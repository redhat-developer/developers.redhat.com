//import {PFElement} from '../../@pfelements/pfelement.umd.js';
import PFElement from '@patternfly/pfelement/pfelement.umd';

export default class DPSearchResult extends PFElement {
    get html() {
        return `
        <style>
:host {
    font-family: "Overpass", "Open Sans", Arial, Helvetica, sans-serif;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #d5d5d5;
    display: flex;
    flex-direction: row;
}
    .subscription-required {
        &:before {
            content: '';
            background: url('https://static.jboss.org/rhd/images/icons/subscription-required.svg') no-repeat;
            background-size:cover;
            position:absolute;
            margin-top: 5px;
            width: .9em;
            height: .9em;
        }
        .caps {
            margin-left: 20px;
        }

    }

    div:first-child { flex: 1 1 auto; }

    h4 {
        font-weight: 600;
        font-style: normal;
        font-size: 20px;
        line-height: 1.4;
        margin: 0;
        font-family: "Overpass", "Open Sans", Arial, Helvetica, sans-serif;
    }

    h4 a {
        color: #06c;
        cursor: pointer;
        text-decoration: none;
    }

    p { margin: 0; 
        color: #424242;
        font-family: "Overpass", "Open Sans", Arial, Helvetica, sans-serif;
        }
    .result-info span{
        font-size: .9rem;
        color: $grey-6;
    }

    .caps {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        -webkit-font-smoothing: antialiased;
    }
    .result-description {
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 45px;
        margin-bottom: 25px;
    }
    div {
        flex: 1 1 auto;
    }
    div.thumb { 
        flex: 0 0 130px; 
        margin-left: 1em;
    }

    .thumb img {
        height: auto;
        max-width: 100%;
    }

    .hlt { font-weight: 600; }
        </style>
<div>
    <h4>${this.url ? `<a href="${this.url}">${this.title}</a>` : this.title}</h4>
    <p ${this.premium ? 'class="result-info subscription-required" data-tooltip="" title="Subscription Required" data-options="disable-for-touch:true"' : 'class="result-info"'}>
        <span class="caps">${this.kind}</span>
        ${this.created ? `- <pfe-datetime datetime="${this.created}" type="local" day="numeric" month="long" year="numeric">${this.created}</pfe-datetime>` : ''}
    </p>
    <p class="result-description">${this.description}</p>
</div>
${this.thumbnail ? `<div class="thumb"><img src="${this.thumbnail.replace('http:','https:')}"></div>` : ''}`;
    }

    static get tag() { return 'dp-search-result'; }

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
        return !this.premium ? this._url : `https://broker${stage}.redhat.com/partner/drc/userMapping?redirect=${encodeURIComponent(this._url)}`;
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
        this.title = this._result.title[0] ? this._result.title[0] : 'Default Title';
        this.description = (this._result.description && this._result.description[0]) ? this._result.description[0] : 'Default Description';
        this.url = this._result.id;
        this.kind = this._result.type[0] ? this._result.type[0] : 'webpage';
        // this.computeTitle(val);
        // this.computeKind(val);
        // this.computeCreated(val);
        // this.computeDescription(val);
        // this.computeURL(val);
        // this.computePremium(val);
        // this.computeThumbnail(val);
        this.renderResult();

    }

    constructor() {
        super(DPSearchResult, {delayRender: true});
    }

    connectedCallback() {
        super.connectedCallback();
        super.render();
    }

    static get observedAttributes() {
        return ['result'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    renderResult() {
        super.render();
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
        } else {
            description = result.fields.sys_content_plaintext ? result.fields.sys_content_plaintext[0] : '';
        }

        // Removes all HTML tags from description
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = description;
        description = tempDiv.innerText;

        this.description = description;
    }
    computeURL(result) {
        if (result.fields && result.fields.sys_type === 'book' && result.fields.field_book_url) {
            this.url = result.fields.field_book_url;
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

PFElement.create(DPSearchResult);