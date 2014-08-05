/**
 * Outbound link tracking
 *
 */

app.track = {};
app.track.outbound = function(src) {
  _gaq.push(['_trackEvent', 'outbound', src.title, src.href]);
  // Eloqua will track the link
  _elq.trackEvent(src);
};

