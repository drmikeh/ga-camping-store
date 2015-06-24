'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemDetailCtrl', function($stateParams, itemService) {
  var id = $stateParams.itemId;
  this.item = itemService.findItemById(id);
});
