class RHDPSearchFilters extends HTMLElement {
    _type = '';
    _title = 'Filter By';
    _filters;
    _toggle = false;
    _modal;

    get type() {
        return this._type;
    }

    set type(val) {
        if (this._type === val) return;
        this._type = val;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    get toggle() {
        return this._toggle;
    }

    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        if(this._toggle) {
            this.querySelector('.cover').className = 'cover modal';
            window.scrollTo(0,0);
            document.body.style.overflow = 'hidden';
            this.style.height = window.innerHeight + 'px';
        } else {
            this.querySelector('.cover').className = 'cover';
            document.body.style.overflow = 'auto';
        }
    }

    constructor() {
        super();
    }
    modalTemplate = (string, title) => {
        return `<div class="cover" id="cover">
            <div class="title">${title} <a href="#" class="cancel" id="cancel">Close</a></div>
            <div class="groups">
            </div>
            <div class="footer">
            <a href="#" class="clearFilters">Clear Filters</a> 
            <a href="#" class="applyFilters">Apply</a>
            </div>
        </div>`;
    }
    activeTemplate = (strings, title) => {
        return `<div class="active-type">
        <strong>${title}</strong>
        <div class="activeFilters"></div>
        <a href="#" class="clearFilters">Clear Filters</a>
      </div>`;
    }
    template = (strings, title) => {
        return `<a class="showBtn">Show Filters</a>
        <div class="control" id="control">
            <div class="title">${title}</div>
            <div class="groups">
            </div>
        </div>`; 
    };

    connectedCallback() {
        if (this.type === 'active') {
            this.innerHTML = this.activeTemplate`${this.title}`;
            this.addAllActive();
            if (!this.querySelector('.activeFilters').hasChildNodes()) {
                this.style.display = 'none';
            }
        } else if (this.type === 'modal') {
            this.innerHTML = this.modalTemplate`${this.title}`;
            this.addGroups();
        } else {
            this.innerHTML = this.template`${this.title}`;
            this.addGroups();
        }

        this.addEventListener('click', e => {
            e.preventDefault();
            if ( e.target['className'] === 'showBtn' ) {
                this.toggleModal(true);
            } else if ( e.target['className'] === 'cancel' || e.target['className'] === 'applyFilters') {
                this.toggleModal(false);
            } else if ( e.target['className'] === 'clearFilters') {
                this.clearFilters();
            }
        });
    }

    static get observedAttributes() { 
        return ['type', 'title', 'filters', 'toggle']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addGroups() {
        var groups = this.filters.facets,
            len = groups.length;
        for(let i=0; i < len; i++) {
            var group = new RHDPSearchFilterGroup(),
                groupInfo = groups[i];
            group.key = groupInfo.key;
            group.name = groupInfo.name;
            group.items = groupInfo.items;
            this.querySelector('.groups').appendChild(group);
        }

    }

    addActive(item) {
        var facet = this.querySelector(`.filter-item-${item.key}`);
        if(!facet) {
            this.querySelector('.activeFilters').appendChild(item);
            this.style.display = 'block';
        }
    }

    addAllActive() {
        var groups = this.filters.facets;
        for(let i=0; i < groups.length; i++) {
            var items = groups[i].items;
            for(let j=0; j < items.length; j++) {
                var item = new RHDPSearchFilterItem();
                item.name = items[j].name;
                item.value = items[j].value;
                item.inline = true;
                item.active = items[j].active;
                item.key = items[j].key;
                if(item.active) {
                    this.addActive(item);
                }
            }
        }
    }

    updateActiveFacets() {
        this.innerHTML = this.activeTemplate`${this.title}`;
        this.addAllActive();
        if (!this.querySelector('.activeFilters').hasChildNodes()) {
            this.style.display = 'none';
        }
    }

    setActive(item, bubble) {
        var upd = this.querySelector(`.filter-item-${item.key}`);
        upd['bubble'] = bubble;
        upd['active'] = item.active;
    }

    toggleModal(val) {
        this.dispatchEvent(new CustomEvent('toggle-modal', {
            detail: { 
                toggle: val 
            }, 
            bubbles: true 
        }));
    }

    applyFilters() {
        this.dispatchEvent(new CustomEvent('apply-filters', {
            bubbles: true
        }));
    }

    clearFilters() {
        var items = this.querySelectorAll('rhdp-search-filter-item[active]'),
            len = items.length;

        for(let i=0; i < len; i++) {
            items[i]['bubble'] = i !== 1-len ? false : true;
            items[i]['active'] = false;
        }
    }
}