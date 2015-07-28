'use strict';

var R                   = require('ramda'),
    jsonResponseSuccess = require('../lib/methods/jsonResponseSuccess');

var mockReq = {
  flash : R.identity
};

var mockRes = {
  json   : R.identity,
  locals : {}
};

var FAKE_DATABASE_RESPONSE = {
  foo : 'bar'
};

var HTTP_STATUS_CODE_SUCCESS = 200;

var FAKE_API_RESPONSE = {
  statusCode : HTTP_STATUS_CODE_SUCCESS,
  flash      : {
    notice : mockReq.flash('notice'),
    error  : mockReq.flash('error')
  },
  data       : FAKE_DATABASE_RESPONSE
};

describe('makeJsonResponseSuccess', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockRes, 'json');
    response = jsonResponseSuccess(mockReq, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('should invoke the provided flash function with `notice` upon assignment', function() {
    expect(mockRes.json).toHaveBeenCalledWith(FAKE_API_RESPONSE);
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
