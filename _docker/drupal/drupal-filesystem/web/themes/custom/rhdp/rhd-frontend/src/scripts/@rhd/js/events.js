/*
  Extending the DCP Angularjs Module to include Events
*/
/*
  Create a service for fetching Events
*/
dcp.service('searchService', function($http, $q) {

  this.getData = function(filter) {
    var deferred = $q.defer();
    $http.get(app.dcp.url.events, { params : filter }).success(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

});

dcp.service('helpers', function() {

  /**
   * Retrieve object keys and convert them to number (we assume string keys that can be converted to number like "123").
   * @param {Object} obj
   * @return {Array.<number>}
   */
  this.getKeys = function(obj) {
    var r = [];
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      r.push(Number(k));
    }
    return r;
  };

  /**
   * Push {event} into {store} under given {key}.
   * Store is an object (hashmap) keyed by timestamps (month start). Each key points to an array
   * of events falling into particular month. Events spanning month borders are added into all relevant months.
   *
   * @param event
   * @param key
   * @param store
   */
  this.recordEvent = function(event, key, store) {
    if (store && key && event && event.start_date && event.end_date) { // prevent NPE

      store[key] = store[key] || [];
      store[key].push(event);

      try {
        var start = moment(event.start_date);
        var end = moment(event.end_date);
        var startMonths = this.getAbsoluteMonths_(start);
        var endMonths = this.getAbsoluteMonths_(end);
        var mdiff = endMonths - startMonths;
        if (mdiff > 0) {
          var nmonth_ = key;
          for (var i = 0; i < mdiff; i++) {
            nmonth_ = moment(nmonth_).add(1, 'month').toDate().getTime();
            store[nmonth_] = store[nmonth_] || [];
            store[nmonth_].push(event);
          }
        }
      } catch (ignore) {
        // Assume any exception here comes from moment.js trying to parse
        // invalid date value. In this case we can simply ignore it.
        if (console && console.log) {
          console.log(ignore);
        }
      }
    }
  };

  /**
   * @link http://stackoverflow.com/a/30605234
   * @param momentDate
   * @return {number}
   * @private
   */
  this.getAbsoluteMonths_ = function(momentDate) {
    var months = Number(momentDate.format("MM"));
    var years = Number(momentDate.format("YYYY"));
    return months + (years * 12);
  };

});

dcp.controller('eventsController', function($scope, searchService, helpers) {
  window.$scope = $scope;


  // group into month array
  $scope.filter = {}; // stores the applied filter
  $scope.filters = {regions : [], solutions : [], products : [] };
  $scope.filtersFilled = false; // flag to only update the filters once

  $scope.getEvents = function() {


    $scope.monthKeys = [];
    $scope.events = {}; // keyed by monthKeys

    searchService.getData($scope.filter).then(function(data){
      var i = 0;
      var item = null;

      // Fill filters if we haven't
      if(!$scope.filtersFilled) {
        for (i = 0; i < data.aggregations.product_global.product_filter.product.buckets.length; i++) {
          item = data.aggregations.product_global.product_filter.product.buckets[i];
          $scope.filters.products.push({ text : item.key , value : item.key });
        }
        for (i = 0; i < data.aggregations.region_global.region_filter.region.buckets.length; i++) {
          item = data.aggregations.region_global.region_filter.region.buckets[i];
          $scope.filters.regions.push({ text : item.key , value : item.key });
        }
        for (i = 0; i < data.aggregations.solution_global.solution_filter.solution.buckets.length; i++) {
          item = data.aggregations.solution_global.solution_filter.solution.buckets[i];
          $scope.filters.solutions.push({ text : item.key , value : item.key })
        }
        $scope.filtersFilled = true; // marked as filled so they do not update when we filter
      }

      var monthStartBuckets_ = data.aggregations.months_by_start_date.buckets;
      for (i = 0; i < monthStartBuckets_.length; i++) {
        var bucket = monthStartBuckets_[i];
        var monthlyEvents_ = bucket.events.hits.hits;
        for (var e = 0; e < monthlyEvents_.length; e++) {
          helpers.recordEvent(monthlyEvents_[e]._source, bucket.key, $scope.events);
        }
        $scope.monthKeys = helpers.getKeys($scope.events);
      }
    });
  }; // end $scope.getEvents

  $scope.getEvents(); // call on page load

});


dcp.filter('moment',function() {
  return function(dateString, format){
    return moment.utc(dateString).format(format);
  };
});
