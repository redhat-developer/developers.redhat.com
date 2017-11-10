class RHDPOSDownload extends HTMLElement {

    private _productCode;
    private _productName;
    private _platformType;
    private _downloadURL;
    private _url;
    private _rhelURL = "";
    private _macURL = "";
    private _winURL = "";
    private _version;
    private _displayOS;

    get url() {
        return this._url;
    }

    set url(value) {
        if (this._url === value) return;
        this._url = value;
        this.setAttribute('url', this._url);

    }

    get productCode() {
        return this._productCode;
    }

    set productCode(value) {
        if (this._productCode === value) return;
        this._productCode = value;
        this.setAttribute('product-code', this._productCode);
    }

    get platformType() {
        return this._platformType;
    }

    set platformType(value) {
        if (this._platformType === value) return;
        this._platformType = value;
        this.setAttribute('platform-type', this._platformType)
    }

    get downloadURL() {
        return this._downloadURL;
    }

    set downloadURL(value) {
        if (this._downloadURL === value) return;
        this._downloadURL = value;
        this.setAttribute('download-url', this._downloadURL)

    }

    get rhelURL() {
        return this._rhelURL;
    }

    set rhelURL(value) {
        if (this._rhelURL === value) return;
        this._rhelURL = value;
        this.setAttribute('rhel-download', this._rhelURL)
    }

    get macURL() {
        return this._macURL;
    }

    set macURL(value) {
        if (this._macURL === value) return;
        this._macURL = value;
        this.setAttribute('mac-download', this._macURL)
    }

    get winURL() {
        return this._winURL;
    }

    set winURL(value) {
        if (this._winURL === value) return;
        this._winURL = value;
        this.setAttribute('windows-download', this._winURL)


    }

    get productName() {
        return this._productName;
    }

    set productName(value) {
        if (this._productName === value) return;
        this._productName = value;
        this.setAttribute('name', this._productName)

    }

    get version() {
        return this._version;
    }

    set version(value) {
        if (this._version === value) return;
        this._version = value;
        this.setAttribute('version', this._version)

    }

    get displayOS() {
        return this._displayOS;
    }

    set displayOS(value) {
        if (this._displayOS === value) return;
        this._displayOS = value;
        this.setAttribute('display-os', this._displayOS);
    }

    constructor() {
        super();
    }

    template = (strings, product, downloadUrl, platform, version) => {
        return `<div class="large-8 columns download-link">
                    <a class="button heavy-cta" href="${downloadUrl}">
                        <i class="fa fa-download"></i> Download</a>
                    <div class="version-name">${product} ${version} ${this.displayOS ? `for ${platform}` : ''}</div>
                </div>
                `;
    };

    connectedCallback() {
        this.platformType = this.getUserAgent();
        this.setDownloadURLByPlatform();
        this.innerHTML = this.template`${this.productName}${this.downloadURL}${this.platformType}${this.version}`;

    }

    static get observedAttributes() {
        return ['product-code','platform-type', 'download-url', 'name'];
    }


    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    getUserAgent(){
        let OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="RHEL";

        return OSName;

    }
    setDownloadURLByPlatform(){
        if (this.winURL.length <=0 || this.macURL.length <=0 || this.rhelURL.length <=0){
            return;
        }
        this.displayOS = true;
        switch(this.platformType) {
            case "Windows":
                this.downloadURL = this.winURL;
                break;
            case "MacOS":
                this.downloadURL = this.macURL;
                break;
            case "RHEL":
                this.downloadURL = this.rhelURL;
                break;
            default:
                this.downloadURL = this.winURL
        }
    }



}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('rhdp-os-download', RHDPOSDownload);
});

