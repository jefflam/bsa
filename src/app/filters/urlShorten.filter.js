'use strict';

angular.module('bsa')
  .filter('urlShorten', function() {
    return function(url) {
      if (url === undefined) {
        return url;
      }
      var regex = new RegExp('http://www.|https://www.|http://|https://|www.');
      var urlMatch = url.match(regex);
      if (urlMatch !== null) {
        var urlShorten = url.split(urlMatch)[1];
        urlShorten = urlShorten.split('/')[0];
        return urlShorten;
      } else {
        return url;
      }
    }
  });
