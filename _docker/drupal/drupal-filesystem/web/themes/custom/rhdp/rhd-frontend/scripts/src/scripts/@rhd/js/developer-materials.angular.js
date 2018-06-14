var dcp = angular.module('dcp', []);
dcp.config(['$provide', function ($provide) {
        $provide.decorator('$browser', function ($delegate) {
            var superUrl = $delegate.url;
            $delegate.url = function (url, replace) {
                if (url !== undefined) {
                    return superUrl(url.replace(/\%20/g, "+"), replace);
                }
                else {
                    return superUrl().replace(/\+/g, "%20");
                }
            };
            return $delegate;
        });
    }]);
dcp.factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
        return {
            request: function (config) {
                if (config.method == 'GET' && config.url.indexOf(app.dcp.url.developer_materials) > -1) {
                    $injector.get('$rootScope').$broadcast('_START_REQUEST_');
                }
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                if (response.config.method == 'GET' && response.config.url.indexOf(app.dcp.url.developer_materials) > -1) {
                    $injector.get('$rootScope').$broadcast('_END_REQUEST_');
                }
                return response;
            },
            responseError: function (rejection) {
                if (rejection.config.method == 'GET' && rejection.config.url.indexOf(app.dcp.url.developer_materials) > -1) {
                    $injector.get('$rootScope').$broadcast('_END_REQUEST_');
                }
                return $q.reject(rejection);
            }
        };
    }]);
dcp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
dcp.service('materialService', ['$http', '$q', function ($http, $q) {
        this.deferred_ = $q.defer();
        this.getMaterials = function (params) {
            var params = params || {};
            var query = {};
            query.newFirst = true;
            if (params.project === 'devstudio' && params.sys_type === 'quickstart') {
                params.project = '';
            }
            if (params.query) {
                query.query = params.query;
            }
            if (params.project) {
                query.project = params.project;
            }
            if (params.randomize) {
                query.randomize = params.randomize;
            }
            if (params.size) {
                query['size' + params.size] = true;
            }
            if (params.sys_type &&
                (($.isArray(params.sys_type) && params.sys_type.length > 0) ||
                    ($.trim(params.sys_type).length > 0))) {
                query.sys_type = params.sys_type;
            }
            if (!params.type) {
                query.type = ['jbossdeveloper_quickstart', 'jbossdeveloper_demo', 'jbossdeveloper_bom', 'jbossdeveloper_archetype', 'jbossdeveloper_example', 'jbossdeveloper_vimeo', 'jbossdeveloper_youtube', 'jbossdeveloper_book', 'rht_knowledgebase_article', 'rht_knowledgebase_solution', 'jbossorg_blog'];
            }
            if (params.publish_date_from) {
                query.publish_date_from = params.publish_date_from;
            }
            if (params.from) {
                query.from = params.from;
            }
            if (true) {
                this.deferred_.resolve(undefined);
            }
            this.deferred_ = $q.defer();
            var promise = this.deferred_.promise;
            var deferred = this.deferred_;
            $http.get(app.dcp.url.developer_materials, { params: query, timeout: promise })
                .success(function (data) {
                deferred.resolve(data);
            })
                .error(function () {
                $(".panel[ng-hide='data.materials.length']").replaceWith(app.dcp.error_message);
            });
            return promise;
        };
    }]);
dcp.factory('dataFlowService', ['$location', function ($location) {
        var service = function () {
            this.processParams = function (params) {
                var params_ = params || {};
                $location.path($.param(params_));
            };
        };
        return new service();
    }]);
