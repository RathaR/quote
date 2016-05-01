'use strict';

(function () {

  class QuoteController {

    constructor(QuoteService, RatingService) {
      this.quote = QuoteService;
      this.ratingService = RatingService;
    }

    $onInit() {
      var id = this.opts.id;
      this.quote.one(id).then(this._initState.bind(this))
    }

    _initState(state) {
      this.id = state.id;
      this.text = state.text;
      this.rating = state.rating;
      this.voted = state.voted;
    }

    checkVoted() {
      return this.voted;
    }

    setVoted() {
      this.voted = true;
    }

    onRatingInc() {
      if (this.checkVoted()) {
        return;
      }
      this.ratingService.inc(id).then(()=> {
        this.setVoted();
        this.rating++;
      })
    }

    onRatingDec() {
      if (this.checkVoted()) {
        return;
      }
      this.ratingService.dec(id).then(()=> {
        this.setVoted();
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
