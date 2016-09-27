'use strict';

import angular from 'angular';

export function OauthButtonsController($window, Auth) {
  'ngInject';

  this.isLoggedIn = Auth.isLoggedInSync;
  this.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
}

export default angular.module('soziziApp.oauthButtons', [])
  .directive('oauthButtons', function() {
    return {
      template: require('./oauth-buttons.pug'),
      restrict: 'EA',
      controller: OauthButtonsController,
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  })
  .name;
