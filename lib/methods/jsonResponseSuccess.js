'use strict';

const R = require('ramda');

const makeJsonResponseBody = require('./_makeJsonResponseBody'),
      setFlashData         = require('./_setFlashData');

const HTTP_STATUS_CODE_SUCCESS = 200;

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

  return res.json(response);
});

module.exports = jsonResponseSuccess;
