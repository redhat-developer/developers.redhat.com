var search = angular.module('search', []);

search.service('searchService', ['$http', '$q', function ($http, $q) {
    this.getSearchResults = function (params) {
        var deferred = $q.defer(),
                search = null,
                endpoint = null;

        if ((/stack-overflow/.test(window.location.href)) || (/help/.test(window.location.href))) {
            var isStackOverflow = true;
        }

        if (isStackOverflow) {
            search = Object.assign(params, {
                field: ["sys_url_view", "sys_title", "is_answered", "author", "sys_tags", "answers", "sys_created", "view_count", "answer_count", "down_vote_count", "up_vote_count", "sys_content"],
                query_highlight: true
            });
            endpoint = app.dcp.url.stackoverflow;
        }
        else {
            // fold in params with defaults
            search = Object.assign(params, {
                query_highlight: true,
                type: ['jbossdeveloper_book', 'jbossdeveloper_event', 'rht_knowledgebase_article', 'rht_knowledgebase_solution', 'stackoverflow_question', 'jbossorg_sbs_forum', 'jbossorg_blog', 'rht_website']

            });

            if (/resources/.test(window.location.href)) {
                search.type = ['jbossdeveloper_quickstart', 'jbossdeveloper_demo', 'jbossdeveloper_bom', 'jbossdeveloper_archetype', 'jbossdeveloper_example', 'jbossdeveloper_vimeo', 'jbossdeveloper_youtube', 'jbossdeveloper_book', 'rht_knowledgebase_article', 'rht_knowledgebase_solution', 'jbossorg_blog'];
            }
            endpoint = app.dcp.url.developer_materials;
        }

        $http.get(endpoint, {params: search})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    throw new Error(err);
                });
        return deferred.promise;
    }
}]);

/*
 Directive to add target=_blank to KCS and solutions
 */
search.directive('resourceType', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs.resourceType == 'solution')
                element.attr("target", "_blank");
            else
                element.attr("target", "_self");
        }
    };
});

/*
 Filter to return human readable time ago
 */
search.filter('timeAgo', function () {
    return function (timestamp) {
        if (!timestamp) return;
        var date = new Date(timestamp);
        return $.timeago(date);
    };
});

search.filter('type', function () {
    return function (sys_type) {
        var types = {
            video: 'Video',
            blogpost: 'Blog Post',
            jbossdeveloper_book: 'Book',
            book: 'Book',
            article: 'Article',
            solution: 'Article',
            demo: 'Demo',
            quickstart: 'quickstart',
            jbossdeveloper_archetype: 'Demo',
            jbossdeveloper_bom: 'Demo',
            quickstart_early_access: 'Demo',
            jbossdeveloper_example: 'Get Started',
            jbossdeveloper_event: 'Event',
            jbossorg_sbs_forum: 'Forum',
            forumthread: 'Forum',
            stackoverflow_thread: 'Stack Overflow',
            webpage: 'Webpage'
        };
        return types[sys_type];
    };
});

search.filter('MDY', function () {
    return function (timestamp) {
        if (!timestamp) return;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var date = new Date(timestamp);
        window.date = date;
        if (!!window.location.href.match(/\/search/)) {
            return " | " + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        }
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    };
});

search.filter('timestamp', function () {
    return function (timestamp) {
        var date = new Date(timestamp);
        return date.getTime();
    };
});

search.filter('wordcount', function () {
    return function (description) {
        description = description || '';
        var wordCount = 50;
        var peices = description.split(' ');
        peices = peices.slice(0, wordCount);
        return peices.join(' ') + (peices.length >= wordCount ? '…' : '');
    };
});

search.filter('icon', function () {
    return function (sys_type) {
        var icons = {
            video: 'icon-RHDev_-resources_icons_video',
            blogpost: 'icon-RHDev_-resources_icons_blogpost',
            jbossdeveloper_book: 'icon-RHDev_-resources_icons_book',
            book: 'icon-RHDev_-resources_icons_book',
            article: 'icon-RHDev_-resources_icons_article',
            solution: 'icon-RHDev_-resources_icons_article',
            demo: 'icon-RHDev_-resources_icons_demo',
            quickstart: 'icon-RHDev_-resources_icons_demo',
            jbossdeveloper_archetype: 'icon-RHDev_-resources_icons_demo',
            jbossdeveloper_bom: 'icon-RHDev_-resources_icons_demo',
            quickstart_early_access: 'icon-RHDev_-resources_icons_demo',
            jbossdeveloper_example: 'icon-RHDev_-resources_icons_getstarted'
        };
        return icons[sys_type] || icons.blog;
    };
});

