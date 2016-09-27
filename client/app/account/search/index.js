'use strict';

import angular from 'angular';
import SearchController from './search.controller';

export default angular.module('soziziApp.settings', ['angular-loading-bar'])
  .controller('SearchController', SearchController)
  .name;
