'use strict';

const R = require('ramda');

const makeJsonResponseBody = require('./_makeJsonResponseBody'),
      setFlashData         = require('./_setFlashData');

const HTTP_STATUS_CODE_SUCCESS = 200;

const stringify = require('json-stringify-safe');
/**
 * Respond to the client with a successful JSON payload.
 * @param {Object} req
 * @param {Object} req.flash
 * @param {Object} res
 * @param {Object} data
 * @returns {*}
 */
const jsonResponseSuccess = R.curry((req, res, data) => {
  const response = R.mergeDeepRight(
    R.apply(R.bind(makeJsonResponseBody, req), [HTTP_STATUS_CODE_SUCCESS, req.flash]),
    R.objOf('data', data)
  );

  if (req.flash) {
    setFlashData(res, response.flash);
  }

  res.set('Content-Type', 'application/json');
  return res.send(stringify(response));
});

module.exports = jsonResponseSuccess;
