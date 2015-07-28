'use strict';

var R            = require('ramda'),
    setFlashData = require('../lib/methods/_setFlashData');

var mockRes   = {
      locals : {
        flash : 'foo'
      }
    },
    mockFlash = 'bar';

describe('setFlashData', function() {
  it('should set flash to locals property of provided reference to ExpressJS `res` object', function() {
    setFlashData(mockRes, mockFlash);
    expect(R.path(['locals', 'flash'], mockRes)).toBe(mockFlash);
  });
});
