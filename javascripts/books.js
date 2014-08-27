---
interpolate: true
---
app.books = {
  unkownISBN : {
    'UOM:39076002794183' : '9781933988641'
  },
  covers : {
    "1782161341"  : '#{cdn(site.base_url + "/images/books/book_developingjavaEE6applicationsonjbossas7.jpg")}',
    "1449345158"  : '#{cdn(site.base_url + "/images/books/book_buildingmodularcloudappswithosgi.jpg")}',
    "unavailable" : '#{cdn(site.base_url + "/images/books/book_noimageavailable.jpg")}'
  },
  findCover : function(book, isbn) {
    if (book['volumeInfo'].hasOwnProperty('imageLinks')) {
      return book['volumeInfo']['imageLinks']['thumbnail'];
    }
    else if (app.books.covers[isbn]) {
      return app.books.covers[isbn];
    }
    else {
      return app.books.covers['unavailable'];
    }
  },
  getBooks : function(isbnArray) {
    var html = "";
    var chunk = 15;
    var iterations = Math.ceil(isbnArray.length / chunk); // # of ajax requests
    var iterationCount = 0; 
    var currentIteration = 0;
    var bookItems = []; // master book array
    var bookItemsHash = {}; // pseudo map of books, keyed by isbn-13

    // I hate having to iterate multiple times, but I don't see a good way around things
    for (var i = 0; i < isbnArray.length; i++) {
      bookItemsHash[isbnArray[i]] = null;
    }

    for (var i = 0, j = isbnArray.length; i < j; i +=  chunk) {
      var query = isbnArray.slice(i,i + chunk).join(' OR isbn:');
      query = query.split(' ').join('+');
      var url = 'https://www.googleapis.com/books/v1/volumes?q='+ encodeURI('isbn:'+query) + '&maxResults=' + chunk + "&orderBy=newest";
      currentIteration++;
      
      // closure for keeping the book queue while still doing async data requests
      (function(currentIteration){

        $.getJSON(url,function(books) {
          iterationCount++;
          
          // Add the book to the hash, we have to try and find the isbn-13 though to keep
          // keys consistent
          for (var i = 0; i < books.items.length; i++) {
            var ids = books.items[i].volumeInfo.industryIdentifiers;
            if (ids) {
              if (ids[0].type === "OTHER") {
                bookItemsHash[app.books.unkownISBN[ids[0].identifier]] = books.items[i];
                books.items[i].volumeInfo.isbn = ids[0].identifier;
              } else if (ids[0].type === "ISBN_13") {
                bookItemsHash[ids[0].identifier] = books.items[i];
                books.items[i].volumeInfo.isbn = ids[0].identifier;
              } else if (ids[1].type === "ISBN_13") {
                bookItemsHash[ids[1].identifier] = books.items[i];
                books.items[i].volumeInfo.isbn = ids[1].identifier;
              }
            }
          }

          // If we have all the data in order, move forward with displaying them
          if(iterations === iterationCount) {

            // flatten into one large array
            for(key in bookItemsHash){
              if (bookItemsHash[key]) {
                bookItems.push(bookItemsHash[key]);
              }
            } 

            // Make sure all the books are sorted by desc date
            bookItems.sort(function(a,b) {
              var date_a = Date.parse(a.volumeInfo.publishDate);    
              var date_b = Date.parse(b.volumeInfo.publishDate);    
              if (date_a > date_b) return -1;    
              if (date_a < date_b) return 1;    
              return 0;
            });
            app.books.bookItems = bookItems; // store for later filtering
            app.books.formatBooks(bookItems);
          }
        })
        .error(function(err){
          $('.book-list').html('<p>We are currently unable to get the list of books. Please try later.</p>');
        });

      })(currentIteration);


    }
  },
  formatBooks : function(bookItems, filterQuery) {
    var bookTemplate = $("#bookTemplate").html();
    $('ul.book-list').empty();

    if(!filterQuery || filterQuery === " ") {
      filterQuery = "";
    }

    for (var k = 0; k < bookItems.length; k++) {

      var description = bookItems[k]['volumeInfo']['description'] || "";
      var shortDescription = description.substring(0,475);
      var thumbnail = ''; 
      var isbn = bookItems[k]['volumeInfo']['isbn']; 
      var title = bookItems[k]['volumeInfo']['title'];
      var filterMatch = new RegExp("("+filterQuery+")","gi");

      if(description.length > 475) {
        shortDescription+="...";
      }

      // if there is no match on the title or desc, move onto the next
      if(!title.match(filterMatch) && !description.match(filterMatch)) {
        console.log("no match, skip it");
        continue;
      }

      if(filterQuery && filterQuery.length) {
        shortDescription = shortDescription.replace(filterMatch,'<span class="highlight">$1</span>');
        title = title.replace(filterMatch,'<span class="highlight">$1</span>');
      }

      var template = bookTemplate.format(
        isbn                                                               // 0 - isbn
        , bookItems[k]['volumeInfo']['previewLink']                        // 1 - Preview
        , app.books.findCover(bookItems[k], isbn)                          // 2 - img url
        , title                                                            // 3 - Title
        , bookItems[k]['volumeInfo']['authors'].join(', ')                 // 4 - Author
        , roundHalf(bookItems[k]['volumeInfo']['averageRating'])           // 5 - Rating
        , shortDescription                                                 // 6 - description
        , bookItems[k]['volumeInfo']['canonicalVolumeLink']                // 7 - Purchase Url
        );
      // Append template to HTML
      $('ul.book-list').append(template);
    }
  },
  init : function() {
    // if we are on the books page, pull in the ISBN list
    if($('.isbnList').length) {
      app.books.getBooks(#{JSON.dump(site.books.collect {|i,e| e['isbn']})});
    }

    $('input[name=book-filter]').on('keyup',function() {
      var el = $(this);
      var val = el.val();
      var re = new RegExp(val,"gi");

      app.books.formatBooks(app.books.bookItems,val);

    });
  }
};

app.books.init();

