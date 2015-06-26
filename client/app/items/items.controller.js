'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemsCtrl', function($state, itemService, cartService) {

  var that = this;

  that.searchText = '';
  that.total = 0;

  that.getInventory = function() {
    itemService.getItems().then(function(json) {
      that.inventory = json.data;
    });
  };

  cartService.getCart().then(function(json) {
    that.cart = json.data;
    that.total = cartService.getTotal(that.cart);
  });

  that.getInventory();

  that.addItem = function(item) {
    cartService.addItem(item).then(function(json) {
      that.cart = json.data;
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('ERROR: addItem post: ' + JSON.stringify(err));
    });
  };

  that.removeItem = function(item) {
    cartService.removeItem(item).then(function(json) {
      that.cart = json.data;
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('ERROR: removeItem delete: ' + JSON.stringify(err));
    });
  };

  that.getCost = function(item) {
    return cartService.getCost(item);
  };

  that.clearCart = function() {
    return cartService.clearCart().then(function(json) {
      that.cart = json.data;
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('clearCart delete ERROR: ' + JSON.stringify(err));
    });
  };

  that.goItem = function (item) {
    $state.go( 'itemDetail', { itemId : item._id } );
  };

});
