import RHElement from '../rhelement';

export default class DPCategory extends RHElement {
    template = (el:DPCategory) => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
<style>
:host { 
    text-align: center; 
}
img, svg { height: 150px; width: 150px; }

:host(:hover), :host([visible]) {
    color: var(--rhd-blue);
    fill: var(--rhd-blue);
}
</style>
${el.image && el.image.indexOf('svg') < 0 ? `<img src="${el.image}">` : el.image }
<h4>${ el.name }</h4>
<slot></slot>
`;
        return tpl;
    }

    _name:string;
    _image:string;
    _visible:boolean = false;

    get name() { return this._name; }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
    }

    get image() { return this._image; }
    set image(val) {
        if (this._image === val) return;
        if (!val.match(/\.svg$/)) {
            this._image = val;
        } else {
            this._getSVG(val);
        }
    }

    get visible() { return this._visible; }
    set visible(val) {
        val = val !== null && val !== false ? true : false;
        if (this._visible === val) return;
        this._visible = val;
        let evt = {
            detail: {
                index: this._getIndex(this)
            },
            bubbles: true,
            composed: true
        }
        this.dispatchEvent(new CustomEvent('dp-category-selected', evt));
        if ( this._visible ) {
            this.setAttribute('visible','');
        } else {
            this.removeAttribute('visible');
        }
        // this.shadowRoot.querySelector('section').style.display = this._visible ? 'block' : 'none';
    }

    constructor() {
        super('dp-category-list');
        
        this._showList = this._showList.bind(this);
    }

    connectedCallback() {
        super.render(this.template(this));

        this.addEventListener('click', e => {
            e.preventDefault();
            this.visible = !this.visible;
            return false;
        });
    }

    static get observedAttributes() { 
        return ['name', 'image','visible']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _showList() {
        this.visible = !this.visible;
    }

    _getIndex(node) {
        let i = 1;
        while (node = node.previousElementSibling) { if (node.nodeName === 'DP-CATEGORY') { ++i } }
        return i;
    }

    async _getSVG(path) {
        const resp = await fetch(path);
        const svg = await resp.text();
        this.image = svg.substring(svg.indexOf('<svg'));
        super.render(this.template(this));
    }
}

window.customElements.define('dp-category', DPCategory);