app.devnationLive = {
  processDate: function () {
    var eventDate = document.getElementById('hiddenDate');
    if (eventDate === null)
      return;

    var eventDate = new Date(eventDate.innerHTML);
    var timezone = (String(String(eventDate).split("(")[1]).split(")")[0]);
    var formattedDate = moment(eventDate).format('lll');

    $('.session-date').text(formattedDate + ', ' + timezone);

    var currentDate = new Date();

    if (currentDate > (eventDate.setMinutes(eventDate.getMinutes() + 90))) {
      $('.session-label').text('Our Most Recent Session...');
    } else {
      $('.session-label').text('Next Live Session');
    }
  }
};

$(function() {
  app.devnationLive.processDate();
});
