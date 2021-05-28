// Core Modules
const log = require('./norman_modules/core/log.js');

const poll = require('./norman_modules/core/pollFunction.js');

const cookie = require('./norman_modules/core/cookieFunctions.js');

const registerTest = require('./norman_modules/core/registerTest.js'); // Util Modules


const debounce = require('./norman_modules/utils/debounce.js');

const isInViewport = require('./norman_modules/utils/isInViewport.js');

const onMouseLeave = require('./norman_modules/utils/onMouseLeave.js');

const watchForChange = require('./norman_modules/utils/watchForChange.js');

const getHighestZIndex = require('./norman_modules/utils/getHighestZIndex.js');

const norman = {
  log,
  poll,
  cookie,
  debounce,
  registerTest,
  isInViewport,
  onMouseLeave,
  watchForChange,
  getHighestZIndex
};
module.exports = norman;