'use strict';

describe('Filter: itemFilter', function () {

  // load the filter's module
  beforeEach(module('gaCampingStoreApp'));

  // initialize a new instance of the filter before each test
  var itemFilter;
  beforeEach(inject(function ($filter) {
    itemFilter = $filter('itemFilter');
  }));

  // TODO: fix unit test
  // it('should return the input prefixed with "itemFilter filter:"', function () {
  //   var text = 'angularjs';
  //   expect(itemFilter(text)).toBe('itemFilter filter: ' + text);
  // });

});
