'use strict';
// @flow

export default class SearchController {
  query;
  books;
  $http;
  $state;

  maxSize;
  totalItems;
  currentPage;
  itemsPerPage;

  constructor($http, $state) {
    'ngInject'

    this.$http = $http;
    this.$state = $state;
    this.query = $state.params.q;
    this.currentPage = $state.params.page;

    this.maxSize = 10;
    this.itemsPerPage = 20;
  }

  $onInit() {
    this.search();
  }

  pageChange() {
    this.search();
  }

  inputChange() {
    this.search(true);
  }

  setPage(pageNo) {
    this.currentPage = pageNo;
  }

  search(resetPage) {
    if (resetPage) {
      this.currentPage = null;
    }

    var q = this.query;
    var page = this.currentPage;

    this.$state.go('search', {q, page}, {notify: false})
      .then(() => {
        if (this.query) {
          this.$http.get(`/api/goodreads/search/?q=${q}&page=${page || 1}`, {cache: true})
            .then(response => {
              this.books = response.data.books;
              this.totalItems = response.data.total * 1;
            });
        }
        else {
          this.books = [];
          this.totalItems = 0;
        }
      });
  }
}
