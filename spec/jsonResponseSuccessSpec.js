'use strict';

const R                   = require('ramda'),
      jsonResponseSuccess = require('../lib/methods/jsonResponseSuccess');

const mockReqWithSession = {
  session : {
    flash : {}
  },
  flash : R.identity
};

const mockReqNoSession = {
  flash : R.identity
};

const mockReqNoFlash = {
  session : {}
};

const mockRes = {
  json   : R.identity,
  locals : {}
};

const FAKE_DATABASE_RESPONSE = {
  foo : 'bar'
};

const HTTP_STATUS_CODE_SUCCESS = 200;

const FAKE_API_RESPONSE_NO_SESSION = {
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

describe('makeJsonResponseSuccess without session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'json');
    response = jsonResponseSuccess(mockReqNoSession, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('executes the mock res.json function', () => {
    expect(mockRes.json).toHaveBeenCalledWith(FAKE_API_RESPONSE_NO_SESSION);
  });

});

describe('makeJsonResponseSuccess without flash', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'json');
    response = jsonResponseSuccess(mockReqNoFlash, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('executes the mock res.json function', () => {
    expect(mockRes.json).toHaveBeenCalledWith(FAKE_API_RESPONSE_NO_SESSION);
  });

});

describe('makeJsonResponseSuccess with session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'json');
    response = jsonResponseSuccess(mockReqWithSession, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('executes the mock res.json function', () => {
    expect(mockRes.json).toHaveBeenCalledWith(FAKE_API_RESPONSE_WITH_SESSION);
  });

});

describe('mockRes.json', () => {
  it('returns the value given', () => {
    expect(mockRes.json('foo')).toBe('foo');
  });
});

describe('mockReqWithSession.flash', () => {
  it('returns the value given', () => {
    expect(mockReqWithSession.flash('foo')).toBe('foo');
  });
});