dcp.factory('helper', function () {
    var Helper = function () {
        this.firstIfArray = function (input) {
            if ($.isArray(input) && input.length > 0) {
                return input[0];
            }
            return input;
        };
        this.parsePath = function (path) {
            var path_ = path || '';
            if (path_.indexOf('/') == 0) {
                path_ = path_.substr(1);
            }
            return deparam(path_);
        };
        this.safeParams = function (params) {
            var p = angular.isObject(params) ? params : {};
            var obj = {};
            angular.copy(p, obj);
            for (var key in obj) {
                if (!obj.hasOwnProperty(key))
                    continue;
                if (!this.isValidParam_(key)) {
                    delete obj[key];
                }
            }
            return obj;
        };
        this.VALID_URL_PARAMS_ = [
            "sys_type",
            "rating",
            "publish_date_from",
            "tag",
            "level",
            "from",
            "query",
            "project",
            "product",
            "size"
        ];
        this.isValidParam_ = function (key) {
            return this.VALID_URL_PARAMS_.indexOf(key) >= 0;
        };
        this.removeTagItems = function (input) {
            var indexes = [];
            if ($.isArray(input) && input.length > 0) {
                var excludes = app.dcp.excludeResourceTags;
                angular.forEach(input, function (str) {
                    var index = excludes.indexOf(str);
                    if (index == -1) {
                        indexes.push(str);
                    }
                });
            }
            return indexes.join(',');
        };
        this.availableFormats = [
            { value: "quickstart", "name": "Quickstart", "description": "Single use-case code examples tested with the latest stable product releases" },
            { value: "video", "name": "Video", "description": "Short tutorials and presentations for Red Hat JBoss Middleware products and upstream projects" },
            { value: "demo", "name": "Demo", "description": "Full applications that show what you can achieve with Red Hat JBoss Middleware" },
            { value: "jbossdeveloper_example", "name": "Tutorial", "description": "Guided content, teaching you how to build complex applications from the ground up" },
            { value: "jbossdeveloper_archetype", "name": "Archetype", "description": "Maven Archetypes for building Red Hat JBoss Middleware applications" },
            { value: "jbossdeveloper_bom", "name": "BOM", "description": "Maven BOMs for managing dependencies within Red Hat JBoss Middleware applications" },
            { value: "quickstart_early_access", "name": "Early Access", "description": "Single use-case code examples demonstrating features not yet available in a product release" },
            { value: "article", "name": "Articles (Premium)", "description": "Technical articles and best practices for Red Hat JBoss Middleware products" },
            { value: "solution", "name": "Solutions (Premium)", "description": "Answers to questions or issues you may be experiencing" }
        ];
    };
    return new Helper();
});
dcp.filter('thumbnailURL', function () {
    return function (item) {
        var thumbnails = app.dcp.thumbnails;
        if (item.fields.thumbnail && item.fields.thumbnail[0]) {
            return item.fields.thumbnail[0];
        }
        else if (item._type) {
            return thumbnails[item._type];
        }
        else {
            return thumbnails["rht_knowledgebase_article"];
        }
    };
});
dcp.filter('isPremium', ['helper', function (helper) {
        return function (url) {
            url = helper.firstIfArray(url);
            if (url) {
                return !!url.match("access.redhat.com");
            }
            else {
                return false;
            }
        };
    }]);
dcp.filter('brackets', ['helper', function (helper) {
        return function (num) {
            num = helper.firstIfArray(num);
            if (num > 0) {
                return "  (" + num + ")";
            }
        };
    }]);
dcp.filter('truncate', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            str = $("<p>").html(str).text();
            if (str.length <= 150) {
                return str;
            }
            return str.slice(0, 150) + "…";
        };
    }]);
dcp.filter('HHMMSS', ['helper', function (helper) {
        return function (sec_string) {
            sec_string = helper.firstIfArray(sec_string);
            var sec_num = parseInt(sec_string, 10);
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = minutes + ':' + seconds;
            if (parseInt(hours) > 0) {
                time = hours + ':' + time;
            }
            return time;
        };
    }]);
dcp.filter('timeAgo', ['helper', function (helper) {
        return function (timestamp) {
            timestamp = helper.firstIfArray(timestamp);
            if (!timestamp)
                return;
            var date = new Date(timestamp);
            return $.timeago(date);
        };
    }]);
dcp.filter('firstIfArray', ['helper', function (helper) {
        return function (input) {
            return helper.firstIfArray(input);
        };
    }]);
dcp.filter('noURL', function () {
    return function (str) {
        var filterArray = [];
        angular.forEach(str, function (ref) {
            if (ref.fields.sys_url_view) {
                filterArray.push(ref);
            }
        });
        return filterArray;
    };
});
dcp.filter('removeExcludedTags', ['helper', function (helper) {
        return function (input) {
            return helper.removeTagItems(input);
        };
    }]);
dcp.filter('urlFix', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            if (!str.length) {
                return;
            }
            else if (str.contains("access.redhat.com") || str.contains("hub-osdevelopers.rhcloud.com")) {
                return str;
            }
            else {
                return str.replace(/^http(s)?:\/\/(\w|\.|\-|:)*(\/pr\/\d+\/build\/\d+)?(\/docker-nightly)?/, app.baseUrl);
            }
        };
    }]);
dcp.filter('trim', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            return str.trim();
        };
    }]);
dcp.filter('name', ['helper', function (helper) {
        return function (str) {
            str = helper.firstIfArray(str);
            str = str || "";
            var pieces = str.split('<');
            if (pieces.length) {
                return pieces[0].trim();
            }
        };
    }]);
dcp.filter('formatName', ['helper', function (helper) {
        return function (value, scope) {
            value = helper.firstIfArray(value);
            for (var f in scope.data.availableFormats) {
                var format = scope.data.availableFormats[f];
                if (format.value === value) {
                    return format.name;
                }
            }
            return value;
        };
    }]);
