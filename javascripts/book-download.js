/*
  This script is responsible for book downloads.

  The script is only active if the page was visited via a redirect from the download manager. It uses the query-string
  provided by the download-manager to know which file to download.
 */
app.bookDownload = {
  urlParam: function (name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!!results) {
      return results[1] || 0;
    } else {
      return null;
    }
  },
  download: function () {
    // set when signed to blank when we do not require a login
    var tcDownloadURL = $.encoder.canonicalize(app.bookDownload.urlParam('tcDownloadURL'));
    var tcDownloadFileName = $.encoder.canonicalize(app.termsAndConditions.urlParam('tcDownloadFileName'));

    if (tcDownloadURL &&
        tcDownloadURL.startsWith('https://access.cdn.redhat.com/')) {
      tcDownloadURL = $.encoder.canonicalize(window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14));

      $('.promotion-header').prepend("<div class='alert-box success'><p><a href='"+tcDownloadURL+"'>Click here</a> if your download does not begin automatically.</p></div>")

      $("a#tcDownloadLink").attr("href", tcDownloadURL);

      if(!app.utils.isMobile.any()){
        // only try download on desktop - mobile users will tap the banner
        $.fileDownload(tcDownloadURL);
      }

      // Inform GTM that we have requested a product download
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'product_download_file_name' : tcDownloadFileName });
      window.dataLayer.push({'event': 'Book Download Requested'});

    }
  },
};

// Do this on DOM load so we don't disturb other scripts when we do the redirect to the download!
$(function() {
  //The download is now triggered from the success callback from KeyCloak in sso.js. This ensures that KeyCloak is initialised before doing the download.
  //Display the Ts&Cs banner
  if ($('#distributed-javaee-architecture').length) {
    app.bookDownload.download();
  }
});
