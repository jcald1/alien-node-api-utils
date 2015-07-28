'use strict';

var R = require('ramda');

var makeJsonResponseBody = require('./_makeJsonResponseBody'),
    setFlashData         = require('./_setFlashData');

var HTTP_STATUS_CODE_SUCCESS = 200;

/**
 * Respond to the client with a successful JSON payload.
 * @param {Object} req
 * @param {Object} req.flash
 * @param {Object} res
 * @param {Object} data
 * @returns {*}
 */
function jsonResponseSuccess(req, res, data) {
  var response = R.merge(makeJsonResponseBody(HTTP_STATUS_CODE_SUCCESS, req.flash), { data : data });
  setFlashData(res, response.flash);
  return res.json(response);
}

module.exports = R.curry(jsonResponseSuccess);
