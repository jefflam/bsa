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

    $scope.$on('add-comment', function(evt, args) {
      $scope.comments.push(args.comment);
    });
  }]);