/*
  Middleware Blog component
  Shows up on /middleware
  Displays only 2 most recent blogs
*/

app = window.app || {};

app.middlewareBlog = {};

app.middlewareBlog.fetch = function() {

  // $("ul.middleware-blog.middleware-blog-latest").addClass('loading');
  $.getJSON(app.dcp.url.search + '/middlewareblogs?newFirst=true&from=0&size=2' ,function(data){
    if(data.hits && data.hits.hits) {
      app.middlewareBlog.render(data.hits.hits);
    }
  });
}

app.middlewareBlog.render = function(materials) {
  // materials = materials.slice(0,6);
  var html = [];
  materials.forEach(function(material){
    var timeStamp = new Date(material.fields.sys_created[0]);
    var timeAgo = $.timeago(timeStamp);
    var item = [
      '<li>',
        '<a href="' + material.fields.sys_url_view[0] + '" class="title">',
          material.fields.sys_title[0],
        '</a>',
        '<p class="blog-info">',
          '<span class="author">',
           material.fields.author[0],
          '</span>',
          '<span class="date">',
           timeAgo,
          '</span>',
        '</p>',
        '<p class="description">',
         material.fields.sys_description[0],
        '</p>',
      '</li>'
    ].join('');

    html.push(item);
    // $("ul.middleware-blog.middleware-blog-latest").removeClass('loading');
  });

  $('.middleware-blog-latest').html(html.join(''));
}

$(function() {
  var $middlewareBlogResourceList = $('.middleware-blog-latest');
  // check if we are on a page that needs this to run
  if($middlewareBlogResourceList.length) {
    app.middlewareBlog.fetch();
  }
});
