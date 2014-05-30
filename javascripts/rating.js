app.rating = {
  displayYour: function() {
    var num = Math.round(app.rating.your*2)/2;
    $('#your-rating').children('i[data-rating]').each(function() {
      var r = $(this).data('rating');
      if (num >= r) {
        $(this).addClass('fa-star');
        $(this).removeClass('fa-star-o');
      }
    });
    $('#your-rating').show();
  },
  initYour: function() {
    app.dm.authStatus().done(function(data) {
      if (data.authenticated) {
        var user_rating = $.ajax({
          type: 'GET',
          url: app.dcp.url.rating + '?id=' + app.rating.searchiskoId,
          xhrFields: { withCredentials: true}
        }).done(function(data) {
          if (data[app.rating.searchiskoId] && data[app.rating.searchiskoId].rating) {
            app.rating.your = data[app.rating.searchiskoId].rating;
            app.rating.displayYour(data[app.rating.searchiskoId].rating);
          }
        });
      }
    });
  },
  displayAvg: function(rating_avg, rating_count) {
    var elm = $('#avg-rating');
    elm.html(roundHalf(rating_avg)).append('<span>(' + rating_count + ')</span>');
    elm.show();
  },
  initAvg: function() {
    // We're on an item we can rate, set things to either show their rating or to rate
    if ($('#rating-section').length) {
      $.get(app.dcp.url.content +'/' + app.rating.searchiskoId.split('-').join('/'))
        .done(function(item) {
          app.rating.displayAvg(item.sys_rating_avg, item.sys_rating_num);
      });
    }
  },
  update: function(rating) {
    app.dm.authStatus().done(function(data) {
      if (data.authenticated) {
        app.rating.your = rating;
        var post = $.ajax({
          type: "POST",
          url: app.dcp.url.rating + '/' + app.rating.searchiskoId,
          xhrFields: {withCredentials: true},
          contentType: "application/json",
          data: "{\"rating\":\"" + app.rating.your + "\"}"
        });
        post.done(function(ratingData) {
          app.rating.displayAvg(ratingData.sys_rating_avg, ratingData.sys_rating_num);
          app.rating.displayYour();
        });
      } else {
        alert("Please log in to rate.");
      }
    });
  }
}

// Event Listeners 
$(function() {
  // Change star and cursor
  $('.rating').on('mouseover', function() {
    var elm = $(this), rating = $(this).prop('id').split('-')[1];
    for (var i = 1; i <= 5; i++) {
      if (i <= rating) {
        $('#rate-' + i).removeClass('fa-star-o');
        $('#rate-' + i).addClass('fa-star');
      } else {
        $('#rate-' + i).addClass('fa-star-o');
        $('#rate-' + i).removeClass('fa-star');
      }
    }
    elm.removeClass('fa-star-o');
    elm.addClass('fa-star');
    elm.css('cursor', 'pointer');
  });
  $('#your-rating').on('mouseout', function() {
    if (app.rating.your) {
      app.rating.displayYour();
    }
  });
  // rate the item
  $('.rating').on('click', function(event) {
    app.rating.update($(event.target).data('rating'));
  });
  if ($('#rating-section').length) {
    app.rating.searchiskoId = $('#rating-section').data('searchisko-id');    
    app.rating.initYour();
    app.rating.initAvg();
  }
});
