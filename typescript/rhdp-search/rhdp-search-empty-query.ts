class RHDPSearchEmptyQuery extends HTMLElement {

    _empty = false;
    _message = '';

    get message() {
        return this._message;
    }

    set message(val) {
        if (this._message === val) return;
        this._message = val;
    }

    get empty() {
        return this._empty;
    }

    set empty(val) {
        this._empty = val;
        if(this._empty){
            this.style.display = 'block';
        }
        else{
            this.style.display = 'none';
        }

    }

    toggleQueryMessage(state){
        let app = document.querySelector('rhdp-search-app');
        switch(state) {
            case 'no-term': {
                app['sort'].style.display = 'none';
                app['results'].style.display = 'none';
                app['count'].style.display = 'none';
                this.innerHTML = this.template`${this.message}`;
                this.empty = true;
                break;
            }
            default: {
                app['sort'].style.display = 'block';
                app['results'].style.display = 'block';
                app['count'].style.display = 'block';
                this.empty = false;
                break;
            }
        }
    }

    constructor() {
        super();
    }

    template = (strings, message) => {
        return `${message}`;
    };

    connectedCallback() {
    }

    static get observedAttributes() {
        return ['empty', 'message'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }



}