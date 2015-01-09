'use strict';

angular.module('bsa', ['ui.router', 'ngAnimate', 'firebase', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('comments', {
        url: '/:postId',
        // templateUrl: 'app/main/main.html',
        onEnter: function($stateParams, $state, $modal) {
          $modal.open({
            templateUrl: 'components/comment-box/comment-box.html',
            resolve: {
              item: function() { new Item(123).get(); }
            },
            controller: ['$scope', 'item', function($scope, item) {
              $scope.dismiss = function() {
                $scope.$dismiss();
              };

              $scope.save = function() {
                item.update().then(function() {
                  $scope.$close(true);
                });
              };
            }]
          }).result.then(function(result) {
            if (result) {
                return $state.transitionTo("items");
            }
          })
        }
        // onEnter: ['$modal', function($modal) {
        //   console.log('hello');
        //   $modal.open({
        //     templateUrl: 'components/comment-box/comment-box.html'
        //   });
        // }]
        // resolve: {
        //   // templateUrl: 'components/comment-box/comment-box.html',
        //   reloadOnSearch: false
        // }


      });

    $urlRouterProvider.otherwise('/');
  })
;
