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
  download: function () {

    var tcUser = app.termsAndConditions.urlParam('tcUser');
    var tcWhenSigned = app.termsAndConditions.urlParam('tcWhenSigned');
    var tcEndsIn = app.termsAndConditions.urlParam('tcEndsIn');
    var tcDownloadURL = app.termsAndConditions.urlParam('tcDownloadURL');
    var tcDownloadFileName = app.termsAndConditions.urlParam('tcDownloadFileName');

    if (tcWhenSigned) {
      $("#tcWhenSigned").html(decodeURIComponent(tcWhenSigned));
    }

    if (tcEndsIn) {
      if (tcEndsIn == "1") {
        $("#tcEndsIn").html("one day ");
      } else {
        $("#tcEndsIn").html(tcEndsIn + " days ");
      }
    }

    if (tcDownloadFileName) {
      $('div#downloadthankyou').show('slow');
    }

    if (tcDownloadURL) {
      tcDownloadURL = window.location.href.substr(window.location.href.indexOf("tcDownloadURL=") + 14);

      $("a#tcDownloadLink").attr("href", tcDownloadURL);
      if (tcDownloadFileName) {
        $("#tcDownloadFileName").html(decodeURIComponent(tcDownloadFileName));
      }

      $.fileDownload(tcDownloadURL);

      // Inform GTM that we have requested a product download
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'product_download_file_name' : tcDownloadFileName });
      window.dataLayer.push({'event': 'Product Download Requested'});
      
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
      var newHtml = app.templates.termsAndConditionsTemplate.template(data.tac);
      $('#_developer_program_terms_conditions').before(newHtml);
    }
  },
  banner : function() {
    app.dm.authStatus().done(function(data) {
      if (data.authenticated) {
        // Add a jsonp call to get the info
        var tac = document.createElement('script'); tac.type = 'text/javascript'; tac.async = true;
        tac.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'community.jboss.org/api/custom/v1/account/info?callback=app.termsAndConditions.callback';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tac, s);
      }
    });
  }

};

// Do this on DOM load so we don't disturb other scripts when we do the redirect to the download!
$(function() {
  if ($('.downloadthankyou').length) {
    app.termsAndConditions.download();
  }
  if ($('#_developer_program_terms_conditions').length) {
    app.termsAndConditions.banner();
  }
});

