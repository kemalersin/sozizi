'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import quote from './quote';

export default angular.module('soziziApp.account', [uiRouter, ngCookies, quote])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
