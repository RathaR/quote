'use strict';

(function () {


  class PagerController {

    constructor(State) {
      this.state = State;
    }

    goToPage(page) {
      if ((page <= 0) || (page > this.pages.length)) {
        return;
      }
      this.page = page;
      this.state.push({page: page})
    }

    movePrev() {
      var page = this.page - 1;
      this.goToPage(page);
    }

    moveNext() {
      var page = this.page + 1;
      this.goToPage(page);
    }

    getTotalPages() {
      return Math.ceil(this.total / this.pageSize);
    }

    initPages() {
      var totalPages = this.getTotalPages();
      this.pages = new Array(totalPages);
      for (var i = 0; i < totalPages; i++) {
        this.pages[i] = i + 1;
      }
    }

    $onInit() {
      var state = this.state.get();
      this.page = state.page;
      this.total = state.total;
      this.pageSize = state.pageSize;

      this.initPages();
    }

  }

  angular.module('quoteApp')
    .component('pager', {
      templateUrl: 'app/pager/pager.html',
      controller: PagerController
    });

})();
