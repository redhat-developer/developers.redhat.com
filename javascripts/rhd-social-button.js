var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RHDSocialButton = (function (_super) {
    __extends(RHDSocialButton, _super);
    // Can define constructor arguments if you wish.
    function RHDSocialButton() {
        var _this = 
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        _super.call(this) || this;
        // Setup a click listener on <app-drawer> itself.
        _this.addEventListener('click', function (e) {
            // Don't toggle the drawer if it's disabled.
            console.log('Clicked rhd-social-button', _this.type);
            e.preventDefault;
        });
        return _this;
    }
    Object.defineProperty(RHDSocialButton.prototype, "type", {
        get: function () {
            return this.getAttribute('type') || 'twitter';
        },
        set: function (val) {
            this.setAttribute('type', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDSocialButton.prototype, "text", {
        get: function () {
            return this.getAttribute('text').trim() || document.title.trim();
        },
        set: function (val) {
            this.setAttribute('text', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RHDSocialButton.prototype, "url", {
        get: function () {
            return this.getAttribute('url') || window.location.href;
        },
        set: function (val) {
            this.setAttribute('url', val);
        },
        enumerable: true,
        configurable: true
    });
    RHDSocialButton.prototype.connectedCallback = function () {
        var d = document.createElement('div');
        d.className = "social-btn";
        switch (this.type) {
            case 'twitter':
                setScriptOnce(document, "twitter-jssdk", 'https://platform.twitter.com/widgets.js');
                d.innerHTML = "<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-text=\"" + this.text + "\" data-url=\"" + this.url + "\" data-show-count=\"true\">Tweet</a>";
                break;
            case 'facebook':
                setScriptOnce(document, 'facebook-jssdk', "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8");
                d.innerHTML = "<div class=\"fb-share-button\" data-href=\"" + this.url + "\" data-layout=\"button_count\" data-size=\"small\" data-mobile-iframe=\"true\"></div>";
                break;
            case 'linkedin':
                setScriptOnce(document, "linkedin-jssdk", "//platform.linkedin.com/in.js");
                d.innerHTML = "<script type=\"IN/Share\" data-url=\"" + this.url + "\" data-counter=\"right\"></script>";
                break;
            case 'gplus':
                setScriptOnce(document, "gplus-jssdk", "https://apis.google.com/js/platform.js");
                d.innerHTML = "<div class=\"g-plus\" data-action=\"share\" data-annotation=\"bubble\" data-height=\"24\" data-href=\"" + this.url + "\"></div>";
                break;
        }
        this.appendChild(d);
        this.setAttribute('style', 'display: inline-block; width: auto; padding: 5px; ');
    };
    return RHDSocialButton;
}(HTMLElement));
function setScriptOnce(d, id, src) {
    var js;
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.src = src;
    js.async = true;
    d.head.appendChild(js);
}
;
customElements.define('rhd-social-button', RHDSocialButton);
