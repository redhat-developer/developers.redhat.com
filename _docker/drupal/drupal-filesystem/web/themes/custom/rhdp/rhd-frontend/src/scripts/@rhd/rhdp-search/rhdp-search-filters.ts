// import {RHDPSearchFilterGroup} from './rhdp-search-filter-group';
// import {RHDPSearchFilterItem} from './rhdp-search-filter-item';

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
        this._toggleModal = this._toggleModal.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._addFilters = this._addFilters.bind(this);
        this._checkActive = this._checkActive.bind(this);
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
            top.addEventListener('filter-item-change', this._checkActive);
            top.addEventListener('filter-item-init', this._checkActive);
            top.addEventListener('search-complete', this._checkActive);
            top.addEventListener('params-ready', this._checkActive);
            top.addEventListener('clear-filters', this._clearFilters);
            this._addFilters();
        } else if (this.type === 'modal') {
            this.innerHTML = this.modalTemplate`${this.title}`;
            this.addGroups();
        } else {
            this.innerHTML = this.template`${this.title}`;
            this.addGroups();
        }

        this.addEventListener('click', e => {
            switch (e.target['className']) {
                case 'showBtn':
                case 'cancel':
                case 'applyFilters':
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('toggle-modal', {
                        bubbles: true 
                    }));
                    break;
                case 'clearFilters':
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('clear-filters', {
                        bubbles: true 
                    }));
                    break;
                case 'more':
                    e.preventDefault();
                    break;
            }
        });
        //top.addEventListener('clear-filters', this._clearFilters);
        top.addEventListener('toggle-modal', this._toggleModal);
        
    }

    static get observedAttributes() { 
        return ['type', 'title', 'toggle']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addGroups() {
        let groups = this.filters.facets,
            len = groups.length;
        for(let i=0; i < len; i++) {
            let group = new RHDPSearchFilterGroup(),
                groupInfo = groups[i],
                groupNode = group.querySelector('.group'),
                primaryFilters = group.querySelector('.primary'),
                secondaryFilters = group.querySelector('.secondary'),
                len = groupInfo.items ? groupInfo.items.length : 0;
                if (len <= 5) {
                    groupNode.removeChild(groupNode.lastChild);
                }
                for(let j=0; j < len; j++) {
                    let item = new RHDPSearchFilterItem();
                    item.name = groupInfo.items[j].name;
                    item.value = groupInfo.items[j].value;
                    item.active = groupInfo.items[j].active;
                    item.key = groupInfo.items[j].key;
                    item.group = groupInfo.key;
                    if (j < 5) {
                        primaryFilters.appendChild(item);
                    } else {
                        secondaryFilters.appendChild(item);
                    }
                }
            group.key = groupInfo.key;
            group.name = groupInfo.name;        
            this.querySelector('.groups').appendChild(group);
        }

    }

    _checkActive(e) {
        if (e.detail) {
            if (e.detail.facet) {
                this.style.display = e.detail.facet.active ? 'block' : this.style.display;
            } else {
                let chk = this.querySelectorAll('rhdp-search-filter-item[active]');
                if (chk.length > 0) {
                    this.style.display = 'block';
                } else {
                    this.style.display = 'none';
                }
            }
        }
    }

    _initActive(e, group_key, item) {
        if (e.detail && e.detail.filters) {
            //console.log(e.detail.filters);
            Object.keys(e.detail.filters).forEach(group => {
                e.detail.filters[group].forEach(facet => {
                    if (group === group_key) {
                        if (facet === item.key) {
                            return true;
                        }
                    }
                });
            });
            
        }
        return false;
    }

    _addFilters() {
        var groups = this.filters.facets;
        for(let i=0; i < groups.length; i++) {
            var items = groups[i].items;
            for(let j=0; j < items.length; j++) {
                let item = new RHDPSearchFilterItem();
                    item.name = items[j].name;
                    item.value = items[j].value;
                    item.inline = true;
                    item.bubble = false;
                    item.key = items[j].key;
                    item.group = groups[i].key;
                    this.querySelector('.activeFilters').appendChild(item)
                }
            }
        // if (this.type === 'active') {
        //     this._checkActive();
        // }
    }

    _toggleModal(e) {
        if (this.type === 'modal') {
            this.toggle = !this.toggle;
        }
    }

    applyFilters() {
        this.dispatchEvent(new CustomEvent('apply-filters', {
            bubbles: true
        }));
    }

    _clearFilters(e) {
        this.style.display = 'none';
    }
}

customElements.define('rhdp-search-filters', RHDPSearchFilters);