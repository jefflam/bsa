'use strict';

angular.module('bsa')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });