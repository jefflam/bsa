'use strict';

angular.module('bsa')
  .factory('SubmissionService', ['$http', '$q', '$firebase', function($http, $q, $firebase) {
    var service = {
      getSubmissions: function(limit) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com/submissions');
        var ref = ref.orderByChild('timeSubmitted').limitToLast(limit);
        var sync = $firebase(ref);
        var syncArray = sync.$asArray();

        q.resolve(syncArray);
        return q.promise;
      },
      getSubmission: function(submissionId) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com/submissions/' + submissionId);
        var sync = $firebase(ref);
        var syncObject = sync.$asObject();

        q.resolve(syncObject);
        return q.promise;
      },
      postSubmission: function(submission) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com/submissions');
        var sync = $firebase(ref);
        var syncArray = sync.$asArray();
        console.log(submission);

        console.log(submission);
        syncArray.$add(submission).then(function(ref) {
          ref.update({ timeSubmitted: Firebase.ServerValue.TIMESTAMP });
          q.resolve(ref);
        });

        return q.promise;
      },
      upvoteSubmission: function(submissionId, userId) {
        var q = $q.defer();
        var submissionsRef = new Firebase('https://bsa.firebaseio.com/submissions');
        var usersRef = new Firebase('https://bsa.firebaseio.com/users');
        // var syncSubmissionObject = $firebase(submissionsRef.child(submissionId)).$asObject();
        // var syncUserObject = $firebase(usersRef.child(userId)).$asObject();


        usersRef.child(userId + '/upvotes/' + submissionId).once('value', function(data) {
          if (data.val() === true) {
            // User has upvoted this submission before, do not allow
            var err = 'You have already upvoted this submission.';
            q.reject(err);
          } else {
            usersRef.child(userId + '/upvotes/' + submissionId).set(true);
            submissionsRef.child(submissionId + '/upvotes').transaction(function(currentValue) {
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