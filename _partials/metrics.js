---
interpolate: true
---
var writeAsyncScript = function (url, callback) {
  var firstScript = document.getElementsByTagName('script')[0], tag = document.createElement('script');
  tag.async = true;
  tag.type = 'text/javascript';
  tag.src = url;
  if (typeof callback !== 'undefined') { tag.addEventListener('load', callback); }
  firstScript.parentNode.insertBefore(tag, firstScript);
};
(function (id) {
  window['dataLayer'] = window['dataLayer'] || [];
  window['dataLayer'].push(
    {'gtm.start': new Date().getTime(), event: 'gtm.js'}
  );
  writeAsyncScript('//www.googletagmanager.com/gtm.js?id=' + id);
})('GTM-NJWS5L');

writeAsyncScript('http://www.redhat.com/j/elqNow/elqCfg.js',
  function () {
    writeAsyncScript('#{cdn("#{site.base_url}/javascripts/eloqua.js")}');
  });
writeAsyncScript('#{cdn("#{site.base_url}/javascripts/vendor/s_code.js")}',
  function () {
    writeAsyncScript('#{cdn("#{site.base_url}/javascripts/adobe-analytics.js")}',
      function () {
        writeAsyncScript('http://www.redhat.com/assets/js/tracking/rh_omni_footer.js');
      });
  });

