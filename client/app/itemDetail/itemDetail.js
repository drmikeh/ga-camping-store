'use strict';

angular.module('gaCampingStoreApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('itemDetail', {
      url: '/items/:itemId',
      templateUrl: 'app/itemDetail/itemDetail.html',
      controller: 'ItemDetailCtrl as ctrl',
      onEnter: function() {
        console.log('Entering itemDetail');
      },
      onExit: function() {
        console.log('Leaving itemDetail');
      }
    });
});
