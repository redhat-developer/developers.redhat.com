class RHDPSearchBox extends HTMLElement {
    _term = '';

    get term() {
        if ((this._term===null) || (this._term==='')) {
           return this._term;
        } else {
           return this._term.replace(/(<([^>]+)>)/ig,'');
        }
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
        <button id="search-btn"><span>SEARCH</span><i class='fa fa-search' aria-hidden='true'></i></button>
        </form>`;
    };

    constructor() {
        super();

    }

    connectedCallback() {
        this.innerHTML = this.template`${this.name}${this.term}`;

        this.querySelector('input').addEventListener('keyup', e => { 
            if(e.target['id'] === 'query') {
                if(e.key == 'Enter') { 
                    this.doSearch();
                } else {
                    this.term = e.target['value'];
                    if(this.term === '') {
                        this.doSearch();
                    }
                }
            }
        });

        this.addEventListener('submit', e => {
            e.preventDefault();
            return false;
        });

        this.querySelector('#search-btn').addEventListener('click', e => { 
            this.doSearch();
        });
    }

    static get observedAttributes() { 
        return ['term']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    doSearch() {
        this.dispatchEvent(new CustomEvent('update-term', {
            detail: { 
                term: this.term 
            }, 
            bubbles: true
        }));
    }
}