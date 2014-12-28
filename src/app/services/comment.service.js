'use strict';

angular.module('bsa')
  .factory('CommentService', ['$http', '$q', function($http, $q) {
    var service = {
      getComments: function(submissionId) {
        var q = $q.defer();
        // Insert $http later or firebase
        var data = {
          comments: [{
            comment: 'Hello',
            author: 'Jeff Lam'
          },
          {
            comment: 'Hello',
            author: 'Jeff Lam'
          }]
        };
        $q.resolve(data);
        return $q.promise();
      }
    };
    return service;
  }]);