class DevNationLiveSpeaker {
    _name = '';
    _intro = '';
    _twitter = '';

    get name(){
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
    }

    get intro(){
        return this._intro;
    }
    set intro(val) {
        if (this._intro === val) return;
        this._intro = val;
    }
    get twitter() {
        return this._twitter;
    }
    set twitter(val) {
        if (this._twitter === val) return;
        this._twitter = val;
    }

    constructor(obj) {
        Object.keys(obj).map( key => {
            this[key] = obj[key];
        });
    }
}