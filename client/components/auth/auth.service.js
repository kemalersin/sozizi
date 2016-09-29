'use strict';
// @flow

class User {
  _id: string = '';
  name: string = '';
}

export function AuthService($location, $cookies, $q, Util, User) {
  'ngInject';

  var safeCb = Util.safeCb;
  var currentUser: User = new User();

  if($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  var Auth = {
    logout() {
      $cookies.remove('token');
      currentUser = new User();
    },

    getCurrentUser(callback ? : Function) {
      var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;

      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    getCurrentUserSync() {
      return currentUser;
    },

    isLoggedIn(callback ? : Function) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          var is = user.hasOwnProperty('role');
          safeCb(callback)(is);
          return is;
        });
    },

    isLoggedInSync() {
      return currentUser.hasOwnProperty('role');
    },

    getToken() {
      return $cookies.get('token');
    }
  };

  return Auth;
}
