'use strict';
// @flow

export default class QuoteController {
  book;

  constructor($state, $cookies) {
    'ngInject'

    this.book = $state.params.book || $cookies.lastBook;

    if (!this.book) {
      $state.go('search');
    }

    $cookies.lastBook = this.book;
  }
}
