'use strict';

const R                   = require('ramda'),
      jsonResponseSuccess = require('../lib/methods/jsonResponseSuccess');

const mockReqWithSession = {
  session : {
    flash : {}
  },
  flash   : R.identity
};

const mockReqNoSession = {
  flash : R.identity
};

const mockReqNoFlash = {
  session : {}
};

const mockRes = {
  json   : R.identity,
  locals : {},
  send   : R.identity,
  set    : () => {}
};

const FAKE_DATABASE_RESPONSE = {
  foo : 'bar'
};

const HTTP_STATUS_CODE_SUCCESS = 200;

const FAKE_API_RESPONSE_NO_SESSION   = JSON.stringify({
        statusCode : HTTP_STATUS_CODE_SUCCESS,
        flash      : {
          notice : [],
          error  : []
        },
        data       : FAKE_DATABASE_RESPONSE
      }),
      FAKE_API_RESPONSE_WITH_SESSION = JSON.stringify({
        statusCode : HTTP_STATUS_CODE_SUCCESS,
        flash      : {
          notice : mockReqWithSession.flash('notice'),
          error  : mockReqWithSession.flash('error')
        },
        data       : FAKE_DATABASE_RESPONSE
      });

describe('makeJsonResponseSuccess without session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'send');
    response = jsonResponseSuccess(mockReqNoSession, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('executes the mock res.send function', () => {
    expect(mockRes.send).toHaveBeenCalledWith(FAKE_API_RESPONSE_NO_SESSION);
  });

});

describe('makeJsonResponseSuccess without flash', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'send');
    response = jsonResponseSuccess(mockReqNoFlash, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('executes the mock res.send function', () => {
    expect(mockRes.send).toHaveBeenCalledWith(FAKE_API_RESPONSE_NO_SESSION);
  });

});

describe('makeJsonResponseSuccess with session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockRes, 'send');
    response = jsonResponseSuccess(mockReqWithSession, mockRes, FAKE_DATABASE_RESPONSE);
  });

  it('executes the mock res.send function', () => {
    expect(mockRes.send).toHaveBeenCalledWith(FAKE_API_RESPONSE_WITH_SESSION);
  });

});

describe('mockRes.send', () => {
  it('returns the value given', () => {
    expect(mockRes.send('foo')).toBe('foo');
  });
});

describe('mockReqWithSession.flash', () => {
  it('returns the value given', () => {
    expect(mockReqWithSession.flash('foo')).toBe('foo');
  });
});
