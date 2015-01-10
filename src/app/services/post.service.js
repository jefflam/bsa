'use strict';

angular.module('bsa')
  .factory('PostService', ['$http', '$q', '$firebase', function($http, $q, $firebase) {
    var service = {
      getPosts: function(limit) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com/posts');
        var ref = ref.orderByChild('timeSubmitted').limitToLast(limit);
        var sync = $firebase(ref);
        var syncArray = sync.$asArray();

        syncArray.$loaded(function() {
          q.resolve(syncArray);
        });
        return q.promise;
      },
      getPost: function(postId) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com/posts/' + postId);
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();

        q.resolve(syncObject);
        return q.promise;
      },
      postPost: function(post) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com/posts');
        var sync = $firebase(ref);
        var syncArray = sync.$asArray();
        syncArray.$add(post).then(function(ref) {
          ref.update({ timeSubmitted: Firebase.ServerValue.TIMESTAMP });
          q.resolve(ref);
        });

        return q.promise;
      },
      upvotePost: function(postId, userId) {
        var q = $q.defer();
        var postsRef = new Firebase('https://bsa.firebaseio.com/posts');
        var usersRef = new Firebase('https://bsa.firebaseio.com/users');
        // var syncpostObject = $firebase(postsRef.child(postId)).$asObject();
        // var syncUserObject = $firebase(usersRef.child(userId)).$asObject();


        usersRef.child(userId + '/upvotes/' + postId).once('value', function(data) {
          if (data.val() === true) {
            // User has upvoted this post before, do not allow
            var err = 'You have already upvoted this post.';
            q.reject(err);
          } else {
            usersRef.child(userId + '/upvotes/' + postId).set(true);
            postsRef.child(postId + '/upvoters/' + userId).set(true);
            postsRef.child(postId + '/upvotes').transaction(function(currentValue) {
              currentValue = (currentValue || 0) + 1;
              q.resolve(currentValue);
              return currentValue;
            });
          }
        });
        return q.promise;
      }
    };
    return service;
  }]);