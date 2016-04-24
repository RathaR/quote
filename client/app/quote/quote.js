"use strict";
angular.module('quoteApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('board.quote', {
        url: '/:id',
        params: {
          id: null,
          rating: null,
          text: null
        },
        controller: function($stateParams) {
          this.quoteId = $stateParams.id;
        },
        controllerAs: 'ctrl',
        template: '<quote opts="{id: ctrl.quoteId}"></quote>'
      });
  });
