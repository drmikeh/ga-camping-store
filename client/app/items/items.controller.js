'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemsCtrl', function($state, itemService, cartService) {

  var that = this;

  that.searchText = '';
  that.cart = [];
  that.total = 0;

  function find(cart, item) {
    var len = cart.length;
    for (var i=0; i<len; i++) {
      if (cart[i]._id === item._id) {
        return cart[i];
      }
    }
    return null;
  }

  function updateCartFromServer(cartFromServer) {
    // that.cart = cartFromServer;

    // add cartItems in cartFromServer not found in that.cart
    var len = cartFromServer.length;
    var cartItem;
    for (var i=0; i<len; i++) {
      cartItem = cartFromServer[i];
      if (!find(that.cart, cartItem)) {
        console.log('adding cartItem from server: ' + cartItem.item.name);
        that.cart.splice(i, 0, cartItem);
      }
    }

    // check for remove or update
    i = that.cart.length;
    while (i--) {
      cartItem = that.cart[i];
      // remove cartItems in that.cart not found in cartFromServer
      var found = find(cartFromServer, cartItem);
      if (!found) {
        console.log('removing cartItem: ' + cartItem.item.name + ' at index ' + i);
        that.cart.splice(i, 1);
      }
      // update cartItems in that.cart that have a different qty in cartFromServer
      else if (cartItem.qty !== found.qty) {
        console.log('updating qty of item: ' + cartItem.item.name);
        cartItem.qty = found.qty;
      }
    }
    console.log('updateCartFromServer length: ' + that.cart.length);
    console.log('updateCartFromServer: ' + JSON.stringify(that.cart));
  }

  that.getInventory = function() {
    itemService.getItems().then(function(json) {
      that.inventory = json.data;
    });
  };

  cartService.getCart().then(function(json) {
    updateCartFromServer(json.data);
    that.total = cartService.getTotal(that.cart);
  });

  that.getInventory();

  that.addItem = function(item) {
    cartService.addItem(item).then(function(json) {
      updateCartFromServer(json.data);
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('ERROR: addItem post: ' + JSON.stringify(err));
    });
  };

  that.removeItem = function(item) {
    cartService.removeItem(item).then(function(json) {
      updateCartFromServer(json.data);
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
      updateCartFromServer(json.data);
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('clearCart delete ERROR: ' + JSON.stringify(err));
    });
  };

  that.goItem = function (item) {
    $state.go( 'itemDetail', { itemId : item._id } );
  };

});
