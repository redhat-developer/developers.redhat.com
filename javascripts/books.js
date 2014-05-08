app.books = {
  getBooks : function(isbnArray) {
    var html = "";
    var chunk = 5;
    for (var i = 0, j = isbnArray.length; i < j; i +=  chunk) {
      var query = isbnArray.slice(i,i + chunk).join(' OR isbn:');
      query = query.split(' ').join('+');
      var url = 'https://www.googleapis.com/books/v1/volumes?q='+ encodeURI('isbn:'+query) + '&maxResults=' + chunk;
      $.getJSON(url,function(books) {
        var bookItems = books.items;
        var bookTemplate = $("#bookTemplate").html();
        for (var k = 0; k < bookItems.length; k++) {

          var description = bookItems[k]['volumeInfo']['description'] || "";
          var shortDescription = description.substring(0,475);
          var thumbnail = ''; // TODO: We need an image made for books that don't have an image

          if(description.length > 475) {
            shortDescription+="...";
          } 

          if (bookItems[k]['volumeInfo'].hasOwnProperty('imageLinks')) {
            thumbnail = bookItems[k]['volumeInfo']['imageLinks']['thumbnail'];
          }

          var template = bookTemplate.format(
            bookItems[k]['volumeInfo']['industryIdentifiers'][0]['identifier'] // 0 - isbn
            , bookItems[k]['volumeInfo']['previewLink']                        // 1 - Preview
            , thumbnail                                                        // 2 - img url
            , bookItems[k]['volumeInfo']['title']                              // 3 - Title
            , bookItems[k]['volumeInfo']['authors'].join(', ')                 // 4 - Author
            , roundHalf(bookItems[k]['volumeInfo']['averageRating'])           // 5 - Rating
            , shortDescription                                                 // 6 - description
            , bookItems[k]['volumeInfo']['canonicalVolumeLink']                // 7 - Purchase Url
            );
          // Append template to HTML
          $('ul.book-list').append(template);
        } 
      });
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
