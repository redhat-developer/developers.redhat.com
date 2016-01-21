/* global app */

app.search = {

  abort : function() {
    // abort previous request if we are running a new one
    if(app.search.currentRequest && app.search.currentRequest.readyState !== 4) {
      app.search.currentRequest.abort();
    }
  },
  fetch :function(query) {

    // Pass search params to GTM for analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'keyword' : query });
    window.dataLayer.push({'event': 'website-search'});

    // perform ajax request
    $.ajax({
      url : app.dcp.url.search,
      dataType: 'json',
      data : {
        "field"  : ["sys_title", "sys_url_view"],
        "type" : "jbossdeveloper_website",
        "query" : query,
        "size" : 10,
        "query_highlight" : true
      },
      beforeSend : function() {
        app.search.abort();
      },
      success : function(data) {
        app.search.format(query, data.hits.hits, $('form.search .searchResults'));
      },
      error : function() {
        $('.searchResults').html("<ul>" + app.dcp.error_message + "</ul>");
      }
    });

  },
  format : function(query, results, container) {
    var suggestions = $('<ul>');
    for (var i = 0; i < results.length; i++) {
      var title = results[i].highlight && results[i].highlight.sys_title ? results[i].highlight.sys_title : results[i].fields.sys_title;
      var url = results[i].fields.sys_url_view;
      suggestions.append('<li><a href="' + url + '">'+ title  +'</a></li>');
    };
    // $('.searchResults').html(suggestions);
    container.html(suggestions);
  }

};

// binding
(function() {
  var timeOut;  
  $('form.search').on('submit',function(e){
    e.preventDefault();
  });

  // listen to key events on the search form and the buzz filter page
  $('form.search').on('keyup','input',function(e) {
    var form = $(this).parent();
    /*
      Check for enter / return key 
    */ 

    if(e.keyCode == 13) {
      var link = $('.searchResults li.active-item a');
      window.location.assign(link[0].href);
      // .click();
      return;
    }

    /*
      Check for up / down arrows
    */

    if(e.keyCode === 38 || e.keyCode === 40) {
      if(e.keyCode === 38) { // up arrow
        e.preventDefault(); // stop the cursor from going to the front of the input box
        var activeItem = form.find('.searchResults li.active-item').prev();
      }
      else { // down arrow
        var activeItem = form.find('.searchResults li.active-item').next();
      }

      // check if there is a selected item in the list
      if(!activeItem.length && e.keyCode === 40) { // nothing and down arrow
        activeItem = form.find('.searchResults li:first');
      }

      if(!activeItem.length && e.keyCode === 38) { // nothing and up arrow
        activeItem = form.find('.searchResults li:last');
      }

      $('.active-item').removeClass('active-item');
      activeItem.addClass('active-item');
    }
    
    /*
      Otherwise suggest search results
    */
    else {
      var query = $(this).val();
      if(!query) {
        $('.searchResults').html('');
        return;
      }
      clearTimeout(timeOut);
      timeOut = setTimeout(function() {
        // if it is the search form, go ahead and search
        // otherwise it is buzz, and we handle this in buzz.js
        if(form.hasClass('search')) {
          app.search.fetch(query);
        }
      }, 300);
    }
  });

  // When someone hovers over a selection, remove
  $('.searchResults').on('mouseover','li',function() {
    $('li.active-item').removeClass('active-item');
    $(this).addClass('active-item');
  });

  // when someone clicks the search result with their mouse
  $('.searchResults').on('mousedown','a',function() {
    window.location.assign(this.href);
  });

  // close the search box on mobile
  $('.search-close').on('click',function(e){
    $('form.search input').val('');
    $('.searchResults').html('');
  });

})();
