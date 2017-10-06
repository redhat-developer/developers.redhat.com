class RHDPAlert extends HTMLElement {
    _type = 'info';
    _size : String;
    _heading : String;
    _icon = true;
    _text : String;

    get type() {
        return this._type;
    }
    set type(val) {
        if (this._type === val) return;
        this._type = val;
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

    constructor() {
        super();

        this.text = this.innerHTML;
    }

    connectedCallback() {
        this.innerHTML = this.template`${this}`;

        this.addEventListener('click', e => {
            if (e.target && e.target['className'] === 'close') {
                this.innerHTML = '';
            }
        })
    }

    static get observedAttributes() {
        return ['type', 'size', 'heading', 'text'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = this.template`${this}`;
    }


    template = (strings, alert) => {
        return `
        <div class="alert-box alert-${alert.type} ${alert.size ? `alert-${alert.size}` : ''}">
            ${alert.size === 'xl' ? '<div class="row">' : ''}
                <div class="icon"></div>
                <div class="alert-content">
                ${alert.size === 'xl' ? '<h3>' : '<strong>'}
                ${alert.heading ? alert.heading : ''}
                ${alert.size === 'xl' ? '</h3>' : '</strong>'}
                    <p>${alert.text}</p>
                </div>
            ${alert.size === 'xl' ? '<a class="close"></a></div>' : ''}
        </div>`;
    }
}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('rhdp-alert', RHDPAlert);
});