class RHDPSearchFilterItem extends HTMLElement {
    _key;
    _name;
    _active = false;
    _value;
    _inline = false;
    _bubble = true;

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
        if(typeof val === 'string') {
            val = true;
        } 
        if (this._active === val) return;
        this._active = val;
        if(this.active) { this.setAttribute('active','active'); } 
        else { this.removeAttribute('active'); }
        this.innerHTML = this.template`${this.name}${this.key}${this.active}`;
        this.dispatchEvent(new CustomEvent('facetChange', {detail: {facet: this}, bubbles: this.bubble}));
        this.bubble = true;
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

    get bubble() {
        return this._bubble;
    }

    set bubble(val) {
        if (this._bubble === val) return;
        this._bubble = val;
    }

    constructor() {
        super();
    }

    template = (strings, name, key, active) => {
        var checked = active ? 'checked' : '';
        return `<div class="list"><span>${name}</span><input type="checkbox" ${checked} id="filter-item-${key}"><label for="filter-item-${key}">${name}</label></div>`; 
    };
    
    inlineTemplate = (strings, name) => {
        return `<div class="inline">${name} <i class="fa fa-times clearItem" aria-hidden="true"></i></div>`
    }

    connectedCallback() {
        if (this.inline) {
            this.innerHTML = this.inlineTemplate`${this.name}`;
            this.querySelector('.clearItem').addEventListener('click', e => { this.active = !this.active; });
        } else {
            this.innerHTML = this.template`${this.name}${this.key}${this.active}`;
            this.addEventListener('click', e => { this.active = !this.active; });
        }
    }

    static get observedAttributes() { 
        return ['name', 'active', 'value', 'inline', 'key']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}