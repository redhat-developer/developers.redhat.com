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

      //var tcRedirect = app.termsAndConditions.urlParam('tcRedirect');
      var tcRedirect = 1000;
      if (tcRedirect) {
        $("#tcRedirectIn").html(tcRedirect / 1000 + " seconds");
        setTimeout("location.href = '" + tcDownloadURL + "';", tcRedirect);
      }
    }
  },
  /*
  * T&C banner display
  */
  callback : function(data) {
    if (data.tac.accepted) {
      // create banner, maybe modal? saying when they signed tac.acceptanceTimestamp
      data.tac.acceptanceTimestamp = new Date(data.tac.acceptanceTimestamp).toLocaleString();
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


(function() {
  if ($('.downloadthankyou').length) {
    app.termsAndConditions.download();
  }
  if ($('#_developer_program_terms_conditions').length) {
    app.termsAndConditions.banner();
  }
})();

