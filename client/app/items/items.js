'use strict';

angular.module('gaCampingStoreApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('items', {
        url: '/items',
        templateUrl: 'app/items/items.html',
        controller: 'ItemsCtrl as ctrl'
      });
  });
