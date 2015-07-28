'use strict';

var R                    = require('ramda'),
    makeJsonResponseBody = require('../lib/methods/_makeJsonResponseBody');

var FAKE_STATUS_CODE = 1337;

var mockReq = {
  flash : R.identity
};

describe('makeJsonResponseBody', function() {

  var response = {};

  beforeEach(function(){
    spyOn(mockReq, 'flash');
    response = makeJsonResponseBody(FAKE_STATUS_CODE, mockReq.flash);
  });

  it('should assign the status code to the response body', function() {
    expect(R.prop('statusCode', response)).toBe(FAKE_STATUS_CODE);
  });

  it('should invoke the provided flash function with `notice` upon assignment', function() {
    expect(mockReq.flash).toHaveBeenCalledWith('notice');
  });

  it('should invoke the provided flash function with `error` upon assignment', function() {
    expect(mockReq.flash).toHaveBeenCalledWith('error');
  });

});

describe('mockReq.flash', function() {
  it('should return the value given', function() {
    expect(mockReq.flash('foo')).toBe('foo');
  });
});
