'use strict';

import angular from 'angular';
import AddQuoteController from './quote.add.controller';

export default angular.module('soziziApp.addQuote', [])
  .controller('AddQuoteController', AddQuoteController)
  .name;
