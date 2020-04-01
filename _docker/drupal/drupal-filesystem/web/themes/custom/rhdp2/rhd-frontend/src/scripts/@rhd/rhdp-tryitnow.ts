export default class RHDPTryItNow extends HTMLElement {

    private _title = '';
    private _subtitle = '';
    private _buttonID = '';
    private _buttonText = '';
    private _buttonLink = '';
    private _icon = '';

    get title() {
        return this._title;
    }

    set title(value) {
        if(this._title === value) return;
        this._title = value;
        this.setAttribute('title', this._title);
        this.querySelector('h4') ? this.querySelector('h4').innerHTML = this._title : '';
    }

    get subtitle() {
        return this._subtitle;
    }

    set subtitle(value) {
        if(this._subtitle === value) return;
        this._subtitle = value;
        this.setAttribute('subtitle', this._subtitle);
        this.querySelector('h5') ? this.querySelector('h5').innerHTML = this._subtitle : '';

    }

    get buttonid() {
        return this._buttonID;
    }

    set buttonid(value) {
        if(this._buttonID === value) return;
        this._buttonID = value;
        this.setAttribute('buttonid', this._buttonID);
        this.querySelector('a') ? this.querySelector('a').id = this._buttonID : '';
    }

    get buttonlink() {
        return this._buttonLink;
    }

    set buttonlink(value) {
        if(this._buttonLink === value) return;
        this._buttonLink = value;
        this.setAttribute('buttonlink', this._buttonLink);
        this.querySelector('a') ? this.querySelector('a').href = this._buttonLink : '';

    }

    get icon() {
        return this._icon;
    }

    set icon(value) {
        if(this._icon === value) return;
        this._icon = value;
        this.setAttribute('icon', this._icon);
        this.querySelector('img') ? this.querySelector('img').src = this._icon : '';

    }


    get buttontext() {
        return this._buttonText;
    }

    set buttontext(value) {
        if(this._buttonText === value) return;
        this._buttonText = value;
        this.setAttribute('buttontext', this._buttonText);
        this.querySelector('a') ? this.querySelector('a').innerHTML = this._buttonText : '';
    }

    constructor() {
        super();
    }

    template = (strings, title, subtitle, buttonLink, icon, buttonText, buttonID) => {
        return `<section> 
                    <div class="row"> 
                        ${icon ? `<img src="${icon}"> ` : ''}
                        <div class="tryitnow-titles">
                            ${title ? `<h4>${title}</h4>` : ''}
                            ${subtitle ? `<h5>${subtitle}</h5>` : ''}
                        </div>
                        <a ${buttonID ? `id="${buttonID}" ` :''} href="${buttonLink}" class="pf-c-button pf-m-secondary">${buttonText}</a>
                    </div>
                </section>`;

    };

    connectedCallback() {
            this.innerHTML = this.template`${this.title}${this.subtitle}${this.buttonlink}${this.icon}${this.buttontext}${this.buttonid}`;
    };

    static get observedAttributes() {
        return ['buttontext', 'icon', 'buttonlink', 'buttonid', 'subtitle', 'title'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }



}

window.customElements.define('rhdp-tryitnow', RHDPTryItNow);