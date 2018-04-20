import RHElement from '../rhelement';

export default class DPProductShortTeaser extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
<style>
    :host { 
        font-family: Overpass;
        font-size: 14px;
        line-height: 21px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
    }
    h4 { flex: 0 0 24px; }
    h4 a {
        color: #0066CC;
        font-family: Overpass;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
    }

    div {
        flex: 1 1 auto;
    }

    a.more {
        flex: 0 0 21px;
        display: block;
        width: auto;
        color: #0066CC;
        font-size: 16px;
        line-height: 25px;
    }
</style>
<h4><a href="${el.link}">${el.name}</a></h4>
<div>
<slot></slot>
</div>
<a class="more" href="${el.downloadLink}">View all downloads <i class="fas fa-caret-right"></i></a>
        `;
        return tpl;
    }

    _name: string;
    _link: string;
    _downloadLink: string;

    get name() {
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
    }

    get link() {
        return this._link;
    }
    set link(val) {
        if (this._link === val) return;
        this._link = val;
    }

    get downloadLink() {
        return this._downloadLink;
    }
    set downloadLink(val) {
        if (this._downloadLink === val) return;
        this._downloadLink = val;
    }

    constructor() {
        super('dp-product-short-teaser');
    }

    connectedCallback() {
        super.render(this.template(this));
    }

    static get observedAttributes() { 
        return ['name', 'link', 'download-link']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name !== 'download-link') {
            this[name] = newVal;
        } else {
            this.downloadLink = newVal;
        }
        
    }
}

window.customElements.define('dp-product-short-teaser', DPProductShortTeaser);