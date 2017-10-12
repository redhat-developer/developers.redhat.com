class RHDPDownloadsPopularProducts extends HTMLElement {

    private _productList;

    constructor() {
        super();
    }

    get productList() {
        return this._productList;
    }

    set productList(value) {
        if (this._productList === value) return;
        this._productList = value;
        this.setAttribute('productlist', this.productList)

    }

    addProduct(product){
        var productNode = new RHDPDownloadsPopularProduct();

        productNode.name = product.productName;
        productNode.productId = product.productCode;
        productNode.dataFallbackUrl = product.dataFallbackURL;
        productNode.downloadUrl = product.downloadLink;
        this.appendChild(productNode);
    }

    renderProductList(productList){
        // Set instance variable productList to the overall productList returned from download-manager
        // If the product is popular, append it, else: forget about it.
        this.productList = productList.products;
        if(this.productList.products){
            let products = this.productList.products;
            let len = products.length;
            for (let i = 0; i < len; i++){
                if(products[i].featured){
                    this.addProduct(products[i])
                }
            }
        }

    }

    connectedCallback() {
        this.renderProductList(new RHDPDownloadsProducts());

    }


    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }


}