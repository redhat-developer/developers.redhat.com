app.devnation2016 = {
  processDate: function () {
    var eventDate = document.getElementById('hiddenDate');
    if (eventDate === null)
      return;

    var eventDate = new Date(eventDate.innerHTML);

    // Format and display the date
    var timezone = (String(String(eventDate).split("(")[1]).split(")")[0]);
    var d = eventDate.toLocaleDateString();
    var t = eventDate.toLocaleTimeString();
    t = t.replace(/\u200E/g, '');
    t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
    $('.event-day').text(d);
    $('.event-time').text(t);
    $('.event-timezone').text(timezone);
    
  }  
};

$(function() {
  app.devnation2016.processDate();
});
