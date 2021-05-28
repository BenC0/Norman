"use strict";

// Core Modules
var log = require('./norman_modules/core/log.js');

var poll = require('./norman_modules/core/pollFunction.js');

var cookie = require('./norman_modules/core/cookieFunctions.js');

var registerTest = require('./norman_modules/core/registerTest.js'); // Util Modules


var debounce = require('./norman_modules/utils/debounce.js');

var isInViewport = require('./norman_modules/utils/isInViewport.js');

var onMouseLeave = require('./norman_modules/utils/onMouseLeave.js');

var watchForChange = require('./norman_modules/utils/watchForChange.js');

var getHighestZIndex = require('./norman_modules/utils/getHighestZIndex.js');

var norman = {
  log: log,
  poll: poll,
  cookie: cookie,
  debounce: debounce,
  registerTest: registerTest,
  isInViewport: isInViewport,
  onMouseLeave: onMouseLeave,
  watchForChange: watchForChange,
  getHighestZIndex: getHighestZIndex
};
module.exports = norman;