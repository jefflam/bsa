'use strict';

angular.module('bsa')
  .factory('SubmissionService', ['$http', '$q', function($http, $q) {
    var service = {
      getSubmission: function(submissionId) {
        var q = $q.defer();
        // Insert $http later or firebase
        var data = {
          submission: {
            'title': 'AngularJS',
            'url': 'https://angularjs.org/',
            'description': 'HTML enhanced for web apps!',
            'author': 'angular.png',
            'time_submitted': '10 minutes ago',
            'upvotes': 12,
            'comments': 27
          }
        };
        $q.resolve(data);
        return $q.promise();
      }
    };
    return service;
  }]);