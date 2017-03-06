"use strict";
/* global app */
app.vjbug = {
    processDate: function () {
        var hiddenDate = document.getElementById('hiddenDate'),
            eventDate, timezone, d, t, currentDate;
        if (hiddenDate === null) { return; }

        eventDate = new Date(hiddenDate.innerHTML);

        // Format and isplay the date
        timezone = String(String(eventDate).split("(")[1]).split(")")[0];
        d = eventDate.toLocaleDateString();
        t = eventDate.toLocaleTimeString();
        t = t.replace(/\u200E/g, '');
        t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
        $('.event-day').text(d);
        $('.event-time').text(t);
        $('.event-timezone').text(timezone);

        currentDate = new Date();

        if (currentDate > eventDate.setMinutes(eventDate.getMinutes() + 90)) {
            $('.session-label').text('Our Most Recent Session...');
            $('.rsvp-button').hide();
        } else {
            $('.session-label').text('Next Live Session');
        }
    }
};

$(function() {
    app.vjbug.processDate();
});
