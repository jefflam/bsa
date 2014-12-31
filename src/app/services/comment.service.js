'use strict';

angular.module('bsa')
  .factory('CommentService', ['$http', '$q', '$firebase', function($http, $q, $firebase) {
    var service = {
      getCommentsFromPost: function(postId) {
        var q = $q.defer();
        var commentsRef = new Firebase('https://bsa.firebaseio.com/comments');
        var postRef = new Firebase('https://bsa.firebaseio.com/posts');
        var postCommentsRef = postRef.child(postId).child('comments');
        var comments = [];

        // Check if there are comments, else
        // we have to leave it as empty for another post
        postCommentsRef.on('value', function(data) {
          if (data.val() !== null) {
            // We use a counter to determine how many children there are
            // and when to resolve q.
            // else it is simply operating on each callback and the returned comments
            // will not be consistently all of them.
            var counter = 0;
            var numChildren = data.numChildren();

            postCommentsRef.on('child_added', function(snap) {
              commentsRef.child(snap.key()).once('value', function(snap2) {
                comments.push(snap2.val());
                counter++;
                // Check to see if this is the last child, if so, resolve q
                if (counter >= numChildren) {
                  postCommentsRef.off();
                  q.resolve(comments);
                }
              });
            });
          } else {
            q.resolve(comments);
          }
        });

        return q.promise;
      },
      postComment: function(data) {
        var q = $q.defer();
        var postId = data.postId;
        var commentsRef = new Firebase('https://bsa.firebaseio.com/comments');
        var commentsSync = $firebase(commentsRef);
        var postRef = new Firebase('https://bsa.firebaseio.com/posts');
        commentsSync.$push(data).then(function(newChildRef) {
          newChildRef.update({ timeSubmitted: Firebase.ServerValue.TIMESTAMP });
          // Set reference for comment in posts in nested commments
          var commentsCount = postRef.child(postId + '/commentsCount');
          postRef.child(postId + '/comments/' + newChildRef.key()).set(true);
          commentsCount.transaction(function(currentValue) {
            q.resolve(newChildRef);
            return (currentValue || 0) + 1;
          });
        });

        return q.promise;
      },
    };
    return service;
  }]);