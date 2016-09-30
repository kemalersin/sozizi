'use strict';
// @flow

export default class AddQuoteController {
  $http;
  ngNotify;
  book;
  body;

  constructor($http, $state, $cookies, ngNotify) {
    'ngInject'

    this.$http = $http;
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
    this.$http.post('/api/goodreads/add-quote', {
      book: this.book,
      body: this.body
    }).then(response => {
      this.body = null;
      this.ngNotify.set(
        `
          Quote successfully created:
          <a class="text-info" href="https://www.goodreads.com/quotes/${response.data.id}" target="_blank">
            https://www.goodreads.com/quotes/${response.data.id}
          </a>
        `, {type: 'info', html: true}
      );

      document.getElementById('quote-body').focus();
    });
  }
}
