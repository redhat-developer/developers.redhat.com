var dcp = angular.module('dcp', []);

/*
  Modify $browser.url()
  We need proper + and not encoded + in the URL
  https://github.com/angular/angular.js/issues/3042
*/

dcp.config(function($provide){
  $provide.decorator('$browser', function($delegate) {
      var superUrl = $delegate.url;
      $delegate.url = function(url, replace) {
          if(url !== undefined) {
              return superUrl(url.replace(/\%20/g,"+"), replace);
          } else {
              return superUrl().replace(/\+/g,"%20");
          }
      };
      return $delegate;
  });
});

dcp.factory('httpInterceptor', ['$q', '$injector', function($q, $injector) {
  /**
   * httpInterceptor is used to broadcast XHR request activity events
   * for specific requests (doing GET on developer_materials REST API).
   * These event can be used to display 'loading' image ... etc.
   */
  return {
    request: function (config) {
      if (config.method == 'GET' && config.url.indexOf(app.dcp.url.developer_materials) > -1) {
        $injector.get('$rootScope').$broadcast('_START_REQUEST_');
      }
      return config;
    },
    requestError: function(rejection) {
      /**
       * We can probably ignore 'requestError' interceptor.
       * From official doc: "interceptor gets called when a previous interceptor threw an error or resolved with a rejection."
       * We do not have the configuration object here so we can not test URL and Method type anyway.
       */
      //$injector.get('$rootScope').$broadcast('_END_REQUEST_');
      return $q.reject(rejection);
    },
    response: function(response) {
      if (response.config.method == 'GET' && response.config.url.indexOf(app.dcp.url.developer_materials) > -1) {
        $injector.get('$rootScope').$broadcast('_END_REQUEST_');
      }
      return response;
    },
    responseError: function(rejection) {
      if (rejection.config.method == 'GET' && rejection.config.url.indexOf(app.dcp.url.developer_materials) > -1) {
        $injector.get('$rootScope').$broadcast('_END_REQUEST_');
      }
      return $q.reject(rejection);
    }
  };
}]);

dcp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}]);

/*
  Create a service for fetching materials
*/
dcp.service('materialService', function($http, $q) {

  this.deferred_ = $q.defer();

  this.getMaterials = function(params) {

    var params = params || {};
    var query = {};
    
    query.newFirst = true;

    if(params.query) {
      query.query = params.query;
    }
    if(params.project) {
      query.project = params.project;
    }
    if (params.randomize) {
      query.randomize = params.randomize;
    }

    if(params.size) {
      query['size' + params.size] = true;
    }

    if (params.sys_type &&
        (
            // TODO: if we do not need to support array then drop array condition
            ($.isArray(params.sys_type) && params.sys_type.length > 0) ||
            ($.trim(params.sys_type).length > 0)
        )
    ) {
      query.sys_type = params.sys_type;
    }
    if (params.publish_date) {
      query.publish_date = params.publish_date;
    }
    if (params.from) {
      query.from = params.from;
    }

    // Abort ongoing requests. Interestingly, aborting XHR requests is quite confusing in Angular :-\
    // - https://developer.rackspace.com/blog/cancelling-ajax-requests-in-angularjs-applications/
    // - http://www.bennadel.com/blog/2616-aborting-ajax-requests-using-http-and-angularjs.htm
    if (true) {
      // We shall execute this only if there are any pending XHR requests,
      // but I have no clue how to learn about this ATM. May be it is safe
      // to call it always... (which is what we do now).
      this.deferred_.resolve(undefined);
    }
    this.deferred_ = $q.defer();
    var promise = this.deferred_.promise;

    // query = decodeURIComponent(query);
    var deferred = this.deferred_;
    $http.get(app.dcp.url.developer_materials, { params : query, timeout: promise })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function () {
        $(".panel[ng-hide='data.materials.length']").replaceWith(app.dcp.error_message);
      });
    return promise;
  }

});

/**
 * Data flow service is responsible for updating URL fragment (called path in Angular terminology).
 * Any changes in app state that we want to project to URL must go through this method.
 */
