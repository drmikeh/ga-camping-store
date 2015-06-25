'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemDetailCtrl', function($stateParams, itemService) {

  var that = this;

  var id = $stateParams.itemId;
  itemService.findItemById(id).then(function(json) {
    that.item = json.data;
  });
});
