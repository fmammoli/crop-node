'use strict';

describe('Service: edicts', function () {

  // load the service's module
  beforeEach(module('cropNodeApp'));

  // instantiate service
  var edicts;
  beforeEach(inject(function (_edicts_) {
    edicts = _edicts_;
  }));

  it('should do something', function () {
    expect(!!edicts).toBe(true);
  });

});
