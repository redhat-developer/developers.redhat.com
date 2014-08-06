app.os = {
  process : function() {
    $('dt').each(function(){
      var el = $(this);
      var text = el.text();
      var mac = new RegExp("\\bos\\ ?x\\b|\\bmac\\b","gi"); // osx mac macintosh OS X  OSX..
      var windows = new RegExp("windows","gi"); // windows Windows...
      var linux = new RegExp("\\blinux\\b|\\bunix\\b","gi") // Linux, Unix...

      if(text.match(mac)) {
        el.addClass('os-mac');
        el.next().addClass('os-mac');
      }

      if(text.match(windows)) {
        el.addClass('os-windows');
        el.next().addClass('os-windows');
      }

      if(text.match(linux)){
        el.addClass('os-linux');
        el.next().addClass('os-linux');
      }

      if($('.os-mac, .os-linux, .os-windows').length) {
        $('ul.os-selector').removeClass('hidden');
      }

      app.os.bind();

    });
  },
  detectOs : function() {
    if(navigator.platform.toUpperCase().indexOf('MAC')!==-1) {
      return "mac";
    }
    if(navigator.platform.toUpperCase().indexOf('WIN')!==-1) {
      return "windows";
    }
    if(navigator.platform.toUpperCase().indexOf('LINUX')!==-1 || navigator.appVersion.indexOf("X11")!==-1) {
      return "linux";
    }
    else {
      return "other";
    }
  },
  bind : function() {
    
    $('input[name="os"]').on('change',function() {
      var val = $(this).val();
      $('.os-mac, .os-windows, .os-linux').hide();
      $('dd.os-'+val).show();
    });

    var os = app.os.detectOs();

    // if we cannot find the OS or we are on mobile, set the default
    (os === "other" ? "linux" : os);

    $('input#'+os).trigger('click').trigger('change');

  }
};

$(function() {

  if ($('dt').length) {
    app.os.process();
  }

});

