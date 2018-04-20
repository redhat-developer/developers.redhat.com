import RHElement from '../rhelement';

export default class DPCategory extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
<style>
:host { 
    text-align: center; 
    grid-column: span 1; 
}
:host img { height: 150px; width: 150px; }
</style>
${el.image ? `<img src="${el.image}">` : `<img src="">`}
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
        this._image = val;
    }

    get visible() { return this._visible; }
    set visible(val) {
        if (this._visible === val) return;
        this._visible = val;
        // this.shadowRoot.querySelector('section').style.display = this._visible ? 'block' : 'none';
        this.dispatchEvent(new CustomEvent(this._visible ? 'dp-category-selected' : 'dp-category-deselected', {
            bubbles: true,
            detail: {index: this._getIndex(this), list: this.querySelector( 'dp-category-item-list' ).cloneNode(true) }
        }));
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
        return ['name', 'image']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _showList() {
        console.log('category clicked');
        this.visible = !this.visible;
    }

    _getIndex(node) {
        let i = 1;
        while (node = node.previousElementSibling) { ++i }
        return i;
    }
}

window.customElements.define('dp-category', DPCategory);