var verifyMemberApp = angular.module('member-verify', []);

verifyMemberApp.controller('VerifyCtrl', ['$scope', 'validateMember', function VerifyCtrl($scope, validateMember) {
    // 99.99% accurate JS Email RegEx from http://emailregex.com/
    var eChk = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.isMember = false;
    $scope.emailChecked = false;
    $scope.checkMember = function(e) {
        if(typeof e === 'undefined' || e.keyCode == 13) {
            $scope.emailChecked = false;
            $scope.isMember = false;
            if ( eChk.test($scope.email) ) {
                validateMember($scope.email).then(function(resp) {
                    if(resp.data.exists) {
                        $scope.isMember = true;
                    }
                    $scope.emailChecked = true;
                },
                function(resp) {
                    $scope.emailChecked = true;
                });
            }
        }
    }
    $scope.goToRegister = function(e) {
        e.preventDefault();
        app.keycloak.login({ action : 'register', redirectUri : app.ssoConfig.confirmation });
    }
}]);

verifyMemberApp.factory('validateMember', ['$http', function($http) {
    return function validateMember(email) {
        return $http.post(app.ssoConfig.auth_url+'realms/rhd/rhdtools/emailUsed', JSON.stringify({email:email}));
    }
}])