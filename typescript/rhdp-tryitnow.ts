class RHDPTryItNow extends HTMLElement {

    private _title;
    private _subtitle;
    private _buttonID;
    private _buttonText;
    private _buttonLink;
    private _icon;

    get title() {
        return this._title;
    }

    set title(value) {
        if(this._title === value) return;
        this._title = value;
        this.setAttribute('title', this._title);
    }

    get subtitle() {
        return this._subtitle;
    }

    set subtitle(value) {
        if(this._subtitle === value) return;
        this._subtitle = value;
        this.setAttribute('subtitle', this._subtitle);
    }


    get buttonID() {
        return this._buttonID;
    }

    set buttonID(value) {
        if(this._buttonID === value) return;
        this._buttonID = value;
        this.setAttribute('buttonID', this._buttonID);
    }

    get buttonLink() {
        return this._buttonLink;
    }

    set buttonLink(value) {
        if(this._buttonLink === value) return;
        this._buttonLink = value;
        this.setAttribute('buttonLink', this._buttonLink);
    }

    get icon() {
        return this._icon;
    }

    set icon(value) {
        if(this._icon === value) return;
        this._icon = value;
        this.setAttribute('icon', this._icon);
    }


    get buttonText() {
        return this._buttonText;
    }

    set buttonText(value) {
        if(this._buttonText === value) return;
        this._buttonText = value;
        this.setAttribute('buttonText', this._buttonText);
    }

    constructor() {
        super();
    }

    template = (strings, title, subtitle, buttonLink, icon, buttonText, buttonID) => {
        return `<section> <div class="row"> <img src="${icon}"> <span> <h4>${title}</h4> <h5>${subtitle}</h5> </span> <a ${buttonID ? `id="${buttonID}" ` :''} href="${buttonLink}" class="button medium-cta white">${buttonText}</a> </div></section>`;
    };

    connectedCallback() {
        this.innerHTML = this.template`${this.title}${this.subtitle}${this.buttonLink}${this.icon}${this.buttonText}${this.buttonID}`;
    };

    static get observedAttributes() {
        return ['buttonText', 'icon', 'buttonLink', 'buttonID', 'subtitle', 'title'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }



}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('rhdp-tryitnow', RHDPTryItNow);
});
