app.adaptivePlaceholder = {

  changeFilledState: function () {
    var input = $(this);
    var value = input.val();
    
    if(value != '' && value != undefined) {
      input.addClass('filled');
    } else {
      input.removeClass('filled');
    }
  }

};

$(function() {
  if ($('.rhd-adaptive-placeholder').length) {
    $('input, textarea').on('blur', app.adaptivePlaceholder.changeFilledState);
  }
});
