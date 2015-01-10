'use strict';

angular.module('bsa')
  .controller('MainCtrl', ['$scope', '$rootScope', '$state', '$timeout', 'UserService', function ($scope, $rootScope, $state, $timeout, UserService) {
    $scope.commentBox = false;
    $scope.signupBox = false;
    $scope.loginBox = false;
    $scope.postBox = false;
    $scope.forgotPasswordBox = false;
    $scope.profile = false;
    $rootScope.noScroll = false;

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
      $rootScope.noScroll = true;
    });
    $scope.$on('show-signup', function(evt, args) {
      $scope.signupBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('show-forgot-password', function(evt, args) {
      $scope.loginBox = false;
      $scope.forgotPasswordBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('show-login', function(evt, args) {
      console.log('login');
      $scope.loginBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('show-post', function(evt, args) {
      $scope.postBox = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('show-profile', function(evt, args) {
      $scope.profile = true;
      $rootScope.noScroll = true;
    });
    $scope.$on('post-success', function(evt, args) {
      $scope.postBox = false;
      $rootScope.noScroll = false;
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      $scope.signupBox = false;
      $rootScope.noScroll = false;
    });
    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      $scope.loginBox = false;
      $rootScope.noScroll = false;
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
    });

    $scope.hideOverlay = function() {
      $scope.commentBox = false;
      $scope.signupBox = false;
      $scope.loginBox = false;
      $scope.postBox = false;
      $scope.forgotPasswordBox = false;
      $scope.profile = false;
      $rootScope.noScroll = false;
      $state.go('home');
    }

    // Check if user arrived with params
    if ($state.params.postId !== undefined) {
      $timeout(function() {
        $rootScope.$broadcast('show-comments', { postId: $state.params.postId });
        $rootScope.noScroll = true;
      }, 2000);
    } else if ($state.params.userId !== undefined) {
      $timeout(function() {
        $rootScope.$broadcast('show-profile', { userId: $state.params.userId });
        $rootScope.noScroll = true;
      }, 2000);
    }
  }]);