dcp.factory('dataFlowService', function($location) {
  var service = function() {
    this.processParams = function(params) {
      var params_ = params || {};
      $location.path($.param(params_));
    };
  };
  return new service();
});

dcp.factory('helper', function() {
  /**
   * Helper utility class.
   *
   * @constructor
   */
  var Helper = function() {

    /**
     * This method return first item from input iff the input is non empty array
     * otherwise it return the input value unchanged.
     * This method is expected to be used when accessing hit.fields values
     * as fields in Searchisko 2 are always arrays.
     *
     * @param {*} input
     * @return {*}
     */
    this.firstIfArray = function(input) {
      if ($.isArray(input) && input.length > 0) {
        return input[0];
      }
      return input;
    };

    /**
     * Parse 'path' part of the URL. Returns object representing the params.
     * Input string can contain leading forward slash. I.e. both the following
     * input values are the same: '/param=value' and 'param=value'.
     *
     * @param {string} path
     * @return {Object}
     */
    this.parsePath = function(path) {
      var path_ = path || '';
      if (path_.indexOf('/') == 0) {
        path_ = path_.substr(1);
      }
      return deparam(path_);
    };

    /**
     * Check the params and return safe representation of it.
     * Unknown parameters are dropped.
     *
     * @param {Object} params
     * @return {Object}
     */
    this.safeParams = function(params) {
      var p = angular.isObject(params) ? params : {};
      var obj = {};
      angular.copy(p, obj);

      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (!this.isValidParam_(key)) {
          delete obj[key];
        }
      }
      return obj;
    };

    /**
     * Valid parameter names.
     *
     * @type {Array.<string>}
     * @constant
     * @private
     */
    this.VALID_URL_PARAMS_ = [
        "sys_type",
        "rating",
        "publish_date",
        "tag",
        "level",
        "from",
        "query",
        "project",
        "product",
        "size"
    ];

    /**
     * Return true if given key value is valid request parameter name.
     *
     * @param {string} key
     * @return {boolean}
     * @private
     */
    this.isValidParam_ = function(key) {
      return this.VALID_URL_PARAMS_.indexOf(key) >= 0;
    };

    /**
    * Removes redundant/unnecessary tags and returns new tag list.  If the list does not contain
    * undesirable tags items, return the list as is.
    *
    * @param {*} input
    * @return {*}
    */
    this.removeTagItems = function(input) {
      var indexes = [];

      if ($.isArray(input) && input.length > 0) {
        var excludes = app.dcp.excludeResourceTags;
        angular.forEach(input, function(str){
          var index = excludes.indexOf(str);
          if(index == -1) {
            indexes.push(str);
          }

        })
      }
      return indexes.join(',');
    };

    this.availableFormats = [
      { value : "quickstart" , "name" : "Quickstart", "description" : "Single use-case code examples tested with the latest stable product releases" },
      { value : "video" , "name" : "Video", "description" : "Short tutorials and presentations for Red Hat JBoss Middleware products and upstream projects" },
      { value : "demo" , "name" : "Demo", "description" : "Full applications that show what you can achieve with Red Hat JBoss Middleware" },
      { value : "jbossdeveloper_example" , "name" : "Tutorial", "description" : "Guided content, teaching you how to build complex applications from the ground up" },
      { value : "jbossdeveloper_archetype" , "name" : "Archetype", "description" : "Maven Archetypes for building Red Hat JBoss Middleware applications" },
      { value : "jbossdeveloper_bom" , "name" : "BOM", "description" : "Maven BOMs for managing dependencies within Red Hat JBoss Middleware applications" },
      { value : "quickstart_early_access" , "name" : "Early Access", "description" : "Single use-case code examples demonstrating features not yet available in a product release" },
      { value : "article" , "name" : "Articles (Premium)", "description" : "Technical articles and best practices for Red Hat JBoss Middleware products" },
      { value : "solution" , "name" : "Solutions (Premium)", "description" : "Answers to questions or issues you may be experiencing" }
    ];

  };

  return new Helper();
});

