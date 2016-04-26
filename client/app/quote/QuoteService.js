'use strict';

(function () {

  class QuoteService {
    one(id) {
      return this._$http.get(`/api/quote/${id}`).then(response => {
        return _.first(response.data);
      });
    }

    all() {
      return this._$http.get('/api/quote').then(response => {
        return _.pluck(response.data, 'id');
      });
    }

    vote(id) {
      return this._addRating(id, 1);
    }

    unVote(id) {
      return this._addRating(id, -1);
    }

    _addRating(id, value) {
      var quote = _.find(this._quotes, {id: id});
      if(quote) {
        quote.rating += value;
        quote.voted = true;
        return this._$q.when(true);
      } else {
        return this._$q.reject(`Quote with id ${id} does not exist!`);
      }
    }

    constructor($http, $q) {
      this._$q = $q;
      this._$http = $http;
    }
  }

  angular.module('quoteApp')
    .service('QuoteService', QuoteService);
})();
