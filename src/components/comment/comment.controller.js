'use strict';

angular.module('bsa')
  .controller('CommentCtrl', ['$scope', 'CommentService', function($scope, CommentService) {
    $scope.$on('show-comments', function(evt, args) {
      console.log('hi');
      $scope.comments = [];

      $scope.submissionId = args.submissionId;

      CommentService.getCommentsFromSubmission($scope.submissionId)
        .then(function(comments) {
          console.log(comments);
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