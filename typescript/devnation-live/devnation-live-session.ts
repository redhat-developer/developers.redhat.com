class DevNationLiveSession {
    _title = '';
    _date = '';
    _youtube_id = '';
    _speakers = [];
    _abstract = '';
    _confirmed = false;
    _register = true;
    _upcoming = false;
    _inxpo = '';

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
    get speakers() {
        return this._speakers;
    }
    set speakers(val) {
        if (this._speakers === val) return;
        this._speakers = val;
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

    get inxpo() {
        return this._inxpo;
    }
    set inxpo(val) {
        if (this._inxpo === val) return;
        this._inxpo = val;
    }
    
    get upcoming() {
        return this._upcoming;
    }
    set upcoming(val) {
        this._upcoming = val;
    }
    
    constructor(obj) {
        Object.keys(obj).map( key => {
            this[key] = obj[key];
        });

        let dt = Date.parse(this.date);
        if(dt && (dt > Date.now() || dt > Date.now() - 259200000)) {
            this.upcoming = true;
        }
    }
}