export class RHDPProjectURL extends HTMLElement {

    private _uri = new URL(window.location.href);
    private _term;
    private _filters;


    get uri(): URL {
        return this._uri;
    }

    set uri(value: URL) {
        this._uri = value;
    }

    get term(): string{
        return this._term;
    }

    set term(value: string) {
        if(value.length > 0){
            this.uri.searchParams.set('filter-text',value);
        }else{
            this.uri.searchParams.delete('filter-text')
        }
        this._term = value;
    }

    get filters() {

        return this._filters;
    }

    set filters(value) {
        if(value.length > 0){
            this.uri.searchParams.set('filter-product',value);
        }else{
            this.uri.searchParams.delete('filter-product')
        }
        this._filters = value;
    }

    constructor() {
        super();
        this._updateURI = this._updateURI.bind(this);
    }

    connectedCallback() {
        top.addEventListener('data-results-complete', this._updateURI)
    }

    _updateURI(e){
        if(e.detail){
            this.term = e.detail.term ? e.detail.term : '';
            this.filters = e.detail.filter ? e.detail.filter : '';
            history.pushState({}, 'RHDP Projects:', `${this.uri.pathname}${this.uri.searchParams ? `#!${this.uri.searchParams}` : ''}`);
        }


    }
    static get observedAttributes() {
        return ['loading'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

}

window.customElements.define('rhdp-project-url', RHDPProjectURL);