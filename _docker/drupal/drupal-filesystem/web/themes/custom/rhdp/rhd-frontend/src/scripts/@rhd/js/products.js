function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function setCookie(name, value, expireDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getUserAgent(){
    var OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="RHEL";

    return OSName;

}

function setProductOSTab(systemType) {
    switch(systemType){
        case 'Windows':
            return 'fndtn-windows';
            break;
        case 'MacOS':
            return 'fndtn-macos';
            break;
        case 'RHEL' :
            return 'fndtn-rhel';
            break;
        default:
            return 'fndtn-windows';
    }
}


(function () {
    var productApp = angular.module('productApp', []),
        productOSHash = setProductOSTab(getUserAgent()),
        pathRegex = window.location.pathname.match(/.*\/products\/.*\/hello-world\/?/g);

    if(pathRegex){
        window.location.hash = productOSHash;
        if(window.location.pathname != getCookie('product_path')){
            setCookie('product_page_cookie', null, 1);
        }

        var tabList = document.querySelectorAll('[role="presentation"]');
        setCookie('product_path', window.location.pathname);
        for (var i = 0; i < tabList.length; i++) {
            var tabItem = tabList[i];
            tabItem.onclick = function (event) {
                var target = getEventTarget(event);
                setCookie('product_page_cookie',target.hash, 1);
            }
        };
        var productCookie = getCookie('product_page_cookie');
        if(productCookie && productCookie != 'null' && !window.location.href.contains('tcDownloadFile')){
            window.location.hash = productCookie;
        }

    }

}());

