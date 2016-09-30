'use strict';

import angular from 'angular';

// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import loadingBar from 'angular-loading-bar';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import navbar from '../components/navbar/navbar.component';
import oAuth from '../components/oauth/oauth.component';
import footer from '../components/footer/footer.component';
import account from './account';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import 'ng-notify';
import './app.scss';

angular.module('soziziApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, _Auth,
    navbar, oAuth, footer, account, main, constants, util, loadingBar, 'ngNotify'
  ])
  .config(routeConfig)
  .directive("keepScroll", function() {
    return {
      link: function (scope, el, attr, ctrl) {
        var scrollHeight;

        scope.$watchCollection('items', function (n, o) {
          scrollHeight = scrollHeight || el[0].scrollHeight;
          el[0].scrollTop = el[0].scrollTop - (scrollHeight - el[0].scrollHeight);
          scrollHeight = el[0].scrollHeight;
        });
      }
    }
  })
  .run(function($rootScope, $state, Auth) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $state.go('auth')
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['soziziApp'], {
      strictDi: true
    });
  });
