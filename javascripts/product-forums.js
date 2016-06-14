/*
  Latest Discussions (Forums) Component
  Shows up on product's help page
*/

app = window.app || {};

app.productForums = {};

app.productForums.fetch = function() {
  
  var productId = $('.product-forums').data('tags');
  console.log("productId: " + productId);

  // $.getJSON(app.dcp.url.search + '/forum_threads_by_project?project=' + productId,function(data){
  $.getJSON('http://dcp2.jboss.org/v2/rest/search/forum_threads_by_project?project=' + productId,function(data){
    if(data.hits && data.hits.hits) {
      app.productForums.render(data.hits.hits);
    }
    if(data.hits.total != 0){
      document.getElementById("forumsContainer").style.display = "block";
    }
  });
}

app.productForums.render = function(materials) {
  
  var resultNum = 4;

  // checks if using two-column layout
  if ($('.multi-column').length){
    resultNum = 8;
  }
  materials = materials.slice(0,resultNum);
  var html = [];
  materials.forEach(function(material){
    // var type = material.fields.sys_type[0];
    var timeStamp = new Date(material.fields.sys_last_activity_date[0]);
    var formattedDate = moment(timeStamp).format('ll');
    var item = [
      '<li>',
        '<h5>',
          '<a href="' + material.fields.sys_url_view[0] + '" class="qtn-title" target="_blank">',
            material.fields.sys_title[0],
          '</a>',
        '<h5>',
        '<p>',
          '<span class="replies">' + material.fields.replies_count + ' replies</span>',
          '<span class="date right">Last reply on ' + formattedDate + '</span>',
        '</p>',
      '</li>'
    ].join('');

    html.push(item);
  });

  $('.product-forums-latest').html(html.join(''));
}

$(function() {
  var $latestResourceList = $('.product-forums-latest');
  // check if we are on a page that needs this to run
  if($latestResourceList.length) {
    app.productForums.fetch();
  }
});
