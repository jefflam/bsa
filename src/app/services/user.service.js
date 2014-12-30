'use strict';

angular.module('bsa')
  .factory('UserService', ['$http', '$q', '$firebase', function($http, $q, $firebase) {
    var service = {
      createNewUser: function(data) {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com');
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
                      ref.child('users').child(authData2.uid).set({
                        email: data.email,
                        name: data.name,
                        password: authData2.password,
                        joined: Firebase.ServerValue.TIMESTAMP,
                        admin: false
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
        var ref = new Firebase('https://bsa.firebaseio.com');
        ref.authWithPassword(data, function(err, authData) {
          if (err === null) {
            console.log('Logged in succesfully.');
            ref.child('users').child(authData.uid).once('value', function(user) {
              q.resolve(user);
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
        var ref = new Firebase('https://bsa.firebaseio.com');
        ref.unauth();
        q.resolve();
        return q.promise;
      },
      getAuth: function() {
        var q = $q.defer();
        var ref = new Firebase('https://bsa.firebaseio.com');
        var authData = ref.getAuth();

        if (authData) {
          ref.child('users').child(authData.uid).once('value', function(user) {
            q.resolve(user);
          });
        } else {
          q.reject(authData);
        }

        return q.promise;
      }
    };
    return service;
  }]);