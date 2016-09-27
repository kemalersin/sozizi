'use strict';
// @flow

export default class SearchController {
  query;
  page;
  data;
  $http;
  $state;

  constructor($http, $state) {
    'ngInject'

    this.$http = $http;
    this.$state = $state;
    this.query = $state.params.query;
    this.page = $state.params.page;
  }

  $onInit() {
    this.search();
  }

  search() {
    if (this.query) {
      this.$http.get(`/api/goodreads/search/${this.query}?page=${this.page || 1}`)
        .then(response => this.data = response.data);
    }
    else {
      this.data = null;
    }
  }

  inputChange() {
    this.$state.go('search', {query: this.query}, {notify: false})
      .then(()=>this.search());
  }
}
