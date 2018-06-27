app = window.app || {};
app.middlewareBlog = {};
app.middlewareBlog.fetch = function () {
    $.getJSON(app.dcp.url.search + '/middlewareblogs?newFirst=true&from=0&size=2', function (data) {
        if (data.hits && data.hits.hits) {
            app.middlewareBlog.render(data.hits.hits);
        }
    });
};
app.middlewareBlog.render = function (materials) {
    var html = [];
    materials.forEach(function (material) {
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
    });
    $('.middleware-blog-latest').html(html.join(''));
};
$(function () {
    var $middlewareBlogResourceList = $('.middleware-blog-latest');
    if ($middlewareBlogResourceList.length) {
        app.middlewareBlog.fetch();
    }
});
