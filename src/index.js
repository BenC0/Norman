const log = require('./norman_modules/log.js');
const debounce = require('./norman_modules/debounce.js');
const registerTest = require('./norman_modules/registerTest.js');
const watchForChange = require('./norman_modules/watchForChange.js');
const cookie = require('./norman_modules/cookieFunctions.js');
const getHighestZIndex = require('./norman_modules/getHighestZIndex.js');

const norman = {
	log,
	cookie,
	debounce,
	registerTest,
	watchForChange,
	getHighestZIndex,
}

module.exports = norman

