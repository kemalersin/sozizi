'use strict';

import angular from 'angular';
import AddQuoteController from './quotes.add.controller';

export default angular.module('soziziApp.addQuote', [])
  .controller('AddQuoteController', AddQuoteController)
  .name;
