'use strict';

angular.module('bsa')
  .controller('PostPostCtrl', ['$scope', '$rootScope', 'PostService', function($scope, $rootScope, PostService) {
    $scope.types = [
      { name: 'Link', value: 'link' },
      { name: 'Event', value: 'event' },
      { name: 'Job', value: 'job' },
      { name: 'Discussion', value: 'discussion' }
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

    $scope.postPost = function() {
      if ($scope.title === '') {
          $scope.error = 'Please enter a title.';
          return;
      }
      if ($scope.type.value === 'link' && $scope.url === '') {
          $scope.error = 'A URL is required if you are posting a link.';
          return;
      }
      if ($scope.description === '') {
          $scope.error = 'Please enter a short description to help others know what your post is about quickly.';
          return;
      }
      if ($scope.type.value !== 'link' && $scope.text === '') {
          $scope.error = 'A description is required if you are posting a job, event or a discussion.';
          return;
      }

      var httpRegex = 'http://';
      var httpsRegex = 'https://';
      if (!$scope.url.match(httpRegex) && !$scope.url.match(httpsRegex)) {
        $scope.url = 'http://' + $scope.url;
      }
      var userId = $scope.userId.split(':')[1];

      var post = {
        title: $scope.title,
        description: $scope.description,
        url: $scope.url,
        type: $scope.type.value,
        text: $scope.text,
        upvotes: 0,
        commentsCount: 0,
        comments: {},
        submitted: {
          userId: userId,
          name: $scope.user.name
        }
      };

      if (post.type === 'link') {
        post.text = '';
      }

      PostService.postPost(post)
        .then(function(rsp) {
          $scope.title = '';
          $scope.description = '';
          $scope.url = '';
          $scope.type = $scope.types[0];
          $scope.text = '';

          $rootScope.$broadcast('post-success');
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }]);
