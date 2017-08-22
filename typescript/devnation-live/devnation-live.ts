class DevNationLiveApp extends HTMLElement {
    _data: DevNationLiveSession[];
    _src = '../rhdp-apps/devnationlive/devnationlive.json';
    _form = '../rhdp-apps/devnationlive/';
    _next: DevNationLiveSession;
    _upcoming: DevNationLiveSession[];
    _past: DevNationLiveSession[];
    _mode : RequestMode = 'cors';

    get next() {
        return this._next;
    }

    set next(val) {
        if (this._next === val) return;
        this._next = val;
    }

    get past() {
        return this._past
    }
    set past(val) {
        if (this._past === val) return;
        this._past = val;
    }

    get src() {
        return this._src;
    }
    set src(val) {
        if (this._src === val) return;
        this._src = val;
    }

    get mode() {
        return this._mode;
    }
    set mode(val) {
        if (this._mode === val) return;
        this._mode = val;
    }

    get form() {
        return this._form;
    }
    set form(val) {
        if (this._form === val) return;
        this._form = val;
    }

    get upcoming() {
        return this._upcoming;
    }
    set upcoming(val) {
        if (this._upcoming === val) return;
        this._upcoming = val;
    }

    get data() {
        return this._data;
    }
    set data(val) {
        if (this._data === val) return;
        this._data = val['sessions'] ? val['sessions'].sort(this.sortSessions) : [];
        this.next = this.getNextSession();
        this.upcoming = this.getUpcoming();
        this.past = this.getPast();
    }

    nextSession = (strings, next:DevNationLiveSession) => {
        return `<section>
            <div class="row">
                <div class="large-24 columns">
                    <h5 class="caps session-label">Next Live Session</h5>
                </div>
                <div class="large-17 small-24 columns">
                    <h2 class="caps">${next.title}</h2>
                </div>
                <div class="large-7 small-24 columns devnation-live-date" data-tags="${next.date}">
                    <div class="session-date"><span><i class="fa fa-calendar fa-2x right"></i></span> ${next.date}</div>
                </div>
            </div>
            <div class="row" data-video="${next.youtube_id}">
                <div class="medium-14 columns event-video">
                    ${this.getCookie('dn_live_'+next.offer_id) || !next.register ? `
                    <div class="flex-video">
                        <iframe src="https://www.youtube.com/embed/${next.youtube_id}?rel=0&autoplay=1" width="640" height="360" frameborder="0" allowfullscreen></iframe>
                    </div>` : `
                    <img width="640" height="360" src="../images/design/devnationlive_herographic_0.jpg" alt="${next.title}">
                    `}
                </div>
                <div class="medium-10 columns event-chat" data-chat="${next.youtube_id}">
                    ${this.getCookie('dn_live_'+next.offer_id) || !next.register ? `
                    <iframe class="embedded-chat" src="https://www.youtube.com/live_chat?v=${next.youtube_id}&embed_domain=${window.location.href.replace(/http(s)?:\/\//,'').split('/')[0]}"></iframe>
                    ` : `
                    <iframe class="session-reg" src="${this.form}?id=${next.offer_id}"></iframe>
                    `}
                </div>
            </div>
            <div class="row">
                <div class="large-24 columns divider">
                    <p>Speaker: <strong>${next.speaker}</strong> 
                    ${next.twitter_handle ? `
                    (<a href="https://twitter.com/${next.twitter_handle}" target="_blank" class="external-link"> @${next.twitter_handle}</a>)` 
                    : ''}
                    </p>
                    <p>${next.abstract}</p>
                </div>
            </div>
        </section>`;
    }

    upcomingSession = (strings, sess:DevNationLiveSession) => {
        return `
        ${sess.confirmed ? `
            <li class="single-event">
                <div class="row">
                    <div class="large-24 columns">
                        <h4 class="caps">${sess.title}</h4>
                        ${sess.speaker ? `
                            <p>Speaker: <strong>${sess.speaker}</strong>
                                ${sess.twitter_handle ? `
                                    (<a href="https://twitter.com/${sess.twitter_handle}" target="_blank" class="external-link"> @${sess.twitter_handle}</a>)` 
                                    : ''
                                }
                            </p>` 
                            : ''
                        }
                        <p>${sess.date}</p>
                        <p>${sess.abstract}</p>
                    </div>
                    ${sess.register ? `
                        <div class="large-16 medium-10 small-24 columns align-center">
                        ${this.getCookie('dn_live_'+sess.offer_id) ? `
                            <div class="button disabled">You are Registered</div>` 
                            : `<iframe class="session-reg" src="${this.form}?id=${sess.offer_id}"></iframe>
                            </div>`
                        }` 
                        : ''
                    }
                </div>
            </li>`
        : ''}`
    }

    pastSession = (strings, sess:DevNationLiveSession) => {
        return `
        ${sess.confirmed ? `
            <li class="single-event">
                <div class="row">
                    <div class="large-24 columns">
                        <h4 class="caps">${sess.title}</h4>
                        ${sess.speaker ? `
                        <p>Speaker: <strong>${sess.speaker}</strong>
                            ${sess.twitter_handle ? `
                            (<a href="https://twitter.com/${sess.twitter_handle}" target="_blank" class="external-link"> @${sess.twitter_handle}</a>)` 
                            :''}
                        </p>` 
                        : ''}
                        <p>${sess.date}</p>
                        <p>${sess.abstract}</p>
                        <a href="https://youtu.be/${sess.youtube_id}" class="button external-link">VIDEO</a>
                    </div>
                </div>
            </li>`
        : ''}`
    }

    template  = (strings, next:DevNationLiveSession, upcoming:DevNationLiveSession[], past:DevNationLiveSession[]) => {
    return `<div class="wide wide-hero devnation-live">
        <div class="row">
            <div class="large-24 columns">
                <img class="show-for-large-up" src="https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_desktop_logo_r4v1.png" alt="DevNation Live logo">
                <img class="hide-for-large-up" src="https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_mobile_logo_r4v1.png" alt="DevNation Live logo">
            </div>
        </div>
    </div>
    <div id="devnationLive-microsite">
        ${this.nextSession`${next}`}
        <section>
            <div class="row">
                ${past.length > 0 ? `<div class="large-12 columns">` : `<div class="large-24 columns">`}
                    <h5 class="caps">Upcoming Sessions</h5>
                    <br>
                    <ul class="events-list">
                    ${upcoming.map(sess =>  this.upcomingSession`${sess}`).join('')}
                    </ul>
                </div>
                ${past.length > 0 ? `
                    <div class="large-12 columns">
                    <h5 class="caps">Past Sessions</h5>
                        <br>
                        <ul class="events-list">
                        ${past.map(sess =>  this.pastSession`${sess}`).join('')}
                        </ul>
                    </div>` 
                : ''}
            </div>
        </section>
    </div>`;
    }
    
    constructor() {
        super();
    }

    static get observedAttributes() { 
        return ['src', 'form', 'mode']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
    
    connectedCallback() {
        let fHead = new Headers();
        let fInit : RequestInit = {
            method: 'GET',
            headers: fHead,
            mode: this.mode,
            cache: 'default'
        };
        this.addEventListener('registered', this.setRegistered);

        fetch(this.src, fInit)
        .then((resp) => resp.json())
        .then((data) => { 
            this.data = data;
            this.innerHTML = this.template`${this.next}${this.upcoming}${this.past}`;
        });
    }

    getCookie( name ) {
        var re = new RegExp('(?:(?:^|.*;\\s*)'+name+'\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    }

    setRegistered(e) {
        this.innerHTML = this.template`${this.next}${this.upcoming}${this.past}`;
    }

    sortSessions(a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), 
            db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return da - db;
    }

    getNextSession() {
        for(let i=0; i < this.data.length; i++) {
            let dt = Date.parse(this.data[i].date);
            if(dt && dt > Date.now() - 259200000) {
                return this.data[i];
            }
        }
    }

    getUpcoming() {
        let upcoming = [];
        let first = true;
        for(let i=0; i < this.data.length; i++) {
            let dt = Date.parse(this.data[i].date);
            if(dt && (dt > Date.now() || dt > Date.now() - 259200000)) {
                if (!first && this.data[i].offer_id.length > 0) { 
                    upcoming.push(this.data[i]) 
                } else { 
                    first = false; 
                }
            }
        }
        return upcoming;
    }

    getPast() {
        let past = [];
        for(let i=0; i < this.data.length; i++) {
            let dt = Date.parse(this.data[i].date);
            if(dt && dt + 3600000 < Date.now()) {
                past.push(this.data[i]);
            }
        }
        return past;
    }
}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('devnation-live-app', DevNationLiveApp);
});
