'use strict';
// @flow

export default class AddQuoteController {
  book;

  constructor($state, $cookies) {
    'ngInject'

    this.book = $state.params.book || $cookies.getObject('lastBook');

    if (!this.book) {
      $state.go('search');
      return;
    }

    $cookies.putObject('lastBook', this.book);
  }
}
