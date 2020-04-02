export default class RHDPSearchFilterItem extends HTMLElement {
    _key;
    _name;
    _active = false;
    _value;
    _inline = false;
    _bubble = true;
    _bounce = false;
    _group;

    get name() {
        return this._name;
    }

    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.setAttribute('name', this._name);
    }

    get key() {
        return this._key;
    }

    set key(val) {
        if (this._key === val) return;
        this._key = val;
        this.className = `filter-item-${this._key}`;
        this.setAttribute('key', this._key);
    }

    get group() {
        return this._group;
    }

    set group(val) {
        if (this._group === val) return;
        this._group = val;
        this.setAttribute('group', this._group);
    }

    get active() {
        return this._active;
    }

    set active(val) {
        if (typeof val === 'string') {
            val = true;
        }
        if (val === null) {
            val = false;
        }

        if (this._active === val) {
            return;
        }

        this._active = val;
        let chkbox = this.querySelector('input');

        if (this._active) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }
        if (chkbox) {
            chkbox.checked = this._active;
        }
        if (this.inline) { this.innerHTML = this._active ? this.inlineTemplate`${this.name}${this._active}` : ''; }

        this.dispatchEvent(new CustomEvent('filter-item-change', { detail: { facet: this }, bubbles: this.bubble }));
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
        this.innerHTML = !this._inline ? this.template`${this.name}${this.key}${this.active}` : this.inlineTemplate`${this.name}${this.active}`;
    }

    get bubble() {
        return this._bubble;
    }

    set bubble(val) {
        if (this._bubble === val) return;
        this._bubble = val;
    }

    get bounce() {
        return this._bounce;
    }
    set bounce(val) {
        if (this._bounce === val) return;
        this._bounce = val;
    }

    constructor() {
        super();

        this._checkParams = this._checkParams.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._checkChange = this._checkChange.bind(this);
        this._updateFacet = this._updateFacet.bind(this);
    }

    template = (strings, name, key, active) => {
        var checked = active ? 'checked' : '';
        return `
        <div class="pf-c-check">
          <input class="pf-c-check__input" type="checkbox" id="filter-item-${key}" name="filter-item-${key}"/>
          <label class="pf-c-check__label" for="filter-item-${key}">${name}</label>
        </div>
         `;
    };

    inlineTemplate = (strings, name, active) => {
        return active ? `
        <div class="pf-c-label" data-search-action="clearFilter">
            ${name} <i class="fa fa-times" aria-hidden="true" data-search-action="clearFilter"></i>
        </div>` : '';
    }

    connectedCallback() {
        this.innerHTML = !this.inline ? this.template`${this.name}${this.key}${this.active}` : this.inlineTemplate`${this.name}${this.active}`;

        if (!this.inline) {
            this.addEventListener('change', this._updateFacet);
        } else {
            this.addEventListener('click', this._updateFacet);
        }

        top.addEventListener('filter-item-change', this._checkChange);
        top.addEventListener('params-ready', this._checkParams);
        top.addEventListener('clear-filters', this._clearFilters);
    }

    static get observedAttributes() {
        return ['name', 'active', 'value', 'inline', 'key', 'group'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _updateFacet(e) {
        this.bounce = true;
        if (this.inline) {
            let action = e.target['dataset']['searchAction'];
            if (action && action == 'clearFilter') {
                this.active = !this.active;
            }
        } else {
            this.active = !this.active;
        }
    }

    _checkParams(e) {
        let chk = false;
        if (e.detail && e.detail.filters) {
            Object.keys(e.detail.filters).forEach(group => {
                e.detail.filters[group].forEach(facet => {
                    if (group === this.group) {
                        if (facet === this.key) {
                            chk = true;
                            this.bubble = false;
                            this.active = true;
                            this.dispatchEvent(new CustomEvent('filter-item-init', { detail: { facet: this }, bubbles: this.bubble }));
                        }
                    }
                });
            });
        }

        if (!chk) {
            this.bubble = false;
            this.active = false;
        }
    }

    _checkChange(e) {
        if (e.detail && e.detail.facet) {
            if (!this.bounce) {
                if (this.group === e.detail.facet.group && this.key === e.detail.facet.key) {
                    this.bubble = false;
                    this.active = e.detail.facet.active;
                }
            }
            this.bubble = true;
            this.bounce = false;
        }
    }

    _clearFilters(e) {
        this.bubble = false;
        this.bounce = false;
        this.active = false;
    }
}

customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);