dcp.filter('safeNumber', ['helper', function (helper) {
        return function (input) {
            input = helper.firstIfArray(input);
            var n = parseInt(input, 10);
            return isNaN(n) ? 0 : n;
        };
    }]);
dcp.filter('checkInternal', ['helper', '$location', function (helper, $location) {
        return function (item) {
            if (!helper.firstIfArray(item.fields.sys_url_view)) {
                return true;
            }
            else if (!!helper.firstIfArray(item.fields.sys_url_view).match($location.host())) {
                return true;
            }
            return false;
        };
    }]);
dcp.controller('developerMaterialsController', ['$scope', 'materialService', '$rootScope', '$location', 'helper', 'dataFlowService',
    function ($scope, materialService, $rootScope, $location, helper, dataFlowService) {
        window.scope = $scope;
        $scope.params = {};
        $scope.Math = Math;
        $scope.data = {
            layout: 'list',
            dateNumber: 0
        };
        $scope.randomize = false;
        $scope.pagination = { size: 10 };
        $scope.filters = {};
        $scope.filter = {};
        var needsToBeUnregistered = $rootScope.$on('$locationChangeSuccess', function () {
            $scope.fetchAndUpdate();
        });
        $rootScope.$on('$destroy', needsToBeUnregistered);
        $scope.$on('_START_REQUEST_', function () {
            $scope.data.loading = true;
        });
        $scope.$on('_END_REQUEST_', function () {
            $scope.data.loading = false;
        });
        $scope.data.availableTopics = app.dcp.availableTopics;
        $scope.data.availableFormats = helper.availableFormats;
        $scope.fetchAndUpdate = function () {
            $scope.params = helper.safeParams(helper.parsePath($location.path()));
            $scope.params.size = $scope.pagination.size;
            $scope.params.project = $scope.filters.project;
            materialService.getMaterials($scope.params)
                .then(function (data) {
                if (data && data.hits && data.hits.hits) {
                    $scope.data.materials = data.hits.hits;
                    $scope.data.total = data.hits.total;
                    $scope.paginate($scope.paginate.currentPage || 1);
                }
                else {
                    $scope.data.materials = [];
                    $scope.data.total = 0;
                }
            })
                .then(function () {
                $scope.filters.query = $scope.params.query;
                $scope.filters.sys_type = $scope.params.sys_type;
            });
        };
        $scope.paginate = function (page) {
            $scope.pagination.size = ($scope.pagination.viewall ? 500 : $scope.pagination.size);
            $scope.pagination.size = parseInt($scope.pagination.size);
            var startAt = (page * $scope.pagination.size) - $scope.pagination.size;
            var endAt = page * $scope.pagination.size;
            var pages = Math.ceil($scope.data.total / $scope.pagination.size);
            if (page > pages || page < 1 || typeof page === "string") {
                return;
            }
            $scope.paginate.pages = pages;
            $scope.paginate.currentPage = page;
            $scope.data.displayedMaterials = $scope.data.materials;
            $scope.paginate.pagesArray = app.utils.diplayPagination($scope.paginate.currentPage, pages, 4);
        };
        $scope.filters.sys_tags = [];
        $scope.filters.sys_type = [];
        $scope.filter.toggleSelection = function toggleSelection(itemName, selectedArray) {
            if (!$scope.filters[selectedArray]) {
                $scope.filters[selectedArray] = [];
            }
            var idx = $scope.filters[selectedArray].indexOf(itemName);
            if (idx > -1) {
                $scope.filters[selectedArray].splice(idx, 1);
            }
            else {
                $scope.filters[selectedArray].push(itemName);
            }
        };
        $scope.filter.updateDate = function () {
            var n = parseInt($scope.data.dateNumber);
            var d = new Date();
            var labels = ["All", "Within 1 Year", "Within 30 days", "Within 7 days", "Within 24hrs"];
            $scope.data.displayDate = labels[n];
            switch (n) {
                case 0:
                    delete $scope.filters.publish_date_from;
                    break;
                case 1:
                    d.setFullYear(d.getFullYear() - 1);
                    break;
                case 2:
                    d.setDate(d.getDate() - 30);
                    break;
                case 3:
                    d.setDate(d.getDate() - 7);
                    break;
                case 4:
                    d.setDate(d.getDate() - 1);
                    break;
            }
            if (n) {
                $scope.filters.publish_date_from = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            }
        };
        $scope.filter.clear = function () {
            $scope.filters.sys_tags = [];
            $scope.filters.sys_type = [];
            $scope.data.dateNumber = 0;
            $scope.data.skillNumber = 0;
            delete $scope.filters.query;
            delete $scope.filters.sys_rating_avg;
            delete $scope.filters.level;
            delete $scope.filters.publish_date_from;
            delete localStorage[$scope.data.pageType + '-filters'];
            $(".chosen").trigger("chosen:updated");
        };
        $scope.firstPage = function () {
            $scope.paginate.currentPage = 1;
            $scope.processPagination_();
        };
        $scope.previousPage = function () {
            $scope.paginate.currentPage -= 1;
            $scope.processPagination_();
        };
        $scope.nextPage = function () {
            $scope.paginate.currentPage += 1;
            $scope.processPagination_();
        };
        $scope.lastPage = function () {
            $scope.paginate.currentPage = $scope.paginate.pages;
            $scope.processPagination_();
        };
        $scope.goToPage = function (page) {
            if (typeof page !== 'number') {
                return;
            }
            $scope.paginate.currentPage = page;
            $scope.processPagination_();
        };
        $scope.processPagination_ = function () {
            $scope.filters.from = ($scope.paginate.currentPage - 1) * $scope.pagination.size;
            $scope.filter.applyFilters();
        };
        $scope.filter.applyFilters = function () {
            $scope.data.displayedMaterials = [];
            $scope.filter.store();
            dataFlowService.processParams($scope.filters);
        };
        $scope.filter.store = function () {
            window.localStorage[$scope.data.pageType + '-filters'] = JSON.stringify(scope.filters);
            window.localStorage[$scope.data.pageType + '-filtersTimeStamp'] = new Date().getTime();
        };
        $scope.filter.restore = function () {
            $scope.data.skillNumber = 0;
            $scope.data.dateNumber = 0;
            if (!window.location.hash && (!window.localStorage || !window.localStorage[$scope.data.pageType + '-filters'])) {
                $scope.filter.applyFilters();
                return;
            }
            if ($location.path().length > 0) {
                var filters = deparam($location.path().slice(1));
                if (typeof filters.sys_type === "string") {
                    var filterArr = [];
                    filterArr.push(filters.sys_type);
                    filters.sys_type = filterArr;
                }
                $scope.filters = filters;
                if ($scope.filters.level) {
                    var labels = ["All", "Beginner", "Intermediate", "Advanced"];
                    var idx = labels.indexOf($scope.filters.level);
                    if (idx >= 0) {
                        $scope.data.skillNumber = idx;
                    }
                    $scope.filter.updateSkillLevel();
                }
                if ($scope.filters.publish_date_from) {
                    var parts = scope.filters.publish_date_from.split('-');
                    var d = new Date(parts[0], parts[1], parts[2]);
                    var now = new Date().getTime();
                    var ago = now - d;
                    var daysAgo = Math.floor(ago / 1000 / 60 / 60 / 24);
                    if (daysAgo <= 1) {
                        $scope.data.dateNumber = 4;
                    }
                    else if (daysAgo > 1 && daysAgo <= 7) {
                        $scope.data.dateNumber = 3;
                    }
                    else if (daysAgo > 7 && daysAgo <= 30) {
                        $scope.data.dateNumber = 2;
                    }
                    else {
                        $scope.data.dateNumber = 1;
                    }
                    $scope.filter.updateDate();
                }
            }
            else if (window.localStorage && window.localStorage[$scope.data.pageType + '-filters']) {
                var now = new Date().getTime();
                var then = window.localStorage[$scope.data.pageType + '-filtersTimeStamp'] || 0;
                if ((now - then) < 7200000) {
                    $scope.filters = JSON.parse(window.localStorage[$scope.data.pageType + '-filters']);
                }
            }
            $scope.filter.applyFilters();
            $scope.fetchAndUpdate();
        };
        $scope.chosen = function () {
            $('select.chosen').unbind().chosen().change(function () {
                var tags = $(this).val();
                if (tags) {
                    $scope.filters.sys_tags = tags;
                }
                else {
                    delete $scope.filters.sys_tags;
                }
                $scope.$apply();
                $scope.filter.applyFilters();
            }).trigger('chosen:updated');
        };
        $scope.$watch('data.availableTopics', function () {
            window.setTimeout(function () {
                $scope.chosen();
            }, 0);
        });
        $scope.$watch('data.layout', function (newVal, oldVal) {
            if ($scope.data.layout) {
                window.localStorage.layout = $scope.data.layout;
            }
        });
    }]);
$(function () {
    $('form.dev-mat-filters').on('submit', function (e) {
        e.preventDefault();
    });
    $('.filters-clear').on('click', function (e) {
        e.preventDefault();
        app.dm.clearFilters($(this));
    });
    $('.filter-block h5').on('click', function () {
        if (window.innerWidth <= 768) {
            var el = $(this);
            el.toggleClass('filter-block-open');
            el.next('.filter-block-inputs').slideToggle(300);
        }
    });
    $('.filter-toggle').on('click', function () {
        if (window.innerWidth <= 768) {
            $('.developer-materials-sidebar').toggleClass('open');
        }
    });
});
