import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export default angular.module('soziziApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug')
  })
  .name;
