'use strict';

import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import angularGrid from 'angulargrid';
import loadingBar from 'angular-loading-bar';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';

import navbar from '../components/navbar/navbar.component';
import search from '../components/search/search.component';
import oAuth from '../components/oauth/oauth.component';
import footer from '../components/footer/footer.component';

import account from './account';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';


import 'angular-backtop';
import './app.scss';

angular.module('soziziApp', [ngAnimate, ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, _Auth,
    navbar, search, oAuth, footer, account, main, constants, util, angularGrid, loadingBar,
    'updateMeta', 'ngNotify', 'headroom', 'angularMoment', 'angular.backtop'
])
  .config(routeConfig)
  .directive('a', function() {
    return {
      restrict: 'E',
      link: function(scope, el, attr, ctrl) {
        var a = el[0];

        if (a.hostname != location.hostname) {
          a.target = '_blank';
        }
      }
    }
  })
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
  .run(function($rootScope, $window, $state, Auth, Util, amMoment) {
    'ngInject';

    amMoment.changeLocale('en');

    $rootScope.utils = Util;

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
