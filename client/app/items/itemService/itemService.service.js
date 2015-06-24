'use strict';

angular.module('gaCampingStoreApp')
.service('itemService', function($http) {

  var that = this;

  that.findItemById = function(id) {
    return $http.get('/api/items/' + id);
  };

  that.getItems = function() {
    return $http.get('/api/items');
  };

});
