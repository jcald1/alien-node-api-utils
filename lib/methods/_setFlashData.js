'use strict';

/**
 * Sets the provided flash data to the local response flash object.
 * @param {Object} res
 * @param {Object} res.locals
 * @param {Object} res.locals.flash
 * @param {Object} flash
 * @returns {void}
 * @private
 */
function _setFlashData(res, flash) {
  res.locals.flash = flash;
}

module.exports = _setFlashData;
