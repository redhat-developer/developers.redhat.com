/*
  Latest Component
  Shows up on the home page
*/

app = window.app || {};

app.latest = {};

app.latest.fetch = function() {
  $.getJSON(app.dcp.url.search + '/resources?newFirst=true&size10=true',function(data){
    if(data.hits && data.hits.hits) {
      app.latest.render(data.hits.hits);
    }
  });
}

app.latest.render = function(materials) {
  var html = [];
  materials.forEach(function(material){
    var type = material.fields.sys_type[0];
    var timeStamp = new Date(material.fields.sys_created[0]);
    var timeAgo = $.timeago(timeStamp);
    var item = [
      '<li>',
        '<i class="icon-RHDev_-resources_icons_'+ type +'"></i>',
        '<a href="' + material.fields.sys_url_view[0] + '" class="title">',
          material.fields.sys_title[0],
          '<p class="date">',
            timeAgo,
          '</p>',
        '</a>',
      '</li>'
    ].join('');

    html.push(item);
  });

  $('.homepage-resources-latest').html(html.join(''));
}

$(function() {
  var $latestResourceList = $('.homepage-resources-latest');
  // check if we are on a page that needs this to run
  if($latestResourceList.length) {
    app.latest.fetch();
  }
});
