'use strict';

(function () {

  class QuoteService {
    one(id) {
      var quote = _.find(this._quotes, {id: id});
      if(quote) {
        return this._$q.when(quote);
      } else {
        return this._$q.reject(`Quote with id ${id} does not exist!`);
      }
    }

    all() {
      return this._$q.when(_.pluck(this._quotes, 'id'));
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
      this._quotes = [{
        id: '439012',
        voted: false,
        rating: 2168,
        text: 'xxx: Сегодня, разгадывая кроссворд, на вопрос "Элемент растительной клетки" уверенно вывел "Вакуоль". Аж прослезился, я 30 долгих лет ждал момента употребить эти сведения из школы...'
      }, {
        id: '439010',
        rating: 568,
        voted: true,
        text: 'Женщина вышла за сигаретами и спустя сутки нашлась в Бийске\nxxx: На пачках писать нужно как предупреждение:Курение приводит в Бийск\nyyy: Но сначала курение вызывает автобус.'
      }, {
        id: '439014',
        rating: 475,
        voted: false,
        text: 'недавно узнал, что при выборе кличек для родившихся домашних животных принято первую букву брать по порядковому номеру помета. Теперь думаю, не спалился ли батя, назвав меня Яшей'
      }];
    }
  }

  angular.module('quoteApp')
    .service('QuoteService', QuoteService);
})();
