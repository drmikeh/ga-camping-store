'use strict';

describe('Controller: ItemDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('gaCampingStoreApp'));

  var ItemDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemDetailCtrl = $controller('ItemDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
