'use strict';

angular.module('bsa')
  .factory('UserService', ['$http', '$q', '$firebase', 'FIREBASE_URL', function($http, $q, $firebase, FIREBASE_URL) {
    var service = {
      createNewUser: function(data) {
        var q = $q.defer();
        var ref = new Firebase(FIREBASE_URL);
        ref.createUser(data, function(err) {
          if (err === null) {
            console.log('User created successfully.', err);
            // Log the user in
            ref.authWithPassword(data, function(err, authData) {
              if (err === null) {
                console.log('Logged in succesfully.');
                ref.child('users').child(authData.uid).once('value', function(snap) {
                  // Store user data in datastore if not yet
                  // should happen only for new users
                  if (snap.val() === null) {
                    ref.onAuth(function(authData2) {
                      var userId = authData2.uid.split(':')[1];
                      ref.child('users').child(authData2.uid).set({
                        id: userId,
                        email: data.email,
                        name: data.name,
                        password: authData2.password,
                        joined: Firebase.ServerValue.TIMESTAMP,
                        matriculation: '',
                        occupation: '',
                        company: '',
                        industry: '',
                        bio: '',
                        admin: false,
                        banned: false
                      });
                      ref.child('users').child(authData.uid).once('value', function(user) {
                        q.resolve(user);
                      });
                    });
                  } else {
                    q.resolve(snap);
                  }
                });
              } else {
                console.log('Login failed: ', err);
                q.reject(err);
              }
            });
          } else {
            console.log('Error creating user: ', err);
            q.reject(err);
          }
        });
        return q.promise;
      },
      userLogin: function(data) {
        var q = $q.defer();
        var ref = new Firebase(FIREBASE_URL);
        ref.authWithPassword(data, function(err, authData) {
          if (err === null) {
            console.log('Logged in succesfully.');
            ref.child('users').child(authData.uid).once('value', function(user) {
              if (user.val().banned === true) {
                console.log('User is banned.');
                var err = {};
                err.message = 'Your account is banned.';
                q.reject(err);
              } else {
                q.resolve(user);
              }
            });
          } else {
            console.log('Login failed: ', err);
            q.reject(err);
          }
        });
        return q.promise;
      },
      userLogout: function() {
        var q = $q.defer();
        var ref = new Firebase(FIREBASE_URL);
        ref.unauth();
        q.resolve();
        return q.promise;
      },
      getAuth: function() {
        var q = $q.defer();
        var ref = new Firebase(FIREBASE_URL);
        var authData = ref.getAuth();

        if (authData) {
          ref.child('users').child(authData.uid).once('value', function(user) {
            if (user.val().banned === true) {
              ref.unauth();
              q.reject();
            } else {
              q.resolve(user);
            }
          });
        } else {
          q.reject(authData);
        }
        return q.promise;
      },
      getUser: function(userId) {
        var q = $q.defer();
        var usersRef = new Firebase(FIREBASE_URL + 'users');

        usersRef.child('simplelogin:'+userId).once('value', function(user) {
          q.resolve(user.val());
        });

        return q.promise;
      },
      sendResetPasswordEmail: function(email) {
        var q = $q.defer();
        var ref = new Firebase(FIREBASE_URL);

        ref.resetPassword({
          email: email
        }, function(err) {
          if (err === null) {
            q.resolve(email);
          } else {
            q.reject(err);
          }
        })
        return q.promise;
      },
      editUser: function(userId, data) {
        var q = $q.defer();
        var refUsers = new Firebase(FIREBASE_URL + 'users');

        refUsers.child('simplelogin:' + userId).update(data, function(err) {
          if (err) {
            q.reject(err);
          } else {
            q.resolve(data);
          }
        });

        return q.promise;
      },
      changePassword: function(data) {
        var q = $q.defer();
        var ref = new Firebase(FIREBASE_URL);

        ref.changePassword({
          email: data.email,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        }, function(err) {
          if (err === null) {
            q.resolve(err);
          } else {
            q.reject(err);
          }
        });

        return q.promise;
      },
      banUser: function(userId) {
        var q = $q.defer();
        var refUsers = new Firebase(FIREBASE_URL + 'users');

        refUsers.child('simplelogin:' + userId).update({banned: true}, function(err) {
          if (err) {
            q.reject(err);
          } else {
            q.resolve();
          }
        });

        return q.promise;
      },
      unbanUser: function(userId) {
        var q = $q.defer();
        var refUsers = new Firebase(FIREBASE_URL + 'users');

        refUsers.child('simplelogin:' + userId).update({banned: false}, function(err) {
          if (err) {
            q.reject(err);
          } else {
            q.resolve();
          }
        });

        return q.promise;
      }
    };
    return service;
  }]);