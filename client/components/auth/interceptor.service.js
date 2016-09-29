'use strict';

export function authInterceptor($q, $cookies, $injector, Util) {
  'ngInject';

  var state;

  return {
    request(config) {
      config.headers = config.headers || {};
      if($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    responseError(response) {
      if(response.status === 401) {
        (state || (state = $injector.get('$state')))
        .go('main');

        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}
