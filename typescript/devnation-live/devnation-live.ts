class DevNationLiveApp extends HTMLElement {
    _data;
    _next: DevNationLiveSession;
    _upcoming: DevNationLiveSession[];

    get next() {
        return this._next;
    }

    set next(val) {
        if (this._next === val) return;
        this._next = val;
    }

    get data() {
        return this._data;
    }
    set data(val) {
        if (this._data === val) return;
        this._data = val;
        if (this.data.next_session) {
            this.next = new DevNationLiveSession(this.data.sessions[this.data.next_session]);
            this.next.id = this.data.next_session;
        }
        if (this.data.upcoming_sessions) {
            let l = this.data.upcoming_sessions.length;
            let uc = []
            for (let i=0; i < l; i++) {
                let new_us = new DevNationLiveSession(this.data.sessions[this.data.upcoming_sessions[i]]);
                new_us.id = this.data.upcoming_sessions[i];
                uc.push(new_us);
            }
            this.upcoming = uc;
        }
    }

    get upcoming() {
        return this._upcoming;
    }
    set upcoming(val) {
        if (this._upcoming === val) return;
        this._upcoming = val;
    }

    nextSession = (strings, next) => {
        return `<section>
            <div class="row">
                <div class="large-24 columns">
                    <h5 class="caps session-label">Next Live Session</h5>
                </div>
                <div class="large-17 small-24 columns">
                    <h2 class="caps">${next.title}</h2>
                </div>
                <div class="large-7 small-24 columns devnation-live-date" data-tags="${next.date}">
                    <span><i class="fa fa-calendar fa-2x right"></i></span>
                    <div class="session-date">${next.date}</div>
                </div>
            </div>
            <div class="row" data-video="${next.youtube_id}">
                <div class="medium-14 columns event-video">
                    ${this.getCookie('dn_live_'+next.offer_id) ? `
                    <div class="flex-video">
                        <iframe src="https://www.youtube.com/embed/${next.youtube_id}?rel=0" width="640" height="360" frameborder="0" allowfullscreen></iframe>
                    </div>` : `
                    <img width="640" height="360" src="/images/design/devnationlive_herographic_0.jpg" alt="${next.title}">
                    `}
                </div>
                <div class="medium-10 columns event-chat" data-chat="${next.youtube_id}">
                    ${this.getCookie('dn_live_'+next.offer_id) ? `
                    <iframe class="embedded-chat" src="https://www.youtube.com/live_chat?v=${next.youtube_id}&embed_domain=${window.location.href.replace(/http(s)?:\/\//,'').split('/')[0]}"></iframe>
                    ` : `
                    <iframe class="session-reg" src="../rhdp-apps/devnationlive/?id=${next.id}"></iframe>
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

    upcomingSession = (strings, sess) => {
        return `
        ${sess.confirmed ? `
            <li class="single-event">
                <div class="row">
                    <div class="large-17 columns">
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
                    </div>
                    <div class="large-7 columns align-center">${this.getCookie('dn_live_'+sess.offer_id) ? `
                    <div class="button disabled">You are Registered</div>` : `
                    <iframe class="session-reg" src="../rhdp-apps/devnationlive/?id=${sess.id}"></iframe>
                    `}
                    </div>
                </div>
            </li>`
        : ''}`
    }

    template  = (strings, next, upcoming) => {
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
                <div class="large-24 columns">
                    <h5 class="caps">Upcoming Sessions</h5>
                    <br>
                    <ul class="events-list">
                    ${upcoming.map(sess =>  this.upcomingSession`${sess}`).join('')}
                    </ul>
                </div>
            </div>
        </section>
    </div>`;
    }
    
    constructor() {
        super();
    }
    
    connectedCallback() {
        window.addEventListener('registered', this.setRegistered);

        fetch('/rhdp-apps/devnationlive/devnationlive.json')
        .then((resp) => resp.json())
        .then((data) => { 
            this.data = data;
            this.innerHTML = this.template`${this.next}${this.upcoming}`;
        });
    }

    getCookie( name ) {
        var re = new RegExp('(?:(?:^|.*;\\s*)'+name+'\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    }

    setRegistered(e) {
        this.innerHTML = this.template`${this.next}${this.upcoming}`;
    }
}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('devnation-live-app', DevNationLiveApp);
});
