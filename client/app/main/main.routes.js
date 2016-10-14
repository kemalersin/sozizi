'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main />'
  })
    .state('search', {
      url: '/search?q&{page:int}',
      template: '<search type="books" label="Find books on Goodreads" />',
      params: {
        q: null,
        page: null
      }
    })
    .state('archive', {
      url: '/archive/:userId?q&{page:int}',
      template: '<search type="archive" label="Search quotes in archive" auto-load="true" />',
      params: {
        userId: {
          value: null,
          squash: true
        },
        q: null,
        page: null
      }
    })
    .state('goodreads', {
      url: 'https://www.goodreads.com'
    })
    .state('goodreads.book', {
      url: '/book/show/:id'
    })
    .state('goodreads.author', {
      url: '/author/show/:id'
    })
    .state('goodreads.user', {
      url: '/user/show/:id'
    })
    .state('goodreads.quotes', {
      url: '/quotes/:id'
    })
}
