'use strict';

angular.module('bsa')
  .controller('SubmissionCtrl', ['$scope', '$rootScope', 'SubmissionService', function($scope, $rootScope, SubmissionService) {
    $scope.filter = '';

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('submission-filter', function(evt, args) {
      $scope.filter = args.filter;
    });

    SubmissionService.getSubmissions()
      .then(function(submissions) {
        $scope.submissions = submissions;
      });

    $scope.upvoteSubmission = function(submissionId, userId) {
      SubmissionService.upvoteSubmission(submissionId, userId)
        .then(function(rsp) {
          console.log(rsp);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    $scope.showComments = function(submissionId) {
      $rootScope.$broadcast('show-comments', { submissionId: submissionId });
    }
  }]);
