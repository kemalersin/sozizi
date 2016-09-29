'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Search',
    'state': 'search'
  }];

  $state;

  isLoggedIn: Function;
  isBookExists: Function;
  getCurrentUser: Function;
  getLastBook: Function;

  isCollapsed = true;

  constructor(Auth, $state, $cookies) {
    'ngInject';

    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.getLastBook = () => { return $cookies.getObject('lastBook') };
    this.isBookExists = () => { return this.isLoggedIn() && typeof this.getLastBook() != 'undefined' };
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
