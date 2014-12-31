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
    function getPosts() {
      PostService.getPosts(20)
        .then(function(posts) {

          for (var i=0; i<posts.length; i++) {
            posts[i].userHasUpvoted = false;
            if (posts[i].upvoters === undefined || posts[i].upvoters === null) {
              continue;
            }
            for (var i2=0; i2<Object.keys(posts[i].upvoters).length; i2++) {
              if (Object.keys(posts[i].upvoters)[i2] === $scope.userId) {
                posts[i].userHasUpvoted = true;
              }
            }
          }
          $scope.posts = posts;

          console.log($scope.posts);
        });
    }

    getPosts();

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
      getPosts();
    });
    $scope.$on('user-logout', function(evt, args) {
      getPosts();
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

    $scope.upvotePost = function(postId) {
      PostService.upvotePost(postId, $scope.userId)
        .then(function(rsp) {
          for (var i=0; i<$scope.posts.length; i++) {
            console.log($scope.posts[i].userHasUpvoted);
            if ($scope.posts[i].$id === postId) {
              getPosts();
              break;
            }
          }
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
