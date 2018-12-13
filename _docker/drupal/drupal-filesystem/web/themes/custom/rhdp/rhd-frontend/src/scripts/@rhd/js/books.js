app.books = {
  supportsLocalStorage: function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  },
  restoreFilter: function(hashParams) {
    /* Restore the form values previously stored in local storage. */
    if(!this.supportsLocalStorage() ) {
      return;
    }

    var filterKeys = [
      "keyword",
    ];
    
    var hashParams = hashParams || app.utils.getParametersFromHash();

    $.each(filterKeys, function(idx, key) {
      // check if we have a hash value, if not use localstorage
      if($.isEmptyObject(hashParams)) {
        var formValue = window.localStorage.getItem("booksFilter." + key);
      }
      else {
        var formValue = hashParams[key];
      }

      // check if value was set to undefined string, if so, clear it out.
      if(formValue === 'undefined') {
        formValue = '';
      }
      /*
       * Restore the value of the form input field.
       */
      if(formValue) {
        switch(key) {
          case "keyword" :
            $('input[name="filter-text"]').val(formValue).trigger('change');
            break;
        }
      }
    });
  },
  performFilter : function() {
    // @TODO This app.templates variable should be null since the Slim template
    // doesn't exist.
    var bookTemplate = app.templates.bookTemplate;
    var contributorTemplate = "<span class=\"contributor\" data-sys-contributor=\"<!=author!>\">" +
            "<a class=\"name link-sm\"><!=normalizedAuthor!></a>" +
          "</span>";
    $('ul.book-list').empty();

    // Set filters to an empty object if it isn't defined
    filters = typeof filters !== 'undefined' ? filters : {};

    // Set the default maxResults
    if (!maxResults) {
      //Currently the only way to specify no limit
      var maxResults = 500;
    }

    /*
      Keyword
    */
    var keyword = $('input[name="filter-text"]').val();

    $.extend(filters, {
      "keyword" : keyword,
    });

    /* Store the raw form values in local storage. */
    var formValues = {
      "keyword" : keyword,
    };
    if(this.supportsLocalStorage()) {
      $.each(formValues, function (key, val) {
        window.localStorage.setItem("booksFilter." + key, val);
      });
    }

    var currentFilters = {};

    $.each(filters, function(key, val) {
      // if its empty, remove it from the filters
      if(val.length) {
        currentFilters[key] = val;
      }
    });

    // Prep each filter
    var query = []; 

    if(currentFilters['keyword']) {
      query.push(keyword);
    }

    // append loading class to wrapper
    $("ul.book-list").addClass('loading');

    var data = {
            "field"  : ["preview_link", "thumbnail", "sys_title", "sys_contributor",  "average_rating", "sys_created", "sys_description", "sys_url_view", "isbn", "authors"],
            "query" : query,
            "size" : maxResults,
            "sys_type" : "book",
            "sortBy" : "new-create"
           };
    
    app.books.currentRequest = $.ajax({
      dataType: 'json',
      url : app.dcp.url.search,
      data: data,
      beforeSend : function() {
        // check if there is a previous ajax request to abort
        if(app.books.currentRequest && app.books.currentRequest.readyState != 4) {
          app.books.currentRequest.abort();
        }
      },
      error : function() {
        $("ul.book-list").html(app.dcp.error_message);
      }
    }).done(function(data){
      var results = data.hits.hits;
      for (var k = 0; k < results.length; k++) {
        var book = results[k].fields;
        var authors = ""
          if(!book.sys_url_view){
              book.sys_url_view = ""
          }

        if (book.sys_contributor) {
          if (book.sys_contributor.length == 1) {
            authors += "Author: ";
          } else {
            authors += "Authors: ";
          }
          for (var i = 0; i < book.sys_contributor.length; i++) {
            authors += contributorTemplate.template({"author" : book.sys_contributor[i], "normalizedAuthor" : app.dcp.getNameFromContributor( book.sys_contributor[i] ) });
            if (i < (book.sys_contributor.length -1)) {
              authors += ", ";
            }
          }
        } else if (book.authors) {
          var str = "";
          if (book.authors.length == 1) {
            authors += "Author: ";
          } else {
            authors += "Authors: ";
          }
          for (var i = 0; i < book.authors.length; i++) {
            authors += book.authors[i];
            if (i < (book.authors.length -1)) {
              authors += ", ";
            }
          }
        } 
        book.authors = authors;
        book.average_rating = roundHalf(book.average_rating) || "";
        book.sys_description = book.sys_description || "";
        if (book.sys_created) {
          var published = new Date(book.sys_created);
          var now = new Date();
          var oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
          if (published > oneYearAgo) {
            book.published = "Published: " + jQuery.timeago(published);
          } else {
            book.published = "Published: " + published.getFullYear() + "-" + published.getMonth() + "-" + published.getDate();
          }
        } else {
          book.published = "";
        }
        $('ul.book-list').append(bookTemplate.template(book));
      }
      $("ul.book-list").removeClass('loading');
    });
  }
};

// Event Listeners 
(function() {
  var timeOut;
  $('form.books-filters').on('change keyup','input, select',function(e){

    // check for a keyup 
    // then, only allows on the keyword input
    // ignores anything in below keys array
    var keys = [37,38,39,40,9,91,92,18,17,16]; // ← ↑ → ↓ tab super super alt ctrl shift
    if(e.type === "keyup" && ($(this).attr('name') !== 'filter-text' || keys.indexOf(e.keyCode) !== -1)) {
      return;
    }

    clearTimeout(timeOut);
    timeOut = setTimeout(function() {
      app.books.performFilter();
    }, 300);
  });

  $('form.books-filters').on('submit',function(e) {
    e.preventDefault();
  });

  // When the page is loaded, loop through query params and apply them
  if($('[data-set]').length) {
    // 1. Check for data-set-* attributes
    app.utils.parseDataAttributes();
  }
  else if(window.location.search && !!window.location.search.match(/_escaped_fragment/)) {
    // 2. Check for a query string 
    var hashParams = app.utils.getParametersFromHash();
    app.utils.restoreFromHash();
    app.books.restoreFilter(hashParams);
  }
  else if(window.location.hash) {
    // 3. check for a hash fragment
    app.utils.restoreFromHash();
    app.books.restoreFilter();
  }
  else if($('form.books-filters').length) {
    // 4. Check for localstorage and the books form
    app.books.restoreFilter();
  }
})();

