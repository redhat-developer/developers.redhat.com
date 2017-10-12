class RHDPDownloadsAll extends HTMLElement {


    private _id;
    private _heading;
    private _products;

    constructor() {
        super();
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
        this.setAttribute('id', this._id);
    }

    get heading() {
        return this._heading;
    }

    set heading(value) {
        this._heading = value;
        this.setAttribute('heading', this._heading);

    }

    get products() {
        return this._products;
    }

    set products(value) {
        this._products = value;
    }

    template = (strings, id, heading) => {
        return `<div class="download-list">
                    <div class="large-24 category-label" id="${id}">
                        <h4>${heading}</h4>
                    </div>
                </div>
                `; };

    connectedCallback() {
        this.innerHTML = this.template`${this.id}${this.heading}`;
        this.getProductsWithTargetHeading(this.products)
    }

    getProductsWithTargetHeading(productList) {
        if (productList.products) {
            let products = productList.products.products;
            let len = products.length;

            for (let i = 0; i < len; i++) {
                if (products[i].groupHeading === this.heading) {
                    let item = new RHDPDownloadsAllItem();
                    item.name = products[i].productName;
                    item.productId = products[i].productCode ? products[i].productCode : "";
                    item.dataFallbackUrl = products[i].dataFallbackUrl ? products[i].dataFallbackUrl : "";
                    item.downloadUrl = products[i].downloadLink ? products[i].downloadLink : "";
                    item.description = products[i].description ? products[i].description : "";
                    item.learnMore = products[i].learnMoreLink ? products[i].learnMoreLink : "";
                    item.version = products[i].version ? products[i].version : "";
                    this.appendChild(item);
                }
            }
        }
    }
    // static get observedAttributes() {
    //     return ['id'];
    // }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

}