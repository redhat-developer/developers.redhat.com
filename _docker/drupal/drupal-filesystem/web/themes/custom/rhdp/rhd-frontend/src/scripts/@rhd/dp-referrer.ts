import RHDPAlert from '@rhd/rhdp-alert';

export default class DPReferrer extends RHDPAlert {
  _uri = new URL(window.location.href);
  get uri() {
      return this._uri;
  }

  set uri(val) {
      if (this._uri === val) return;
      this._uri = val;
  }

  constructor() {
      super('dp-referrer');
  }

  connectedCallback() {
    if (this.uri.searchParams.get('referrer') === 'jbd') {
      const category = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//,'').replace(/\/$/,'').split('?')[0].split('#')[0].split(/\//);
      this.size = 'xl';
      this.heading = category[0] !== 'middleware' ? 'Welcome jboss.org members!' : 'You have been redirected from JBoss.org to Red Hat Developer.';
      this.innerHTML = category[0] !== 'middleware' ? `It's true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a>` : `It's true &mdash; JBoss Developer and Red Hat Developer are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a>`;
      super.render(this.template(this));
    } else {
      this.innerHTML = '';
    }
  }
}

window.customElements.define('dp-referrer', DPReferrer);