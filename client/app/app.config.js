'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $anchorScrollProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $anchorScrollProvider.disableAutoScrolling();
}
