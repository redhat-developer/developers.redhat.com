jQuery(function() {

    var href = window.location.href.split('#')[0];

    var topicPages = ['/containers', '/devops', '/enterprise-java', '/iot', '/microservices', '/mobile', '/web-and-api-development', '/dotnet', '/security/'];
    var communityPages = ['/blog', '/events', '/projects', '/community/contributor'];
    var helpPages = ['/stack-overflow', '/forums', '/resources'];

    var tLength = topicPages.length;
    var cLength = communityPages.length;
    var hLength = helpPages.length;

    while (tLength--) {
        if (href.indexOf(topicPages[tLength]) !== -1 && href.indexOf('/products') < 0) {
            jQuery('.sub-nav-topics').addClass('active');
        }
    }
    while (cLength--) {
        if (href.indexOf(communityPages[cLength]) !== -1) {
            jQuery('.sub-nav-community').addClass('active');
        }
    }

    while (hLength--) {
        if (href.indexOf(helpPages[hLength]) !== -1) {
            jQuery('.sub-nav-help').addClass('active');
        }
    }

    if (href.indexOf('/products') !== -1){
        jQuery('.sub-nav-products').addClass('active');
    }

    if (href.indexOf('/downloads') !== -1){
        jQuery('.sub-nav-downloads').addClass('active');
    }

});