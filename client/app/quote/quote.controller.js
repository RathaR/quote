'use strict';

(function () {

  class QuoteController {

    constructor(QuoteService) {
      this.quoteService = QuoteService;
    }

    $onInit() {
      var id = this.id = this.opts.id;
      this.quoteService.one(id).then((quote) => {
          this.text = quote.text;
          this.rating = quote.rating;
        })
    }
  }

  angular.module('quoteApp')
    .component('quote', {
      templateUrl: 'app/quote/quote.html',
      controller: QuoteController,
      bindings: {
        opts: '='
      }
    });

})();
