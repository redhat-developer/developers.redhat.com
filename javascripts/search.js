var search = angular.module('search', []);

search.service('searchService',function($http, $q) {
  this.getSearchResults = function(params) {
    var deferred = $q.defer();
    // http://dcp.stage.jboss.org/v2/rest/search?size=1&field=_source&agg=per_project_counts&agg=tag_cloud&agg=top_contributors&agg=activity_dates_histogram&agg=per_sys_type_counts
    // http://docs.jbossorg.apiary.io/#reference/search-api/2restsearchqueryqueryhighlightsortbyfromsizeaggfieldcontentprovidertypesystypetagprojectactivitydateintervalactivitydatefromactivitydatetocontributor

    // fold in params with defaults
    var search = Object.assign(params, {
      // field: '_source',
      field: ['sys_url_view', 'sys_title', 'sys_last_activity_date', 'sys_description', 'sys_tags', 'sys_project', 'sys_contributor', 'sys_updated', 'sys_type', 'thumbnail', 'sys_created'],
      // Disable aggregations until ready
      // agg: ['per_project_counts','tag_cloud', 'top_contributors', 'activity_dates_histogram', 'per_sys_type_counts'],
      query_highlight: true
    });

    var endpoint = (!!window.location.pathname.match(/\/search/) ? app.dcp.url.search : app.dcp.url.developer_materials);

    $http.get(endpoint, { params: search })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function (err) {
        throw new Error(err);
      });
    return deferred.promise;
  }
});

/*
  Directive to add target=_blank to KCS and solutions
 */
search.directive('resourceType', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if(attrs.resourceType == 'solution')
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
  return function(timestamp){
    if(!timestamp) return;
    var date = new Date(timestamp);
    return $.timeago(date);
  }
});

search.filter('MDY', function() {
  return function(timestamp){
    if(!timestamp) return;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date(timestamp);
    window.date = date;
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }
});

search.filter('timestamp', function() {
  return function(timestamp){
    var date = new Date(timestamp);
    return date.getTime();
  }
});

search.filter('wordcount', function() {
  return function(description){
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
  return function(url){
    if(url && url.match('access.redhat.com')){
      return app.dcp.url.broker + encodeURIComponent(url);
    }
    return url;
  }
});

search.filter('jbossfix', function() {
  return function(url){
    var matcher = new RegExp('http(s)?:\/\/(www.)?jboss.org','gi');

    if(url && url.match(matcher)){
      return url.replace(matcher,'https://developer.redhat.com')
    }
    return url;
  }
});

/*
 Filter to remove undesirable tags from sys_tags
 */
search.filter('tagGroup', function() {
  return function(tag){
    var modifiedTags = [];
    var matcher = new RegExp('feed_group_name_.*|feed_name_.*|red hat|redhat')
    angular.forEach(tag, function(value){
      if(!value.match(matcher))
        modifiedTags.push(value)
    });
    return modifiedTags;
  }
});

search.filter('timestamp', function() {
  return function(timestamp){
    var date = new Date(timestamp);
    return date.getTime();
  }
});

search.filter('title', function($sce) {
  return function(result){
    if(result.highlight && result.highlight.sys_title) {
      return $sce.trustAsHtml(result.highlight.sys_title[0]);
    }
    return $sce.trustAsHtml(result.fields.sys_title[0]);
  }
});

search.filter('description', function($sce) {
  return function(result){
    if(result.highlight && result.highlight.sys_content_plaintext) {
      return $sce.trustAsHtml(result.highlight.sys_content_plaintext[0]);
    }
    return $sce.trustAsHtml(result.fields.sys_description[0]);
  }
});

search.controller('SearchController', ['$scope','$window', 'searchService', searchCtrlFunc]);

function searchCtrlFunc($scope, $window, searchService) {

  var isSearch = !!window.location.href.match(/\/search/);
  var searchTerm = window.location.search.split('=');
  var q = '';

  /* defaults */
  $scope.params = {
    query: q,
    sortBy: 'score',
    size: 10,
    size10: true,
    from: 0,
    sys_type: [],
    project: '',
    newFirst: true
  };

  // Search Page Specifics
  if(isSearch && searchTerm) {
    $scope.params.query = decodeURIComponent(searchTerm.pop().replace(/\+/g,' '));
    $scope.params.type = 'rht_website';
    $scope.params.newFirst = false;
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
      if(params.publish_date_from && params.publish_date_from === 'custom') {
        params.publish_date_from = params.publish_date_from_custom;
      } else {
        delete params.publish_date_from_custom;
        delete params.publish_date_to;
      }

      // if relevance filter is turned on making newFirst == false, remove it entirely
      if(params.newFirst == "false") {
        delete params.newFirst;
      }

      // delete old size params
      ['10', '25', '50', '100'].forEach(function(size){
        delete params['size' + size];
      });

      // use the size10=true format
      params['size'+params.size] = true;

      // return cleaned params
      return params;
  };

  $scope.updateSearch = function() {
    $scope.loading = true;
    $scope.query = $scope.params.query; // this is static until the update re-runs
    var params = $scope.cleanParams($scope.params);
    if(isSearch) {
      searchPage = $window.location.pathname.endsWith('.html') ? '/search.html' : '/search/'
      history.pushState($scope.params,$scope.params.query,app.baseUrl + searchPage + '?q=' + $scope.params.query);
    }
    searchService.getSearchResults(params).then(function(data) {
      $scope.results = data.hits.hits;
      $scope.totalCount = data.hits.total;
      $scope.buildPagination(); // update pagination
      $scope.loading = false;
    });
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

    if($scope.totalCount < lastVisible) {
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

    if(typeof page !== 'number') return;

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
      topicNames.forEach(function(topic) {
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
