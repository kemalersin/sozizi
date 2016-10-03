'use strict';

import angular from 'angular';

export function OauthController(Auth) {
  'ngInject';

  this.isLoggedIn = Auth.isLoggedInSync;
}

export default angular.module('soziziApp.oauth', [])
  .directive('oauth', function() {
    return {
      template: require('./oauth.pug'),
      restrict: 'EA',
      controller: OauthController,
      controllerAs: 'oa',
      scope: {
        classes: '@'
      }
    };
  })
  .name;
