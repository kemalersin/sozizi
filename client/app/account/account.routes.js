'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('logout', {
    url: '/logout?referrer',
    referrer: 'main',
    template: '',
    controller($state, Auth) {
      'ngInject';

      var referrer = $state.params.referrer || $state.current.referrer || 'main';
      Auth.logout();
      $state.go(referrer);
    }
  })
    .state('search', {
      url: '/search/:query?{page:int}',
      template: require('./search/search.pug'),
      controller: 'SearchController',
      controllerAs: 'vm',
      authenticate: true,
      params: {
        query: {
          value: null,
          squash: true
        },
        page: null
      }
    });
}
