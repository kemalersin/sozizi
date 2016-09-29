'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  })
    .state('search', {
      url: '/search?q&{page:int}',
      template: require('./search/search.pug'),
      controller: 'SearchController',
      controllerAs: 'search',
      reloadOnSearch: false,
      params: {
        q: null,
        page: null
      }
    });
}
