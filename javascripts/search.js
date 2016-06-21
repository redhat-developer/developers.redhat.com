var search = angular.module('search', []);

search.service('searchService',function($http, $q) {
  this.getSearchResults = function(params) {
    var deferred = $q.defer();
    // http://dcp.stage.jboss.org/v2/rest/search?size=1&field=_source&agg=per_project_counts&agg=tag_cloud&agg=top_contributors&agg=activity_dates_histogram&agg=per_sys_type_counts
    // http://docs.jbossorg.apiary.io/#reference/search-api/2restsearchqueryqueryhighlightsortbyfromsizeaggfieldcontentprovidertypesystypetagprojectactivitydateintervalactivitydatefromactivitydatetocontributor

    // fold in params with defaults
    var search = Object.assign(params, {
      // field: '_source',
      field: ['sys_url_view', 'sys_title', 'sys_last_activity_date', 'sys_description', 'sys_tags', 'sys_updated'],
      agg: ['per_project_counts','tag_cloud', 'top_contributors', 'activity_dates_histogram', 'per_sys_type_counts'],
      query_highlight: true
    });

    $http.get(app.dcp.url.search, { params: search })
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
    var date = new Date(timestamp);
    return $.timeago(date);
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

search.controller('SearchController', ['$scope', 'searchService', searchCtrlFunc]);


function searchCtrlFunc($scope, searchService) {
  var search = window.location.search.split('=');
  var q = '';
  if(search) {
    q = decodeURIComponent(search.pop().replace(/\+/g,' ')); // last one
  }
  /* default */
  $scope.params = {
    query: q,
    sortBy: 'score',
    size: 10,
    from: 0,
    type: 'rht_website'
  }

  $scope.paginate = {
    currentPage: 1
  }

  $scope.loading = true;

  $scope.resetPagination = function() {
    $scope.params.from = 0; // start on the first page
    $scope.paginate.currentPage = 1;
  }

  $scope.updateSearch = function() {
    $scope.loading = true;
    $scope.query = $scope.params.query; // this is static until the update re-runs
    history.pushState($scope.params,$scope.params.query,app.baseUrl + '/search/?q=' + $scope.params.query);
    searchService.getSearchResults($scope.params).then(function(data) {
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

  $scope.updateSearch(); // run on pageload TODO: move to ng-init
}




// /* global app */

// app.search = {

//   abort : function() {
//     // abort previous request if we are running a new one
//     if(app.search.currentRequest && app.search.currentRequest.readyState !== 4) {
//       app.search.currentRequest.abort();
//     }
//   },
//   fetch :function(query) {

//     // Pass search params to GTM for analytics
//     window.dataLayer = window.dataLayer || [];
//     window.dataLayer.push({ 'keyword' : query });
//     window.dataLayer.push({'event': 'website-search'});

//     // perform ajax request
//     $.ajax({
//       url : app.dcp.url.search,
//       dataType: 'json',
//       data : {
//         "field"  : ["sys_title", "sys_url_view"],
//         "type" : "jbossdeveloper_website",
//         "query" : query,
//         "size" : 10,
//         "query_highlight" : true
//       },
//       beforeSend : function() {
//         app.search.abort();
//       },
//       success : function(data) {
//         app.search.format(query, data.hits.hits, $('form.search .searchResults'));
//       },
//       error : function() {
//         $('.searchResults').html("<ul>" + app.dcp.error_message + "</ul>");
//       }
//     });

//   },
//   format : function(query, results, container) {
//     var suggestions = $('<ul>');
//     for (var i = 0; i < results.length; i++) {
//       var title = results[i].highlight && results[i].highlight.sys_title ? results[i].highlight.sys_title : results[i].fields.sys_title;
//       var url = results[i].fields.sys_url_view;
//       suggestions.append('<li><a href="' + url + '">'+ title  +'</a></li>');
//     };
//     // $('.searchResults').html(suggestions);
//     container.html(suggestions);
//   }

// };

// // binding
// (function() {
//   var timeOut;
//   $('form.search').on('submit',function(e){
//     e.preventDefault();
//   });

//   // listen to key events on the search form and the buzz filter page
//   $('form.search').on('keyup','input',function(e) {
//     var form = $(this).parent();
//     /*
//       Check for enter / return key
//     */

//     if(e.keyCode == 13) {
//       var link = $('.searchResults li.active-item a');
//       window.location.assign(link[0].href);
//       // .click();
//       return;
//     }

//     /*
//       Check for up / down arrows
//     */

//     if(e.keyCode === 38 || e.keyCode === 40) {
//       if(e.keyCode === 38) { // up arrow
//         e.preventDefault(); // stop the cursor from going to the front of the input box
//         var activeItem = form.find('.searchResults li.active-item').prev();
//       }
//       else { // down arrow
//         var activeItem = form.find('.searchResults li.active-item').next();
//       }

//       // check if there is a selected item in the list
//       if(!activeItem.length && e.keyCode === 40) { // nothing and down arrow
//         activeItem = form.find('.searchResults li:first');
//       }

//       if(!activeItem.length && e.keyCode === 38) { // nothing and up arrow
//         activeItem = form.find('.searchResults li:last');
//       }

//       $('.active-item').removeClass('active-item');
//       activeItem.addClass('active-item');
//     }

//     /*
//       Otherwise suggest search results
//     */
//     else {
//       var query = $(this).val();
//       if(!query) {
//         $('.searchResults').html('');
//         return;
//       }
//       clearTimeout(timeOut);
//       timeOut = setTimeout(function() {
//         // if it is the search form, go ahead and search
//         // otherwise it is buzz, and we handle this in buzz.js
//         if(form.hasClass('search')) {
//           app.search.fetch(query);
//         }
//       }, 300);
//     }
//   });

//   // When someone hovers over a selection, remove
//   $('.searchResults').on('mouseover','li',function() {
//     $('li.active-item').removeClass('active-item');
//     $(this).addClass('active-item');
//   });

//   // when someone clicks the search result with their mouse
//   $('.searchResults').on('mousedown','a',function() {
//     window.location.assign(this.href);
//   });

//   // close the search box on mobile
//   $('.search-close').on('click',function(e){
//     $('form.search input').val('');
//     $('.searchResults').html('');
//   });

// })();

