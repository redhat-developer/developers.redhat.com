---
interpolate: true
---
app.books = {
  unkownISBN : {
    'UOM:39076002794183' : '9781933988641'
  },
  covers : {
    "1782161341" : "book_developingjavaEE6applicationsonjbossas7.jpg",
    "1449345158" : "book_buildingmodularcloudappswithosgi.jpg",
    "unavailable" : "book_noimageavailable.jpg"
  },
  findCover : function(book, isbn) {
    if (book['volumeInfo'].hasOwnProperty('imageLinks')) {
      return book['volumeInfo']['imageLinks']['thumbnail'];
    }
    else if (app.books.covers[isbn]) {
      return "#{site.base_url}/#{site.context_url}/images/books/" + app.books.covers[isbn];
    }
    else {
      return "#{site.base_url}/#{site.context_url}/images/books/" + app.books.covers['unavailable'];
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
            if (ids[0].type === "OTHER") {
              bookItemsHash[app.books.unkownISBN[ids[0].identifier]] = books.items[i];
              books.items[i].volumeInfo.isbn = ids[0].identifier;
            } else if (ids[0].type === "ISBN_13") {
              bookItemsHash[ids[0].identifier] = books.items[i];
              books.items[i].volumeInfo.isbn = ids[0].identifier;
            } else if (ids[1].type === "ISBN_13") {
              bookItemsHash[ids[1].identifier] = books.items[i];
              books.items[i].volumeInfo.isbn = ids[1].identifier;
            } else {
              console.log('can not find ISBN_13');
              console.log(books.items[i]);
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
            console.log(bookItems);

            // Make sure all the books are sorted by desc date
            bookItems.sort(function(a,b) {
              var date_a = Date.parse(a.volumeInfo.publishDate);    
              var date_b = Date.parse(b.volumeInfo.publishDate);    
              if (date_a > date_b) return -1;    
              if (date_a < date_b) return 1;    
              return 0;
            });
            app.books.formatBooks(bookItems);
          }
        });

      })(currentIteration);


    }
  },
  formatBooks : function(bookItems) {
    var bookTemplate = $("#bookTemplate").html();
    for (var k = 0; k < bookItems.length; k++) {

      var description = bookItems[k]['volumeInfo']['description'] || "";
      var shortDescription = description.substring(0,475);
      var thumbnail = ''; 
      var isbn = bookItems[k]['volumeInfo']['isbn']; 

      if(description.length > 475) {
        shortDescription+="...";
      } 

      var template = bookTemplate.format(
        isbn                                                               // 0 - isbn
        , bookItems[k]['volumeInfo']['previewLink']                        // 1 - Preview
        , app.books.findCover(bookItems[k], isbn)                          // 2 - img url
        , bookItems[k]['volumeInfo']['title']                              // 3 - Title
        , bookItems[k]['volumeInfo']['authors'].join(', ')                 // 4 - Author
        , roundHalf(bookItems[k]['volumeInfo']['averageRating'])           // 5 - Rating
        , shortDescription                                                 // 6 - description
        , bookItems[k]['volumeInfo']['canonicalVolumeLink']                // 7 - Purchase Url
        );
      // Append template to HTML
      $('ul.book-list').append(template);
    }
  }
};

$(function() {
  // if we are on the books page, pull in the ISBN list
  if($('.isbnList').length) {
    var isbns = $('.isbnList').text().trim().split(',');
    app.books.getBooks(isbns);
  }
});
