/*
  Latest Component
  Shows up on the home page
*/

app = window.app || {};

app.latest = {};

app.latest.fetch = function() {
  $("ul.homepage-resources.homepage-resources-latest").addClass('loading');
  $.getJSON(app.dcp.url.search + '/developer_materials?newFirst=true&size10=true&stype=quickstart&stype=video&stype=demo&stype=jbossdeveloper_example&stype=jbossdeveloper_archetype&stype=jbossdeveloper_bom&stype=blogpost&stype=book&blogbyurl=developers.redhat.com' ,function(data){
    if(data.hits && data.hits.hits) {
      app.latest.render(data.hits.hits);
    }
  });
}

app.latest.render = function(materials) {
  materials = materials.slice(0,6);
  var html = [];
  materials.forEach(function(material){
    var type = material.fields.sys_type[0];
    var timeStamp = new Date(material.fields.sys_created[0]);
    var formattedDate = moment(timeStamp).format('ll')
    var item = [
      '<li>',
        '<i class="icon-RHDev_-resources_icons_'+ type +'"></i>',
        '<a href="' + material.fields.sys_url_view[0] + '" class="title">',
          material.fields.sys_title[0],
          '<p class="date">',
           formattedDate,
          '</p>',
        '</a>',
      '</li>'
    ].join('');

    html.push(item);
    $("ul.homepage-resources.homepage-resources-latest").removeClass('loading');
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
