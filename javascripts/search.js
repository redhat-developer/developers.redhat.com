var search = angular.module('search', []);

search.service('searchService',function($http, $q) {
  this.getSearchResults = function(params) {
    var deferred = $q.defer();
    // http://dcp.stage.jboss.org/v2/rest/search?size=1&field=_source&agg=per_project_counts&agg=tag_cloud&agg=top_contributors&agg=activity_dates_histogram&agg=per_sys_type_counts
    // http://docs.jbossorg.apiary.io/#reference/search-api/2restsearchqueryqueryhighlightsortbyfromsizeaggfieldcontentprovidertypesystypetagprojectactivitydateintervalactivitydatefromactivitydatetocontributor

    // fold in params with defaults
    var search = Object.assign(params, {
      // field: '_source',
      field: ['sys_url_view', 'sys_title', 'sys_last_activity_date', 'sys_description', 'sys_tags','sys_project', 'sys_contributor'],
      agg: ['per_project_counts','tag_cloud', 'top_contributors', 'activity_dates_histogram', 'per_sys_type_counts'],
    });

    var endpoint = (!!window.location.pathname.match(/\/search/) ? app.dcp.url.search : app.dcp.url.developer_materials);

    app.dcp.url.developer_materials = '//dcp.stage.jboss.org/v2/rest/search/developer_materials'; // remove before launch

    $http.get(endpoint, { params: search })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function (err) {
        console.error(err);
      });
    return deferred.promise;
  }
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
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getYear();
  }
});

search.filter('timestamp', function() {
  return function(timestamp){
    var date = new Date(timestamp);
    return date.getTime();
  }
});

search.filter('icon', function() {
  return function(sys_type){
    var icons = {
      video: 'icon-RHDev_-resources_icons_video',
      blogpost: 'icon-RHDev_-resources_icons_blogpost',
      jbossdeveloper_book: 'icon-RHDev_-resources_icons_book',
      book: 'icon-RHDev_-resources_icons_book',
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
    return app.dcp.url.broker + encodeURIComponent(url);
  }
});

search.controller('SearchController', ['$scope', 'searchService', searchCtrlFunc]);

function searchCtrlFunc($scope, searchService) {
  var search = window.location.search.split('=');
  var q = '';
  if(search) {
    q = search.pop(); // last one
  }
  /* default */
  $scope.params = {
    query: q,
    sortBy: 'score',
    size: 10,
    from: 0,
    sys_type : [],
    project : '',
    newFirst: false
  }

  $scope.paginate = {
    currentPage: 1
  }

  $scope.loading = true;

  /*
    Clean Params
  */

  $scope.cleanParams = function(p) {
      var params = Object.assign({}, p);

      // if "custom" is selected, remove it
      if(params.activity_date_interval && params.activity_date_interval === 'custom') {
        delete params.activity_date_interval;
      } else {
        delete params.activity_date_from;
        delete params.activity_date_to;
      }

      // if relevance is "most recent" is turned on, set newFirst to true, otherwise remove it entirely
      if(params.newFirst !== "true") {
        delete params.newFirst;
      }

      // return cleaned params
      return params;
  }

  $scope.updateSearch = function() {
    $scope.loading = true;
    var params = $scope.cleanParams($scope.params);
    // history.pushState($scope.params,$scope.params.query,'/search/?q=' + $scope.params.query);
    searchService.getSearchResults(params).then(function(data) {
      $scope.results = data.hits.hits;
      $scope.totalCount = data.hits.total;
      $scope.buildPagination(); // update pagination
      $scope.loading = false;
    });
  }

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
    }
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
    // re run the search
    $scope.updateSearch();
  };

  $scope.updateSearch(); // run on pageload TODO: move to ng-init
}

