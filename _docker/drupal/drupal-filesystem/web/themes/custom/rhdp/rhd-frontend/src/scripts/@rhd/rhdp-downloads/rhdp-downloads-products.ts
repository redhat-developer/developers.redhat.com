class RHDPDownloadsProducts extends HTMLElement {
    private _category;
    _products = {
        "products": [{
            "productName": "Red Hat JBoss Data Grid",
            "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
            "productCode": "datagrid",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.grid&downloadType=distributions",
            "downloadLink": "",
            "description": "An in-memory data grid to accelerate performance that is fast, distributed, scalable, and independent from the data tier.",
            "version": "",
            "learnMoreLink": "/products/datagrid/overview/"
        }, {
            "productName": "Red Hat JBoss Enterprise Application Platform",
            "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
            "productCode": "eap",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=appplatform&downloadType=distributions",
            "downloadLink": "",
            "description": "An innovative, modular, cloud-ready application platform that addresses management, automation and developer productivity.",
            "version": "",
            "learnMoreLink": "/products/eap/overview/"
        }, {
            "productName": "Red Hat JBoss Web Server",
            "groupHeading": "ACCELERATED DEVELOPMENT AND MANAGEMENT",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=webserver&productChanged=yes",
            "downloadLink": "/products/webserver/download/",
            "description": "Apache httpd, Tomcat, etc. to provide a single solution for large-scale websites and light-weight Java web applications.",
            "version": "",
            "learnMoreLink": "/products/webserver/overview/"
        }, {
            "productName": "Red Hat Application Migration Toolkit",
            "groupHeading": "DEVELOPER TOOLS",
            "productCode": "migrationtoolkit",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/downloads",
            "downloadLink": "",
            "description": "Red Hat Application Migration Toolkit is an assembly of open source tools that enables large-scale application migrations and modernizations. The tooling consists of multiple individual components that provide support for each phase of a migration process.",
            "version": "",
            "learnMoreLink": "/products/rhamt/overview/"
        }, {
            "productName": "Red Hat Container Development Kit",
            "groupHeading": "DEVELOPER TOOLS",
            "productCode": "cdk",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/downloads/content/293/",
            "downloadLink": "",
            "description": "For container development, includes RHEL and OpenShift 3.",
            "version": "",
            "learnMoreLink": "/products/cdk/overview/"
        }, {
            "productName": "Red Hat Development Suite",
            "groupHeading": "DEVELOPER TOOLS",
            "productCode": "devsuite",
            "featured": true,
            "dataFallbackUrl": "https://access.redhat.com/downloads",
            "downloadLink": "",
            "description": "A fully integrated development environment for modern enterprise development.",
            "version": "",
            "learnMoreLink": "/products/devsuite/overview/"
        }, {
            "productName": "Red Hat JBoss Developer Studio",
            "groupHeading": "DEVELOPER TOOLS",
            "productCode": "devstudio",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jbossdeveloperstudio&downloadType=distributions",
            "downloadLink": "",
            "description": "An Eclipse-based IDE to create apps for web, mobile, transactional enterprise, and SOA-based integration apps/services.",
            "version": "",
            "learnMoreLink": "/products/devstudio/overview/"
        }, {
            "productName": "Red Hat Enterprise Linux",
            "groupHeading": "INFRASTRUCTURE",
            "productCode": "rhel",
            "featured": true,
            "dataFallbackUrl": "https://access.redhat.com/downloads/content/69/",
            "downloadLink": "",
            "description": "For traditional development, includes Software Collections and Developer Toolset.",
            "version": "",
            "learnMoreLink": "/products/rhel/overview/"
        }, {
            "productName": "Red Hat JBoss AMQ",
            "groupHeading": "INTEGRATION AND AUTOMATION",
            "productCode": "amq",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jboss.amq&downloadType=distributions",
            "downloadLink": "",
            "description": "A small-footprint, performant, robust messaging platform that enables real-time app, device, and service integration.",
            "version": "",
            "learnMoreLink": "/products/amq/overview/"
        }, {
            "productName": "Red Hat Decision Manager",
            "groupHeading": "INTEGRATION AND AUTOMATION",
            "productCode": "brms",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=brms&downloadType=distributions",
            "downloadLink": "",
            "description": "A programming platform to easily capture and maintain rules for business changes, without impacting static applications.",
            "version": "",
            "learnMoreLink": "/products/red-hat-decision-manager/overview/"
        }, {
            "productName": "Red Hat Process Automation Manager",
            "groupHeading": "INTEGRATION AND AUTOMATION",
            "productCode": "rhpam",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?downloadType=distributions&product=bpm.suite&productChanged=yes",
            "downloadLink": "",
            "description": "A platform that combines business rules and process management (BPM), and complex event processing.",
            "version": "",
            "learnMoreLink": "/products/rhpam/overview/"
        }, {
            "productName": "Red Hat JBoss Data Virtualization",
            "groupHeading": "INTEGRATION AND AUTOMATION",
            "productCode": "datavirt",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=data.services.platform&downloadType=distributions",
            "downloadLink": "",
            "description": "A tool that brings operational and analytical insight from data dispersed in various business units, apps, and technologies.",
            "version": "",
            "learnMoreLink": "/products/datavirt/overview/"
        }, {
            "productName": "Red Hat JBoss Fuse",
            "groupHeading": "INTEGRATION AND AUTOMATION",
            "productCode": "fuse",
            "featured": true,
            "dataFallbackUrl": "https://access.redhat.com/jbossnetwork/restricted/listSoftware.html?product=jboss.fuse&downloadType=distributions",
            "downloadLink": "",
            "description": "A small-footprint enterprise service bus (ESB) that lets you build, deploy and integrate applications and services.",
            "version": "",
            "learnMoreLink": "/products/fuse/overview/"
        }, {
            "productName": "Red Hat Mobile Application Platform",
            "groupHeading": "MOBILE",
            "featured": true,
            "dataFallbackUrl": "https://access.redhat.com/downloads/content/316/",
            "downloadLink": "/products/mobileplatform/download/",
            "description": "Develop and deploy mobile apps in an agile and flexible manner.",
            "version": "",
            "learnMoreLink": "/products/mobileplatform/overview/"
        }, {
            "productName": "Red Hat OpenShift Container Platform",
            "groupHeading": "CLOUD",
            "productCode": "openshift",
            "featured": false,
            "dataFallbackUrl": "https://access.redhat.com/downloads/content/290/",
            "downloadLink": "",
            "description": "An open, hybrid Platform-as-a-Service (PaaS) to quickly develop, host, scale, and deliver apps in the cloud.",
            "version": "",
            "learnMoreLink": "/products/openshift/overview/"
        }, {
            "productName": "OpenJDK",
            "groupHeading": "LANGUAGES AND COMPILERS",
            "productCode": "openjdk",
            "featured": false,
            "dataFallbackUrl": "/products/openjdk/overview/",
            "downloadLink": "",
            "description": "A Tried, Tested and Trusted open source implementation of the Java platform",
            "version": "",
            "learnMoreLink": "/products/openjdk/overview/"
        }]
    };

    // _products = '../rhdp-apps/downloads/products.json';

    private _data;

    constructor() {
        super();
    }

    get category() {
        return this._category;
    }

    set category(value) {
        if (this._category === value) return;
        this._category = value;
        this.setAttribute('category', this._category);

    }

    get products() {
        return this._products;
    }

    set products(value) {
        if(this._products === value) return;
        this._products = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        if (this._data === value) return;
        this._data = value;
        this.setAttribute('data', this._data);
        this._createProductList();
    }


    _createProductList() {
        let tempProductList = {"products" :[]};
        if (this._data){
            let productLen = this.products.products.length
            let dataLen = this.data.length;
            for (var i = 0; i < productLen; i++){
                let product = this.products.products[i];
                for (var j = 0; j < dataLen; j++){
                    let data = this.data[j];
                    if (data['productCode'] == product['productCode']){
                        this.products.products[i]['downloadLink'] = data['featuredArtifact']['url'];
                        this.products.products[i]['version'] = data['featuredArtifact']['versionName'];

                    }
                }
                tempProductList['products'].push(product);
            }
        }
        this.products = tempProductList;
    }



}