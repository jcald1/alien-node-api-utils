'use strict';

var R                 = require('ramda'),
    jsonResponseError = require('../lib/methods/jsonResponseError');

var mockReqWithSession = {
  session : {
    flash : {}
  },
  flash   : R.identity
};

var mockReqNoSession = {
  flash : R.identity
};

var mockRes = {
  json   : R.identity,
  status : function() {
    return mockRes;
  },
  locals : {}
};

var FAKE_HTTP_STATUS_CODE_ERROR = 1337;

var FAKE_ERROR_RESPONSE = {
      statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
      foo        : 'bar'
    },
    FAKE_ERROR_RESPONSE_TRIMMED = {
      foo : 'bar'
    };

var EXPECTED_RESPONSE_DATA_NO_SESSION = {
      statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
      flash      : {
        notice : [],
        error  : []
      },
      data       : FAKE_ERROR_RESPONSE_TRIMMED
    },
    EXPECTED_RESPONSE_DATA_WITH_SESSION = {
      statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
      flash      : {
        notice : mockReqWithSession.flash('notice'),
        error  : mockReqWithSession.flash('error')
      },
      data       : FAKE_ERROR_RESPONSE_TRIMMED
    };

describe('makeJsonResponseError without session', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockRes, 'json');
    response = jsonResponseError(mockReqNoSession, mockRes, FAKE_ERROR_RESPONSE);
  });

  it('should execute the mock res.json function', function() {
    expect(mockRes.json).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_NO_SESSION);
  });

});

describe('makeJsonResponseError with session', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockRes, 'json');
    response = jsonResponseError(mockReqWithSession, mockRes, FAKE_ERROR_RESPONSE);
  });

  it('should execute the mock res.json function', function() {
    expect(mockRes.json).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_WITH_SESSION);
  });

});

describe('mockRes.json', function() {
  it('should return the value given', function() {
    expect(mockRes.json('foo')).toBe('foo');
  });
});

describe('mockReqWithSession.flash', function() {
  it('should return the value given', function() {
    expect(mockReqWithSession.flash('foo')).toBe('foo');
  });
});
