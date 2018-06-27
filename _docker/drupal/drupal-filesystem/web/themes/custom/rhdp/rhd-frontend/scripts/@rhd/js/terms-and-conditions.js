app.termsAndConditions = {
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
        var tcUser = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcUser'));
        var whenSigned = app.termsAndConditions.urlParam('tcWhenSigned') || '';
        var tcWhenSigned = $.encoder.canonicalize(whenSigned).replace(/\+/g, ' ');
        var tcEndsIn = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcEndsIn'));
        var tcDownloadURL = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadURL'));
        var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));
        var product = $.encoder.canonicalize(app.termsAndConditions.urlParam('p'));
        var tcProduct = $.encoder.canonicalize(product) || '';
        tcProduct = tcProduct.replace(/\+/g, ' ');
        if (tcWhenSigned) {
            $("#tcWhenSigned").html($.encoder.encodeForHTML(tcWhenSigned));
        }
        if (tcProduct) {
            $("h2#thank-you").append($.encoder.encodeForHTML(" " + tcProduct));
        }
        if (!tcWhenSigned) {
            $('.downloadthankyou p, .thankyoupanels').hide();
            $('#download-problems').show();
        }
        if (tcEndsIn) {
            if (tcEndsIn == "1") {
                $("#tcEndsIn").html("one day ");
            }
            else {
                $("#tcEndsIn").html($.encoder.encodeForHTML(tcEndsIn) + " days ");
            }
        }
        if (tcDownloadFileName) {
            $('div#downloadthankyou').show('slow');
            $('.pending-download-box').addClass('download-completed-box');
            $('.pending-download').removeClass('active').addClass('download-completed');
        }
        if (tcDownloadURL &&
            tcDownloadURL.startsWith('https://access.cdn.redhat.com/') &&
            tcDownloadURL.contains(tcDownloadFileName)) {
            tcDownloadURL = $.encoder.canonicalize(window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14));
            $("a#tcDownloadLink").attr("href", tcDownloadURL);
            if (tcDownloadFileName) {
                $("#tcDownloadFileName").html($.encoder.encodeForHTML(tcDownloadFileName));
            }
            $.fileDownload(tcDownloadURL);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'product_download_file_name': tcDownloadFileName });
            window.dataLayer.push({ 'event': 'Product Download Requested' });
        }
        var ddDownloadEvent = {
            eventInfo: {
                eventAction: 'download',
                eventName: 'download',
                fileName: tcDownloadFileName,
                fileType: tcProduct,
                productDetail: tcProduct,
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
    },
    callback: function (data) {
        if (data.tac.accepted) {
            var dateParsed = new Date(data.tac.acceptanceTimestamp);
            data.tac.acceptanceTimestamp = dateParsed.toISOString().substr(0, 10);
            var newHtml = app.templates.termsAndConditionsTemplate.template(data.tac);
            $('#_developer_program_terms_conditions').before(newHtml);
        }
    },
    banner: function () {
        app.dcp.authStatus().done(function (data) {
            if (data.authenticated) {
                var tac = document.createElement('script');
                tac.type = 'text/javascript';
                tac.async = true;
                tac.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'developer.jboss.org/api/custom/v1/account/info?callback=app.termsAndConditions.callback';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(tac, s);
            }
        });
    }
};
$(function () {
    if ($('#_developer_program_terms_conditions').length) {
        app.termsAndConditions.banner();
    }
});
