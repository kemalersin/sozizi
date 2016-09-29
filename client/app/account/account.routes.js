'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login/login.pug'),
      controller($window) {
        'ngInject';

        $window.location.href = '/auth/goodreads';
      }
    })
    .state('logout', {
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
    .state('quote', {
      url: '/quote',
      template: require('./quote/quote.pug'),
      params: {book: null}
    })
    .state('quote.add', {
      url: '/add',
      template: require('./quote/add/quote.add.pug'),
      controller: 'AddQuoteController',
      controllerAs: 'quote',
      authenticate: true
    });
}
