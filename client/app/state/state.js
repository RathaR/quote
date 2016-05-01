'use strict';

(function () {

  class State {

    push(newState) {
      _.assign(this.state, newState);

      if(this._handlers.length) {
        _.forEach(this._handlers, (handler, index, collection) => {
          handler.fn.call(handler.scope, this.get());
        })
      }
    }

    onChange(callbackFn, scope) {
      var handler = {
        fn: callbackFn,
        scope: scope
      };
      this._handlers.push(handler);
      return () => {
        var index = _.indexOf(this._handlers, handler);
        this._handlers.splice(index, 1);
      }
    }

    get() {
      return _.assign({}, this.state);
    }

    constructor() {
      this._handlers = [];
      this.state = {};
    }
  }

  angular.module('quoteApp')
    .service('State', State);
})();
