app.video = app.video || {};

app.video.fetchRelated = function() {
  $('[data-similar-videos]').each(function() {
    var $el = $(this);
    var productId = $el.data('similar-videos');

    if(!productId) {
      $el.prev('h2').remove();
      $el.remove();
      return;
    }

    var url = app.dcp.url.search + "/developer_materials?newFirst=true&project="+ productId + "&sys_type=video";
    $.getJSON(url,function(data){
      if(data.hits.hits) {
        app.video.displayRelated($el, data.hits.hits.slice(0,14));
      } else {
        $el.remove();
      }
    });
  });
}

app.video.displayRelated = function($el, videos) {
  var html = '';

  var html = videos.map(function(video) {

    var videoUrl = video.fields.sys_url_view[0].replace(/^.*\/video/, app.baseUrl + "/video");
    var li = [
      '<li>',
        '<a href="' + videoUrl + '">',
          '<img src="'+video.fields.thumbnail[0]+'">',
          '<h4>'+video.fields.sys_title+'</h4>',
        '</a>',
        '<p class="video-speaker">'+video.fields.sys_title+'</p>',
      '</li>'].join('');
      return li;
  }).join('');

  $el.find('ul').html(html);
}

$(function() {
  app.video.fetchRelated();
});
