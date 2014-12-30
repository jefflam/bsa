'use strict';

angular.module('bsa')
  .controller('NavbarCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.filtersSubMenu = false;
    $scope.postsSubMenu = false;
    $scope.filter = {
      icon: 'fa-star',
      name: 'POPULAR'
    };
    $scope.postLimit = 20;

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });

    $scope.showSignup = function() {
      $rootScope.$broadcast('show-signup');
    };
    $scope.showLogin = function() {
      $rootScope.$broadcast('show-login');
    };
    $scope.showSubmission = function() {
      $rootScope.$broadcast('show-submission');
    };
    $scope.showFiltersSubMenu = function() {
      $scope.filtersSubMenu = true;
    };
    $scope.showPostsSubMenu = function() {
      $scope.postsSubMenu = true;
    };
    $scope.hideFiltersSubMenu = function() {
      $scope.filtersSubMenu = false;
    };
    $scope.hidePostsSubMenu = function() {
      $scope.postsSubMenu = false;
    };
    $scope.updateFilter = function(type) {
      switch (type) {
        case 'popular':
          $scope.filter.icon = 'fa-star';
          $scope.filter.name = 'POPULAR';
          break;
        case 'new':
          $scope.filter.icon = 'fa-rss';
          $scope.filter.name = 'NEWEST';
          break;
        case 'link':
          $scope.filter.icon = 'fa-link';
          $scope.filter.name = 'LINKS';
          break;
        case 'event':
          $scope.filter.icon = 'fa-calendar';
          $scope.filter.name = 'EVENTS';
          break;
        case 'job':
          $scope.filter.icon = 'fa-dollar';
          $scope.filter.name = 'JOBS';
          break;
        case 'discussion':
          $scope.filter.icon = 'fa-comment';
          $scope.filter.name = 'DISCUSSIONS';
          break;
        default:
          $scope.filter.icon = 'fa-star';
          $scope.filter.name = 'POPULAR';
          break;
      }
      $rootScope.$broadcast('submission-filter', {filter: type});
    };
    $scope.updatePosts = function(limit) {
      switch (limit) {
        case 10:
          $scope.postLimit = 10;
          break;
        case 20:
          $scope.postLimit = 20;
          break;
        case 50:
          $scope.postLimit = 50;
          break;
        case 100:
          $scope.postLimit = 100;
          break;
        default:
          $scope.postLimit = 20;
          break;
      }
      $rootScope.$broadcast('post-limit', {posts: $scope.postLimit});
    };
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