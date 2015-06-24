'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemsCtrl', function($state, itemService, cartService) {

  var that = this;

  that.searchText = '';

  itemService.getItems().then(function(json) {
    that.inventory = json.data;
  });

  that.cart = cartService.cart;

  that.addItem = function(item) {
    cartService.addItem(item);
  };

  that.removeItem = function(item) {
    cartService.removeItem(item);
  };

  that.getCost = function(item) {
    return cartService.getCost(item);
  };

  that.getTotal = function() {
    return cartService.getTotal();
  };

  that.clearCart = function() {
    return cartService.clearCart();
  };

  that.goItem = function (item) {
    console.log('goItem: ' + item._id);
    $state.go( 'itemDetail', { itemId : item._id } );
  };
});
