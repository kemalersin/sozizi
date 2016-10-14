'use strict';
// @flow

export default class AddQuoteController {
  $http;
  $state;
  $window;

  ngNotify;

  book;
  body;

  constructor($http, $window, $state, $cookies, ngNotify) {
    'ngInject'

    this.$http = $http;
    this.$window = $window;
    this.$state = $state;

    this.ngNotify = ngNotify;

    this.book = $state.params.book || $cookies.getObject('lastBook');

    if (!this.book) {
      $state.go('search');
      return;
    }

    $cookies.putObject('lastBook', this.book);
  }

  goBack() {
    window.history.back();
  }

  submit() {
    this.$http.post('/api/goodreads/quotes', {
      book: this.book,
      body: this.body
    }).then(response => {
      let url = this.$state.href('quotes.show', {id: response.data.id}, {absolute: true});

      this.$window.refreshQuotes = true;

      this.body = null;
      this.ngNotify.set(
        `
          Quote successfully created:
          <a class="text-info" href="${url}">${url}</a>
        `, {type: 'info', html: true}
      );

      document.getElementById('quote-body').focus();
    });
  }
}
