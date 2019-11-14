import PFElement from '@patternfly/pfelement/dist/pfelement.umd';
// import {library, icon} from '@fortawesome/fontawesome-svg-core/index';
// import {faTimes} from '@fortawesome/pro-solid-svg-icons/index';

// library.add(faTimes);

export class DPAlert extends PFElement {
    get html() {
        return `
        <style>
        :host {
            color: #363636 !important;
            display: flex;
            flex-direction: row;
            display: grid;
            grid-template-columns: 1.5em auto 1fr;
            grid-template-rows: auto;
            grid-gap: .5em;
            border-width: 1px;
            border-style: solid;
            padding: 10px 20px;
            margin: 1.5em auto;
            font-size: 1em;
            background-color: #dcedf8;
            border-color: #87aac1;
            line-height: 24px;
            vertical-align: middle;
        }

        h3, strong {
            margin: 0;
            display: inline;
        }

        p { margin: 0; }
          
        img {
            flex: 0 0 1.5em;
            height: 1.5em;
            display: block;
            position: relative;
            margin-right: 10px;
        }

        :host([type="success"]) {
            background-color: #e9f4e9;
            border-color: #8db28a;
        }
        :host([type="warning"]) {
            background-color: #fdf2e5;
            border-color: #deb142;
        }
        :host([type="error"]) {
            background-color: #ffe6e6;
            border-color: #d8aaab;
        }

        :host([size="xl"]) {
            grid-template-columns: 1.5em 1fr 1.5em;
            grid-template-rows: auto 1fr;
            flex-direction: column;
        }

        :host([size="xl"]) img {
            grid-column: 1;
            grid-row: 1;
        }

        :host([size="xl"]) h3, :host([size="xl"]) strong {
            font-weight: 400;
            font-size: 27px;
            grid-column: 2;
            grid-row: 1;
        }

        :host([size="xl"]) .close {
            grid-column: 3;
            grid-row: 1;
        }

        :host([size="xl"]) p {
            grid-column: 2;
            grid-row: 2;
        }
        
        a.close {
            margin-left: 5px;
            background-repeat: no-repeat;
            height: 24px;
            color: #3b6e90;
        }

        svg, path { pointer-events: none; }
        
        </style>
        <img src="${this.icon}">
        ${this.size === 'xl' ? '<h3>' : ''}
        ${this.heading ? `<strong>${this.heading}</strong>` : ''}
        ${this.size === 'xl' ? '</h3>' : ''}
        <p><slot>${this.text}</slot></p>
        ${this.size === 'xl' ? `<a class="close" href="#"><i class="fas fa-times"></i></a>` : ''}`;
    }

    static get tag() { return 'dp-alert'; }
    
    _type = 'info';
    _size : string;
    _heading : string;
    _icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
    _background = '#dcedf8';
    _border = '#87aac1';
    _text : string;

    get type() {
        return this._type;
    }
    set type(val) {
        if (this._type === val) return;
        this._type = val;
        switch(this._type) {
            case 'success':
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_success.svg';
                break;
            case 'warning':
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_warning.svg';
                break;
            case 'error':
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_error.svg';
                break;
            case 'info':
            default:
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
                break;
        }
        this.setAttribute('type', this._type);
    }

    get size() {
        return this._size;
    }
    set size(val) {
        if (this._size === val) return;
        this._size = val;
        this.setAttribute('size', this._size)
    }

    get heading() {
        return this._heading;
    }
    set heading(val) {
        if (this._heading === val) return;
        this._heading = val;
    }

    get text() {
        return this._text;
    }
    set text(val) {
        if (this._text === val) return;
        this._text = val;
    }

    get icon() {
        return this._icon;
    }
    set icon(val) {
        if (this._icon === val) return;
        this._icon = val;
    }

    constructor() {
        super(DPAlert, {delayRender: true });
    }

    connectedCallback() {
        super.connectedCallback();

        let closer = this.shadowRoot.querySelector('.close');
        if (closer) {
            this.addEventListener('click', e => {
                e.preventDefault();
                if(e.composedPath()[0]['className'] === 'close') {
                    this.remove();
                }
                // console.log(e.composedPath());
            });    
        }

        super.render();
    }

    static get observedAttributes() {
        return ['type', 'size', 'heading'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        super.render();
    }

    acknowledge() {
        this.remove();
    }
}

PFElement.create(DPAlert);