/*
  This script is responsible for displaying the "Thankyou for downloading..." element with the licence agreement date
  and also triggering the download.

  The script is only active if the page was visited via a redirect from the download manager. It uses the query-string
  provided by the download-manager to know which file to download and what date to use in the
  "Thankyou for downloading..." element.
 */
app.dl = {
  urlParam: function (name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!!results) {
      return results[1] || 0;
    } else {
      return null;
    }
  },

  doDownload: function () {

    var tcUser = app.dl.urlParam('tcUser');
    var tcWhenSigned = app.dl.urlParam('tcWhenSigned');
    var tcEndsIn = app.dl.urlParam('tcEndsIn');
    var tcDownloadURL = app.dl.urlParam('tcDownloadURL');
    var tcDownloadFileName = app.dl.urlParam('tcDownloadFileName');

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

      var tcRedirect = app.dl.urlParam('tcRedirect');
      if (tcRedirect) {
        $("#tcRedirectIn").html(tcRedirect / 1000 + " seconds");
        setTimeout("location.href = '" + tcDownloadURL + "';", tcRedirect);
      }
    }
  }
};
