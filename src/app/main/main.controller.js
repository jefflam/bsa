'use strict';

angular.module('bsa')
  .controller('MainCtrl', ['$scope', '$rootScope', 'UserService', function ($scope, $rootScope, UserService) {
    $scope.commentBox = false;
    $scope.signupBox = false;
    $scope.loginBox = false;
    $scope.submissionBox = false;

    // Check if user is already logged in
    UserService.getAuth()
      .then(function(user) {
        $rootScope.$broadcast('user-login', {user: user});
      })
      .catch(function(err) {
        console.log(err);
      });

    $scope.$on('show-comments', function(evt, args) {
      $scope.commentBox = true;
    });
    $scope.$on('show-signup', function(evt, args) {
      $scope.signupBox = true;
    });
    $scope.$on('show-login', function(evt, args) {
      $scope.loginBox = true;
    });
    $scope.$on('show-submission', function(evt, args) {
      $scope.submissionBox = true;
    });
    $scope.$on('submission-success', function(evt, args) {
      $scope.submissionBox = false;
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.signupBox = false;
    });
    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      $scope.loginBox = false;
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
    });

    $scope.hideOverlay = function() {
      $scope.commentBox = false;
      $scope.signupBox = false;
      $scope.loginBox = false;
      $scope.submissionBox = false;
    }
  }]);
