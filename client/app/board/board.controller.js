'use strict';

(function () {

  class BoardController {

    constructor(QuoteService, State) {
      this.quotesService = QuoteService;
      this.state = State;
      this.unSubscribe = null;
    }

    getSkip() {
      return (this.page - 1) * this.pageSize;
    }

    initState(state) {
      this.page = state.page;
      this.total = state.total;
      this.pageSize = state.pageSize;
    }

    updateData() {
      var skip = this.getSkip(), take = 2;
      this.quotesService.all(skip, take).then((quotesIds) => {
        this.quotesIds = _.pluck(quotesIds, 'id');
      });
    }

    onStateChange(newState) {
      this.page = newState.page;
      this.total = newState.total;
      this.pageSize = newState.pageSize;
      this.updateData();
    }

    $onDestroy() {
      this.unSubscribe && this.unSubscribe();
    }
    $onInit() {
      var state = this.state.get();

      this.unSubscribe = this.state.onChange(this.onStateChange, this);

      this.initState(state);
      this.updateData();
    }
  }

  angular.module('quoteApp')
    .component('board', {
      templateUrl: 'app/board/board.html',
      controller: BoardController
    });

})();
