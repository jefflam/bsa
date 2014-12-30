'use strict';

angular.module('bsa')
  .controller('CommentPostCtrl', ['$scope', '$rootScope', 'CommentService', function($scope, $rootScope, CommentService) {
    $scope.comment = null;

    $scope.$on('show-comments', function(evt, args) {
      $scope.submissionId = args.submissionId;
    });

    $scope.postComment = function() {
      var data = {
        submissionId: $scope.submissionId,
        text: $scope.comment,
        author: 'user1'
      };

      CommentService.postComment(data)
        .then(function(rsp) {
          $scope.comment = null;
          $rootScope.$broadcast('add-comment', {comment: data});
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }]);