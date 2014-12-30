'use strict';

angular.module('bsa')
  .controller('SubmissionPostCtrl', ['$scope', '$rootScope', 'SubmissionService', function($scope, $rootScope, SubmissionService) {
    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
    });
    $scope.types = [
      { name: 'link' },
      { name: 'event' },
      { name: 'job' },
      { name: 'discussion' }
    ];
    $scope.type = $scope.types[0];

    $scope.postSubmission = function() {
      var submission = {
        title: $scope.title,
        description: $scope.description,
        link: $scope.link,
        type: $scope.type['name'],
        text: $scope.text,
        upvotes: 0,
        commentsCount: 0,
        comments: {},
        timeSubmitted: new Date(),
        submitted: {
          userId: $scope.userId,
          name: $scope.user.name
        }
      };

      if (submission.type === 'link') {
        submission.text = null;
      }

      SubmissionService.postSubmission(submission)
        .then(function(rsp) {
          $scope.title = null;
          $scope.description = null;
          $scope.link = null;
          $scope.type = $scope.types[0];
          $scope.text = $scope.types[0];

          $rootScope.$broadcast('submission-success');
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }]);
