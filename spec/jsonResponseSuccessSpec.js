'use strict';

var R                   = require('ramda'),
    jsonResponseSuccess = require('../lib/methods/jsonResponseSuccess');

var mockReqWithSession = {
  session : {
    flash : {}
  },
  flash : R.identity
};

var mockReqNoSession = {
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

var FAKE_API_RESPONSE_NO_SESSION = {
      statusCode : HTTP_STATUS_CODE_SUCCESS,
      flash      : {
        notice : [],
        error  : []
      },
      data       : FAKE_DATABASE_RESPONSE
    },
    FAKE_API_RESPONSE_WITH_SESSION = {
      statusCode : HTTP_STATUS_CODE_SUCCESS,
      flash      : {
        notice : mockReqWithSession.flash('notice'),
        error  : mockReqWithSession.flash('error')
      },
      data       : FAKE_DATABASE_RESPONSE
    };

describe('makeJsonResponseSuccess without session', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockRes, 'json');
    response = jsonResponseSuccess(mockReqNoSession, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('should execute the mock res.json function', function() {
    expect(mockRes.json).toHaveBeenCalledWith(FAKE_API_RESPONSE_NO_SESSION);
  });

});

describe('makeJsonResponseSuccess with session', function() {

  var response = {};

  beforeEach(function() {
    spyOn(mockRes, 'json');
    response = jsonResponseSuccess(mockReqWithSession, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('should execute the mock res.json function', function() {
    expect(mockRes.json).toHaveBeenCalledWith(FAKE_API_RESPONSE_WITH_SESSION);
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
