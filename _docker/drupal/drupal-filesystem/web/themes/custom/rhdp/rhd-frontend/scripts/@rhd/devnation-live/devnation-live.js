var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var DevNationLiveApp = (function (_super) {
    __extends(DevNationLiveApp, _super);
    function DevNationLiveApp() {
        var _this = _super.call(this) || this;
        _this._src = '../rhdp-apps/devnationlive/devnationlive.json';
        _this._form = '../rhdp-apps/devnationlive/';
        _this._upcoming = [];
        _this._past = [];
        _this._mode = 'cors';
        _this.speakerLongTemplate = function (strings, speaker) {
            return " <strong>" + speaker.name + "</strong>\n            " + (speaker.twitter ? "(<a href=\"https://twitter.com/" + speaker.twitter + "\" target=\"_blank\" class=\"external-link\">@" + speaker.twitter + "</a>)" : '') + "\n            " + (speaker.intro ? "<p>" + speaker.intro + "</p>" : '');
        };
        _this.speakerShortTemplate = function (strings, speaker) {
            return " <strong>" + speaker.name + "</strong>\n            " + (speaker.twitter ? "(<a href=\"https://twitter.com/" + speaker.twitter + "\" target=\"_blank\" class=\"external-link\">@" + speaker.twitter + "</a>)" : '');
        };
        _this.template = function (strings, next, upcoming, past, speakers) {
            return "<div class=\"wide wide-hero devnation-live\">\n        <div class=\"row\">\n            <div class=\"large-24 columns\">\n                <img class=\"show-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_desktop_logo_r4v1.png\" alt=\"DevNation Live logo\">\n                <img class=\"hide-for-large-up\" src=\"https://design.jboss.org/redhatdeveloper/website/redhatdeveloper_2_0/microsite_graphics/images/devnationlive_microsite_banner_mobile_logo_r4v1.png\" alt=\"DevNation Live logo\">\n            </div>\n        </div>\n    </div>\n    <div id=\"devnationLive-microsite\">\n        " + (next ? "<section class=\"next-session\">\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <h5 class=\"caps session-label\">Next Live Session</h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-24 columns\">\n                    <div class=\"session-date right\"><i class=\"fa fa-calendar fa-2x\"></i> " + next.date + "</div>\n                    <h4 class=\"caps\">" + next.title + "</h4>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"large-14 small-24 columns\">\n                    <h5 class=\"caps session-label\">Session:</h5>\n                    <p class=\"abstract\">" + next.abstract + "</p>\n                    <a href=\"" + next.inxpo + "\" target=\"_blank\" class=\"button heavy-cta\">REGISTER</a>\n                </div>\n                <div class=\"large-10 columns\">\n                    <h5 class=\"caps session-label\">Speaker(s):</h5>\n                    " + next.speakers.map(function (speaker) { return _this.speakerLongTemplate(__makeTemplateObject(["", ""], ["", ""]), speakers[speaker]); }).join('') + "  \n                </div>\n            </div>\n        </section>" : '') + "\n        <section class=\"session-list\">\n            <div class=\"row\">\n                " + (upcoming.length > 0 ? "\n                " + (past.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Upcoming Sessions</h5>\n                    <br>\n                    <ul class=\"events-list\">\n                    " + upcoming.map(function (sess) { return "" + (sess.confirmed ? "\n                        <li class=\"single-event\">\n                            <div class=\"row\">\n                                <div class=\"large-24 columns\">\n                                    <h4 class=\"caps\">" + sess.title + "</h4>\n                                    <p>Speaker(s): " + sess.speakers.map(function (speaker) { return _this.speakerShortTemplate(__makeTemplateObject(["", ""], ["", ""]), speakers[speaker]); }).join('') + " </p>\n                                    <p>" + sess.date + "</p>\n                                    <p>" + sess.abstract + "</p>\n                                    " + (sess.register ? "\n                                    <a href=\"" + sess.inxpo + "\" target=\"_blank\" class=\"button heavy-cta\">REGISTER</a>" : '') + "\n                                </div>\n                            </div>\n                        </li>"
                : ''); }).join('') + "\n                    </ul>\n                </div>" : '') + "\n                " + (past.length > 0 ? "\n                " + (upcoming.length > 0 ? "<div class=\"large-12 columns\">" : "<div class=\"large-24 columns\">") + "\n                    <h5 class=\"caps\">Past Sessions</h5>\n                        <br>\n                        <ul class=\"events-list\">\n                        " + past.map(function (sess) { return "" + (sess.confirmed ? "\n                            <li class=\"single-event\">\n                                <div class=\"row\">\n                                    <div class=\"large-24 columns\">\n                                        <h4 class=\"caps\">" + sess.title + "</h4>\n                                        <p>Speaker(s): " + sess.speakers.map(function (speaker) { return _this.speakerShortTemplate(__makeTemplateObject(["", ""], ["", ""]), speakers[speaker]); }).join('') + " </p>\n                                        <p>" + sess.date + "</p>\n                                        <p>" + sess.abstract + "</p>\n                                        <a href=\"https://developers.redhat.com/videos/youtube/" + sess.youtube_id + "\" class=\"button external-link\">VIDEO</a>\n                                    </div>\n                                </div>\n                            </li>"
                : ''); }).join('') + "\n                        </ul>\n                    </div>"
                : '') + "\n            </div>\n        </section>\n    </div>";
        };
        return _this;
    }
    Object.defineProperty(DevNationLiveApp.prototype, "sessions", {
        get: function () {
            return this._sessions;
        },
        set: function (val) {
            if (this._sessions === val)
                return;
            this._sessions = val;
            var next = false;
            for (var i = 0; i < this.sessions.length; i++) {
                var sess = new DevNationLiveSession(this.sessions[i]);
                if (sess.confirmed) {
                    if (sess.upcoming) {
                        if (next) {
                            if (sess.inxpo.length > 0) {
                                this.upcoming.push(sess);
                            }
                        }
                        else {
                            if (sess.inxpo.length > 0) {
                                this.next = sess;
                                next = true;
                            }
                        }
                    }
                    else {
                        this.past.push(sess);
                    }
                }
            }
            this.past.sort(this.sortPastSessions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "speakers", {
        get: function () {
            return this._speakers;
        },
        set: function (val) {
            if (this._speakers === val)
                return;
            this._speakers = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (val) {
            if (this._next === val)
                return;
            this._next = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "past", {
        get: function () {
            return this._past;
        },
        set: function (val) {
            if (this._past === val)
                return;
            this._past = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (val) {
            if (this._src === val)
                return;
            this._src = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (val) {
            if (this._mode === val)
                return;
            this._mode = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (val) {
            if (this._form === val)
                return;
            this._form = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            if (this._upcoming === val)
                return;
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            if (this._data === val)
                return;
            this._data = val;
            this.sessions = this._data['sessions'] ? this._data['sessions'].sort(this.sortSessions) : [];
            this.speakers = this._data['speakers'] ? this._data['speakers'] : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveApp, "observedAttributes", {
        get: function () {
            return ['src', 'form', 'mode'];
        },
        enumerable: true,
        configurable: true
    });
    DevNationLiveApp.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
        this[name] = newVal;
    };
    DevNationLiveApp.prototype.connectedCallback = function () {
        var _this = this;
        var fHead = new Headers();
        var fInit = {
            method: 'GET',
            headers: fHead,
            mode: this.mode,
            cache: 'default'
        };
        fetch(this.src, fInit)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            _this.data = data;
            _this.innerHTML = _this.template(__makeTemplateObject(["", "", "", "", ""], ["", "", "", "", ""]), _this.next, _this.upcoming, _this.past, _this.speakers);
        });
    };
    DevNationLiveApp.prototype.getCookie = function (name) {
        var re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    };
    DevNationLiveApp.prototype.sortSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return da - db;
    };
    DevNationLiveApp.prototype.sortPastSessions = function (a, b) {
        var da = (Date.parse(a.date) ? Date.parse(a.date) : new Date(9999999999999)).valueOf(), db = (Date.parse(b.date) ? Date.parse(b.date) : new Date(9999999999999)).valueOf();
        return db - da;
    };
    return DevNationLiveApp;
}(HTMLElement));
customElements.define('devnation-live-app', DevNationLiveApp);
