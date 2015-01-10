'use strict';

angular.module('bsa')
  .controller('PostCtrl', ['$scope', '$rootScope', 'PostService', function($scope, $rootScope, PostService) {
    $scope.order = ['-upvotes', '-timeSubmitted'];
    $scope.filter = '';
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

    // By default, show 20 posts
    PostService.getPosts(20)
      .then(function(posts) {
        $scope.posts = posts;
      });

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.userId = null;
    })
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('post-filter', function(evt, args) {
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
      PostService.getPosts(args.posts)
        .then(function(posts) {
          $scope.posts = posts;
        });
    });

    $scope.showProfile = function(userId) {
      $rootScope.$broadcast('show-profile', {userId: userId});
    };
    $scope.upvotePost = function(postId) {
      PostService.upvotePost(postId, $scope.userId)
        .then(function(rsp) {
          console.log(rsp);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
    $scope.showComments = function(postId) {
      $rootScope.$broadcast('show-comments', { postId: postId });
    };
  }]);
