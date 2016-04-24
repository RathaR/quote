'use strict';

angular.module('quoteApp.auth', [
  'quoteApp.constants',
  'quoteApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
