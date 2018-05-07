import RHElement from '@rhelements/rhelement';
// import fontawesome from '@fortawesome/fontawesome';
// import * as faTimes from '@fortawesome/fontawesome-pro-solid/faTimes';

export default class RHDPAlert extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
        <style>
        :host {
            color: #363636 !important;
            display: flex;
            flex-direction: ${el.size !== 'xl' ? 'row' : 'column'};
            border-width: 1px;
            border-style: solid;
            padding: 10px 20px;
            margin: 1.5em auto;
            font-size: 1em;
            background-color: ${el.background};
            border-color: ${el.border};
            line-height: 24px;
            vertical-align: middle;
        }

        h3, strong {
            margin-bottom: 0;
            display: inline
        }

        strong { margin-right: .5em; }
          
        img {
            flex: 0 0 1.5em;
            height: 1.5em;
            display: block;
            position: relative;
            margin-right: 10px;
            ${el.size !== 'xl' ? '' : `
            display: inline;
            float: left;
            margin-left: 1em;
            `}
        }
        
        a.close {
            top: 1em;
            margin-right: 5px;
            background-repeat: no-repeat;
            height: 24px;
            width: 24px;
            color: #3b6e90;
        }
        
        </style>
        <img src="${el.icon}">
        ${el.size === 'xl' ? '<h3>' : ''}
        ${el.heading ? `<strong>${el.heading}</strong>` : ''}
        ${el.size === 'xl' ? '</h3>' : ''}
        <slot></slot>
        ${el.size === 'xl' ? `<a class="close"><i class="fas fa-times"</a>` : ''}`;
        // ${el.size === 'xl' ? `<a class="close">${fontawesome.icon(faTimes)}</a>` : ''}`;
        return tpl;
    }
    
    _type = 'info';
    _size : String;
    _heading : String;
    _icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
    _background = '#dcedf8';
    _border = '#87aac1';
    _text : String;

    get type() {
        return this._type;
    }
    set type(val) {
        if (this._type === val) return;
        this._type = val;
        switch(this._type) {
            case 'success':
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_success.svg';
                this.background = '#e9f4e9';
                this.border = '#8db28a';
                break;
            case 'warning':
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_warning.svg';
                this.background = '#fdf2e5';
                this.border = '#deb142';
                break;
            case 'error':
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_error.svg';
                this.background = '#ffe6e6';
                this.border = '#d8aaab';
                break;
            case 'info':
            default:
                this.icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
                this.background = '#dcedf8';
                this.border = '#87aac1';
                break;
        }
    }

    get size() {
        return this._size;
    }
    set size(val) {
        if (this._size === val) return;
        this._size = val;
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

    get background() {
        return this._background;
    }
    set background(val) {
        if (this._background === val) return;
        this._background = val;
    }

    get border() {
        return this._border;
    }
    set border(val) {
        if (this._border === val) return;
        this._border = val;
    }

    constructor() {
        super('rhdp-alert');

        this.text = this.innerHTML;
    }

    connectedCallback() {
        super.render(this.template(this));

        this.addEventListener('click', e => {
            if (e.target && e.target['className'] === 'close') {
                this.innerHTML = '';
            }
        })
    }

    static get observedAttributes() {
        return ['type', 'size', 'heading'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        super.render(this.template(this));;
    }
}

window.customElements.define('rhdp-alert', RHDPAlert);