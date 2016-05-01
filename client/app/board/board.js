'use strict';

angular.module('quoteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('board', {
        url: '/board',
        resolve: {
          total: function(QuoteService) {
            return QuoteService.total();
          }
        },
        controller: function (total, State) {
          var state = {
            page: 1,
            pageSize: 2,
            total: total
          };
          State.push(state);
        },
        controllerAs: 'ctrl',
        template:
        '<div class="container">' +
          '<pager></pager>' +
          '<board></board>' +
        '</div>'
      });
  });

