/* eslint-disable strict */
/*
  This script is responsible for displaying the "Thank you for downloading..." element with the licence agreement date
  and also triggering the download.

  The script is only active if the page was visited via a redirect from the download manager. It uses the query-string
  provided by the download-manager to know which file to download and what date to use in the
  "Thankyou for downloading..." element.
 */
app.termsAndConditions = {
    urlParam: function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!!results) {
            return results[1] || 0;
        } else {
            return null;
        }
    },
    isDownloadPage: function () {
        var returnVal = false;
        var tcDownloadURL = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadURL'));
        var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));
        var tcSourceLink = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcSrcLink'));
        var tcDownloadManagerCheck = false;

        if (tcSourceLink) {
            tcDownloadManagerCheck = tcSourceLink.indexOf('download-manager') >= 0 ? true : false;
        }
        if (tcDownloadURL !== "" && tcDownloadFileName !== "" && tcDownloadManagerCheck ) {
            returnVal = true;
        }
        return returnVal;
    },

    hideDownloadMessage: function () {
        $('div#downloadthankyou').hide('slow');
    },

    download: function () {
        var tcUser = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcUser'));
        var isRhel = window.location.href.indexOf("/rhel/") > -1 ? true : false;
        // set when signed to blank when we do not require a login
        var whenSigned = app.termsAndConditions.urlParam('tcWhenSigned') || '';
        var tcWhenSigned = $.encoder.canonicalize(whenSigned).replace(/\+/g, ' ');
        var tcEndsIn = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcEndsIn'));
        var tcDownloadURL = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadURL'));
        var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));
        var product = $.encoder.canonicalize(app.termsAndConditions.urlParam('p'));
        var tcProduct = $.encoder.canonicalize(product) || '';
        var messageTemplate = "";
        var tmpTcEndsIn = "";
        var tmpTcWhenSigned = tcWhenSigned ? $.encoder.encodeForHTML(tcWhenSigned) : "";
        tcProduct = tcProduct.replace(/\+/g, ' ');

        if (tcEndsIn) {
            if (tcEndsIn == "1") {
                tmpTcEndsIn = "one day ";
            } else {
                tmpTcEndsIn = $.encoder.encodeForHTML(tcEndsIn) + " days ";
            }
        }

        //create template string for thankyou message
        messageTemplate = messageTemplate + '<div class="component rhd-c-product-download-alert pf-c-content" id="downloadthankyou">';
        messageTemplate = messageTemplate + '<div class="rhd-c-panel pf-l-grid">';
        messageTemplate = messageTemplate + '<div class="rhd-c-panel-close pf-l-grid__item pf-m-1-col pf-m-offset-11-col"><a href="#" onclick="app.termsAndConditions.hideDownloadMessage();"><i class="fas fa-times"></i></a></div>';
        messageTemplate = messageTemplate + '<div class="pf-l-grid__item pf-m-12-col">';
        messageTemplate = messageTemplate + '<h2 id="thank-you">Thank you for downloading ' + $.encoder.encodeForHTML(tcProduct) + '</h2>';
        messageTemplate = messageTemplate + '<p id="download-problems" style="display: block;">Your download should start automatically. If you have any problems with the download, please use the<a id="tcDownloadLink" href="'+ tcDownloadURL +'"> direct link</a>.</p>';
        messageTemplate = messageTemplate + '<br>';
        messageTemplate = messageTemplate + '</div>';
        if (!isRhel) {
            messageTemplate = messageTemplate + '<div class="thankyoupanels" style="display: none;">';
            messageTemplate = messageTemplate + '<div class="pf-l-grid">';
            messageTemplate = messageTemplate + '<div class="pf-l-grid__item pf-m-12-col">';
            messageTemplate = messageTemplate + '<p style="display: none;">By downloading this product you have agreed with our <a href="/terms-and-conditions/">terms and conditions </a>on <span id="tcWhenSigned">' + tmpTcWhenSigned + '</span>. You will be notified again in <span id="tcEndsIn">'+ tmpTcEndsIn +'</span> after your subscription ends. </p>';
            messageTemplate = messageTemplate + '</div>';
            messageTemplate = messageTemplate + '</div>';
            messageTemplate = messageTemplate + '</div>';
        }
        messageTemplate = messageTemplate + '</div>';
        messageTemplate = messageTemplate + '</div>';

        if ($('section.product-header').length) {
            $('section.product-header').append($.parseHTML(messageTemplate));
        } else if ($('#rhd-article').length) {
            $('#rhd-article > div.pre-body').after($.parseHTML(messageTemplate));
        } else if ($('section.assembly-type-product_download_hero').length) {
            $('section.assembly-type-product_download_hero').after($.parseHTML('<div class="field__item" style="margin-top: 30px;">'+messageTemplate+'</div>'));
        } else {
            $('main').prepend($.parseHTML('<article style="margin-top: 30px;"><section>'+messageTemplate+'</section></article>'));
        }

        if (!tcWhenSigned) {
            $('#downloadthankyou p, .thankyoupanels').hide();
            $('#download-problems').show();
        }

        if (tcDownloadFileName) {
            $('#downloadthankyou').show('slow');
            $('.pending-download-box').addClass('download-completed-box');
            $('.pending-download').removeClass('active').addClass('download-completed');
        }

        if (tcDownloadURL &&
        tcDownloadURL.startsWith('https://access.cdn.redhat.com/') &&
        tcDownloadURL.contains(tcDownloadFileName) && !checkRecentDownload()) {
            tcDownloadURL = $.encoder.canonicalize(window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14));

            $("a#tcDownloadLink").attr("href", tcDownloadURL);
            if (tcDownloadFileName) {
                $("#tcDownloadFileName").html($.encoder.encodeForHTML(tcDownloadFileName));
            }

            $.fileDownload(tcDownloadURL);

            // Inform GTM that we have requested a product download
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'product_download_file_name' : tcDownloadFileName });
            window.dataLayer.push({'event': 'Product Download Requested'});

        }

        var ddDownloadEvent = {
            eventInfo: {
                eventAction: 'download',
                eventName: 'download',
                fileName: tcDownloadFileName,
                fileType: tcProduct,
                productDetail: tcProduct, // Concatenation of Product Variant (Name), Version, Architecture.
                timeStamp: new Date(),
                processed: {
                    adobeAnalytics: false
                }
            }
        };

        //Push it onto the event array of the digitalData object
        window.digitalData = window.digitalData || {};
        digitalData.event = digitalData.event || [];
        digitalData.event.push(ddDownloadEvent);
        //Create and dispatch an event trigger
        sendCustomEvent('downloadEvent');

        function setRecentUrlValue() {
            var referrerDownload = {value: window.location.href, timestamp: new Date().getTime()};
            localStorage.setItem("recent-download-url", JSON.stringify(referrerDownload));
        }

        function checkRecentDownload() {
        // Set storage expiration time to 10 minutes
            var storageExpiration = 600000;
            if (app.termsAndConditions.isDownloadPage()){
                if (window.localStorage.getItem('recent-download-url')){
                    var recentDownload,timeOfRefer, currentTime;
                    recentDownload = JSON.parse(window.localStorage.getItem('recent-download-url'));
                    timeOfRefer = recentDownload && recentDownload.hasOwnProperty('timestamp') ? recentDownload['timestamp'] : 0;
                    currentTime = new Date().getTime();

                    if (currentTime-timeOfRefer > storageExpiration){
                        setRecentUrlValue();
                        return false;
                    }
                    if (recentDownload['value'] !== window.location.href){
                        setRecentUrlValue();
                        return false;
                    }
                    return true;
                } else {
                    setRecentUrlValue();
                    return false;
                }

            }
        }

    },
    /*
  * T&C banner display
  */
    callback : function(data) {
        if (data.tac.accepted) {
            // create banner, maybe modal? saying when they signed tac.acceptanceTimestamp
            var dateParsed = new Date(data.tac.acceptanceTimestamp);
            data.tac.acceptanceTimestamp = dateParsed.toISOString().substr(0,10);
            // @TODO This app.templates variable should be null since the Slim
            // template no longer exists.
            var newHtml = app.templates.termsAndConditionsTemplate.template(data.tac);
            $('#_developer_program_terms_conditions').before(newHtml);
        }
    },
    banner : function() {
        app.dcp.authStatus().done(function(data) {
            if (data.authenticated) {
                // Add a jsonp call to get the info
                var tac = document.createElement('script'); tac.type = 'text/javascript'; tac.async = true;
                tac.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'developer.jboss.org/api/custom/v1/account/info?callback=app.termsAndConditions.callback';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tac, s);
            }
        });
    }
};



// Do this on DOM load so we don't disturb other scripts when we do the redirect to the download!
$(function() {
    //The download is now triggered from the success callback from KeyCloak in sso.js. This ensures that KeyCloak is initialised before doing the download.

    //Display the Ts&Cs banner
    if ($('#_developer_program_terms_conditions').length) {
        app.termsAndConditions.banner();
    }
});

