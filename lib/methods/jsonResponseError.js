'use strict';

var R = require('ramda');

var makeJsonResponseBody = require('./_makeJsonResponseBody'),
    setFlashData         = require('./_setFlashData');

var HTTP_STATUS_CODE_SERVER_ERROR = 500;

/**
 * Respond to the client with an unsuccessful JSON payload.
 * @param {Object} req
 * @param {Object} req.flash
 * @param {Object} res
 * @param {Object} err
 * @returns {*}
 */
function jsonResponseError(req, res, err) {

  var statusCode = R.compose(R.defaultTo(HTTP_STATUS_CODE_SERVER_ERROR), R.prop('statusCode'))(err);
  var response   = R.merge(R.apply(R.bind(makeJsonResponseBody, req), [statusCode, req.flash]), { data : err });

  setFlashData(res, response.flash);
  return res.json(response);
}

module.exports = R.curry(jsonResponseError);
