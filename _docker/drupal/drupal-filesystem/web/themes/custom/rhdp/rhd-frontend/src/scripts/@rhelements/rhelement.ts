declare const ShadyCSS:any;

export default class RHElement extends HTMLElement {
    id:string;

    constructor(id, template?) {
        super();
        this.id = id;

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

    render(template) {
        if (ShadyCSS) {
            ShadyCSS.prepareTemplate(template, this.id);
        }
    
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
    
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        if (ShadyCSS) {
            ShadyCSS.styleElement(this);
        }
    }
}