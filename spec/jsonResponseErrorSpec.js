'use strict';

var R                 = require('ramda'),
    jsonResponseError = require('../lib/methods/jsonResponseError');

var mockReq = {
  flash : R.identity
};

var mockRes = {
  json   : R.identity,
  locals : {}
};

var FAKE_HTTP_STATUS_CODE_ERROR = 1337;

var FAKE_ERROR_RESPONSE = {
  statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
  foo        : 'bar'
};

var EXPECTED_RESPONSE_DATA = {
  statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
  flash      : {
    notice : mockReq.flash('notice'),
    error  : mockReq.flash('error')
  },
  data       : FAKE_ERROR_RESPONSE
};

describe('makeJsonResponseSuccess', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockRes, 'json');
    response = jsonResponseError(mockReq, mockRes, FAKE_ERROR_RESPONSE);
  });

  it('should invoke the provided flash function with `notice` upon assignment', function() {
    expect(mockRes.json).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA);
  });

});

describe('mockRes.json', function() {
  it('should return the value given', function() {
    expect(mockRes.json('foo')).toBe('foo');
  });
});

describe('mockReq.flash', function() {
  it('should return the value given', function() {
    expect(mockReq.flash('foo')).toBe('foo');
  });
});
