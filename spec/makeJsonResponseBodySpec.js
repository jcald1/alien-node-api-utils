'use strict';

var R                    = require('ramda'),
    makeJsonResponseBody = require('../lib/methods/_makeJsonResponseBody');

var FAKE_STATUS_CODE = 1337;

var mockReq = {
  flash   : R.identity,
  session : {
    flash : {}
  }
};

describe('makeJsonResponseBody without session', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockReq, 'flash');
    response = makeJsonResponseBody(FAKE_STATUS_CODE, mockReq.flash);
  });

  it('should assign the status code to the response body', function() {
    expect(R.prop('statusCode', response)).toBe(FAKE_STATUS_CODE);
  });

  it('should invoke the provided flash function with `notice` upon assignment', function() {
    expect(mockReq.flash).not.toHaveBeenCalled();
  });

  it('should invoke the provided flash function with `error` upon assignment', function() {
    expect(mockReq.flash).not.toHaveBeenCalled;
  });

});

describe('makeJsonResponseBody with session', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockReq, 'flash');
    response = R.apply(R.bind(makeJsonResponseBody, mockReq), [FAKE_STATUS_CODE, mockReq.flash]);
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
