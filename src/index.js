const log = require('./norman_modules/log.js');
const debounce = require('./norman_modules/debounce.js');
const registerTest = require('./norman_modules/registerTest.js');
const cookieFunctions = require('./norman_modules/cookieFunctions.js');
const getHighestZIndex = require('./norman_modules/getHighestZIndex.js');
const watchForChange = require('./norman_modules/watchForChange.js');

const norman = {
	log,
	debounce,
	cookie,
	registerTest,
	watchForChange,
}

module.exports = norman

