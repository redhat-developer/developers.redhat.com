export default class RHDPThankyou extends HTMLElement {

    private _url;
    private _mediaName;
    private _directLink;
    private _recentDownload;

    get url() {
        return this._url;
    }

    set url(value) {
        if (this._url === value) return;
        this._url = value;
    }

    get mediaName() {
        return this._mediaName;
    }

    set mediaName(value) {
        if (this._mediaName === value) return;
        this._mediaName = value;
        this.setAttribute('media-name', this._mediaName);
    }

    get directLink() {
        return this._directLink;
    }

    set directLink(value) {
        if (this._directLink === value) return;
        this._directLink = value;
        this.setAttribute('direct-download', this._directLink);
    }



    constructor() {
        super();
    }

    template = (strings, name, directLink, recentDownload) => {
        return `<div class="row">
                    <div class="large-24 medium-24 small-24 columns">
                        <div class="alert-box alert-info">
                            <div class="icon"></div>
                            <div class="alert-content">
                                <strong>Your download should start automatically.</strong>
                                <p>If you have any problems with the download, please use the <a id="download-link" href="${directLink}">direct link.</a></p>
                            </div>
                        </div>
                
                        <div class="large-24 medium-16 small-24 columns thankyou">
                                <h2>Thank you for downloading the:</h2>
                                <h2>${name}</h2>
                            ${recentDownload ? '' : `<iframe src="${directLink}"></iframe>`}
                        </div>
                        <div class="large-24 medium-16 small-24 columns">
                            <div class="thankyou-button">
                                <a href="/" class="pf-c-button pf-m-heavy">Continue
                                    to Homepage</a>
                            </div>
                        </div>
                
                    </div>
                </div>`;

    };

    connectedCallback() {
        this._recentDownload = this.checkRecentDownload();
        this.mediaName = this.mediaName ? this.mediaName : this.stripLabelFromMedia(this.getParameterByName('p'));
        this.directLink = this.directLink ? this.directLink : this.getParameterByName('tcDownloadURL');
        this.innerHTML = this.template`${this.mediaName}${this.directLink}${this._recentDownload}`;
    }

    static get observedAttributes() {
        return ['media-name', 'direct-link'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    stripLabelFromMedia(name){
        if (name){
            name = name.replace(/Media:[\s]/g, "");
        }
       return name;
    }

    getParameterByName(urlName) {
        this.url = this.url ? this.url : window.location.href;
        urlName = urlName.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + urlName + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(this.url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    checkRecentDownload() {
        // Set storage expiration time to 1 minutes
        var storageExpiration = 30000, storageName = 'media-download-url';
        if(window.location.href.indexOf('media-download-confirmation')>0){
            if(window.localStorage.getItem(storageName)){
                var recentDownload,timeOfRefer, currentTime;
                recentDownload = JSON.parse(window.localStorage.getItem(storageName));
                timeOfRefer = recentDownload.hasOwnProperty('timestamp') ? recentDownload['timestamp'] : 0;
                currentTime = new Date().getTime();

                if(currentTime-timeOfRefer > storageExpiration){
                    window.localStorage.removeItem(storageName);
                    return false;
                }
                return true;
            }else{
                var referrerDownload = {value: window.location.href, timestamp: new Date().getTime()};
                localStorage.setItem(storageName, JSON.stringify(referrerDownload));
                return false;
            }

        }
    }


}

customElements.define('rhdp-thankyou', RHDPThankyou);