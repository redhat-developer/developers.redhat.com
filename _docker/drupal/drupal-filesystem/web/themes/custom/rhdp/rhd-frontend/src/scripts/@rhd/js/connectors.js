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
        app.connectors.connectorFilter(null, $('ul.connector-results'), targetProductFilter, null, app.connectors.orderBy.PRIORITY);
        $('.connectors-order a').removeClass('active');
        $('.order-priority').addClass('active');
    },

    orderByAlpha: function(e) {
        e.preventDefault();
        var targetProductFilter = $('[data-target-product]').data('target-product');
        app.connectors.connectorFilter(null, $('ul.connector-results'), targetProductFilter, null, app.connectors.orderBy.SYS_TITLE);
        $('.connectors-order a').removeClass('active');
        $('.order-alpha').addClass('active');
    },

    /**
     * Parameters 'query', 'target_product', 'orderBy' and 'featuredIDs' determine input parameters
     * for connectors query (see [1]).
     *
     * [1] https://github.com/searchisko/configuration/blob/master/data/query/connectors.md
     *
     * @param {string} query
     * @param {!HTMLElement} container
     * @param {string} target_product
     * @param {string} thumbnailSize
     * @param {string=} orderBy
     * @param {Array.<string>=} featuredIDs
     */
    connectorFilter : function(query, container, target_product, thumbnailSize, orderBy, featuredIDs) {
        var url = '/drupal/connectors';

        var request_data = {
          _format: 'json'
        };

        if (query) {
            request_data.query = query;
        }

        // append loading class to wrapper
        $("ul.connector-results").addClass('loading');

        $.ajax({
            url : url,
            dataType: 'json',
            data : request_data,
            container : container,
            thumbnailSize : thumbnailSize,
            error : function() {
                $('ul.connector-results').html(app.dcp.error_message);
            }
        }).done(function(data){
            var container = this.container || $('ul.connector-results');
            var thumbnailSize = this.thumbnailSize || "200x150";
            app.connectors.sort(data, container, thumbnailSize, orderBy);
        });
    },

    /**
     *
     * @param {*} data
     * @param {!HTMLElement} container
     * @param {string} thumbnailSize
     * @param {string} orderBy
     */
    sort: function (data, container, thumbnailSize, orderBy) {
        var html = "";

        if (orderBy) {
            if (orderBy == app.connectors.orderBy.SYS_TITLE) {
                data
                    // Sort the connector by their titles.
                    .sort((a, b) => {
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {
                          return -1;
                        }
                        else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                          return 1;
                        }

                        return 0; 
                    })
                    // Get the formatted HTML output for each sorted connector.
                    .forEach((data) => {
                        html += app.connectors.format(data, container, thumbnailSize);
                    }
                ); 
            }
            else if (orderBy == app.connectors.orderBy.PRIORITY) {
                data
                    // Sort the connectors by their priority/importance.
                    .sort((a, b) => a.field_connector_priority - b.field_connector_priority)
                    // Get the formatted HTML output for each sorted connector.
                    .forEach((data) => {
                        html += app.connectors.format(data, container, thumbnailSize);
                    }
                );
            }
        }

        container.html(html).removeClass('loading');
    },

    /**
     *
     * @param {*} data
     * @param {!HTMLElement} container
     * @param {string} thumbnailSize
     */
    format: function (data, container, thumbnailSize) {
        var html = '';
        var props = data;

        props.img_path_thumb = props.thumbnail__target_id;

        //If no 'long description', use the short one (before it is truncated)
        if (!('field_connector_long_description' in props)) {
            props.field_connector_long_description = props.field_connector_short_descriptio;
        }
        
        //Limit the short description length, in-case the source data is invalid.
        if (props.field_connector_short_descriptio.length > 150 ) {
            props.field_connector_short_descriptio = props.field_connector_short_descriptio.slice(0,146).concat(' ...');
        }
        
        //The templating fails if these values are undefined. There's probably a better way to do this.
        if (!props.code_snippet_1) {
            props.code_snippet_1 = '';
        }
        if (!props.code_snippet_2) {
            props.code_snippet_2 = '';
        }
        if (!props.more_details_url) {
            props.more_details_url = '';
        }
        if(!props.link_1_text || !props.link_1_url){
           props.link_1_text = '';
            props.link_1_url = '';
        }
        if(!props.link_2_text || !props.link_2_url){
            props.link_2_text = '';
            props.link_2_url = '';
        }

        // @TODO This app.templates variable should be null since the Slim
        // template no longer exists.
        // var connectorTemplate = app.templates.connectorTemplate;
        // html += connectorTemplate.template(props);
        html += `<li class="connector">
          <a href="#" class="fn-open-connector">
            <img src="${props.img_path_thumb}" alt="logo" class="connector-logo">
          </a>
          <h3><a href="#" class="fn-open-connector">${props.title}</a></h3>
          <p>${props.field_connector_long_description}</p>
          <div class="connector-overlay-content">
            <div class="row">
              <div class="large-7 columns">
                <img src="${props.img_path_thumb}" alt="Logo" class="connector-logo">
              </div>
              <div class="large-17 columns">
                <p>${props.field_connector_short_descriptio}</p>
                <p class="link_1_text">
                  <a href="${props.link_1_url}" class="link_1">${props.link_1_text}</a><br>
                  <a href=${props.link_2_url}"" class="link_2"${props.link_2_text}></a>
                </p>
                <p class="docs-link-text">For more details, view the <a href="${props.more_details_url}" class="docs-link">Product Documentation</a></p>
              </div>
            </div>
          </div>
        </li>`;

        return html;
    }
};


$(function () {

    $('ul.connector-results').on('click','a.fn-open-connector',app.connectors.displayOverlay);
    $('ul.featured-connectors-results').on('click','a.fn-open-connector',app.connectors.displayOverlay);
    
    $('.link-list').on('click','a.order-priority',app.connectors.orderByPriority);
    $('.link-list').on('click','a.order-alpha',app.connectors.orderByAlpha);
    
    $('.overlay-close').on('click', app.connectors.close);

    var targetProductFilter = $('[data-target-product]').data('target-product');
    var orderBy = $('[data-order-by]').data('order-by');
    
    /*
        All Connectors
     */
    var connectorResults = $('.connector-results');
    if(connectorResults.length) {
        app.connectors.connectorFilter(null, $('ul.connector-results'), targetProductFilter, null, orderBy);
    }

    
    /*
        Featured Connectors
     */
    var featuredConnectorIds = $('.featured-connector-ids');
    if(featuredConnectorIds.length) {
        var featuredIds = JSON.parse(featuredConnectorIds.text());
        if ($.isArray(featuredIds) && featuredIds.length > 0) {
            app.connectors.connectorFilter(null, $('ul.featured-connectors-results'), targetProductFilter, '500x400', null, featuredIds);
        }
    }
});

