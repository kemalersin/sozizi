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
    });
}
