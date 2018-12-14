app.connectors = {

    /**
     * Constants used to determine order of query result hits.
     *
     * @const
     */
    orderBy: {
        PRIORITY: 'priority',
        SYS_TITLE: 'sys_title'
    },

    open: function (html) {
        $('.overlay-content').html(html);
        $('body').addClass('overlay-open');
    },

    close: function () {
        $('body').removeClass('overlay-open');
        $('.overlay-content').empty();
    },

    hideCodeSnippetIfEmpty: function (snippet_elem) {
        var snippet_value = snippet_elem.find('.snippet-value');
        if (!snippet_value.val()) {
            snippet_elem.hide();
        }
    },

    hideDocsLinkIfEmpty: function (docs_elem) {
        var docs_link = docs_elem.find('.docs-link');
        var docs_link_text = docs_elem.find('.docs-link-text');
        if (!docs_link.attr("href")) {
            docs_link_text.hide();
        }
    },

    hideExtLinkIfEmpty: function (ext_elem) {
        var link_1 = ext_elem.find('.link_1');
        var link_1_text = ext_elem.find('.link_1_text');
        var link_2 = ext_elem.find('.link_2');
        var link_2_text = ext_elem.find('.link_2_text');
        if (!link_1.attr("href")) {
            link_1_text.hide();
        }
        if (!link_2.attr("href")) {
            link_2_text.hide();
        }
    },


    displayOverlay: function (e) {
        e.preventDefault();
        var overlay_content = $(this).parents('li').find('.connector-overlay-content');
        app.connectors.hideCodeSnippetIfEmpty(overlay_content.find('.connector-a'));
        app.connectors.hideCodeSnippetIfEmpty(overlay_content.find('.connector-b'));
        app.connectors.hideDocsLinkIfEmpty(overlay_content);
        app.connectors.hideExtLinkIfEmpty(overlay_content);
        app.connectors.open(overlay_content.html());  
    },
    
    orderByPriority: function(e) {
        e.preventDefault();
        var targetProductFilter = $('[data-target-product]').data('target-product');
        var thumbnailSize = this.thumbnailSize || "200x150";
        app.connectors.sort($('ul.connector-results'), thumbnailSize, app.connectors.orderBy.PRIORITY);
        $('.connectors-order a').removeClass('active');
        $('.order-priority').addClass('active');
    },

    orderByAlpha: function(e) {
        e.preventDefault();
        var targetProductFilter = $('[data-target-product]').data('target-product');
        var thumbnailSize = this.thumbnailSize || "200x150";
        app.connectors.sort($('ul.connector-results'), thumbnailSize, app.connectors.orderBy.SYS_TITLE);
        $('.connectors-order a').removeClass('active');
        $('.order-alpha').addClass('active');
    },

    /**
     *
     * @param {!HTMLElement} container
     * @param {string} thumbnailSize
     * @param {string} orderBy
     */
    sort: function (container, thumbnailSize, orderBy) {
        // append loading class to wrapper
        container.addClass('loading');

        if (orderBy == app.connectors.orderBy.SYS_TITLE) {
            container.find('.connector')
                // Sort the connector by their titles.
                .sort((a, b) => (a.dataset.connectortitle.toUpperCase() < b.dataset.connectortitle.toUpperCase()) ? -1 : (a.dataset.connectortitle.toUpperCase() > b.dataset.connectortitle.toUpperCase()) ? 1 : 0)
                .appendTo('ul.connector-results');
        }
        else if (orderBy == app.connectors.orderBy.PRIORITY) {
            container.find('.connector')
                // Sort the connectors by their priority/importance.
                .sort((a, b) => a.dataset.connectorpriority - b.dataset.connectorpriority)
                .appendTo('ul.connector-results');
        }

        container.removeClass('loading');
    },
};

$(function () {

    $('ul.connector-results').on('click','a.fn-open-connector',app.connectors.displayOverlay);
    $('ul.featured-connectors-results').on('click','a.fn-open-connector',app.connectors.displayOverlay);
    
    $('.link-list').on('click','a.order-priority',app.connectors.orderByPriority);
    $('.link-list').on('click','a.order-alpha',app.connectors.orderByAlpha);
    
    $('.overlay-close').on('click', app.connectors.close);

});
