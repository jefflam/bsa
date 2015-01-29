'use strict';

angular.module('bsa')
  .controller('CommentBoxCtrl', ['$scope', '$rootScope', 'PostService', function($scope, $rootScope, PostService) {
    $scope.$on('show-comments', function(evt, args) {
      $scope.postId = args.postId

      PostService.getPost($scope.postId)
        .then(function(post) {
          $scope.post = post;
        });
    });

    $scope.upvotePost = function(postId, userId) {
      PostService.upvotePost(postId, 'user1')
        .then(function(rsp) {
          console.log(rsp);
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.removePost = function(postId) {
      PostService.removePost(postId)
        .then(function(rsp) {
          $rootScope.$broadcast('post-remove');
        })
    };

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      $scope.admin = $scope.user.admin;
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
      $scope.admin = false;
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      $scope.admin = $scope.user.admin;
    });
  }]);