/*
  Filter to determine which thumbnail to return
*/
dcp.filter('thumbnailURL', function(){
  return function(item) {
    var thumbnails = app.dcp.thumbnails;
    if(item.fields.thumbnail && item.fields.thumbnail[0]) {
      return item.fields.thumbnail[0];
    }
    else if(item._type) {
      return thumbnails[item._type];
    }
    else {
      return thumbnails["rht_knowledgebase_article"];
    }
  }

});

/*
dcp.filter('stars',['$sce',function($sce){
  return function(fields) {
    var html = "";
    var fullStars = fields.sys_rating_avg || 0;
    var emptyStars = 5 - fullStars;
    html += new Array(fullStars + 1).join("<i class='fa fa-star'></i>");
    html += new Array(emptyStars + 1).join("<i class='fa fa-star-o'></i>");
    return $sce.trustAsHtml(html);
  }
}]);
*/

/*
  Filter to return whether or not an item is premium
*/
dcp.filter('isPremium', ['helper', function(helper) {
  return function(url) {
    url = helper.firstIfArray(url);
    if(url) {
      return !!url.match("access.redhat.com");
    }
    else {
      return false;
    }
  }
}]);

/*
  Filter to add brackets
*/
dcp.filter('brackets', ['helper', function(helper){
  return function(num){
    num = helper.firstIfArray(num);
    if(num > 0) {
      return  "  (" + num + ")";
    }
  }
}]);

/*
  Filter to add truncate
*/
dcp.filter('truncate', ['helper', function(helper) {
  return function(str){
    str = helper.firstIfArray(str);
    str = $("<p>").html(str).text(); // parse html entities
    if(str.length <= 150) {
      return str;
    }
    //
    return str.slice(0,150) + "…";
  }
}]);

