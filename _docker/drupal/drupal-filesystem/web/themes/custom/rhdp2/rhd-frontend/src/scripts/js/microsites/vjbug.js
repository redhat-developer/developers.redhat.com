

app.vjbug = {
  processDate: function () {
    var eventDate = document.getElementById('hiddenDate');
    if (eventDate === null)
      return;

    var eventDate = new Date(eventDate.innerHTML);

    // Format and isplay the date
    var timezone = (String(String(eventDate).split("(")[1]).split(")")[0]);
    var d = eventDate.toLocaleDateString();
    var t = eventDate.toLocaleTimeString();
    t = t.replace(/\u200E/g, '');
    t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
    $('.event-day').text(d);
    $('.event-time').text(t);
    $('.event-timezone').text(timezone);

    var currentDate = new Date();

    if (currentDate > (eventDate.setMinutes(eventDate.getMinutes() + 90))) {
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
