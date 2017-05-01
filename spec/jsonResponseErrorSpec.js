'use strict';

const R                 = require('ramda'),
      jsonResponseError = require('../lib/methods/jsonResponseError');

const mockReqWithSession = {
  session : {
    flash : {}
  },
  flash : R.identity
};

const mockReqNoSession = {
  flash : R.identity
};

const mockRes = {
  json   : R.identity,
  status : () => {
    return mockRes;
  },
  locals : {}
};

const FAKE_HTTP_STATUS_CODE_ERROR = 1337;

const FAKE_ERROR_RESPONSE = {
        statusCode : FAKE_HTTP_STATUS_CODE_ERROR,
        foo        : 'bar'
      },
      FAKE_ERROR_RESPONSE_TRIMMED = {
        foo : 'bar'
      };

const EXPECTED_RESPONSE_DATA_NO_SESSION = {
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

describe('makeJsonResponseError without session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'json');
    response = jsonResponseError(mockReqNoSession, mockRes, FAKE_ERROR_RESPONSE);
  });

  it('should execute the mock res.json function', () => {
    expect(mockRes.json).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_NO_SESSION);
  });

});

describe('makeJsonResponseError with session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'json');
    response = jsonResponseError(mockReqWithSession, mockRes, FAKE_ERROR_RESPONSE);
  });

  it('should execute the mock res.json function', () => {
    expect(mockRes.json).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA_WITH_SESSION);
  });

});

describe('mockRes.json', () => {
  it('should return the value given', () => {
    expect(mockRes.json('foo')).toBe('foo');
  });
});

describe('mockReqWithSession.flash', () => {
  it('should return the value given', () => {
    expect(mockReqWithSession.flash('foo')).toBe('foo');
  });
});
