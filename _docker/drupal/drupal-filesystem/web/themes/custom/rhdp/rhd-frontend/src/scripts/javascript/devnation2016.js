app.devnation2016 = {
  processDate: function () {
    var eventDates = document.getElementsByClassName('hiddenDate');
    for (var i = 0; i < eventDates.length; i++) {
      
      if (eventDates[i] === null) {
        console.log('Found a null');
        continue;
      }

      console.log('Parsing:' + eventDates[i].dataset.date);
      var eventDate = new Date(eventDates[i].dataset.date);
      console.log('Parsed:' + eventDate);

      // Format and display the date
      var timezone = (String(String(eventDate).split("(")[1]).split(")")[0]);
      var d = eventDate.toLocaleDateString();
      var t = eventDate.toLocaleTimeString();
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
