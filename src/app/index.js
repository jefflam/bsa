'use strict';

angular.module('bsa', ['ui.router', 'ngAnimate', 'firebase'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('profile', {
        url: '/profile/:userId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('post', {
        url: '/post/:postId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.deferIntercept();
    $urlRouterProvider.otherwise('/#');
  }])
  .run(['$rootScope', '$location', '$state', function($rootScope, $location, $state) {
    $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
      var itemId;

      if ($location.path().match('post') || $location.path().match('profile')) {
        itemId = $location.path().split('/')[2];
      }

      if (
        ($location.path() === '' || $location.path() === '/' || $location.path() === '/#')
        && (newUrl === $location.absUrl())
        && (oldUrl === $location.absUrl())
        && (oldUrl === newUrl)
      ) {
        $state.go('home');
      } else if ($location.path().match('post') && newUrl === $location.absUrl() && oldUrl === $location.absUrl() && oldUrl === newUrl) {
        $state.go('post', {postId: itemId});
      } else if ($location.path().match('profile') && newUrl === $location.absUrl() && oldUrl === $location.absUrl() && oldUrl === newUrl) {
        $state.go('profile', {userId: itemId});
      } else {
        e.preventDefault();
      }
    });
  }])
  // .constant('FIREBASE_URL', 'https://bsa-dev.firebaseio.com/');
  // .constant('FIREBASE_URL', 'https://bsa-staging.firebaseio.com/');
  .constant('FIREBASE_URL', 'https://bsa.firebaseio.com/');