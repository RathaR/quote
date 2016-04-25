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
        this.voted = quote.voted;
      })
    }

    vote() {
      if (this.voted) {
        return;
      }
      var id = this.id;
      this.quoteService.vote(id).then(()=> {
        this.voted = true;
        this.rating++;
      })
    }

    unVote() {
      if (this.voted) {
        return;
      }
      var id = this.id;
      this.quoteService.unVote(id).then(()=> {
        this.voted = true;
        this.rating--;
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
