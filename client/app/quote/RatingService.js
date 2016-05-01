'use strict';

(function () {

  class RatingService {
    inc(id) {
      return this._$http.post(`/api/quote/${id}/inc`).then((response)=> {
        return response.data;
      });
    }

    dec(id) {
      return this._$http.post(`/api/quote/${id}/dec`).then((response)=> {
        return response.data;
      });
    }

    constructor($http) {
      this._$http = $http;
    }
  }

  angular.module('quoteApp')
    .service('RatingService', RatingService);
})();
