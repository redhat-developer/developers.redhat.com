export class RHDPSearchFilterItem extends HTMLElement {
    _key;
    _name;
    _active = false;
    _value;
    _inline = false;

    get name() {
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.setAttribute('name', this.name);
    }
    get key() {
        return this._key;
    }
    set key(val) {
        if (this._key === val) return;
        this._key = val;
        this.className = `filter-item-${this.key}`;
        this.setAttribute('key', this.key);
    }
    get active() {
        return this._active;
    }
    set active(val) {
        if (this._active === val) return;
        this._active = val;
        this.setChecked();
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (this._value === val) return;
        this._value = val;
        this.setAttribute('value', this.value);
    }
    get inline() {
        return this._inline;
    }
    set inline(val) {
        if (this._inline === val) return;
        this._inline = val;
    }

    constructor() {
        super();
    }

    template = (strings, name) => {
        return `<div class="list"><input type="checkbox"><span>${name}</span></div>`; 
    };
    
    inlineTemplate = (strings, name) => {
        return `<div class="inline">${name} <span class="clearItem"><i class='fa fa-times' aria-hidden='true'></i></span></div>`
    }

    connectedCallback() {
        if (this.inline) {
            this.innerHTML = this.inlineTemplate`${this.name}`;
        } else {
            this.innerHTML = this.template`${this.name}`;
        }

        this.addEventListener('click', e => {
            this.active = !this.active;
            this.dispatchEvent(new CustomEvent('facetChange', {detail: {facet: this}, bubbles: true}));
        });

        this.setChecked();
    }

    static get observedAttributes() { 
        return ['name', 'active', 'value', 'inline', 'key']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    setChecked() {
        var inputList = this.querySelectorAll('input');
        for (let i = 0; i < inputList.length; i++) {
            if(this.active) {
                inputList[i].setAttribute('checked', 'checked');
            } else {
                inputList[i].removeAttribute('checked');
            }
        }
    }
}

customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
