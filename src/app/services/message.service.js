'use strict';

angular.module('bsa')
  .factory('MessageService', ['$http', '$q', '$firebase', 'FIREBASE_URL', function($http, $q, $firebase, FIREBASE_URL) {
    var service = {
      sendMessageViaEmail: function(data) {
        var q = $q.defer();
        var messagesRef = new Firebase(FIREBASE_URL + 'messages');
        var newMessageRef = messagesRef.push();

        newMessageRef.set(data, function(err) {
          if (err) {
            q.reject(err);
          } else {
            newMessageRef.update({ timeSubmitted: Firebase.ServerValue.TIMESTAMP });
            q.resolve(newMessageRef);
          }
        });
        return q.promise;
      }
    };
    return service;
  }]);