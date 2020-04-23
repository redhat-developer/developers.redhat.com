export default class RHDPSearchBox extends HTMLElement {
    _term = '';

    get term() {
        return this._term;
    }
    set term(val) {
        if (this._term === val) return;
        this._term = decodeURI(val);
        this.querySelector('input').setAttribute('value', this.term);
    }

    name = 'Search Box';
    template = (strings, name, term) => {
        return `
        <form class="search-bar" role="search">
            <div class="pf-c-input-group" role="search">
              <input class="pf-c-form-control" type="search" id="query" aria-label="Search input" value="${term}" placeholder="Enter your search term" />
              <button class="pf-c-button pf-m-control pf-m-danger" type="button" aria-label="button for search input" data-search-action="searchSubmit">
                <i class="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
        </form>`;
    };

    constructor() {
        super();
        this._checkTerm = this._checkTerm.bind(this);
    }

    connectedCallback() {
        top.addEventListener('params-ready', this._checkTerm);
        top.addEventListener('term-change', this._checkTerm);

        this.innerHTML = this.template`${this.name}${this.term}`;

        this.addEventListener('submit', e => {
            e.preventDefault();
            this._termChange();
            return false;
        });

        this.querySelector('button[data-search-action="searchSubmit"]').addEventListener('click', e => {
            this._termChange();
        });
    }

    static get observedAttributes() {
        return ['term'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _checkTerm(e) {
        if(e.detail && e.detail.term) {
            this.term = e.detail.term;
        }
    }

    _termChange() {
        this.term = this.querySelector('input').value;
        this.dispatchEvent(new CustomEvent('term-change', {
            detail: {
                term: this.term
            },
            bubbles: true
        }));
    }
}

customElements.define('rhdp-search-box', RHDPSearchBox);