/*
  Filter to format time
*/
dcp.filter('HHMMSS', ['helper', function(helper) {
  return function(sec_string) {
    sec_string = helper.firstIfArray(sec_string);
    var sec_num = parseInt(sec_string, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    var time    = minutes+':'+seconds;
    // only show hours if there are some
    if(parseInt(hours) > 0) {
      time = hours+':'+ time;
    }
    return time;
  }
}]);

/*
  Filter to return human readable time ago
*/
dcp.filter('timeAgo', ['helper', function(helper) {
  return function(timestamp){
    timestamp = helper.firstIfArray(timestamp);
    if(!timestamp) return;

    var date = new Date(timestamp);
    return $.timeago(date);
  }
}]);

dcp.filter('firstIfArray', ['helper', function(helper) {
  return function(input) {
    return helper.firstIfArray(input);
  }
}]);

/*
 Remove fields that don't contain required sys_url_view links
 */
dcp.filter('noURL', function() {
    return function(str){
        var filterArray = [];
        angular.forEach(str, function(ref){
            if(ref.fields.sys_url_view){
                filterArray.push(ref);

            }
        });
        return filterArray;
    }
});

dcp.filter('removeExcludedTags', ['helper', function(helper) {
    return function(input) {
        return helper.removeTagItems(input);
    }
}]);


/*
  Filter to use the correct location for links coming from searchisko.
*/
dcp.filter('urlFix', ['helper', function(helper) {
  return function(str){
    str = helper.firstIfArray(str);
    if(!str.length) {
      return; // no string provided
    }
    else if (str.contains("access.redhat.com") || str.contains("hub-osdevelopers.rhcloud.com")) {
      return str;
    } else {
      return str.replace(/^http(s)?:\/\/(\w|\.|\-|:)*(\/pr\/\d+\/build\/\d+)?(\/docker-nightly)?/, app.baseUrl);
    }
  }
}]);

/*
  Filter to trim whitespace
*/
dcp.filter('trim', ['helper', function(helper) {
  return function(str){
    str = helper.firstIfArray(str);
    return str.trim();
  }
}]);

/*
  Return just the name, no email
*/
dcp.filter('name', ['helper', function(helper) {
  return function(str){
    str = helper.firstIfArray(str);
    str = str || "";
    var pieces = str.split('<');
    if(pieces.length) {
      return pieces[0].trim()
    }
  }
}]);

/*
  Return the proper name for formats
*/
dcp.filter('formatName', ['helper', function(helper) {
  return function(value, scope){
    value = helper.firstIfArray(value);
    for(var f in scope.data.availableFormats) {
      var format = scope.data.availableFormats[f];
      if(format.value === value) {
        return format.name;
      }
    }
    // if not in our object, return the original value
    return value;
  }
}]);

/**
 * safeNumber is an "ng filter" that accept string value
 * and convert to number (using radix of 10). If parsing
 * fails (NaN) then 0 is returned.
 */
dcp.filter('safeNumber', ['helper', function(helper) {
  return function(input) {
    input = helper.firstIfArray(input);
    var n = parseInt(input, 10);
    return isNaN(n) ? 0 : n;
  }
}]);

/**
 * checkInternal checks if a link is internal
 */
dcp.filter('checkInternal', ['helper', '$location', function(helper, $location) {
  return function(item) {
    if(!helper.firstIfArray(item.fields.sys_url_view)) {
      return true;
    }
    else if(!!helper.firstIfArray(item.fields.sys_url_view).match($location.host())) {
      return true;
    }
    return false;
  }
}]);

dcp.controller('developerMaterialsController',
    ['$scope', 'materialService', '$rootScope', '$location', 'helper', 'dataFlowService',
      function($scope, materialService, $rootScope, $location, helper, dataFlowService) {

  // Initialize params state
  window.scope = $scope;
  $scope.params = {};

  // Add Math object to $scope so we can use it directly in Angular expressions
  // like: {{ Math.min(data.materials.length, paginate.currentPage * pagination.size) }}
  // This might not be clean technique from Angular perspective (more clear would be
  // to do all required calculations in controller and not the view)
  // TODO: remove
  $scope.Math = Math;

  $scope.data = {
    layout : 'list',
    dateNumber : 0
  };

  $scope.randomize = false;
  $scope.pagination = { size : 10 };
  $scope.filters = {}; // stores data
  $scope.filter = {}; // stores util functions


  // Register listener for location path change
  var needsToBeUnregistered = $rootScope.$on('$locationChangeSuccess', function() {
    $scope.fetchAndUpdate();
  });

  // Unregister listeners registered on different scopes (and rootScope is one).
  //  - https://code.angularjs.org/1.3.3/docs/api/ng/type/$rootScope.Scope#$destroy
  //  - http://stackoverflow.com/a/27016855
  $rootScope.$on('$destroy', needsToBeUnregistered);

  $scope.$on('_START_REQUEST_', function() {
    $scope.data.loading = true;
  });

  $scope.$on('_END_REQUEST_', function() {
    $scope.data.loading = false;
  });

  $scope.data.availableTopics = app.dcp.availableTopics;
  $scope.data.availableFormats = helper.availableFormats;

  $scope.fetchAndUpdate = function(){
    // Parse Params from URL Hash
    $scope.params = helper.safeParams(
        helper.parsePath($location.path())
    );

    $scope.params.size  = $scope.pagination.size;
    
    // fold in initial project 
    $scope.params.project = $scope.filters.project;

    // Go get new materials and display them
    materialService.getMaterials($scope.params)
        .then(function(data) {
          // process response data

          // Check if there are any data! In case the request was aborted
          // there are no data or the data has unexpected format.
          if (data && data.hits && data.hits.hits) {
            $scope.data.materials = data.hits.hits;
            $scope.data.total = data.hits.total;
            $scope.paginate($scope.paginate.currentPage || 1);
          } else {
            // clean the table
            $scope.data.materials = [];
            $scope.data.total = 0;
          }

        })
        .then(function() {
          // sync web form with query parameters
          $scope.filters.query = $scope.params.query;
          $scope.filters.sys_type = $scope.params.sys_type;
        });
  };

  /*
   Handle Pagination
   */
  $scope.paginate = function(page) {
    $scope.pagination.size = ($scope.pagination.viewall ? 500 : $scope.pagination.size);
    $scope.pagination.size = parseInt($scope.pagination.size);
    var startAt = (page * $scope.pagination.size) - $scope.pagination.size;
    var endAt = page * $scope.pagination.size;
    var pages = Math.ceil($scope.data.total / $scope.pagination.size);

    // do nothing if we have no more pages
    if(page > pages || page < 1 || typeof page === "string") {
      return;
    }

    $scope.paginate.pages = pages;
    // $scope.paginate.pagesArray = new Array(pages);
    $scope.paginate.currentPage = page;

    $scope.data.displayedMaterials = $scope.data.materials;

    // pagination display logic
    $scope.paginate.pagesArray = app.utils.diplayPagination($scope.paginate.currentPage, pages, 4);

    // next tick
    // TODO: Do we need to display contributor?
    // window.setTimeout(function() {
    //   app.dcp.resolveContributors();
    // },0);

  };

  $scope.filters.sys_tags = [];
  $scope.filters.sys_type = [];
  $scope.filter.toggleSelection = function toggleSelection(itemName, selectedArray) {

      if(!$scope.filters[selectedArray]) {
        $scope.filters[selectedArray] = [];
      }

      var idx = $scope.filters[selectedArray].indexOf(itemName);
      // is currently selected
      if (idx > -1) {
        $scope.filters[selectedArray].splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.filters[selectedArray].push(itemName);
      }
  };

  /*
    Update date when the range input changes
  */
  $scope.filter.updateDate = function() {
    var n = parseInt($scope.data.dateNumber);
    var d = new Date();
    var labels = ["All", "Within 1 Year", "Within 30 days", "Within 7 days", "Within 24hrs"];
    $scope.data.displayDate = labels[n];
    switch(n) {
      case 0 :
        delete $scope.filters.publish_date;
        break;
      case 1 :
        //Within 1 Year
        d.setFullYear(d.getFullYear() - 1);
        break;
      case 2 :
        //Within 30 days
        d.setDate(d.getDate() - 30);
        break;
      case 3 :
        //Within 7 days
        d.setDate(d.getDate() - 7);
        break;
      case 4 :
        //Within 24 hours
        d.setDate(d.getDate() - 1);
        break;
    }

    if(n) {
      $scope.filters.publish_date = /*">=" +*/ d.getFullYear() + "-" + ( d.getMonth() + 1 ) + "-" + d.getDate();
    }
  };

  $scope.filter.clear = function() {
    $scope.filters.sys_tags = [];
    $scope.filters.sys_type = [];
    $scope.data.dateNumber = 0;
    $scope.data.skillNumber = 0;
    delete $scope.filters.query;
    delete $scope.filters.sys_rating_avg;
    delete $scope.filters.level;
    delete $scope.filters.publish_date;
    // clear local storage
    delete localStorage[$scope.data.pageType + '-filters'];
    // trigger chosen
    $(".chosen").trigger("chosen:updated");
  };

  $scope.firstPage = function() {
    $scope.paginate.currentPage = 1;
    $scope.processPagination_();
  };

  $scope.previousPage = function() {
    $scope.paginate.currentPage -= 1;
    $scope.processPagination_();
  };

  $scope.nextPage = function() {
    $scope.paginate.currentPage += 1;
    $scope.processPagination_();
  };

  $scope.lastPage = function() {
    $scope.paginate.currentPage = $scope.paginate.pages;
    $scope.processPagination_();
  };

  $scope.goToPage = function(page) {
    if(typeof page !== 'number') {
      return;
    }
    $scope.paginate.currentPage = page;
    $scope.processPagination_();
  };

  $scope.processPagination_ = function() {
    $scope.filters.from = ($scope.paginate.currentPage - 1) * $scope.pagination.size;
    $scope.filter.applyFilters();
  };

  $scope.filter.applyFilters = function() {
    $scope.data.displayedMaterials = [];
    // save search in local storage
    $scope.filter.store();
    // update the page hash
    //window.location.hash = "!" + $.param($scope.filters);
    dataFlowService.processParams($scope.filters)
  };

  $scope.filter.store = function() {
    // check if we have local storage, abort if not
    // if(!window.localStorage || $scope.filters.project || $scope.filters.solution) { return; }
    // store them in local storage
    window.localStorage[$scope.data.pageType + '-filters'] = JSON.stringify(scope.filters);
    window.localStorage[$scope.data.pageType + '-filtersTimeStamp'] = new Date().getTime();
  };

  $scope.filter.restore = function() {

    // restore and set
    $scope.data.skillNumber = 0;
    $scope.data.dateNumber = 0;

    // check if we have window hash, local storage or any stored filters, abort if not
    if(!window.location.hash && (!window.localStorage || !window.localStorage[$scope.data.pageType + '-filters'])) {
      $scope.filter.applyFilters(); // run with no filters
      return;
    }

    if($location.path().length > 0) {
      // $location service always makes sure the path starts with a forward slash
      // https://code.angularjs.org/1.3.3/docs/api/ng/service/$location#path
      var filters = deparam($location.path().slice(1));

      // check for single string sys_type
      if(typeof filters.sys_type === "string") {
        // convert to array with 1 item
        var filterArr = [];
        filterArr.push(filters.sys_type);
        filters.sys_type = filterArr;
      }

      $scope.filters = filters;

      // restore skill level slider
      if($scope.filters.level) {
        var labels = ["All", "Beginner", "Intermediate", "Advanced"];
        var idx = labels.indexOf($scope.filters.level);
        if(idx>=0) {
          $scope.data.skillNumber = idx;
        }
        $scope.filter.updateSkillLevel();
      }

      // restore date slider to closest match
      if($scope.filters.publish_date) {
        var parts = scope.filters.publish_date.split('-'); // YYYY MM DD
        var d = new Date(parts[0], parts[1], parts[2]); // Year, month date
        var now = new Date().getTime();
        var ago = now - d;
        var daysAgo = Math.floor(ago / 1000 / 60 / 60 / 24);

        if(daysAgo <= 1) {
          $scope.data.dateNumber = 4;
        } else if(daysAgo > 1 && daysAgo <= 7) {
          $scope.data.dateNumber = 3;
        } else if(daysAgo > 7 && daysAgo <= 30) {
          $scope.data.dateNumber = 2;
        } else {
          $scope.data.dateNumber = 1;
        }
        $scope.filter.updateDate();
      }

    }
    else if(window.localStorage && window.localStorage[$scope.data.pageType + '-filters']) {
      // only restore if less than 2 hours old
      var now = new Date().getTime();
      var then = window.localStorage[$scope.data.pageType + '-filtersTimeStamp'] || 0;

      if((now - then) < 7200000) { // 2 hours
        $scope.filters = JSON.parse(window.localStorage[$scope.data.pageType + '-filters']);
      }
    }
    $scope.filter.applyFilters();
    $scope.fetchAndUpdate();
  };


  $scope.chosen = function() {
    $('select.chosen').unbind().chosen().change(function() {
      var tags = $(this).val();
      if(tags) {
        $scope.filters.sys_tags = tags;
      }
      else {
        delete $scope.filters.sys_tags;
      }
      $scope.$apply();
      $scope.filter.applyFilters()
    }).trigger('chosen:updated');
  };

  /*
    Update chosen when the available topics update
  */
  $scope.$watch('data.availableTopics',function(){
    // next tick
    window.setTimeout(function(){
      $scope.chosen();
    },0);
  });

  /*
    Watch for the layout to change and update localstorage
  */
  $scope.$watch('data.layout',function(newVal, oldVal) {
    if($scope.data.layout) {
      window.localStorage.layout = $scope.data.layout;
    }
  });

  /*
    Get latest materials on page load
  */
  // window.setTimeout($scope.filter.restore, 0);

}]);


// jQuery for mobile filters

$(function() {
  $('form.dev-mat-filters').on('submit',function(e) {
    e.preventDefault();
  });

  $('.filters-clear').on('click',function(e){
    e.preventDefault();
    app.dm.clearFilters($(this));
  });

  // slide toggle on mobile
  $('.filter-block h5').on('click',function() {
    if(window.innerWidth <= 768) {
      var el = $(this);
      el.toggleClass('filter-block-open');
      el.next('.filter-block-inputs').slideToggle(300);
    }
  });

  // toggle filters on mobile
  $('.filter-toggle').on('click',function() {
    if(window.innerWidth <= 768) {
      $('.developer-materials-sidebar').toggleClass('open');
    }
  });

});

