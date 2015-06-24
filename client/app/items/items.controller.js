'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemsCtrl', function($state, itemService, cartService) {

  this.searchText = '';
  this.inventory = itemService.inventory;
  this.cart = cartService.cart;

  this.addItem = function(item) {
    cartService.addItem(item);
  };

  this.removeItem = function(item) {
    cartService.removeItem(item);
  };

  this.getCost = function(item) {
    return cartService.getCost(item);
  };

  this.getTotal = function() {
    return cartService.getTotal();
  };

  this.clearCart = function() {
    return cartService.clearCart();
  };

  this.goItem = function (item) {
    console.log('goItem: ' + item._id);
    $state.go( 'itemDetail', { itemId : item._id } );
  };
});
