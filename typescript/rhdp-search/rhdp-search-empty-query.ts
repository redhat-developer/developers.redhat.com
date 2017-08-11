class RHDPSearchEmptyQuery extends HTMLElement {

    _empty = false;

    get empty() {
        return this._empty;
    }

    set empty(val) {
        if (this._empty === val) return;
        this._empty = val;
        if(this._empty){
            this.style.display = 'block';
        }
        else{
            this.style.display = 'none';
        }

    }


    constructor() {
        super();
    }

    template = `
        Well, this is awkward. No search term was entered yet, so this page is a little empty right now.
        <p>After you enter a search term in the box above, you will see
        the results displayed here. You can also use the filters to select a content type, product or topic to see some results too. Try it out!</p>`;

    connectedCallback() {
        this.innerHTML = this.template;
    }

    static get observedAttributes() {
        return ['empty'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }



}