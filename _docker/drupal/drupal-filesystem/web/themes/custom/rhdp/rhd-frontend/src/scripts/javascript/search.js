var search = angular.module('search', ['ngSanitize']),
  searchRefinement = [];

function indexOfObjectValueInArray(arr, key, val) {
  idx = -1;
  for(var i=0, l=arr.length; i<l; i++) {
    if(arr[i][key] && arr[i][key] === val) { idx = i; }
  }
  return idx;
}

/*
  Create a service for fetching materials
*/
search.service('searchService',['$http', '$q', function($http, $q) {
  this.getSearchResults = function(params) {
    var deferred = $q.defer();

    if ((/stack-overflow/.test(window.location.href)) || (/help/.test(window.location.href))) {
      var isStackOverflow = true;
    }

    if (isStackOverflow) {
      var search = Object.assign(params, {
        field: ["sys_url_view", "sys_title", "is_answered", "author", "sys_tags", "answers", "sys_created", "view_count", "answer_count", "down_vote_count", "up_vote_count", "sys_content"],
        query_highlight: true
      });
      var endpoint = app.dcp.url.stackoverflow;
    }
    else {
      // fold in params with defaults
      var search = Object.assign(params, {
        query_highlight: true,
        type: ['rht_website', 'jbossdeveloper_quickstart', 'jbossdeveloper_demo', 'jbossdeveloper_bom', 'jbossdeveloper_archetype', 'jbossdeveloper_example', 'jbossdeveloper_vimeo', 'jbossdeveloper_youtube', 'jbossdeveloper_book', 'jbossdeveloper_event', 'rht_knowledgebase_article', 'rht_knowledgebase_solution', 'stackoverflow_question', 'jbossorg_sbs_forum', 'jbossorg_blog', 'rht_apidocs']
      });
      var endpoint = app.dcp.url.developer_materials;
    }

    $http.get(endpoint, { params: search })
      .success(function(data) {
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
    link: function(scope, element, attrs) {
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
search.filter('timeAgo', function() {
  return function(timestamp) {
    if (!timestamp) return;
    var date = new Date(timestamp);
    return $.timeago(date);
  }
});

search.filter('type', function() {
  return function(sys_type) {
    var types = {
      video: 'Video',
      blogpost: 'Blog Post',
      book: 'Book',
      article: 'Article',
      solution: 'Article',
      demo: 'Demo',
      event: 'Event',
      quickstart: 'Quickstart',
      quickstart_early_access: 'Demo',
      forumthread: 'Forum Thread',
      stackoverflow_thread: 'Stack Overflow',
      webpage: 'Webpage',

      jbossdeveloper_quickstart: 'Quickstart',
      jbossdeveloper_demo: 'Demo',
      jbossdeveloper_bom: 'Bom',
      jbossdeveloper_archetype: 'Archetype',
      jbossdeveloper_example: 'Demo',
      jbossdeveloper_vimeo: 'Video',
      jbossdeveloper_youtube: 'Video',
      jbossdeveloper_book: 'Book',
      jbossdeveloper_event: 'Event',
      rht_knowledgebase_article: 'Article',
      rht_knowledgebase_solution: 'Article',
      stackoverflow_question: 'Stack Overflow',
      jbossorg_sbs_forum: 'Forum Thread',
      jbossorg_blog: 'Blog Post',
      rht_website: 'Website',
      rht_apidocs: 'Docs & APIs'
    }
    return types[sys_type];
  }
});

search.filter('MDY', function() {
  return function(timestamp) {
    if (!timestamp) return;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date(timestamp);
    var date = new Date([d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate()].join('-'));
    window.date = date;
    if (!!window.location.href.match(/\/search/)) {
      return " | " + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    };
    return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
  }
});

search.filter('timestamp', function() {
  return function(timestamp) {
    var date = new Date(timestamp);
    return date.getTime();
  }
});

search.filter('wordcount', function() {
  return function(description) {
    description = description || '';
    var wordCount = 50;
    var peices = description.split(' ');
    peices = peices.slice(0,wordCount);
    return peices.join(' ') + (peices.length >= wordCount ? '…' : '');
  }
});

search.filter('icon', function() {
  return function(sys_type) {
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
    }
    return icons[sys_type] || icons.blog;
  }
});

search.filter('broker', function() {
  return function(url) {
    if (url && url.match('access.redhat.com')) {
      return app.dcp.url.broker + encodeURIComponent(url);
    }
    return url;
  }
});

search.filter('jbossfix', function() {
  return function(url) {
    var matcher = new RegExp('http(s)?:\/\/(www.)?jboss.org','gi');

    if (url && url.match(matcher)) {
      return url.replace(matcher,'https://developer.redhat.com')
    }
    return url;
  }
});

/*
 Filter to remove undesirable tags from sys_tags
 */
search.filter('tagGroup', function() {
  return function(tag) {
    var modifiedTags = [];
    var matcher = new RegExp('feed_group_name_.*|feed_name_.*|red hat|redhat')
    angular.forEach(tag, function(value) {
      if (!value.match(matcher))
        modifiedTags.push(value)
    });
    return modifiedTags;
  }
});

search.filter('title', ['$sce', function($sce) {
  return function(result) {
    if (result.highlight && result.highlight.sys_title) {
      return $sce.trustAsHtml(result.highlight.sys_title[0]);
    }
    return $sce.trustAsHtml(result.fields.sys_title[0]);
  }
}]);

search.filter('description', ['$sce', '$sanitize', function($sce, $sanitize) {
  return function(result) {
    var description = "";

    if (result.highlight && result.highlight.sys_content_plaintext) {
      description = result.highlight.sys_content_plaintext.join('...');
    } else if (result.highlight && result.highlight.sys_description) {
      description = result.highlight.sys_description[0];
    } else if (!result.highlight && result.fields.sys_content_plaintext) {
      description = result.fields.sys_content_plaintext[0];
    } else {
      description = result.fields.sys_description[0];
    }
    return description;
  }
}]);


search.filter('question', ['$sce', function($sce) {
  return function(result) {
    if (result.highlight && result.highlight._source.sys_content_plaintext) {
      return $sce.trustAsHtml(result.highlight._source.sys_content_plaintext[0].replace(/<[^>]+>/gm, ''));
    }
    return $sce.trustAsHtml(result._source.sys_content_plaintext.replace(/<[^>]+>/gm, ''));
  }
}]);

search.filter('htmlToPlaintext', ['$sce', function($sce) {
  return function(result) {
    return String(result).replace(/<[^>]+>/gm, '');
  }
}]);

/*
 Filter to remove Stack Overflow author id number from 'author'
 */
search.filter('author', ['$sce', function($sce) {
  return function(result) {
    var authorName = result._source.author.split('-')[0];
    return authorName;
  }
}]);

/*
 Filter to make Stack Overflow question date human readable
 */
search.filter('stackDate', ['$sce', function($sce) {
  return function(result) {
    var time = jQuery.timeago(new Date((result._source.sys_created / 1000) * 1000));
    return time;
  }
}]);

search.controller('SearchController', ['$scope','$window', 'searchService', searchCtrlFunc]);

function searchCtrlFunc($scope, $window, searchService) {

  var isStackOverflow = ((/stack-overflow/.test(window.location.href)) || (/help/.test(window.location.href)));
  var isSearch = !!window.location.href.match(/\/search/);
  var searchTerm = window.location.search.split('=');
  var isFirstSearch = true;
  var q = '';

  $scope.data = {};
  $scope.filter = {}; // stores util functions

  /* defaults */
  $scope.params = {
    sys_type: [],
    project: '',
    sortBy: 'relevance',
    size: 10,
    query: q,
    size10: true,
    from: 0,
    newFirst: false
  };

  $scope.$watch('params', function(newVal, oldVal) {
    var idx;
    if(newVal === oldVal) { return; }
    else {
      if (newVal.project !== oldVal.project) {
        idx = indexOfObjectValueInArray(searchRefinement,'refinementType','product');
        if(idx < 0) {
          searchRefinement.push({refinementType: 'product', refinementValue: $scope.params.project });
        } else {
          if($scope.params.project.length > 0) {
            searchRefinement[idx].refinementValue = $scope.params.project;
          } else {
            searchRefinement = searchRefinement.splice(i,1);
          }
        }
      }
      if (newVal.sortBy !== oldVal.sortBy) {
        idx = indexOfObjectValueInArray(searchRefinement,'refinementType','sort'); 
        if(idx < 0) {
          searchRefinement.push({refinementType: 'sort', refinementValue: $scope.params.sortBy }); 
        } else {
          if ($scope.params.sortBy.length > 0) {
            searchRefinement[idx].refinementValue = $scope.params.sortBy;
          } else {
            searchRefinement = searchRefinement.splice(i,1);
          }
        }
      }
      if (newVal.publish_date_from !== oldVal.publish_date_from) { 
        idx = indexOfObjectValueInArray(searchRefinement,'refinementType','publish date');
        if(idx < 0) {
          searchRefinement.push({refinementType: 'publish date', refinementValue: $scope.params.publish_date_from });
        } else {
          if($scope.params.publish_date_from.length > 0) {
            searchRefinement[idx].refinementValue = $scope.params.publish_date_from;
          } else {
            searchRefinement = searchRefinement.splice(i,1);
          }
        } 
      }
      if (newVal.sys_type[0] !== oldVal.sys_type[0]) { 
        idx = indexOfObjectValueInArray(searchRefinement,'refinementType','sys_type');
        if(idx < 0) {
          searchRefinement.push({refinementType: 'sys_type', refinementValue: $scope.params.sys_type[0]});
        } else {
          if($scope.params.sys_type[0].length > 0) {
            searchRefinement[idx].refinementValue = $scope.params.sys_type[0];
          } else {
            searchRefinement = searchRefinement.splice(i,1);
          }
        }
      }
    }
  }, true)

  // Search Page Specifics
  if (isSearch && searchTerm) {
    $scope.params.filter_out_excluded = true;
    $scope.params.query = decodeURIComponent(searchTerm.pop().replace(/\+/g,' '));
  }

  // Stack Oveflow Page Specifics
  if (isStackOverflow && searchTerm) {
    var selectedProduct = $window.location.hash.replace('#!q=','');
    $scope.params.product = selectedProduct;
    $scope.params.tag = [];
  }

  $scope.paginate = {
    currentPage: 1
  };

  $scope.loading = true;

  $scope.resetPagination = function() {
    $scope.params.from = 0; // start on the first page
    $scope.paginate.currentPage = 1;
  };


  /*
    Clean Params
  */
  $scope.cleanParams = function(p) {
      var params = Object.assign({}, p);

      // if "custom" is selected, remove it
      if (params.publish_date_from && params.publish_date_from === 'custom') {
        params.publish_date_from = params.publish_date_from_custom;
      } else {
        delete params.publish_date_from_custom;
        delete params.publish_date_to;
      }
      
      if (params.sortBy === "relevance") {
        params.newFirst = false;
      }
      else{
        params.newFirst = true;
      }

      delete params.sortBy;

      // if relevance filter is turned on making newFirst == false, remove it entirely
      if (params.newFirst === false) {
        delete params.newFirst;
      }

      // delete old size params
      ['10', '25', '50', '100'].forEach(function(size) {
        delete params['size' + size];
      });

      // use the size10=true format
      params['size'+params.size] = true;

      if (isStackOverflow != true) {
        delete params.size;
      }

      // return cleaned params
      return params;
  };


  $scope.updateSearch = function() {

    $scope.loading = true;
    $scope.query = $scope.params.query; // this is static until the update re-runs
    $scope.tag = $scope.params.tag; // this is static until the update re-runs

    var params = $scope.cleanParams($scope.params);

    // if Sort by filter selection changed from New First to Most Recent, remove newFirst flag
    if (params.sortBy === "relevance") {
      delete params.newFirst;
    }

    if (isSearch) {
      var searchPage = $window.location.protocol + '//' + $window.location.hostname + ($window.location.port ? (':' + $window.location.port) : '') + $window.location.pathname;
      history.pushState($scope.params,$scope.params.query, searchPage + '?q=' + $scope.params.query);
    }
    
    if (isStackOverflow) {
      if (window.location.href.indexOf('products') >= 0 && window.location.href.indexOf('help') >= 0) {
        if ($('#stackOverflowProduct').length) {
          var product = $('#stackOverflowProduct').data('product');
        } else {
          product = (window.location.href).split("/")[4];
        }

        $scope.params.product = product;

        var tags = app.products[product]['stackoverflow'];
          if(tags.AND){
              params.tag = tags.AND.tag_set_one.slice();
              params.tags_and_logic = tags.AND.tag_set_two.slice();
          }
          else{
              params.tag = tags.slice();
          }
      }
      
      else {
        var product = $('select[name="filter-by-product"]').val();

        if (params.product !== "") {
          product = params.product;
          var tags = app.products[product]['stackoverflow'];
          if(tags.AND){
              params.tag = tags.AND.tag_set_one.slice();
              params.tags_and_logic = tags.AND.tag_set_two.slice();
          }
          else{
              params.tag = tags.slice();
          }
        }
        window.location.hash = "#!q=" + params.product;
      }
    }

    if (!$scope.userFilters && $scope.data.restoredPage) {
      history.pushState("", document.title, window.location.pathname);
    }
    
    searchService.getSearchResults(params).then(function(data) {
      var digitalData = digitalData || {page: {listing : {}, category: {}}, event: []},
      types = {
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
      },
      ddSearchEvent = {
        eventInfo: {
          eventName: 'internal search',
          eventAction: 'search',
          listing: {
            browseFilter:  types[$scope.params.sys_type[0]] || "internal search",
            query: $scope.params.query,
            queryMethod: "system generated",
            resultCount: data.hits.total,
            resultsShown: $scope.params.size,
            searchType: digitalData.page.category.primaryCategory || "",
            refinement: searchRefinement
          },
          timeStamp: new Date(),
          processed: {
            adobeAnalytics: false
          }
        }
      };

      if (!isFirstSearch) {
        ddSearchEvent.eventInfo.listing.listSorting = [{
          sortAttribute: $scope.params.sortBy,
          sortOrder: "descending"
        }];

        ddSearchEvent.eventInfo.listing.queryMethod =  $scope.params.query === "" ? "system generated" : "manual";
      } else {
        isFirstSearch = false;
      }

      digitalData.event.push(ddSearchEvent);
      digitalData.page.listing = ddSearchEvent.eventInfo.listing;
      sendCustomEvent('ajaxSearch');

      $scope.results = data.hits.hits;
      $scope.totalCount = data.hits.total;
      // $scope.params.product = product;
      $scope.buildPagination(); // update pagination
      $scope.loading = false;
    });
  };

  $scope.filter.restore = function() {

    // if we do not have a window hash, skip restoring
    if (!window.location.hash) {
      $scope.updateSearch(); // run with no filters
      return;
    }

    // if URL contains filter params, adds them to $scope.params
    if (window.location.hash) {

      var hashFilters = window.location.hash.replace('#!','');
      $scope.userFilters = deparam(hashFilters);

      switch (true) {
        case $scope.userFilters.type === "blog_posts":
          $scope.params.sys_type = "blogpost";
          break;
        case $scope.userFilters.type === "book":
          $scope.params.sys_type = ["jbossdeveloper_book", "book"];
          break;
        case $scope.userFilters.type === "code_artifact":
          $scope.params.sys_type = ["demo", "quickstart", "jbossdeveloper_archetype", "jbossdeveloper_bom", "quickstart_early_access"];
          break;
        case $scope.userFilters.type === "get_started":
          $scope.params.sys_type = "jbossdeveloper_example";
          break;
        case $scope.userFilters.type === "article_solution":
          $scope.params.sys_type = ["solution", "article"];
          break;
        case $scope.userFilters.type === "video":
          $scope.params.sys_type = "video";
          break;
        default:
          break;
      }

      if ($scope.userFilters.product) {
        $scope.params.project = $scope.userFilters.product;
      }
      if ($scope.userFilters.q) {
        $scope.params.query = $scope.userFilters.q;
      }
      if ($scope.userFilters.publish_date_from) {
        $scope.params.publish_date_from = $scope.userFilters.publish_date_from;
      }
      if ($scope.userFilters.publish_date_from_custom) {
        $scope.params.publish_date_from_custom = $scope.userFilters.publish_date_from_custom;
      }
      if ($scope.userFilters.publish_date_to) {
        $scope.params.publish_date_to = $scope.userFilters.publish_date_to;
      }
      if ($scope.userFilters.sort) {
        $scope.params.sortBy = $scope.userFilters.sort;
      }
      if ($scope.userFilters.size) {
        $scope.params.size = $scope.userFilters.size;
      }
    }
    $scope.data.restoredPage = true;
    $scope.updateSearch();
  }

  /*
   When a filter is selected, renames filters and adds them to the URL
   */
  $scope.urlFilters = function(){

      var filterParams = {};

      switch (true) {
        case $scope.params.sys_type.includes("blogpost"):
          filterParams.type = "blog_posts";
          break;
        case $scope.params.sys_type.includes("jbossdeveloper_book") || $scope.params.sys_type.includes("book"):
          filterParams.type = "book";
          break;
        case $scope.params.sys_type.includes("demo") || $scope.params.sys_type.includes("quickstart") || $scope.params.sys_type.includes("jbossdeveloper_archetype") || $scope.params.sys_type.includes("jbossdeveloper_bom") || $scope.params.sys_type.includes("quickstart_early_access"):
          filterParams.type = "code_artifact";
          break;
        case $scope.params.sys_type.includes("jbossdeveloper_example"):
          filterParams.type = "get_started";
          break;
        case $scope.params.sys_type.includes("solution") || $scope.params.sys_type.includes("article"):
          filterParams.type = "article_solution";
          break;
        case $scope.params.sys_type.includes("video"):
          filterParams.type = "video";
          break;
        default:
          break;
      }

      if ($scope.params.query) {
        filterParams.q = $scope.params.query;
      } 
      if ($scope.params.project) {
        filterParams.product = $scope.params.project;
      }
      if ($scope.params.publish_date_from) {
        filterParams.publish_date_from = $scope.params.publish_date_from;
      }
      if ($scope.params.publish_date_from_custom) {
        filterParams.publish_date_from_custom = $scope.params.publish_date_from_custom;
      }
      if ($scope.params.publish_date_to) {
        filterParams.publish_date_to = $scope.params.publish_date_to;
      }
      if ($scope.params.size10 === false) {
        filterParams.size10 = $scope.params.size10;
      }
      if ($scope.params.from > 0) {
        filterParams.from = $scope.params.from;
      }
      if ($scope.params.sortBy === "relevance") {
        filterParams.sort = $scope.params.sortBy;
      }
      if ($scope.params.size > 10) {
        filterParams.size = $scope.params.size;
      }
      window.location.hash = "!" + $.param(filterParams);
      return filterParams;
  };

  /*
   Handle Pagination
   */
  $scope.buildPagination = function() {

    var page = $scope.paginate.currentPage;

    var startAt = (page * $scope.totalCount) - $scope.params.size;
    var endAt = page * $scope.params.size;
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
  $scope.goToPage = function(page) {

    switch(page) {
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

  /*
    Pagination scrollPosition - scroll to specific location on pagination button click
  */
  $scope.scrollPosition = function(page) {
    if (isSearch) {
      $(window).scrollTop(0);
    }
    if (!isSearch) {
      var element = document.getElementById("scrollPoint");
      element.scrollIntoView();          
    }
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

      // check for single string sys_type
      if (typeof $scope.params.sys_type === "string") {
        // convert to array with 1 item
        var filterArr = [];
        filterArr.push($scope.params.sys_type);
        $scope.params.sys_type = filterArr;
      }

      topicNames.forEach(function(topic) {
        var idx = $scope.params.sys_type.indexOf(topic);
        $scope.params.sys_type.splice(idx, 1);
      });
    }
    // re run the search and reset pagination
    $scope.updateSearch();
    $scope.resetPagination();
  };

  /*
    Get latest materials on page load
  */
  $scope.updateSearch();
}
