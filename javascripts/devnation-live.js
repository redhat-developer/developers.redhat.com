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
  var vidID = $('[data-video]').attr('data-video');
  var reg = getCookie('dn_live_'+vidID);
  if($('#GatedFormContainer').length > 0 && reg === "") {
    window.GatedFormConfig = {
      "showAdditionalFields": [],
      "hideStandardFields": [
          "First Name",
          "Last Name",
          "Work Phone",
          "Company",
          "Department",
          "Job Role",
          "Country"
      ],
      "CustomQuestions": [],
      "offer_id": "70160000000h0FPAAY",
      "language": "en",
      "NameOrder": "western",
      "ShowThanksButton": "true",
      "leadActivity": 0,
      "disableVisitorContactLookups": false
    };

    $('head').append('<script src="https://redhat.com/forms/scripts/jquery.gatedform.js"></script>');

    var obj = setInterval(function() {
        if(document.getElementById('DynamicFormThankYou')) {
            $('.flex-video').html('<iframe src="https://www.youtube.com/embed/'+vidID+'?rel=0" width="640" height="360" frameborder="0" allowfullscreen></iframe>');
            $('[data-chat='+vidID+']').html('<iframe class="embedded-chat" src="https://www.youtube.com/live_chat?v='+vidID+'&embed_domain='+window.location.href.replace(/http(s)?:\/\//,'').split('/')[0]+'"></iframe>');
            document.cookie = 'dn_live_'+vidID+'=true';
            clearInterval(obj);
        }
    }, 250)
  } else { 
    $('.flex-video').html('<iframe src="https://www.youtube.com/embed/'+vidID+'?rel=0" width="640" height="360" frameborder="0" allowfullscreen></iframe>');
    $('[data-chat='+vidID+']').html('<iframe class="embedded-chat" src="https://www.youtube.com/live_chat?v='+vidID+'&embed_domain='+window.location.href.replace(/http(s)?:\/\//,'').split('/')[0]+'"></iframe>');
  }
});

function getCookie( name ) {
  var re = new RegExp('(?:(?:^|.*;\\s*)'+name+'\\s*\\=\\s*([^;]*).*$)|^.*$');
  return document.cookie.replace(re, "$1");
}