'use strict';

import angular from 'angular';

class SearchController {
  $http;
  $state;

  label;
  type;
  autoLoad;
  url;

  query;
  userId;
  currentPage;

  items;
  totalItems;

  maxSize = 5;
  itemsPerPage = 20;

  constructor($scope, $http, $state) {
    'ngInject';

    this.$http = $http;
    this.$state = $state;

    this.label = $scope.label;
    this.type = $scope.type;
    this.autoLoad = $scope.autoLoad;
    this.url = `/api/goodreads/${this.type}`;

    this.query = $state.params.q;
    this.currentPage = $state.params.page;
    this.userId = $state.params.userId;
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

    this.$state.go(this.$state.current.name, params, {notify: false})
      .then(() => {
        if (this.query || this.autoLoad) {
          this.$http.get(url, {
            params,
            cache: true
          })
            .then(response => {
              this.items = response.data.items;
              this.totalItems = response.data.total * 1;
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
        autoLoad: '@'
      },
      template: require('./search.pug'),
      controller: SearchController,
      controllerAs: 'search'
    };
  })
  .name;
