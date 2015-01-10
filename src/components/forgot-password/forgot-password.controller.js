'use strict';

angular.module('bsa')
  .controller('ForgotPasswordCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $scope.email = '';
    $scope.error = null;

    $scope.sendResetPasswordEmail = function() {
      if ($scope.email === null || $scope.email === '') {
        $scope.error = 'Please enter the email address you signed up with for us to send you a new password.'
        ;
        return;
      }
      UserService.sendResetPasswordEmail($scope.email)
        .then(function() {
          $scope.success = 'Email with a new password is sent to your email address.';
          $scope.error = null;
        })
        .catch(function(err) {
          $scope.error = err.message;
          $scope.success = null;

        });
    };
  }]);