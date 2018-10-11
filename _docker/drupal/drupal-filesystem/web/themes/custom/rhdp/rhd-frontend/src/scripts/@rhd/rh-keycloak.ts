import RHElement from '@rhelements/rhelement';

export default class RHKeycloak extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = ``;
        return tpl;

    }

    _keycloak;
    _url : string; // Keycloak Server URL
    _json : string; // Keycloak JSON Configuration
    _realm : string;
    _clientId : string;
    _data;

    get url() {
        return this._url;
    }

    constructor(element: string='rh-keycloak') {
        super(element);
    }

    connectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    updateToken() {

    }
}

window.customElements.define('rhdp-alert', RHKeycloak);