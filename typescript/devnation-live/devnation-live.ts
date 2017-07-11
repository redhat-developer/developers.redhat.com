class DevNationLiveApp extends HTMLElement {
    _data = new DevNationLiveData().data;
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
            this.next = new DevNationLiveSession(this.data.next_session);
        }
        if (this.data.upcoming_sessions) {
            let l = this.data.upcoming_sessions.length;
            let uc = []
            for (let i=0; i < l; i++) {
                uc.push(new DevNationLiveSession(this.data.upcoming_sessions[i]));
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

    template = `<div class="wide wide-hero devnation-live">
        <div class="row">
            <div class="large-24 columns">
                <img class="show-for-large-up" src="https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_desktop_logo_r4v1.png" alt="DevNation Live logo">
                <img class="hide-for-large-up" src="https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_mobile_logo_r4v1.png" alt="DevNation Live logo">
            </div>
        </div>
    </div>
    <div id="devnationLive-microsite">
        <section>
            <div class="row">
                <div class="large-24 columns">
                    <h5 class="caps session-label">Next Live Session</h5>
                </div>
                <div class="large-17 small-24 columns">
                    <h2 class="caps">${this.next.title}</h2>
                </div>
                <div class="large-7 small-24 columns devnation-live-date" data-tags="${this.next.date}">
                    <span><i class="fa fa-calendar fa-2x right"></span>
                    <div class="session-date">${this.next.date}</div>
                </div>
            </div>
            <div class="row" data-video="${this.next.youtube_id}">
                <div class="medium-14 columns event-video">
                    <div class="flex-video">
                        <img width="640" heigh="360" src="/images/design/devnationlive_herographic_0.jpg" alt="${this.next.title}">
                    </div>
                </div>
                <div class="medium-10 columns event-chat" data-chat="${this.next.youtube_id}">
                    <div id="GatedFormContainer"></div>
                </div>
            </div>
            <div class="row">
                <div class="large-24 columns divider">
                    <p>Speaker: <strong>${this.next.speaker}</strong> 
                    <a href="https://twitter.com/${this.next.twitter_handle}" target="_blank"> @${this.next.twitter_handle}</a>
                    </p>
                    <p>${this.next.abstract}</p>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="large-24 columns">
                    <h5 class="caps">Upcoming Sessions</h5>
                    <br>
                    <ul class="events-list">
                    ${this.upcoming.map(sess =>  `
                        ${sess.confirmed ? `
                        <li class="single-event">
                            <div class="row">
                                <div class="large-17 columns">
                                    <h4 class="caps">${sess.title}</h4>
                                    ${sess.speaker ? `
                                    <p>Speaker: <strong>${sess.speaker}</strong>
                                        ${sess.twitter_handle ? `
                                        <a href="https://twitter.com/${sess.twitter_handle}" target="_blank"> @${sess.twitter_handle}` 
                                        :''}
                                    </p>` 
                                    : ''}
                                </div>
                            </div>
                        </li>`
                        : ''}
                    `)}
                    </ul>
                </div>
            </div>
        </section>
    </div>`;
  
//                 .row
//                   .large-17.columns
//                     h4.caps #{c.title}
//                     - if c.speaker
//                       p
//                         | Speaker:
//                         strong  #{c.speaker}
//                         span
//                         - if c.twitter_handle
//                           |  (
//                           a(href="https://twitter.com/#{c.twitter_handle}" target="_blank") @#{c.twitter_handle}
//                           | )
//                     - if c.date
//                       javascript:
//                         var timeStamp = new Date("#{c.date}");

//                         var timeString = timeStamp.toString();
//                         var x = timeString.split(' ', 4).join(' ');
//                         var t = timeStamp.toLocaleTimeString();
//                         var timezone = (String(String(timeStamp).split("(")[1]).split(")")[0]);
                      
//                         document.write("<p>" + x + " " + t + " " + timezone + "</p>");
//                     - else
//                       p Date TBD
//                     - if c.abstract
//                       p #{c.abstract}
//                   .large-7.columns
//                     - if c.eloqua_id
//                       iframe(src="/form/email?id=#{c.eloqua_id}")`;
    
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = this.template;
    }
}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('devnation-live-app', DevNationLiveApp);
});
