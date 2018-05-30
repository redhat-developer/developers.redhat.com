import RHElement from '@rhelements/rhelement';

export default class DPCategory extends RHElement {
    template = (el:DPCategory) => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
<style>
:host { 
    grid-column: span 1;
    border-top: 1px solid var(--rhd-blue);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px;
    align-items: center;
    background-color: var(--rhd-white, #ffffff);
    position: relative;
    z-index: 1;
}

img, svg { 
    flex: 0 0 60px; 
    padding-right: 24px; 
    height: 60px;   
}

h4 {
    flex: 1 0 auto;
    color: #0066CC;
    font-family: Overpass;
    font-size: 14px;
    font-weight: normal;
    line-height: 21px;
    margin: 0 0 5px 0;
}

:host(:hover), :host([visible]) {
    cursor: pointer;
    color: var(--rhd-blue);
    fill: var(--rhd-blue);
    border-top: 5px solid var(--rhd-blue);
    border-bottom: 5px solid var(--rhd-blue);
}

@media (min-width: 500px) {
    :host, :host(:hover), :host([visible]) {
        flex-direction: column;
        text-align: center; 
        border-top: none;
        border-bottom: none;
        background-color: transparent;
        margin-bottom:30px;
    }

    :host([visible]):after, :host([visible]):before {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    
    :host([visible]):before {
        border-bottom-color: #CCCCCC;
        border-width: 15px;
        margin-left: -15px;
    }
    :host([visible]):after {
        border-bottom-color: #FFFFFF;
        border-width: 16px;
        margin-left: -16px;
    }
    

    img, svg { flex: 0 0 150px; height: 150px; padding-right: 0; padding-bottom: 15px; }
}

@media (min-width: 800px) {
    :host {
        
    }
}

@media (min-width: 1200px) {
    :host {
        
    }
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
    _index = -1;

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

    // setChildrenVisibility(items:NodeListOf<Element>, visible:boolean) {
    //     for (let i=0, l=items.length; i < l; i++) {
    //         if(visible) {
    //             items[i].setAttribute('visible','');
    //         } else {
    //             items[i].removeAttribute('visible');
    //         }
    //     }
    // }

    get index() {
        return this._index;
    }
    set index(val) {
        if (this._index === val) return;
        this._index = val;
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
        if(this.index < 0) {
            let i = 1;
            while (node = node.previousElementSibling) { if (node.nodeName === 'DP-CATEGORY') { ++i } }
            return i;
        } else {
            return this.index;
        }
        
    }

    async _getSVG(path) {
        const resp = await fetch(path);
        const svg = await resp.text();
        this.image = svg.substring(svg.indexOf('<svg'));
        super.render(this.template(this));
    }
}

window.customElements.define('dp-category', DPCategory);