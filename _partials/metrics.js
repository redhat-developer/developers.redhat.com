---
interpolate: true
---
(function(w, d, e) {
  var s = function (u, c) {
    var f = d.getElementsByTagName(e)[0], t = d.createElement(e);
    t.async = true;
    t.type = 'text/javascript';
    t.src = u;
    if (typeof c !== 'undefined') { t.addEventListener('load', c); }
    f.parentNode.insertBefore(t, f);
  };
  (function (id, l) {
    w[l] = w[l] || [];
    w[l].push(
      {'gtm.start': new Date().getTime(), event: 'gtm.js'}
    );
    s('//www.googletagmanager.com/gtm.js?id=' + id);
  })('GTM-NJWS5L', 'dataLayer');

  s('http://www.redhat.com/j/elqNow/elqCfg.js',
    function () {
      s('#{cdn("#{site.base_url}/javascripts/eloqua.js")}');
    });
  s('#{cdn("#{site.base_url}/javascripts/vendor/s_code.js")}',
    function () {
      s('#{cdn("#{site.base_url}/javascripts/adobe-analytics.js")}',
        function () {
          s('http://www.redhat.com/assets/js/tracking/rh_omni_footer.js');
        });
    });
})(window, document, 'script');

