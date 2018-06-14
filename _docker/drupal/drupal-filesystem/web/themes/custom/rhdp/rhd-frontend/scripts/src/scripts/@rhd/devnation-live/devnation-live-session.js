var DevNationLiveSession = (function () {
    function DevNationLiveSession(obj) {
        var _this = this;
        this._title = '';
        this._date = '';
        this._youtube_id = '';
        this._speakers = [];
        this._abstract = '';
        this._confirmed = false;
        this._register = true;
        this._upcoming = false;
        this._inxpo = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
        var dt = Date.parse(this.date);
        if (dt && (dt > Date.now() || dt > Date.now() - 259200000)) {
            this.upcoming = true;
        }
    }
    Object.defineProperty(DevNationLiveSession.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            if (this._title === val)
                return;
            this._title = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (val) {
            if (this._date === val)
                return;
            this._date = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "youtube_id", {
        get: function () {
            return this._youtube_id;
        },
        set: function (val) {
            if (this._youtube_id === val)
                return;
            this._youtube_id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "speakers", {
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
    Object.defineProperty(DevNationLiveSession.prototype, "abstract", {
        get: function () {
            return this._abstract;
        },
        set: function (val) {
            if (this._abstract === val)
                return;
            this._abstract = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "register", {
        get: function () {
            return this._register;
        },
        set: function (val) {
            if (this._register === val)
                return;
            this._register = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "confirmed", {
        get: function () {
            return this._confirmed;
        },
        set: function (val) {
            if (this._confirmed === val)
                return;
            this._confirmed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "inxpo", {
        get: function () {
            return this._inxpo;
        },
        set: function (val) {
            if (this._inxpo === val)
                return;
            this._inxpo = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSession.prototype, "upcoming", {
        get: function () {
            return this._upcoming;
        },
        set: function (val) {
            this._upcoming = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSession;
}());
