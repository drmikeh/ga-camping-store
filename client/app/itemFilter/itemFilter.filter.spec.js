'use strict';

describe('Filter: itemFilter', function () {

  // load the filter's module
  beforeEach(module('gaCampingStoreApp'));

  // initialize a new instance of the filter before each test
  var itemFilter;
  beforeEach(inject(function ($filter) {
    itemFilter = $filter('itemFilter');
  }));

  it('should consider multiple fields when filtering', function () {
    var items = [
      { category: 'Tents',         name: '1-person Tent',      description: 'A very small tent.' },
      { category: 'Flashlights',   name: 'Small Flashlight',   description: 'A very small flashlight.' },
      { category: 'Water Bottles', name: 'Small Water Bottle', description: 'Holds 16 ounces.' },
      { category: 'Water Bottles', name: 'Large Water Bottle', description: 'Holds 32 ounces.' }
    ];

    var results = itemFilter(items, 'small');
    // expect(results.length).toBe(3);
    var expected = items.slice(0, 3);
    expect(results).toEqual(expected);

    results = itemFilter(items, 'water');
    expected = items.slice(2, 4);
    expect(results).toEqual(expected);
  });

});
