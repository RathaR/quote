'use strict';

(function () {

  class QuoteController {

    constructor(QuoteService) {
      this.quoteService = QuoteService;
    }

    $onInit() {
      var id = this.opts.id;
      this.quoteService.one(id).then(quote => {
        this._initState(quote);
      })
    }

    _initState(state) {
      this.id = state.id;
      this.text = state.text;
      this.rating = state.rating;
      this.voted = state.voted;
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
