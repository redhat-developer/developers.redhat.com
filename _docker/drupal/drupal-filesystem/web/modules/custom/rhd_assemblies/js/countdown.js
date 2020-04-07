/**
 * @file
 * Javascript Countdown Component
 * Provides a countdown to reveal the call to action.
 * Also see https://codepen.io/SitePoint/pen/MwNPVq,
 * https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
 */

(function ($, Drupal) {

  function toggleCountdownAndCTA(clock) {
    $(clock).next('.cta__cta').removeClass('pf-u-hidden');
    $(clock).addClass('pf-u-hidden');
  }

  function hideICS(icsWrapper) {
    if (icsWrapper) {
      $(icsWrapper).addClass('pf-u-hidden');
    }
  }

  function getTimeRemaining(countdownDate) {
    var now = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'});
    var countdownDateObj = new Date(countdownDate);

    var t = Date.parse(countdownDateObj) - Date.parse(now);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(clock, countdownDate, icsWrapper) {
    var daysSpan = clock.find('.days span');
    var hoursSpan = clock.find('.hours span');
    var minutesSpan = clock.find('.minutes span');
    var secondsSpan = clock.find('.seconds span');

    function updateClock(clock) {
      var t = getTimeRemaining(countdownDate);
      daysSpan.html(t.days);
      hoursSpan.html(('0' + t.hours).slice(-2));
      minutesSpan.html(('0' + t.minutes).slice(-2));
      secondsSpan.html(('0' + t.seconds).slice(-2));

      if (t.total <= 0) {
        clearInterval(timeinterval);
        toggleCountdownAndCTA(clock);
        hideICS(icsWrapper);
      }
    }

    updateClock(clock);
    var timeinterval = setInterval(updateClock, 1000, clock);
  }

  Drupal.behaviors.rhd_CtaCountdown = {
    attach: function (context, settings) {
      $('.assembly-type-call_to_action.has-countdown', context).once('rhdCTACountdown').each(function () {
        var icsWrapper = $('.ics-wrapper', $(this));
        var clock = $('.rhd-c-countdown', $(this));
        var countdownDate = settings.rhd_assemblies.countdown_date;
        var startingOffsetTime = getTimeRemaining(countdownDate);

        if (startingOffsetTime.total == 0) {
          toggleCountdownAndCTA(clock);
          hideICS(icsWrapper);
        }
        else {
          $(clock).removeClass('pf-u-hidden');
          initializeClock(clock, countdownDate, icsWrapper);
        }
      });
    }
  }

})(jQuery, Drupal);
