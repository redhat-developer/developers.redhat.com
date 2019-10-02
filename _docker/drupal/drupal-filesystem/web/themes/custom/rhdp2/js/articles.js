$(document).ready(function() {

  var nav = $('.toc.gsi-nav');
  if (!nav.length) {
    return; // Don't need to go any further there are no navigation elements
  }

  var html = '';
  var articleHeadings = $('.gsi.fetch-toc h2');

  articleHeadings.each(function() {
    var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    $(this).attr('id', replace_id);
    html += "<li><a href='#" + replace_id + "'>" + $(this).text() + "</a></li>";
  });

  nav.html(html);

});
