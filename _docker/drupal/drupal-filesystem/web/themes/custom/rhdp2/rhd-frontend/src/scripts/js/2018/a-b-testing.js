var app = app || {};

app.abTest = {
  swap : function (path, selector) {
     // fetch the HTML
     var url = app.baseUrl + '/' + path;
     $.get(url)
      .then(function(html) {
        $(selector).html(html);
      });
  }
};

// To run - this code would go inside Adobe Target
// You can open your console and run it to try it out

// $(function() {
//   app.abTest.swap('heros/hero2', '.homepage-main');
// });
