'use strict';

angular.module('bsa')
  .controller('SubmissionPostCtrl', ['$scope', '$rootScope', 'SubmissionService', function($scope, $rootScope, SubmissionService) {
    $scope.types = [
      { name: 'link' },
      { name: 'event' },
      { name: 'job' },
      { name: 'discussion' }
    ];
    $scope.title = '';
    $scope.url = '';
    $scope.description = '';
    $scope.type = $scope.types[0];
    $scope.text = '';

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });

    $scope.postSubmission = function() {
      if ($scope.title === '') {
          $scope.error = 'Please enter a title.';
          return;
      }
      if ($scope.type.name === 'link' && $scope.url === '') {
          $scope.error = 'A URL is required if you are posting a link.';
          return;
      }
      if ($scope.description === '') {
          $scope.error = 'Please enter a short description to help others know what your post is about quickly.';
          return;
      }
      if ($scope.type.name !== 'link' && $scope.text === '') {
          $scope.error = 'A description is required if you are posting a job, event or a discussion.';
          return;
      }

      var submission = {
        title: $scope.title,
        description: $scope.description,
        url: $scope.url,
        type: $scope.type.name,
        text: $scope.text,
        upvotes: 0,
        commentsCount: 0,
        comments: {},
        submitted: {
          userId: $scope.userId,
          name: $scope.user.name
        }
      };

      if (submission.type === 'link') {
        submission.text = '';
      }

      SubmissionService.postSubmission(submission)
        .then(function(rsp) {
          $scope.title = '';
          $scope.description = '';
          $scope.url = '';
          $scope.type = $scope.types[0];
          $scope.text = '';

          $rootScope.$broadcast('submission-success');
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }]);
