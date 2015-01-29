'use strict';

angular.module('bsa')
  .controller('CommentCtrl', ['$scope', 'CommentService', function($scope, CommentService) {
    $scope.$on('show-comments', function(evt, args) {
      $scope.comments = [];

      $scope.postId = args.postId;

      CommentService.getCommentsFromPost($scope.postId)
        .then(function(comments) {
          $scope.comments = comments;
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    $scope.removeComment = function(comment) {
      CommentService.removeComment(comment.id)
        .then(function(rsp) {
          comment.text = 'Comment deleted.';
        });
    };

    $scope.$on('add-comment', function(evt, args) {
      $scope.comments.push(args.comment);
    });
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