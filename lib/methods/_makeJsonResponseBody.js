'use strict';

/**
 * Make a common JSON response body for either success or error.
 * The `data` property will be merged into this object by the respective
 * jsonResponseSuccess or jsonResponseError method.
 * @param {Number} statusCode
 * @param {Object} flash
 * @returns {{statusCode: Number, flash: {notice: *, error: *}}}
 * @see jsonResponseSuccess
 * @see jsonResponseError
 * @private
 */
function _makeJsonResponseBody(statusCode, flash) {
  return {
    statusCode : statusCode,
    flash      : {
      notice : flash('notice'),
      error  : flash('error')
    }
  };
}

module.exports = _makeJsonResponseBody;
