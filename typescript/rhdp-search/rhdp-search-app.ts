export class RHDPSearchApp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 'RHDP Search App'
    }
}