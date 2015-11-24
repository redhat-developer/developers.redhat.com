/*
  Extending the DCP Angularjs Module to include Events
*/
/*
  Create a service for fetching Events
*/
dcp.service('searchService', function($http, $q) {

  this.getData = function(filter) {

    var query = {
      'field'  : ['_source'],
      'size' : 500,
      'content_provider' : ['jboss-developer', 'rht']
    };

    /* Delete null filters */
    for(var f in filter) {
      if(!filter[f]) {
        delete filter[f];
      }
    }

    var queryFilters = dcp.objectToFilter(filter);
    queryFilters.push('sys_content_type:jbossdeveloper_event');
    query.query = '(' + queryFilters.join(' AND ') + ')';
    query.query = decodeURIComponent(decodeURIComponent(query.query));

    var deferred = $q.defer();
    // app.dcp.url.search = 'http://dcpbeta-searchisko.rhcloud.com/v1/rest/search'; // temp overwrite for staging data
    $http.get(app.dcp.url.search, {params: query})
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          $(".ng-scope[ng-controller='eventsController']").empty();
          $(".ng-scope[ng-controller='eventsController']").html(app.dcp.error_message);
        });

    return deferred.promise;
  };

});

dcp.controller('eventsController', function($scope, searchService) {
  window.$scope = $scope;


  // group into month array
  $scope.filter = {}; // stores the applied filter
  $scope.filters = {regions : [], solutions : [], products : [], types : [] };
  $scope.filtersFilled = false; // flag to only update the filters once

  $scope.getEvents = function() {

    $scope.events = []; // parent array

    searchService.getData($scope.filter).then(function(data){

      for (var i = 0; i < data.hits.hits.length; i++) {
        var item = data.hits.hits[i];
        var itemStartMonth = moment(item._source.start_date).month();
        var itemEndMonth = moment(item._source.end_date).month();
        var itemEndYear = moment(item._source.end_date).year();
        var currentYear = (new Date()).getFullYear();
        var now = (new Date()).getTime();
        var then = (new Date(item._source.end_date)).getTime();

        if(then < now) {
          continue; // skip this one..
        }

        // Fill filters if we haven't

        if(!$scope.filtersFilled) {

          if(item._source.target_product) {
            $scope.filters.products.push({ text : item._source.target_product , value : item._source.target_product });
          }

          if(item._source.region) {
            $scope.filters.regions.push({ text : item._source.region , value : item._source.region });
          }

          if(item._source.solution) {
            $scope.filters.solutions.push({ text : item._source.solution , value : item._source.solution });
          }

        }

        // push to the array
        $scope.events[itemStartMonth] = $scope.events[itemStartMonth] || [];
        $scope.events[itemStartMonth].push(item);

        // push it to next months if it ends in that month
        if(itemStartMonth !== itemEndMonth) {
          $scope.events[itemEndMonth] = $scope.events[itemEndMonth] || [];
          $scope.events[itemEndMonth].push(item);
        }

      }

      $scope.filtersFilled = true; // marked as filled so they do not update when we filter

      // $scope.events = data.hits.hits;
    });
  }; // end $scope.getEvents

  $scope.getEvents(); // call on page load

});


dcp.filter('moment',function() {
  return function(dateString, format){
    return moment(dateString).format(format);
  };
});

dcp.filter('momentMonth',function() {
  return function(dateString, format){
    return moment().month(dateString).format(format);
  };
});

dcp.objectToFilter = function(obj) {
    var str = '';
    var arr = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            arr.push(p + ':' + obj[p]);
        }
    }
    return arr;
};
