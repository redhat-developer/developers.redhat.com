"use strict";
/* global app */
app.devnation2016 = {
    processDate: function () {
        var eventDates = document.getElementsByClassName('hiddenDate'),
            i, eventDate, timezone, d, t;
        for (i = 0; i < eventDates.length; i++) {

            if (eventDates[i] === null) {
                //console.log('Found a null');
                continue;
            }

            //console.log('Parsing:' + eventDates[i].dataset.date);
            eventDate = new Date(eventDates[i].dataset.date);
            //console.log('Parsed:' + eventDate);

      // Format and display the date
            timezone = String(String(eventDate).split("(")[1]).split(")")[0];
            d = eventDate.toLocaleDateString();
            t = eventDate.toLocaleTimeString();
            t = t.replace(/\u200E/g, '');
            t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
            $(eventDates[i]).find('.event-day').text(d);
            $(eventDates[i]).find('.event-time').text(t);
            $(eventDates[i]).find('.event-timezone').text(timezone);
        }

    }
};

$(function() {
    app.devnation2016.processDate();
});
