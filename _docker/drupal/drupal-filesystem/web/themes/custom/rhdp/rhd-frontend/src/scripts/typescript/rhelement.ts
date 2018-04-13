declare const ShadyCSS:any;

class RHElement extends HTMLElement {
    constructor(id, template) {
        super();
        
        if (ShadyCSS && template) {
            ShadyCSS.prepareTemplate(template, id);
        }

        this.attachShadow({ mode: "open" });

        if (template) {
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    connectedCallback() {
        if (ShadyCSS) {
            ShadyCSS.styleElement(this);
        }
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}