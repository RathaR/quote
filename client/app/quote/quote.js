'use strict';
angular.module('quoteApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('quote', {
        url: '/quote/:id',
        params: {
          id: null
        },
        controller: function($stateParams) {
          this.quoteId = $stateParams.id;
        },
        controllerAs: 'ctrl',
        template: '<quote opts="{id: ctrl.quoteId}"></quote>'
      });
  });
