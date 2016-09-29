'use strict';

import angular from 'angular';
import QuoteController from './quote.controller';

export default angular.module('soziziApp.quote', [])
  .controller('QuoteController', QuoteController)
  .name;
