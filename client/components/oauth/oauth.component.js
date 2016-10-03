'use strict';

import angular from 'angular';

function OauthController(Auth) {
  'ngInject';

  this.isLoggedIn = Auth.isLoggedInSync;
}

export default angular.module('soziziApp.oauth', [])
  .directive('oauth', function() {
    return {
      restrict: 'EA',
      scope: {
        classes: '@'
      },
      template: require('./oauth.pug'),
      controller: OauthController,
      controllerAs: 'oa'
    };
  })
  .name;
