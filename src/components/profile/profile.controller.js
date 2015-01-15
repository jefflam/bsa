'use strict';

angular.module('bsa')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$timeout', 'UserService', 'MessageService', function($scope, $rootScope, $timeout, UserService, MessageService) {
    $scope.isCurrentUser = false;
    $scope.isNotCurrentUser = true;
    $scope.error = null;
    $scope.success = null;
    $scope.currentPassword = null;
    $scope.newPassword = null;
    $scope.newPasswordAgain = null;
    $scope.message = {};

    $scope.$on('user-login', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('signup-success', function(evt, args) {
      $scope.user = args.user.val();
      $scope.userId = args.user.key();
    });
    $scope.$on('show-profile', function(evt, args) {
      $scope.userId = args.userId;

      UserService.getUser($scope.userId)
        .then(function(user) {
          $scope.userProfile = user;
          if ($scope.userProfile.id === $scope.user.id) {
            $scope.isCurrentUser = true;
            $scope.isNotCurrentUser = false;
          } else {
            $scope.isCurrentUser = false;
            $scope.isNotCurrentUser = true;
          }
        });
    });
    $scope.$on('user-logout', function(evt, args) {
      $scope.user = null;
      $scope.isCurrentUser = false;
      $scope.isNotCurrentUser = true;
    });

    $scope.saveProfile = function() {
      var data = {
        name: $scope.userProfile.name,
        email: $scope.userProfile.email,
        matriculation: $scope.userProfile.matriculation,
        occupation: $scope.userProfile.occupation,
        company: $scope.userProfile.company,
        industry: $scope.userProfile.industry,
        bio: $scope.userProfile.bio
      };

      UserService.editUser($scope.user.id, data)
        .then(function() {
          $scope.success = 'Profile updated successfully.';
          $scope.error = null;
          $timeout(function() {
            $scope.success = null;
          }, 3000);
        })
        .catch(function(err) {
          $scope.error = err.message;
          $scope.success = null;
          $timeout(function() {
            $scope.error = null;
        }, 3000);
        });
    };
    $scope.changePassword = function() {
      if ($scope.currentPassword === undefined || $scope.currentPassword === '' || $scope.currentPassword === null) {
        $scope.error = 'Please enter your current password.';
        $timeout(function() {
          $scope.error = null;
        }, 3000);
        return;
      }
      if ($scope.currentPassword === undefined || $scope.newPassword === '' || $scope.newPassword === null || $scope.newPassword.length < 8) {
        $scope.error = 'Your new password must be at least 8 characters long.';
        $timeout(function() {
          $scope.error = null;
        }, 3000);
        return;
      }
      if ($scope.newPasswordAgain === undefined || $scope.newPasswordAgain === null || $scope.newPasswordAgain === '' || ($scope.newPassword !== $scope.newPasswordAgain)) {
        $scope.error = 'Your new password does not match.';
        $timeout(function() {
          $scope.error = null;
        }, 3000);
        return;
      }

      var data = {
        email: $scope.user.email,
        oldPassword: $scope.currentPassword,
        newPassword: $scope.newPassword,
      };

      UserService.changePassword(data)
        .then(function() {
          $scope.error = null;
          $scope.success = 'Your password has been successfully changed.';
          $timeout(function() {
            $scope.success = null;
          }, 3000);
        })
        .catch(function(err) {
          $scope.error = err.message;
          $scope.success = null;
          $timeout(function() {
            $scope.error = null;
          }, 3000);
        });
    };

    $scope.sendMessage = function() {
      if ($scope.message.message === null || $scope.message.message === '') {
        $scope.message.error = 'Please enter a message you want to send.';
        $timeout(function() {
          $scope.message.error = null;
        }, 3000);
        return;
      }

      var data = {
        from: {
          id: $scope.user.id,
          name: $scope.user.name,
          email: $scope.user.email
        },
        to: {
          id: $scope.userProfile.id,
          name: $scope.userProfile.name,
          email: $scope.userProfile.email
        },
        message: $scope.message.message
      };

      MessageService.sendMessageViaEmail(data)
        .then(function(rsp) {
          $scope.message.success = 'Your message has been sent successfully.';
          $scope.message.error = null;
          $scope.message.message = null;
          $timeout(function() {
            $scope.message.success = null;
          }, 3000);
        })
        .catch(function(err) {
          $scope.message.success = null;
          $scope.message.error = err.message;
          $timeout(function() {
            $scope.message.error = null;
          }, 3000);
        });
    };
  }]);