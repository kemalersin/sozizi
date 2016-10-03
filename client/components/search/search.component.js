'use strict';

import angular from 'angular';

class SearchController {
  constructor($scope, $http, $state) {
    'ngInject';

    this.$http = $http;
    this.$state = $state;

    this.url = $scope.url;
    this.label = $scope.label;
    this.type = $scope.type;

    this.query = $state.params.q;
    this.currentPage = $state.params.page;

    this.maxSize = 5;
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
    var page = this.currentPage || 1;

    this.$state.go(this.$state.current.name, {q, page}, {notify: false})
      .then(() => {
        if (this.query) {
          this.$http.get(this.url, {
            cache: true,
            params: {q, page}
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
        url: '@'
      },
      template: require('./search.pug'),
      controller: SearchController,
      controllerAs: 'search'
    };
  })
  .name;
