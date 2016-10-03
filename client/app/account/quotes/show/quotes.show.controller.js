'use strict';
// @flow

import _ from 'lodash';

export default class ShowQuoteController {
  initalized = false;

  constructor($http, $window, $stateParams) {
    'ngInject'

    this.$http = $http;
    this.$window = $window;
    this.id = $stateParams.id;
  }

  $onInit() {
    this.$http.get(`/api/goodreads/quotes/${this.id}`, {cache: true})
      .then(response => {
        var user = response.data;
        var quote = user.quotes[0];

        this.user = _.pick(user, ['name', 'goodreads']);

        this.body = quote.body;
        this.book = quote.book;
        this.date = quote.date;

        this.url = this.$window.location.href;
        this.title = `Sozizi: ${quote.book.author.name} | ${quote.book.title}`;
        this.description = quote.body;
        this.image = quote.book.image_url.replace('m/', 'l/');

        this.initalized = true;
      })
      .catch((e) => {
        if (e.status === 404) {
          this.notFound = true;
          this.$window.location.href = `https://www.goodreads.com/quotes/${this.id}`;
        }
      })
  }

  share() {
    FB.ui({
      method: 'feed',
      name: this.title,
      link: this.url,
      picture: this.image,
      caption: this.title,
      description: this.description
    });
  }
}
