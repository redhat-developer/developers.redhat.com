---
interpolate: true
---
app.books = {
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
    var bookData = {};
    // master book array
    var bookItems = [];

    for (var i = 0, j = isbnArray.length; i < j; i +=  chunk) {
      var query = isbnArray.slice(i,i + chunk).join(' OR isbn:');
      query = query.split(' ').join('+');
      var url = 'https://www.googleapis.com/books/v1/volumes?q='+ encodeURI('isbn:'+query) + '&maxResults=' + chunk + "&orderBy=newest";
      currentIteration++;
      
      // closure for keeping the book queue while still doing async data requests
      (function(currentIteration){

        $.getJSON(url,function(books) {
          iterationCount++;
          bookData[currentIteration] = books.items;
          
          // If we have all the data in order, move forward with displaying them
          if(iterations === iterationCount) {
            // flatten into one large array
            for(key in bookData){
              bookItems = bookItems.concat(bookData[key]);
            } 
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
      var thumbnail = ''; // TODO: We need an image made for books that don't have an image
      var isbn = bookItems[k]['volumeInfo']['industryIdentifiers'][0]['identifier'];

      if(description.length > 475) {
        shortDescription+="...";
      } 

      var template = bookTemplate.format(
        isbn                                                               // 0 - isbn
        , bookItems[k]['volumeInfo']['previewLink']                        // 1 - Preview
        , app.books.findCover(bookItems[k], isbn)                                          // 2 - img url
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
