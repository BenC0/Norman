'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function log(testID, msg) {
  var date = new Date();
  window.norman[testID].logs.push({
    "msg": msg,
    "id": "".concat(testID, ":").concat(window.norman[testID].logs.length),
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
function poll(tfn, cb) {
  var pollInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var pollLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
  var x = 0;

  var timeout = function timeout() {
    window.setTimeout(doPoll, pollInterval);
  };

  var doPoll = function doPoll() {
    var r = tfn();

    if (r) {
      cb();
    } else if (!r && x++ < pollLimit) {
      timeout();
    }
  };

  timeout();
}

/* Function to set a cookie. Default expiration date is 30 days. */
function set(cname, cvalue) {
  var exdays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
  var d = new Date();
  /* Change this value to change the expiration date. The value is an integer of days */

  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/* function to retrieve a cookie value */

function get() {
  var cname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (cname != false) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

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

function exists() {
  var cookieName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  /* If cookieName is not false and exists */
  if (!!cookieName) {
    /* Return result of getCookie not equal to an empty string */
    return getCookie(cookieName) !== "";
  }

  return false;
}
var cookieFunctions = {
  set: set,
  get: get,
  exists: exists
};

function registerTest(testID, variant, extraDetails) {
  window.norman = window.norman || {
    isPDP: isPDP(),
    isPLP: isPLP(),
    isHome: isHome(),
    pageType: pageType()
  };
  window.norman[testID] = {
    logs: [],
    variant: variant,
    testID: testID
  };

  for (var property in extraDetails) {
    window.norman[testID][property] = extraDetails[property];
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
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
  var bounding = elem.getBoundingClientRect();
  var headerHeight = document.querySelector('header').getBoundingClientRect().height;
  return bounding.top >= headerHeight - bounding.height && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/**
 * Function to initialise the mouse leave detection function.
 * @param {function} callback - The function to run when the conditions have returned true
 * @param {number}  [threshold=5] - Threshold set for mouse y position
*/
function onMouseLeave(callback) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

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

function watchForChange() {
  var targetNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (mutationsList, observer) {
    console.log(mutationsList, observer);
  };
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    attributes: true,
    childList: true,
    subtree: true
  };

  if (targetNode !== null) {
    if (!targetNode.classList.contains("observing")) {
      var observer = new MutationObserver(callback);
      targetNode.classList.add('observing');
      observer.observe(targetNode, config);
    }
  }
}

function getHighestZIndex() {
  var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
  var elems = document.getElementsByTagName(elem);
  var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);

  for (var i = 0; i < elems.length; i++) {
    var zindex = Number.parseInt(document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"), 10);

    if (zindex > highest) {
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
