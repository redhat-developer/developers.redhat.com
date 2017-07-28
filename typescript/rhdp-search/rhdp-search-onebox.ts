class RHDPSearchOneBox extends HTMLElement {
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
        this.getData();
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
        this.getFeature();
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

    slotTemplate = (strings, slot) => {
        return `${slot && slot.url && slot.text ? `<li><a href="${slot.url}"><img src="${slot.icon}">${slot.text}</a></li>` : ''}`;
    }

    template = (strings, feature) => {
        return `<div>
            ${feature.heading && feature.heading.url && feature.heading.text ? `<h4><a href="${feature.heading.url}">${feature.heading.text}</a></h4>` : ''}
            ${feature.details ? `<p>${feature.details}</p>` : ''}
            ${feature.button && feature.button.url && feature.button.text ? `<a href="${feature.button.url}" class="button medium-cta blue">${feature.button.text}</a>` : ''}
            ${feature.slots && feature.slots.length > 0 ? `<ul class="slots">
                ${feature.slots.map(slot =>  this.slotTemplate`${slot}`).join('')}
            </ul>` : ''}
        </div>`;
    };

    constructor() {
        super();

    }

    connectedCallback() {

    }

    static get observedAttributes() { 
        return ['term', 'url', 'mock']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    getData() {
        if(this.term !== '' && !this.mock) {
            let fInit : RequestInit = {
                method: 'GET',
                headers: new Headers(),
                mode: 'cors',
                cache: 'default'
            };
            fetch(this.url, fInit)
            .then((resp) => {
                if(resp.ok) { resp.json() }
                this.data = undefined;
            })
            .then((data) => { 
                this.data = data;
            });
        } else {
            if (this.mock && this.data) {
                this.getFeature();
            }
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

        this.feature = f;
    }
}