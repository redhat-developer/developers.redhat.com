class RHDPSearchSortPage extends HTMLElement {
    _sort;

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.querySelector('select').value = val;
    }
    constructor() {
        super();
    }

    template = `<p>
        <span>Sort results by</span>
        <select>
        <option value="relevance">Relevance</option>
        <option value="most-recent">Most Recent</option>
        </select>
        </p>`; 

    connectedCallback() {
        this.innerHTML = this.template;
        this.addEventListener('change', e => {
            this.sort = e.target['options'][e.target['selectedIndex']].value;
            this.setSort();
        });
    }

    static get observedAttributes() { 
        return ['name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    setSort() {
        this.dispatchEvent(new CustomEvent('sort-change', {
            detail: { 
                sort: this.sort 
            }, 
            bubbles: true 
        }));
    }
}