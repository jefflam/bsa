'use strict';

angular.module('bsa')
  .controller('SubmissionCtrl', ['$scope', '$rootScope', 'SubmissionService', function($scope, $rootScope, SubmissionService) {
    $scope.order = ['-upvotes', '-timeSubmitted'];
    $scope.filter = '';

    // By default, show 20 posts
    SubmissionService.getSubmissions(20)
      .then(function(submissions) {
        $scope.submissions = submissions;
      });

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('submission-filter', function(evt, args) {
      console.log(args);
      if (args.filter === 'popular') {
        $scope.filter = '';
        $scope.order = ['-upvotes', '-timeSubmitted'];
      } else if (args.filter === 'new') {
        $scope.filter = '';
        $scope.order = ['-timeSubmitted', '-upvotes'];
      } else {
        $scope.filter = args.filter;
        $scope.order = ['-upvotes', '-timeSubmitted'];
      }
    });
    $scope.$on('post-limit', function(evt, args) {
      SubmissionService.getSubmissions(args.posts)
        .then(function(submissions) {
          $scope.submissions = submissions;
        });
    });

    $scope.upvoteSubmission = function(submissionId) {
      SubmissionService.upvoteSubmission(submissionId, $scope.userId)
        .then(function(rsp) {
          console.log(rsp);
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.showComments = function(submissionId) {
      $rootScope.$broadcast('show-comments', { submissionId: submissionId });
    };
  }]);
