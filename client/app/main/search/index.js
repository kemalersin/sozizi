'use strict';

import angular from 'angular';
import SearchController from './search.controller';

export default angular.module('soziziApp.search', [])
  .controller('SearchController', SearchController)
  .name;
