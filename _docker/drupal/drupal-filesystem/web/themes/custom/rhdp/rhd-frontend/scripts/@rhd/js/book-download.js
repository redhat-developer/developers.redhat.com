app.bookDownload = {
    urlParam: function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!!results) {
            return results[1] || 0;
        }
        else {
            return null;
        }
    },
    download: function () {
        var tcDownloadURL = $.encoder.canonicalize(app.bookDownload.urlParam('tcDownloadURL'));
        var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));
        if (tcDownloadURL &&
            tcDownloadURL.startsWith('https://access.cdn.redhat.com/')) {
            tcDownloadURL = $.encoder.canonicalize(window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14));
            $('.promotion-header').prepend("<div class='alert-box alert-success'><div class='icon'></div><div class='alert-content'><p><a href='" + tcDownloadURL + "'>Click here</a> if your download does not begin automatically.</p></div></div>");
            $("a#tcDownloadLink").attr("href", tcDownloadURL);
            if (!app.utils.isMobile.any()) {
                $.fileDownload(tcDownloadURL);
            }
            var ddDownloadEvent = {
                eventInfo: {
                    eventAction: 'book_download',
                    eventName: 'download',
                    fileName: tcDownloadFileName,
                    fileType: 'book',
                    productDetail: "",
                    timeStamp: new Date(),
                    processed: {
                        adobeAnalytics: false
                    }
                }
            };
            window.digitalData = window.digitalData || {};
            digitalData.event = digitalData.event || [];
            digitalData.event.push(ddDownloadEvent);
            sendCustomEvent('downloadEvent');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'product_download_file_name': tcDownloadFileName });
            window.dataLayer.push({ 'event': 'Book Download Requested' });
        }
    },
};
$(function () {
    if ($('#book-download-promotion').length) {
        app.bookDownload.download();
    }
});
