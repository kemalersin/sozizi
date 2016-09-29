'use strict';

export function routerDecorator($rootScope, $state, Auth) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', function(event, next) {
    if(!next.authenticate) {
      return;
    }

    Auth.isLoggedIn()
      .then(is => {
        if(is) {
          return;
        }

        event.preventDefault();
        $state.go('login');
      });
  });
}
