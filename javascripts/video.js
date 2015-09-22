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

    var url = "http://dcpbeta-searchisko.rhcloud.com/v1/rest/search?content_provider=jboss-developer&content_provider=rht&content_provider=openshift&field=sys_author&field=target_product&field=contributors&field=duration&field=github_repo_url&field=level&field=sys_contributors&field=sys_created&field=sys_description&field=sys_title&field=sys_tags&field=sys_url_view&field=thumbnail&field=sys_type&field=sys_rating_num&field=sys_rating_avg&field=experimental&project=" + productId + "&query=sys_type:(video)&size=500&sortBy=new-create";
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
    var li = [
      '<li>',
        '<a href="' + video.fields.sys_url_view + '">',
          '<img src="'+video.fields.thumbnail+'">',
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
