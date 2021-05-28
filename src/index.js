// Core Modules
import log from './norman_modules/core/log.js';
import poll from './norman_modules/core/pollFunction.js';
import cookie from './norman_modules/core/cookieFunctions.js';
import registerTest from './norman_modules/core/registerTest.js';
// Util Modules
import debounce from './norman_modules/utils/debounce.js';
import isInViewport from './norman_modules/utils/isInViewport.js';
import onMouseLeave from './norman_modules/utils/onMouseLeave.js';
import watchForChange from './norman_modules/utils/watchForChange.js';
import getHighestZIndex from './norman_modules/utils/getHighestZIndex.js';

export default {
	log,
	poll,
	cookie,
	debounce,
	registerTest,
	isInViewport,
	onMouseLeave,
	watchForChange,
	getHighestZIndex,
}

