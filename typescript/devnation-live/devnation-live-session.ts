class DevNationLiveSession {
    _title = '';
    _date = '';
    _youtube_id = '';
    _speaker = '';
    _twitter_handle = '';
    _offer_id = '';
    _abstract = '';
    _confirmed = false;
    _register = true;
    _eloqua = '';

    get offer_id() {
        return this._offer_id;
    }
    set offer_id(val) {
        if (this._offer_id === val) return;
        this._offer_id = val;
    }
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
        // try {
        //     var timeStamp = new Date(val);
        //     var timeString = timeStamp.toString();
        //     var x = timeString.split(' ', 4).join(' ');
        //     var t = timeStamp.toLocaleTimeString();
        //     var timezone = (String(String(timeStamp).split("(")[1]).split(")")[0]);
        //     this._date = x + " " + t + " " + timezone;
        // } catch(e) {
        //     this._date = 'Date TBD';
        // }
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

    get register() {
        return this._register;
    }
    set register(val) {
        if (this._register === val) return;
        this._register = val;
    }

    get confirmed() {
        return this._confirmed;
    }
    set confirmed(val) {
        if (this._confirmed === val) return;
        this._confirmed = val;
    }

    get eloqua() {
        return this._eloqua;
    }
    set eloqua(val) {
        if (this._eloqua === val) return;
        this._eloqua = val;
    }
    constructor(obj) {
        Object.keys(obj).map( key => {
            this[key] = obj[key];
        });
    }
}