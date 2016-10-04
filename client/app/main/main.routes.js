'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main />'
  })
    .state('search', {
      url: '/search?q&{page:int}',
      template: `
        <search
          type="book"
          label="Find books on Goodreads"
          url="/api/goodreads/search/" />
      `,
      params: {q: null, page: null}
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
