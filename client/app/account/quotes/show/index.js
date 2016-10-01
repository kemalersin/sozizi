'use strict';

import angular from 'angular';
import ShowQuoteController from './quotes.show.controller';

export default angular.module('soziziApp.showQuote', [])
  .controller('ShowQuoteController', ShowQuoteController)
  .name;