search.filter('broker', function () {
    return function (url) {
        if (url && url.match('access.redhat.com')) {
            return app.dcp.url.broker + encodeURIComponent(url);
        }
        return url;
    };
});

search.filter('jbossfix', function () {
    return function (url) {
        var matcher = new RegExp('http(s)?:\/\/(www.)?jboss.org', 'gi');

        if (url && url.match(matcher)) {
            return url.replace(matcher, 'https://developer.redhat.com');
        }
        return url;
    };
});

/*
 Filter to remove undesirable tags from sys_tags
 */
search.filter('tagGroup', function () {
    return function (tag) {
        var modifiedTags = [];
        var matcher = new RegExp('feed_group_name_.*|feed_name_.*|red hat|redhat');
        angular.forEach(tag, function (value) {
            if (!value.match(matcher))
                modifiedTags.push(value)
        });
        return modifiedTags;
    };
});

search.filter('timestamp', function () {
    return function (timestamp) {
        var date = new Date(timestamp);
        return date.getTime();
    };
});

search.filter('title', ['$sce', function ($sce) {
    return function (result) {
        if (result.highlight && result.highlight.sys_title) {
            return $sce.trustAsHtml(result.highlight.sys_title[0]);
        }
        return $sce.trustAsHtml(result.fields.sys_title[0]);
    };
}]);

search.filter('description', ['$sce', function ($sce) {
    return function (result) {
        if (result.highlight && result.highlight.sys_content_plaintext) {
            return $sce.trustAsHtml(result.highlight.sys_content_plaintext[0]);
        }
        return $sce.trustAsHtml(result.fields.sys_description[0]);
    };
}]);

search.filter('question', ['$sce', function ($sce) {
    return function (result) {
        if (result.highlight && result.highlight._source.sys_content_plaintext) {
            return $sce.trustAsHtml(result.highlight._source.sys_content_plaintext[0]);
        }
        return $sce.trustAsHtml(result._source.sys_content_plaintext);
    };
}]);

search.filter('htmlToPlaintext', ['$sce', function ($sce) {
    return function (result) {
        return String(result).replace(/<[^>]+>/gm, '');
    };
}]);

/*
 Filter to remove Stack Overflow author id number from 'author'
 */
search.filter('author', ['$sce', function ($sce) {
    return function (result) {
        var authorName = result._source.author.split('-')[0];
        return authorName;
    }
}]);

/*
 Filter to make Stack Overflow question date human readable
 */
search.filter('stackDate', ['$sce', function ($sce) {
    return function (result) {
        var time = jQuery.timeago(new Date((result._source.sys_created / 1000) * 1000));
        return time;
    }
}]);

