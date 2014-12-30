'use strict';

angular.module('bsa')
  .controller('CommentBoxCtrl', ['$scope', 'SubmissionService', function($scope, SubmissionService) {
    $scope.$on('show-comments', function(evt, args) {
      $scope.submissionId = args.submissionId

      SubmissionService.getSubmission($scope.submissionId)
        .then(function(submission) {
          $scope.submission = submission;
        });
    });

    $scope.upvoteSubmission = function(submissionId, userId) {
      SubmissionService.upvoteSubmission(submissionId, 'user1')
        .then(function(rsp) {
          console.log(rsp);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }]);