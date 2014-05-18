'use strict';

describe('Service: members', function () {

  // load the service's module
  beforeEach(module('cropNodeApp'));

  // instantiate service
  var members;
  beforeEach(inject(function (_members_) {
    members = _members_;
  }));

  it('should do something', function () {
    expect(!!members).toBe(true);
  });

});
