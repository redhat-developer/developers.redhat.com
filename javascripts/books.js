app.books = {
  getBooks : function(isbnArray) {
    var query = isbnArray.join(' OR isbn:');
    query = query.split(' ').join('+');
    var url = 'https://www.googleapis.com/books/v1/volumes?q='+ encodeURI('isbn:'+query);
    console.log(url);
    $.getJSON(url,function(books){
      var books = window.books = books.items;
      var bookTemplate = $("#bookTemplate").html();
      var html = "";
      console.log(books, bookTemplate);
      for (var i = 0; i < books.length; i++) {
        console.log(books[i]['volumeInfo']['title']);
        var template = bookTemplate.format(
          books[i]['volumeInfo']['industryIdentifiers'][0]['identifier']       // 0 - isbn
        , books[i]['volumeInfo']['previewLink']       // 1 - Preview
        , books[i]['volumeInfo']['imageLinks']['thumbnail']       // 2 - img url
        , books[i]['volumeInfo']['title']       // 3 - Title
        , books[i]['volumeInfo']['authors'].join(', ')       // 4 - Author
        , roundHalf(books[i]['volumeInfo']['averageRating'])       // 5 - Rating
        , books[i]['volumeInfo']['description'] || ""       // 6 - description
        , 'http://www.amazon.com/dp/' +  books[i]['volumeInfo']['industryIdentifiers'][0]['identifier']       // 7 - Purchase Url
        );

        // Append template to HTML
        html += template;
      };

      // Dump HTML into the document
      $('.books ul').html(html);

    });
  }
}

$(function() {
  // if we are on the books page, pull in the ISBN list
  if($('.isbnList').length) {
    var isbns = $('.isbnList').text().split(',');
    app.books.getBooks(isbns); 
  }
});