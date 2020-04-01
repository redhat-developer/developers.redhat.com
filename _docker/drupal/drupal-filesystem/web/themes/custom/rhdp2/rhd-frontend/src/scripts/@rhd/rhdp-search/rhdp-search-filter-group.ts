export default class RHDPSearchFilterGroup extends HTMLElement {
    _key;
    _name;
    _items;
    _toggle = false;
    _more = false;

    get key() {
        return this._key;
    }
    set key(val) {
        if (this._key === val) return;
        this._key = val;
    }

    get name() {
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.querySelector('.group-name').innerHTML = this._name;
    }

    get items() {
        return this._items;
    }
    set items(val) {
        if (this._items === val) return;
        this._items = val;
    }

    get toggle() {
        return this._toggle;
    }
    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        this.querySelector('.group').className = this.toggle ? 'group' : 'group hide';
        this.querySelector('.toggle').className = this.toggle ? 'toggle expand' : 'toggle';
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
        this.querySelector('.more').innerHTML = this.more ? 'Show Less' : 'Show More';
        this.querySelector('.secondary').className = this.more ? 'secondary' : 'secondary hide';
    }

    constructor() {
        super();

        this.innerHTML = this.template`${this.name}`;
    }

    template = (strings, name) => {
        return `
        <div class="showFilters heading">
          <span class="group-name">${name}</span>
          <span class="toggle"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
        </div>
        <div class="group hide">
            <div class="primary"></div>
            <div class="secondary hide"></div>
            <a href="#" class="more" data-search-action="more">Show More</a>
        </div>`;
    };

    connectedCallback() {
        this.querySelector('.heading').addEventListener('click', e => {
            e.preventDefault();
            this.toggle = !this.toggle;
        });
        this.querySelector('.more').addEventListener('click', e => {
            this.more = !this.more;
        });

        this.toggle = true;
    }

    static get observedAttributes() {
        return ['name', 'key', 'toggle', 'items', 'more'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

customElements.define('rhdp-search-filter-group', RHDPSearchFilterGroup);
