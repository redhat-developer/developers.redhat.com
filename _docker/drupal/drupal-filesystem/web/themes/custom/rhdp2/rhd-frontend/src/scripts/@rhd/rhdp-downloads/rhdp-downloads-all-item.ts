import RHDPOSDownload from '../rhdp-os-download';

export default class RHDPDownloadsAllItem extends HTMLElement {

    private _name;
    private _productId;
    private _dataFallbackUrl;
    private _downloadUrl;
    private _description;
    private _learnMore;
    private _version;
    private _platform;

    constructor() {
        super();
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (this._name === value) return;
        this._name = value;
        this.setAttribute('name', this.name);
    }

    get productId() {

        return this._productId;

    }

    set productId(value) {
        if (this.productId === value) return;
        this._productId = value;
        this.setAttribute('productid', this._productId);

    }

    get dataFallbackUrl() {
        return this._dataFallbackUrl;
    }

    set dataFallbackUrl(value) {
        if (this.dataFallbackUrl === value) return;
        this._dataFallbackUrl = value;
        this.setAttribute('datafallbackurl', this._dataFallbackUrl);
    }

    get downloadUrl() {
        return this._downloadUrl;
    }

    set downloadUrl(value) {
        if (this.downloadUrl === value) return;
        this._downloadUrl = value;
        this.setAttribute('downloadurl', this._downloadUrl);
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
        this.setAttribute('description', this._description);
    }

    get learnMore() {
        return this._learnMore;
    }

    set learnMore(value) {
        this._learnMore = value;
        this.setAttribute('learnmore', this._learnMore);
    }

    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
        this.setAttribute('version', this._version);
    }

    get platform() {
        return this._platform;
    }

    set platform(value) {
        this._platform = value;
        this.setAttribute('platform', this._platform);
    }

    template = (strings, name, productId, dataFallbackUrl, downloadUrl, learnMore, description, version, platform) => {
        return `
            <div class="row">
                <hr>
                <div class="large-24 column">
                    <h5>${name}</h5>
                </div>
            
                <div class="large-10 columns">
                    <p></p>
            
                    <div class="paragraph">
                        <p>${description}</p>
                    </div>
                    <a href="${learnMore}">Learn More</a></div>
            
                <div class="large-9 center columns">
                
                  ${version ? `<p data-download-id-version="${productId}">Version: ${version} ${this.platform ? `for ${platform}` : ''}</p>` : `<p data-download-id-version="${productId}">&nbsp;</p>`}  
                </div>
            
                <div class="large-5 columns"><a class="pf-c-button pf-m-secondary" data-download-id="${productId}"
                                                data-fallback-url="${dataFallbackUrl}"
                                                href="${downloadUrl}">Download</a></div>
            </div>
`;
    };

    connectedCallback() {
        if(this.productId === 'cdk'){
            this.osVersionExtract(this.productId);
            this.innerHTML =this.template`${this.name}${this.productId}${this.dataFallbackUrl}${this.downloadUrl}${this.learnMore}${this.description}${this.version}${this.platform}`;

        }
        else {
            this.innerHTML =this.template`${this.name}${this.productId}${this.dataFallbackUrl}${this.downloadUrl}${this.learnMore}${this.description}${this.version}${null}`;

        }
    }

    osVersionExtract(productId){
        let osPlatform = new RHDPOSDownload();
        osPlatform.platformType = osPlatform.getUserAgent();
        osPlatform.downloadURL = this.downloadUrl;
        osPlatform.setOSURL(productId);
        osPlatform.setDownloadURLByPlatform();
        this.downloadUrl = osPlatform.downloadURL;
        this.platform = osPlatform.platformType;

    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

}

window.customElements.define('rhdp-downloads-all-item', RHDPDownloadsAllItem);