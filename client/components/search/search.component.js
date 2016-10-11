'use strict';

import angular from 'angular';

class SearchController {
  $http;
  $state;
  $window;
  $cacheFactory;

  label;
  type;
  autoLoad;
  infiniteScroll;

  url;

  query;
  userId;
  currentPage;

  items;
  totalItems;

  maxSize;
  itemsPerPage;

  constructor($scope, $http, $window, $state, $cacheFactory, appConfig) {
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    this.$window = $window;
    this.$cacheFactory = $cacheFactory;

    this.label = $scope.label;
    this.type = $scope.type;
    this.autoLoad = $scope.autoLoad;
    this.infiniteScroll = $scope.infiniteScroll;

    this.url = `/api/goodreads/${this.type}`;

    this.query = $state.params.q;
    this.currentPage = $state.params.page;
    this.userId = $state.params.userId;

    this.maxSize = appConfig.VIEWABLE_PAGE_COUNT;
    this.itemsPerPage = appConfig.SEARCH_RESULTS_PER_PAGE;
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
    let url = this.url;

    let params = {
      q: this.query,
      page: resetPage ? null : this.currentPage
    };

    if (this.userId) {
      url += `/${this.userId}`;
    }

    if (this.type === 'archive' && this.$window.refreshQuotes) {
      let httpCache = this.$cacheFactory.get('$http');

      httpCache.remove(url);
      this.$window.refreshQuotes = false;
    }

    this.$state.go(this.$state.current.name, params, {notify: false})
      .then(() => {
        if (this.query || this.autoLoad) {
          this.$http.get(url, {
            params,
            cache: true
          })
            .then(response => {
              this.items = response.data.items;
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
  .directive('search', function () {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        type: '@',
        autoLoad: '@',
        infiniteScroll: '@'
      },
      template: require('./search.pug'),
      controller: SearchController,
      controllerAs: 'search'
    };
  })
  .name;
