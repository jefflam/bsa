'use strict';

angular.module('bsa')
  .controller('SubmissionCtrl', function ($scope) {
    $scope.submissions = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'author': 'angular.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'author': 'browsersync.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'author': 'gulp.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'author': 'jasmine.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'author': 'karma.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'author': 'protractor.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'Foundation',
        'url': 'http://foundation.zurb.com/',
        'description': 'The most advanced responsive front-end framework in the world.',
        'author': 'foundation.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      },
      {
        'title': 'Sass (Node)',
        'url': 'https://github.com/sass/node-sass',
        'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
        'author': 'node-sass.png',
        'time_submitted': '10 minutes ago',
        'upvotes': 12,
        'comments': 27
      }
    ];
    // angular.forEach($scope.s=, function(awesomeThing) {
    //   awesomeThing.rank = Math.random();
    // });
  });
