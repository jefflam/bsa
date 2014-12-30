'use strict';

angular.module('bsa')
  .controller('SignupCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.name = '';
    $scope.email = '';
    $scope.password = '';
    $scope.passwordAgain = '';
    $scope.error = '';

    $scope.signup = function() {
      var data = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      };

      if ($scope.name === '') {
          $scope.error = 'Please enter your name.';
          return;
      }
      if ($scope.email === '') {
          $scope.error = 'Please enter your email.';
          return;
      }
      if ($scope.password === '') {
          $scope.error = 'Please enter a password.';
          return;
      }
      if ($scope.password !== $scope.passwordAgain) {
          $scope.error = 'Your passwords do not match. Please check again.';
          return;
      }

      UserService.createNewUser(data)
        .then(function(user) {
          console.log(user.val());
          $scope.name = '';
          $scope.email = '';
          $scope.password = '';
          $scope.passwordAgain = '';
          $scope.error = '';
          $rootScope.$broadcast('signup-success', {user: user});
        })
        .catch(function(err) {
          console.log(err);
          $scope.error = err.message;
        });
    };
  }]);