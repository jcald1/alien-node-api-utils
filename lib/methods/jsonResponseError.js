'use strict';

const R = require('ramda');

const makeJsonResponseBody = require('./_makeJsonResponseBody'),
      setFlashData         = require('./_setFlashData');

const HTTP_STATUS_CODE_SERVER_ERROR = 500;

/**
 * Respond to the client with an unsuccessful JSON payload.
 * @param {Object} req
 * @param {Object} req.flash
 * @param {Object} res
 * @param {Object} err
 * @returns {*}
 */
const jsonResponseError = R.curry((req, res, err) => {

  const statusCode = R.propOr(HTTP_STATUS_CODE_SERVER_ERROR, 'statusCode', err);

  const response = R.mergeRight(R.apply(R.bind(makeJsonResponseBody, req), [statusCode, req.flash]), { 'data' : R.omit(['statusCode'], err) });

  if (req.flash) {
    setFlashData(res, response.flash);
  }

  return res.status(statusCode).json(response);
});

module.exports = jsonResponseError;
