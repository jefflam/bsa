'use strict';

angular.module('bsa')
  .controller('CommentBoxCtrl', ['$scope', 'SubmissionService', 'CommentService',function($scope, SubmissionService, CommentService) {
    $scope.submission = SubmissionService.getSubmission();
    $scope.comments = CommentService.getComments();
    console.log($scope.submission);
    console.log($scope.comments);
  }]);