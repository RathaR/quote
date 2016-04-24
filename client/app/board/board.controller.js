'use strict';

(function() {

  class BoardController {

    constructor(QuoteService) {
      this.quotesService = QuoteService;
    }

    $onInit() {
      this.quotesService.all().then((quotesIds) => {
        this.quotesIds = quotesIds;
      });
    }
  }

  angular.module('quoteApp')
    .component('board', {
      templateUrl: 'app/board/board.html',
      controller: BoardController
    });

})();
