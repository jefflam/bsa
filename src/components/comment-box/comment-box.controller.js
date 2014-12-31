'use strict';

angular.module('bsa')
  .controller('CommentBoxCtrl', ['$scope', 'PostService', function($scope, PostService) {
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
    }
  }]);