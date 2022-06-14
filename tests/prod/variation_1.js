(()=>{"use strict";var t={153:(t,e)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=new Date,r={event:e,id:"".concat(t,":").concat(window.norman[t].logs.length),time:o.toTimeString(),date:o.toDateString()};window.norman[t].logs.push(r),n&&console.warn(r)}function r(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=0,a=function(){window.setTimeout(c,n)},c=function(){var n=t();i++,n?e():!n&&i<o?a():r&&!n&&i>=o&&r()};a()}var i={set:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:30,o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var r="expires="+o.toUTCString();document.cookie=t+"="+e+";"+r+";path=/"},get:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(0!=t)for(var e=t+"=",n=decodeURIComponent(document.cookie),o=n.split(";"),r=0;r<o.length;r++){for(var i=o[r];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""},exists:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return!!t&&""!==getCookie(t)}};function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function u(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function s(t,e){return s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},s(t,e)}function f(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=l(t);if(e){var r=l(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return f(this,n)}}function v(t){return function(t){if(Array.isArray(t))return y(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var h={get:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=[];return 0!==(n=e&&"string"==typeof t&&""!==t.replace(/ /g,"")?v(document.querySelectorAll(t)):[document.querySelector(t)]).length&&n},exists:function(t){return"string"==typeof t?!!document.querySelector(t):!!t},add:function(t,e,n){var o=document.createElement("template");t=t.trim(),o.innerHTML=t;var r=o.content.firstChild;return document.querySelector(e).insertAdjacentElement(n,r)},remove:function(t){"string"==typeof t&&(t=document.querySelector(t)),t.remove()}};var g=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];a(this,t),this.id=e,this.hotjar=o,this.google_analytics=n,this.body_class="".concat(this.id,"_loaded"),this.register_test()}return u(t,[{key:"register_test",value:function(){window.norman=window.norman||[],window.norman[this.id]=window.norman[this.id]||{logs:[]}}}]),t}(),p=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(n,t);var e=d(n);function n(){var t,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:"",google_analytics:!1,hotjar:!1},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Variant",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return a(this,n),(t=e.call(this,o.id,o.google_analytics,o.hotjar)).name=r,t.conditions=i,t.actions=c||t.default_action,t.fallback=u||t.default_fallback,t}return u(n,[{key:"default_action",value:function(){this.log("No action specified",!0)}},{key:"default_fallback",value:function(){this.log("No fallback specified",!0)}},{key:"log",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];o(this.id,t,e)}},{key:"run",value:function(){var t=this;r((function(e){return t.conditions()&&!document.body.classList.contains(t.body_class)}),(function(e){document.body.classList.add(t.body_class),t.track_impression(),t.actions()}),5,10,(function(e){t.fallback()}))}},{key:"track_impression",value:function(){if("number"==typeof this.google_analytics){var t={event:"CRO_Test_Impression",testID:this.id,dimension:this.google_analytics,variation:this.name};this.track_event_object(t)}}},{key:"track_event",value:function(t){var e={event:"CRO_Test_Event",eventAction:"".concat(t),eventLabel:"".concat(this.id,"-").concat(this.name)};this.track_event_object(e)}},{key:"track_event_object",value:function(t){window.dataLayer=window.dataLayer||[],window.dataLayer.push(t),this.log({msg:"Tracked Event Object",eventObject:t})}}]),n}(g);e.$e=p}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}new(n(153).$e)({id:"ex002",google_analytics:29,hotjar:!1},"Variation 1",(function(t){return!!document.querySelector("body")}),(function(){this.log("Specified action loaded",!0)}),(function(){this.track_event("Test can't run, fallback loaded")})).run()})();