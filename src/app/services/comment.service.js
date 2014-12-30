'use strict';

angular.module('bsa')
  .factory('CommentService', ['$http', '$q', '$firebase', function($http, $q, $firebase) {
    var service = {
      getCommentsFromSubmission: function(submissionId) {
        var q = $q.defer();
        var commentsRef = new Firebase('https://bsa.firebaseio.com/comments');
        var submissionRef = new Firebase('https://bsa.firebaseio.com/submissions');
        var submissionCommentsRef = submissionRef.child(submissionId).child('comments');
        var comments = [];

        // Check if there are comments, else
        // we have to leave it as empty for another submission
        submissionCommentsRef.on('value', function(data) {
          if (data.val() !== null) {
            // We use a counter to determine how many children there are
            // and when to resolve q.
            // else it is simply operating on each callback and the returned comments
            // will not be consistently all of them.
            var counter = 0;
            var numChildren = data.numChildren();

            submissionCommentsRef.on('child_added', function(snap) {
              commentsRef.child(snap.key()).once('value', function(snap2) {
                console.log('LOL');
                comments.push(snap2.val());
                counter++;

                // Check to see if this is the last child, if so, resolve q
                if (counter >= numChildren) {
                  submissionCommentsRef.off();
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
        var submissionId = data.submissionId;
        var commentsRef = new Firebase('https://bsa.firebaseio.com/comments');
        var commentsSync = $firebase(commentsRef);
        var submissionRef = new Firebase('https://bsa.firebaseio.com/submissions');
        commentsSync.$push(data).then(function(newChildRef) {
          // Set reference for comment in submissions in nested commments
          var commentsCount = submissionRef.child(submissionId + '/commentsCount');
          submissionRef.child(submissionId + '/comments/' + newChildRef.key()).set(true);
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