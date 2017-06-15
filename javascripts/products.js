(function() {
    var productApp = angular.module('productApp', []);

    function getPrimaryCategory() {
        var prtcl = /https?:\/\//;
        var category = window.location.href.replace(prtcl, '').replace(drupalSettings.rhd.urls.base_url, '').replace(drupalSettings.rhd.urls.final_base_url, '').replace(/\/$/, '').split('?')[0].split('#')[0].split(/\//);
        return category.length > 1 ? category[1] : category[0];
    }

    var downloadHTML = $('<section id="download-alert"><div class="row content"><div class="large-24 columns"><div class="alert-box info radius"><h4>We are currently experiencing issues with some product downloads.</h4><p>There is currently an infrastructure issue that is causing some downloads to fail. This manifests as a server error message shortly after selecting the download. We have been working around the clock to fix this, and hope to have the problem resolved soon.</p><a class="close">x</a></div></div></div></section>');

    if (getPrimaryCategory() === 'products') {

        if ($('.mobile.product-header').length > 0) {
            downloadHTML.insertBefore('.mobile.product-header');
        } else {
            downloadHTML.insertAfter('.hero');
        }

        $('#download-alert .close').click(function() {
            $('#download-alert').addClass('hide');
        });
    } else if (getPrimaryCategory() === 'downloads') {
        downloadHTML.insertBefore('.most-popular-downloads');

        $('#download-alert .close').click(function() {
            $('#download-alert').addClass('hide');
        });
    }
}())