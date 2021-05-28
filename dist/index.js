'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function log(testID, msg) {
	let date = new Date;
	window.norman[testID].logs.push({
		"msg": msg,
		"id": `${testID}:${window.norman[testID].logs.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString()
	});
}

/**
 * Poll for the truthyness of a function and run callback when true
 * @param {function} tfn - function to run to test - must return a boolean
 * @param {function} cb - callback to fire when obj is found
 * @param {number} pollInterval - time interval between polls
 * @param {number} pollLimit - how many times to poll before giving up
 */
function poll(
    tfn,
    cb,
    pollInterval = 5,
    pollLimit = 10
) {
    let x = 0;

    let timeout = function timeout() {
        window.setTimeout(doPoll, pollInterval);
    };

    let doPoll = function doPoll() {
        let r = tfn();

        if (r) {
            cb();
        } else if (!r && x++ < pollLimit) {
            timeout();
        }
    };
    timeout();
}

/* Function to set a cookie. Default expiration date is 30 days. */
function set(cname, cvalue, exdays = 30) {
	let d = new Date();
	/* Change this value to change the expiration date. The value is an integer of days */
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* function to retrieve a cookie value */
function get(cname = false) {
	if (cname != false) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return "";
}

/* Function to check a cookie exists */
function exists(cookieName = false) {
	/* If cookieName is not false and exists */
	if (!!cookieName) {
		/* Return result of getCookie not equal to an empty string */
		return getCookie(cookieName) !== "";
	}
	return false
}

var cookieFunctions = {
	set,
	get,
	exists,
};

function registerTest(testID, variant, extraDetails) {
	window.norman = window.norman || {
		isPDP: isPDP(),
		isPLP: isPLP(),
		isHome: isHome(),
		pageType: pageType(),
	};
	window.norman[testID] =  {
		logs: [],
		variant,
		testID,
	};
	for (const property in extraDetails) {
		window.norman[testID][property] = extraDetails[property];
	}
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function isInViewport(elem) {
	let bounding = elem.getBoundingClientRect();
	let headerHeight = document.querySelector('header').getBoundingClientRect().height;
	return (
		bounding.top >= headerHeight - bounding.height &&
		bounding.left >= 0 &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/**
 * Function to initialise the mouse leave detection function.
 * @param {function} callback - The function to run when the conditions have returned true
 * @param {number}  [threshold=5] - Threshold set for mouse y position
*/
function onMouseLeave(callback, threshold = 5) {
    /* declare conditionCheck function as variable and pass the event to the function */
    var conditionCheck = function conditionCheck(event) {
            /* check if mouse y position is less than threshold (defaults to 5) */
            if (event.y < threshold) {
                /* call callback function */
                callback();
            }
        },
        /* declare listenerController function to easily handle adding and removing the event listener */
        listenerController = function listenerController(method) {
            switch (method) {
                case "add":
                    document.body.addEventListener("mouseleave", conditionCheck, false);
                    break;

                case "remove":
                    document.body.removeEventListener("mouseleave", conditionCheck, false);
                    break;
            }
        },
        select = document.getElementsByTagName("select");

    /* attach mouse leave event to body, call conditionCheck when mouse leave event detected */
    document.body.addEventListener("mouseleave", conditionCheck, false);

    /* The following focusin and focusout event functions are for cross-browser compatibility. 
        They ensure the condition check is not called on Edge, IE and possibly Firefox when a select element is focused, remove the event listener, when it is blurred, add the event listener */
    for (var i = 0, length1 = select.length; i < length1; i++) {
        select[i].addEventListener("focus", listenerController("remove"), false);
        select[i].addEventListener("blur", listenerController("add"), false);
    }
}

function watchForChange(
		targetNode = null,
		callback = (mutationsList, observer) => { console.log(mutationsList, observer); },
		config = { attributes: true, childList: true, subtree: true },
	) {
	if (targetNode !== null) {
		if (!targetNode.classList.contains("observing")) {
			const observer = new MutationObserver(callback);
			targetNode.classList.add('observing');
			observer.observe(targetNode, config);
		}
	}
}

function getHighestZIndex(elem = "*") {
  var elems = document.getElementsByTagName(elem);
  var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);
  for (var i = 0; i < elems.length; i++)
  {
    var zindex = Number.parseInt(
      document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"),
      10
    );
    if (zindex > highest)
    {
      highest = zindex;
    }
  }
  return highest;
}

exports.cookie = cookieFunctions;
exports.debounce = debounce;
exports.getHighestZIndex = getHighestZIndex;
exports.isInViewport = isInViewport;
exports.log = log;
exports.onMouseLeave = onMouseLeave;
exports.poll = poll;
exports.registerTest = registerTest;
exports.watchForChange = watchForChange;
