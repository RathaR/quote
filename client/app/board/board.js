'use strict';

angular.module('quoteApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('board', {
        url: '/board',
        template: '<board></board>'
      });
  });
