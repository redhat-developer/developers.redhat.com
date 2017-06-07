export class RHDPSearchBox extends HTMLElement {
    _term = '';

    get term() {
        return this._term;
    }
    set term(val) {
        if (this._term === val) return;
        this._term = val;
        this.querySelector('input').setAttribute('value', val);
    }

    name = 'Search Box';
    template = (strings, name, term) => {
        return `<form class="search-bar" role="search">
        <div class="input-cont">
            <input value="${term}" class="user-success user-search" type="search" id="query" placeholder="Enter your search term">
        </div>
        <button id="search-btn">SEARCH</button>
        </form>`;
    };

    constructor() {
        super();

        this.innerHTML = this.template`${this.name}${this.term}`;

        this.addEventListener('keyup', e => { 
            if(e.target['id'] === 'query') {
                if(e.key == 'Enter') { 
                    this.doSearch();
                } else {
                    this.term = e.target['value'];
                }
            }
        });

        this.addEventListener('submit', e => {
            e.preventDefault();
            return false;
        });

        this.addEventListener('click', e => { 
            if(e.target['id'] === 'search-btn') { 
                this.doSearch();
            }
        });
    }

    connectedCallback() {
        
    }

    static get observedAttributes() { 
        return ['term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    doSearch() {
        history.pushState({}, `Red Hat Developer Program Search: ${this.term}`, `?q=${this.term}`);
        this.dispatchEvent(new CustomEvent('do-search', {
            detail: { 
                term: this.term 
            }, 
            bubbles: true 
        }));
    }
}

customElements.define('rhdp-search-box', RHDPSearchBox);