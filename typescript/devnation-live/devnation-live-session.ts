class DevNationLiveSession {
    _title = '';
    _date = '';
    _youtube_id = '';
    _speaker = '';
    _twitter_handle = '';
    _abstract = '';
    _confirmed = false;

    get title() {
        return this._title;
    }
    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }
    get date() {
        return this._date;
    }
    set date(val) {
        if (this._date === val) return;
        this._date = val;
    }
    get youtube_id() {
        return this._youtube_id;
    }
    set youtube_id(val) {
        if (this._youtube_id === val) return;
        this._youtube_id = val;
    }
    get speaker() {
        return this._speaker;
    }
    set speaker(val) {
        if (this._speaker === val) return;
        this._speaker = val;
    }
    get twitter_handle() {
        return this._twitter_handle;
    }
    set twitter_handle(val) {
        if (this._twitter_handle === val) return;
        this._twitter_handle = val;
    }
    get abstract() {
        return this._abstract;
    }
    set abstract(val) {
        if (this._abstract === val) return;
        this._abstract = val;
    }

    get confirmed() {
        return this._confirmed;
    }
    set confirmed(val) {
        if (this._confirmed === val) return;
        this._confirmed = val;
    }
    constructor(obj) {

    }
}