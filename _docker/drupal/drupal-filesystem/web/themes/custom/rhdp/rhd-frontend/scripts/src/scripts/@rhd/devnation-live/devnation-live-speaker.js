var DevNationLiveSpeaker = (function () {
    function DevNationLiveSpeaker(obj) {
        var _this = this;
        this._name = '';
        this._intro = '';
        this._twitter = '';
        this._image = '';
        Object.keys(obj).map(function (key) {
            _this[key] = obj[key];
        });
    }
    Object.defineProperty(DevNationLiveSpeaker.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            if (this._name === val)
                return;
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "intro", {
        get: function () {
            return this._intro;
        },
        set: function (val) {
            if (this._intro === val)
                return;
            this._intro = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "twitter", {
        get: function () {
            return this._twitter;
        },
        set: function (val) {
            if (this._twitter === val)
                return;
            this._twitter = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DevNationLiveSpeaker.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (val) {
            if (this._image === val)
                return;
            this._image = val;
        },
        enumerable: true,
        configurable: true
    });
    return DevNationLiveSpeaker;
}());
