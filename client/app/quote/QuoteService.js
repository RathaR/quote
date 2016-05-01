'use strict';

(function () {

  class QuoteService {

    total() {
      return this._$http.get('/api/quote/total').then((response)=> {
        return response.data;
      });
    }

    one(id) {
      return this._$http.get(`/api/quote/${id}`).then(response => {
        return _.first(response.data);
      });
    }

    all(skip, take, expand) {
      skip = skip || 0;
      take = take || 2;
      expand = !!expand;
      return this._$http.get('/api/quote', {params: {skip: skip, take: take, expand: expand}}).then((response)=> {
        return response.data;
      });
    }

    constructor($http, $q) {
      this._$q = $q;
      this._$http = $http;
    }
  }

  angular.module('quoteApp')
    .service('QuoteService', QuoteService);
})();
