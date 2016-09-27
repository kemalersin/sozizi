import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;

  constructor($http, Auth) {
    'ngInject';

    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedInSync;
  }
}

export default angular.module('soziziApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
