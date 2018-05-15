/*
  This script is responsible for displaying the "JDF Content is now JBoss Developer Materials" .

  The script is only active if the page was visited via a redirect from the openshift jdf site. It uses the referer URL
   to know if the advertisement should be opened or not.
 */
app.jdf = {

  init: function() {
    if ($('.jdfadvise').length) {
      app.jdf.showAdvise();
    }
  },

  supportsLocalStorage: function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  },

  showAdvise: function () {

    var referrer = document.referrer;
    var jdfAvise = false;
    if (this.supportsLocalStorage()){
      jdfAvise = window.localStorage.getItem("jdfAviseRead");
    }

    if ( (referrer.indexOf('site-jdf.rhcloud.com') > 0 || referrer.indexOf(' www.jboss.org/jdf') > 0 ) & !jdfAvise ){
       $('div#jdfadvise').show('slow');
    }

  },

  hideAdvise: function() {
    $('div#jdfadvise').hide('slow');
    if(!this.supportsLocalStorage() ) {
      return;
    }
    window.localStorage.setItem("jdfAviseRead", true);
  }
};

app.jdf.init();
