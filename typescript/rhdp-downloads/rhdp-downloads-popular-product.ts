class RHDPDownloadsPopularProduct extends HTMLElement {

    private _name;
    private _productId;
    private _dataFallbackUrl;
    private _downloadUrl;

    get name() {
        return this._name;
    }

    set name(value) {
        if (this._name === value) return;
        this._name = value;
        this.setAttribute('name', this.name)
    }

    get productId() {

        return this._productId;

    }

    set productId(value) {
        if (this.productId === value) return;
        this._productId = value;
        this.setAttribute('productid', this.productId)

    }

    get dataFallbackUrl() {
        return this._dataFallbackUrl;
    }

    set dataFallbackUrl(value) {
        if (this.dataFallbackUrl === value) return;
        this._dataFallbackUrl = value;
        this.setAttribute('datafallbackurl', this.dataFallbackUrl)
    }

    get downloadUrl() {
        return this._downloadUrl;
    }

    set downloadUrl(value) {
        if (this.downloadUrl === value) return;
        this._downloadUrl = value;
        this.setAttribute('downloadurl', this.downloadUrl)
    }

    constructor() {
        super();
    }

    template = (strings, name, id, dataFallbackUrl, url) => {
        return `
        <div class="large-6 column">
            <div class="popular-download-box">
                <h4>${name}</h4>
                <a class="button heavy-cta" data-download-id="${id}" data-fallback-url="${dataFallbackUrl}" href="${url}"><i class="fa fa-download"></i> Download</a>
            </div>
        </div>`;
    };

    connectedCallback() {
        this.innerHTML = this.template`${this.name}${this.productId}${this.dataFallbackUrl}${this.downloadUrl}`;
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

}