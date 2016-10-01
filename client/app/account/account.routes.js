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
    .state('quotes', {
      url: '/quotes',
      template: require('./quotes/quotes.pug'),
      params: {book: null}
    })
    .state('quotes.add', {
      url: '/add',
      template: require('./quotes/add/quotes.add.pug'),
      controller: 'AddQuoteController',
      controllerAs: 'quote',
      authenticate: true
    })
    .state('quotes.show', {
      url: '/:id',
      template: require('./quotes/show/quotes.show.pug'),
      controller: 'ShowQuoteController',
      controllerAs: 'quote'
    })
}
