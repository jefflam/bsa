'use strict';

angular.module('bsa')
  .controller('CommentPostCtrl', ['$scope', '$rootScope', 'CommentService', function($scope, $rootScope, CommentService) {
    $scope.comment = null;

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
    $scope.$on('show-comments', function(evt, args) {
      $scope.postId = args.postId;
    });

    $scope.postComment = function() {
      if ($scope.comment === '' || $scope.comment === null) {
        $scope.error = 'You cannot submit an empty comment';
        return;
      } else {
        $scope.error = null;
      }

      var data = {
        postId: $scope.postId,
        text: $scope.comment,
        commented: {
          name: $scope.user.name,
          userId: $scope.userId
        }
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