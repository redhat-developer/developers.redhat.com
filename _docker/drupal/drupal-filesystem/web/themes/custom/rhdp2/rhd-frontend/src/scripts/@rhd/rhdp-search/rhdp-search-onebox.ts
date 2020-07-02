export default class RHDPSearchOneBox extends HTMLElement {
    _term = '';
    _url = '../rhdp-apps/onebox/onebox.json';
    _data;
    _feature;
    _mock = false;

    get term() {
        if ((this._term===null) || (this._term==='')) {
           return this._term;
        } else {
           return this._term.replace(/(<([^>]+)>)/ig,'');
        }
    }
    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.setAttribute('term', this._term);
        this.feature = this.getFeature()
    }

    get url() {
        return this._url;
    }
    set url(val) {
        if (this._url === val) return;
        this._url = val;
        this.setAttribute('url', this._url);
        this.getData();
    }

    get data() {
        return this._data;
    }
    set data(val) {
        if (this._data === val) return;
        this._data = val;
        this.feature = this.getFeature();
    }

    get feature() {
        return this._feature;
    }
    set feature(val) {
        if (this._feature === val) return;
        this._feature = val;
        this.innerHTML = this.feature ? this.template`${this.feature}` : '';
    }

    get mock() {
        return this._mock;
    }
    set mock(val) {
        if (this._mock === val) return;
        this._mock = val;
    }

    slotTemplate = (strings, slot, id) => {
        return `${slot && slot.url && slot.text ? `<div class="pf-l-flex__item"><a class="pf-c-button" href="${slot.url}?onebox=${id}">${this.getIcon(slot.icon)} &nbsp; ${slot.text}</a></div>` : ''}`;
    }

    template = (strings, feature) => {
        return `<div>
            ${feature.heading && feature.heading.url && feature.heading.text ? `<h4><a href="${feature.heading.url}">${feature.heading.text}</a></h4>` : ''}
            ${feature.details ? `<p>${feature.details}</p>` : ''}
            <div class="pf-l-flex">
              ${feature.button && feature.button.url && feature.button.text ? `
                <div class="pf-l-flex__item">
                    <a href="${feature.button.url}?onebox=${feature.id}" class="pf-c-button pf-m-primary">${feature.button.text}</a>
                </div>` : ''}
              ${feature.slots && feature.slots.length > 0 ? `
              ${feature.slots.map(slot =>  this.slotTemplate`${slot}${feature.id}`).join('')}` : ''}
            </div>
        </div>`;
    };

    constructor() {
        super();

        this._termChange = this._termChange.bind(this);
    }

    connectedCallback() {
        this.getData();

        top.addEventListener('term-change', this._termChange);
        top.addEventListener('params-ready', this._termChange);
    }

    static get observedAttributes() {
        return ['term', 'url', 'mock'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _termChange(e) {
        if (e.detail && e.detail.term && e.detail.term.length > 0) {
            this.term = e.detail.term;
        } else {
            this.term = '';
        }
    }

    getData() {
        if(this.mock || this.data) {
            return this.data;
        } else {
            let fInit : RequestInit = {
                method: 'GET',
                headers: new Headers(),
                mode: 'cors',
                cache: 'default'
            };
            fetch(this.url, fInit)
            .then((resp) => resp.json())
            .then((data) => {
                this.data = data;
            });
        }
    }

    getFeature() {
        var len = this.data && this.data['features'] ? this.data['features'].length : 0,
            f;
        for(var i = 0; i < len; i++) {
            if (this.data['features'][i].match.indexOf(this.term.toLowerCase()) >= 0) {
                f = this.data['features'][i];
            }
        }
        return f;
    }

    getIcon(name) {
        let icons = {
            icon_help: '<i class="fas fa-question fa-lg"></i>',
            icon_helloworld: '<i class="fas fa-list-ol fa-lg"></i>',
            icon_docsandapi: '<i class="fas fa-file-alt fa-lg"></i>'
        }
        return name ? icons[name] : '';
    }
}

customElements.define('rhdp-search-onebox', RHDPSearchOneBox);