function searchCtrlFunc($scope, $window, searchService) {

    var isStackOverflow = ((/stack-overflow/.test(window.location.href)) || (/help/.test(window.location.href)));

    var isSearch = !!window.location.href.match(/\/search/);
    var searchTerm = window.location.search.split('=');
    var q = '';

    /* defaults */
    $scope.params = {
        query: q,
        size: 10,
        size10: true,
        from: 0,
        sys_type: [],
        project: '',
        newFirst: false,
        sortBy: 'relevance'
    };

    // Search Page Specifics
    if (isSearch && searchTerm) {
        $scope.params.query = decodeURIComponent(searchTerm.pop().replace(/\+/g, ' '));
    }

    // Stack Overflow Page Specifics
    if (isStackOverflow && searchTerm) {
        $scope.params.query = decodeURIComponent(searchTerm.pop().replace(/\+/g, ' '));
        $scope.params.tag = [];
    }

    $scope.paginate = {
        currentPage: 1
    };

    $scope.loading = true;

    $scope.resetPagination = function () {
        $scope.params.from = 0; // start on the first page
        $scope.paginate.currentPage = 1;
    };

    /*
     Clean Params
     */

    $scope.cleanParams = function (p) {
        var params = Object.assign({}, p);

        // if "custom" is selected, remove it
        if (params.publish_date_from && params.publish_date_from === 'custom') {
            params.publish_date_from = params.publish_date_from_custom;
        } else {
            delete params.publish_date_from_custom;
            delete params.publish_date_to;
        }

        if (params.sortBy == "relevance") {
            params.newFirst = false;
        } else {
            params.newFirst = true;
        }

        delete params.sortBy;

        // if relevance filter is turned on making newFirst == false, remove it entirely
        if (params.newFirst == false) {
            delete params.newFirst;
        }

        // delete old size params
        ['10', '25', '50', '100'].forEach(function (size) {
            delete params['size' + size];
        });

        // use the size10=true format
        params['size' + params.size] = true;

        if (isStackOverflow != true) {
            delete params.size;
        }

        // return cleaned params
        return params;
    };

    $scope.updateSearch = function () {
        $scope.loading = true;
        $scope.query = $scope.params.query; // this is static until the update re-runs
        $scope.tag = $scope.params.tag; // this is static until the update re-runs
        var product = null, tags = null;

        var params = $scope.cleanParams($scope.params);

        // if Sort by filter selection changed from New First to Most Recent, remove newFirst flag
        if (params.sortBy == "relevance") {
            delete params.newFirst;
        }

        if (isSearch) {
            var searchPage = $window.location.protocol + '//' + $window.location.hostname + ($window.location.port ? (':' + $window.location.port) : '') + $window.location.pathname;
            history.pushState($scope.params, $scope.params.query, searchPage + '?q=' + $scope.params.query);
        }

        if (isStackOverflow) {
            if (/help/.test(window.location.href)) {
                product = (window.location.href).split("/")[4];
                $scope.params.product = product;

                tags = app.products[product]['stackoverflow'];
                params.tag = tags.slice();

            }

            else {
                product = $('select[name="filter-by-product"]').val();
                $scope.params.product = product;

                if (product !== "") {
                    tags = app.products[product]['stackoverflow'];
                    params.tag = tags.slice();
                }
                var page = $window.location.protocol + '//' + $window.location.hostname + ($window.location.port ? (':' + $window.location.port) : '') + $window.location.pathname;
                history.pushState($scope.params, params.tag, page + '?q=' + params.tag);
            }
        }

        searchService.getSearchResults(params).then(function (data) {
            $scope.results = data.hits.hits;
            $scope.totalCount = data.hits.total;
            $scope.params.product = product;
            $scope.buildPagination(); // update pagination
            $scope.loading = false;
        });
    };

    /*
     Handle Pagination
     */
    $scope.buildPagination = function () {
        var page = $scope.paginate.currentPage;
        var pages = Math.ceil($scope.totalCount / $scope.params.size);
        var lastVisible = parseFloat($scope.params.size) + $scope.params.from;

        if ($scope.totalCount < lastVisible) {
            lastVisible = $scope.totalCount;
        }

        $scope.paginate = {
            currentPage: page,
            pagesArray: app.utils.diplayPagination(page, pages, 4),
            pages: pages,
            lastVisible: lastVisible
        };
    };

    /*
     Pagination goTo
     */

    $scope.goToPage = function (page) {

        switch (page) {
            case 'first':
                page = 1;
                break;
            case 'prev':
                page = $scope.paginate.currentPage - 1;
                break;
            case 'next':
                page = $scope.paginate.currentPage + 1;
                break;
            case 'last':
                page = Math.ceil($scope.totalCount / $scope.params.size);
                break;
            default:
                break;
        }

        if (typeof page !== 'number') return;

        $scope.params.from = (page * $scope.params.size) - $scope.params.size;
        $scope.paginate.currentPage = page;
        $scope.updateSearch();
    };


    $scope.toggleSelection = function toggleSelection(event) {

        var checkbox = event.target;
        var topicNames = checkbox.value.split(' ');

        if (checkbox.checked) {
            // Add - allow for multiple checks
            // $scope.params.sys_type = $scope.params.sys_type.concat(topicNames);
            // Replace - only allow one thing to be checked
            $scope.params.sys_type = topicNames;
        }
        else {
            topicNames.forEach(function (topic) {
                var idx = $scope.params.sys_type.indexOf(topic);
                $scope.params.sys_type.splice(idx, 1);
            });
        }
        // re run the search and reset pagination
        $scope.updateSearch();
        $scope.resetPagination();
    };

    $scope.updateSearch();
}

search.controller('SearchController', ['$scope', '$window', 'searchService', searchCtrlFunc]);

