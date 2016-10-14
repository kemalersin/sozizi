'use strict';

import angular from 'angular';

class SearchController {
  $http;
  $state;
  $window;
  $cacheFactory;

  url;
  utils;

  query;
  userId;
  currentPage;

  items;
  ownered;
  totalItems;

  maxSize;
  itemsPerPage;

  constructor($http, $window, $state, $rootScope, $cacheFactory, appConfig) {
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    this.$window = $window;
    this.$cacheFactory = $cacheFactory;

    this.utils = $rootScope.utils;
    this.url = `/api/goodreads/${this.type}`;

    this.query = $state.params.q;
    this.currentPage = $state.params.page;
    this.userId = $state.params.userId;

    this.maxSize = appConfig.VIEWABLE_PAGE_COUNT;
    this.itemsPerPage = appConfig.SEARCH_RESULTS_PER_PAGE;
  }

  $onInit() {
    if (this.userId) {
      this.url += `/${this.userId}`;
    }

    if (this.type === 'archive' && this.$window.refreshQuotes) {
      let httpCache = this.$cacheFactory.get('$http');

      httpCache.remove(this.url);
      this.$window.refreshQuotes = false;
    }

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
    let params = {
      q: this.query,
      page: resetPage ? null : this.currentPage
    };

    this.$state.go(this.$state.current.name, params, {notify: false})
      .then(() => {
        if (this.query || this.autoLoad) {
          this.$http.get(this.url, {
            params,
            cache: true
          })
            .then(response => {
              this.items = response.data.items;
              this.ownered = response.data.ownered;
              this.totalItems = +response.data.total;
            });
        }
        else {
          this.items = [];
          this.totalItems = 0;
        }
      });
  }
}

export default angular.module('soziziApp.search', [])
  .component('search', {
    bindings: {
      label: '@',
      type: '@',
      autoLoad: '@'
    },
    template: require('./search.pug'),
    controller: SearchController,
    controllerAs: 'search'
  })
  .name;
