class RHDPSearchFilterGroup extends HTMLElement {
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
    }

    template = (strings, name) => {
        return `<h6 id="heading" class="showFilters">${name}<span class="toggle"><i class='fa fa-chevron-right' aria-hidden='true'></i></span></h6>
        <div class="group hide">
            <div class="primary"></div>
            <div class="secondary hide"></div>
            <a href="#" class="more">Show More</a>
        </div>`; 
    };

    connectedCallback() {
        this.innerHTML = this.template`${this.name}`;

        this.renderItems();

        this.querySelector('h6').addEventListener('click', e => {
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

    renderItems() {
        var groupNode = this.querySelector('.group');
        var primaryFilters = this.querySelector('.primary');
        var secondaryFilters = this.querySelector('.secondary');
        var len = this.items ? this.items.length : 0;
        if (len <= 5) {
            groupNode.removeChild(groupNode.lastChild);
        }
        for(let i=0; i < len; i++) {
            var item = new RHDPSearchFilterItem();
            item.name = this.items[i].name;
            item.value = this.items[i].value;
            item.active = this.items[i].active;
            item.key = this.items[i].key;
            if (i < 5) {
                primaryFilters.appendChild(item);
            } else {
                secondaryFilters.appendChild(item);
            }
        }        
    }
}