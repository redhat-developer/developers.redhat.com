export class RHDPSearchResult extends HTMLElement {
    _result;
    _title;
    _kind;
    _created;
    _description;

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
        this.renderResult();
    }

    constructor() {
        super();
    }

    template = (strings, title, kind, created, description) => {
        return `<div class="result result-search" >
        <h4>${title}</h4>
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
        this.innerHTML = this.template`${this.title}${this.kind}${this.created}${this.description}`;
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
}

customElements.define('rhdp-search-result', RHDPSearchResult);
