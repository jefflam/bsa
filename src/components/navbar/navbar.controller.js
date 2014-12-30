'use strict';

angular.module('bsa')
  .controller('NavbarCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
    });
    $scope.showSignup = function() {
      $rootScope.$broadcast('show-signup');
    }
    $scope.showLogin = function() {
      $rootScope.$broadcast('show-login');
    }
    $scope.showSubmission = function() {
      $rootScope.$broadcast('show-submission');
    }
    $scope.updateFilter = function(type) {
      $rootScope.$broadcast('submission-filter', {filter: type});
    }
    $scope.logout = function() {
      UserService.userLogout()
        .then(function(rsp) {
          console.log('Logged out successfully');
          $rootScope.$broadcast('user-logout');
        })
        .catch(function(err) {
          console.log('Error logging out');
        });
    };
  }]);