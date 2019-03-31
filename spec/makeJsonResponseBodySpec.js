'use strict';

const R                    = require('ramda'),
      makeJsonResponseBody = require('../lib/methods/_makeJsonResponseBody');

const FAKE_STATUS_CODE = 1337;

const mockReq = {
  flash   : R.identity,
  session : {
    flash : {}
  }
};

describe('makeJsonResponseBody without session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockReq, 'flash');
    response = makeJsonResponseBody(FAKE_STATUS_CODE, mockReq.flash);
  });

  it('assigns the status code to the response body', () => {
    expect(R.prop('statusCode', response)).toBe(FAKE_STATUS_CODE);
  });

  it('invokes the provided flash function with `notice` upon assignment', () => {
    expect(mockReq.flash).not.toHaveBeenCalled();
  });

  it('invokes the provided flash function with `error` upon assignment', () => {
    expect(mockReq.flash).not.toHaveBeenCalled();
  });

});

describe('makeJsonResponseBody with session', () => {

  let response = {};

  beforeEach(() => {
    spyOn(mockReq, 'flash');
    response = R.apply(R.bind(makeJsonResponseBody, mockReq), [FAKE_STATUS_CODE, mockReq.flash]);
  });

  it('assigns the status code to the response body', () => {
    expect(R.prop('statusCode', response)).toBe(FAKE_STATUS_CODE);
  });

  it('invokes the provided flash function with `notice` upon assignment', () => {
    expect(mockReq.flash).toHaveBeenCalledWith('notice');
  });

  it('invokes the provided flash function with `error` upon assignment', () => {
    expect(mockReq.flash).toHaveBeenCalledWith('error');
  });

});

describe('mockReq.flash', () => {
  it('returns the value given', () => {
    expect(mockReq.flash('foo')).toBe('foo');
  });
});
