'use strict';

angular.module('bsa')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.email = '';
    $scope.password = '';
    $scope.error = '';

    $scope.login = function() {
      var data = {
        email: $scope.email,
        password: $scope.password
      };

      UserService.userLogin(data)
        .then(function(user) {
          console.log(user);
          $scope.email = '';
          $scope.password = '';
          $scope.error = '';
          $rootScope.$broadcast('user-login', {user: user});
        })
        .catch(function(err) {
          console.log(err);
          $scope.error = err.message;
        });
    };
  }]);