import PFElement from '@patternfly/pfelement/pfelement.umd';

export default class DPReferrer extends PFElement {
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
        top: 1em;
        margin-right: 5px;
        background-repeat: no-repeat;
        height: 24px;
        width: 24px;
        color: #3b6e90;
    }
    
    </style>
    <img src="${this.icon}">
    ${this.size === 'xl' ? '<h3>' : ''}
    ${this.heading ? `<strong>${this.heading}</strong>` : ''}
    ${this.size === 'xl' ? '</h3>' : ''}
    <p><slot>${this.text}</slot></p>
    ${this.size === 'xl' ? `<a class="close" href="#"><i class="fas fa-times"></i></a>` : ''}`;
}

static get tag() { return 'dp-referrer'; }

_type = 'info';
_size : string;
_heading : string;
_icon = 'https://static.jboss.org/rhd/images/icons/RHD_alerticon_info.svg';
_background = '#dcedf8';
_border = '#87aac1';
_text : string;
_uri = new URL(window.location.href);



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

  
  get uri() {
      return this._uri;
  }

  set uri(val) {
      if (this._uri === val) return;
      this._uri = val;
  }

  constructor() {
      super(DPReferrer, {delayRender: true});
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.uri.searchParams.get('referrer') === 'jbd') {
      const category = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//,'').replace(/\/$/,'').split('?')[0].split('#')[0].split(/\//);
      this.size = 'xl';
      this.heading = category[0] !== 'middleware' ? 'Welcome jboss.org members!' : 'You have been redirected from JBoss.org to Red Hat Developer.';
      this.innerHTML = category[0] !== 'middleware' ? `It's true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a>` : `It's true &mdash; JBoss Developer and Red Hat Developer are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a>`;
      super.render();
    } else {
      this.remove();
    }
  }
}

PFElement.create(DPReferrer);
// window.customElements.define('dp-referrer', DPReferrer);