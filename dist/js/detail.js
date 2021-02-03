/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 166);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(43);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(33);

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(39);

var _header = __webpack_require__(52);

var _header2 = _interopRequireDefault(_header);

var _iframe = __webpack_require__(167);

var _iframe2 = _interopRequireDefault(_iframe);

var _follow = __webpack_require__(170);

var _follow2 = _interopRequireDefault(_follow);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 组件
;

// 工具函数
// 通用
(function () {
  var oApp = document.querySelector('#app');
  // 读取localStorage中的数据
  var currentNew = JSON.parse(window.localStorage.getItem('currentNew'));
  var followNews = JSON.parse(window.localStorage.getItem('followNews') || '[]');
  // 初始化
  function init() {
    render();
    bindEvent();
  }
  function bindEvent() {
    // 绑定收藏点击事件
    _follow2.default.bindEvent(doFollow);
  }

  // 渲染
  function render() {
    var header = _header2.default.tpl({
      url: (0, _utils.getQueryByKey)('path') || '/',
      showLeftIcon: true,
      showRightIcon: false,
      title: '新闻详情'
    });
    var iframe = _iframe2.default.tpl({
      url: currentNew.url
    });
    var follow = createFollow();
    oApp.innerHTML += header + iframe + follow;
  }

  // 根据收藏状态渲染收藏图标
  function createFollow() {
    var flag = followNews.findIndex(function (item) {
      return item.uniquekey === currentNew.uniquekey;
    });
    return flag !== -1 ? _follow2.default.follow() : _follow2.default.unFollow();
  }

  /*** 点击收藏后的回调函数
   * flag：（true: 收藏  false: 取消收藏）
   *   
   */
  function doFollow(flag) {
    var followNews = JSON.parse(window.localStorage.getItem('followNews') || '[]');
    if (flag) {
      followNews.push(currentNew);
    } else {
      followNews = followNews.filter(function (item) {
        return item.uniquekey !== currentNew.uniquekey;
      });
    }
    window.localStorage.setItem('followNews', (0, _stringify2.default)(followNews));
  }
  init();
})(document);

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(168);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(169);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Iframe',
  tpl: function tpl(options) {
    return (0, _utils.compileTemplate)(_index2.default, options);
  }
};

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<iframe src="{{url}}" width="100%" height="100%" class="iframe"></iframe>';

}
return __p
}

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(171);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(172);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Follow',
  // 已经收藏
  follow: function follow() {
    return (0, _utils.compileTemplate)(_index2.default, {
      star: 'star'
    });
  },

  // 没收藏
  unFollow: function unFollow() {
    return (0, _utils.compileTemplate)(_index2.default, {
      star: 'star-o'
    });
  },

  // 绑定事件函数
  bindEvent: function bindEvent(doFollow) {
    var oFollow = document.querySelector('.follow');
    oFollow.addEventListener('click', this._setFollowStatus.bind(this, oFollow, doFollow), false);
  },
  _setFollowStatus: function _setFollowStatus(oFollow, doFollow) {
    var classNames = oFollow.className;
    oFollow.className = 'follow iconfont icon-';
    switch (classNames) {
      case 'follow iconfont icon-star':
        oFollow.className += 'star-o';
        doFollow(false);
        break;
      case 'follow iconfont icon-star-o':
        oFollow.className += 'star';
        doFollow(true);
        break;
      default:
        break;
    }
  }
};

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<span class="follow iconfont icon-{{star}}"></span>';

}
return __p
}

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function FastClick(layer, options) {
	var oldOnClick;
	options = options || {};
	this.trackingClick = false;
	this.trackingClickStart = 0;
	this.targetElement = null;
	this.touchStartX = 0;
	this.touchStartY = 0;
	this.lastTouchIdentifier = 0;
	this.touchBoundary = options.touchBoundary || 10;
	this.layer = layer;
	this.tapDelay = options.tapDelay || 200;
	this.tapTimeout = options.tapTimeout || 700;
	if (FastClick.notNeeded(layer)) {
		return;
	}
	function bind(method, context) {
		return function () {
			return method.apply(context, arguments);
		};
	}
	var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	var context = this;
	for (var i = 0, l = methods.length; i < l; i++) {
		context[methods[i]] = bind(context[methods[i]], context);
	}
	if (deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}
	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function (type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};
		layer.addEventListener = function (type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}
	if (typeof layer.onclick === 'function') {
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function (event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}
var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);
var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
FastClick.prototype.needsClick = function (target) {
	switch (target.nodeName.toLowerCase()) {
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}
			break;
		case 'input':
			if (deviceIsIOS && target.type === 'file' || target.disabled) {
				return true;
			}
			break;
		case 'label':
		case 'iframe':case 'video':
			return true;
		default:
			break;
	}
	return (/\bneedsclick\b/.test(target.className)
	);
};
FastClick.prototype.needsFocus = function (target) {
	switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				default:
					break;
			}
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/.test(target.className)
			);
	}
};
FastClick.prototype.sendClick = function (targetElement, event) {
	var clickEvent, touch;
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}
	touch = event.changedTouches[0];
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};
FastClick.prototype.determineEventType = function (targetElement) {
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}
	return 'click';
};
FastClick.prototype.focus = function (targetElement) {
	var length;
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};
FastClick.prototype.updateScrollParent = function (targetElement) {
	var scrollParent, parentElement;
	scrollParent = targetElement.fastClickScrollParent;
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}
			parentElement = parentElement.parentElement;
		} while (parentElement);
	}
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};
FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}
	return eventTarget;
};
FastClick.prototype.onTouchStart = function (event) {
	var targetElement, touch, selection;
	if (event.targetTouches.length > 1) {
		return true;
	}
	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];
	if (deviceIsIOS) {
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}
		if (!deviceIsIOS4) {
			if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}
			this.lastTouchIdentifier = touch.identifier;
			this.updateScrollParent(targetElement);
		}
	}
	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;
	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;
	if (event.timeStamp - this.lastClickTime < this.tapDelay) {
		event.preventDefault();
	}
	return true;
};
FastClick.prototype.touchHasMoved = function (event) {
	var touch = event.changedTouches[0],
	    boundary = this.touchBoundary;
	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}
	return false;
};
FastClick.prototype.onTouchMove = function (event) {
	if (!this.trackingClick) {
		return true;
	}
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}
	return true;
};
FastClick.prototype.findControl = function (labelElement) {
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};
FastClick.prototype.onTouchEnd = function (event) {
	var forElement,
	    trackingClickStart,
	    targetTagName,
	    scrollParent,
	    touch,
	    targetElement = this.targetElement;
	if (!this.trackingClick) {
		return true;
	}
	if (event.timeStamp - this.lastClickTime < this.tapDelay) {
		this.cancelNextClick = true;
		return true;
	}
	if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
		return true;
	}
	this.cancelNextClick = false;
	this.lastClickTime = event.timeStamp;
	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;
	if (deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}
	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (deviceIsAndroid) {
				return false;
			}
			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {
		if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
			this.targetElement = null;
			return false;
		}
		this.focus(targetElement);
		this.sendClick(targetElement, event);
		if (!deviceIsIOS || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}
		return false;
	}
	if (deviceIsIOS && !deviceIsIOS4) {
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}
	return false;
};
FastClick.prototype.onTouchCancel = function () {
	this.trackingClick = false;
	this.targetElement = null;
};
FastClick.prototype.onMouse = function (event) {
	if (!this.targetElement) {
		return true;
	}
	if (event.forwardedTouchEvent) {
		return true;
	}
	if (!event.cancelable) {
		return true;
	}
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {
			event.propagationStopped = true;
		}
		event.stopPropagation();
		event.preventDefault();
		return false;
	}
	return true;
};
FastClick.prototype.onClick = function (event) {
	var permitted;
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}
	permitted = this.onMouse(event);
	if (!permitted) {
		this.targetElement = null;
	}
	return permitted;
};
FastClick.prototype.destroy = function () {
	var layer = this.layer;
	if (deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}
	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};
FastClick.notNeeded = function (layer) {
	var metaViewport;
	var chromeVersion;
	var blackberryVersion;
	var firefoxVersion;
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [undefined, 0])[1];
	if (chromeVersion) {
		if (deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport) {
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}
		} else {
			return true;
		}
	}
	if (deviceIsBlackBerry10) {
		blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
		if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport) {
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				if (document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}
		}
	}
	if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
		return true;
	}
	firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [undefined, 0])[1];
	if (firefoxVersion >= 27) {
		metaViewport = document.querySelector('meta[name=viewport]');
		if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
			return true;
		}
	}
	if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
		return true;
	}
	return false;
};
FastClick.attach = function (layer, options) {
	return new FastClick(layer, options);
};
// if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
// 	define(function () {
// 		return FastClick;
// 	});
// } else if (typeof module !== 'undefined' && module.exports) {
// 	module.exports = FastClick.attach;
// 	module.exports.FastClick = FastClick;
// } else {
// 	window.FastClick = FastClick;
// }
exports.default = FastClick;

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/iconfont-8ee1a30d93b4989f.eot";

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileTemplate = compileTemplate;
exports.scrollToTop = scrollToTop;
exports.setPageData = setPageData;
exports.touchBottom = touchBottom;
exports.getItemNode = getItemNode;
exports.getQueryByKey = getQueryByKey;
// 编译模板函数
function compileTemplate(template, templateObj) {
  return template().replace(/\{\{(.+?)\}\}/g, function (node, key) {
    return templateObj[key.trim()];
  });
}
// 跳到顶部
function scrollToTop() {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
}

// 格式化数据
function setPageData(data, count) {
  var len = data.length;
  var index = 0;
  var pageData = [];
  while (index < len) {
    pageData.push(data.slice(index, index += count));
  }
  return pageData;
}

// 触底触发callback
function touchBottom(callback) {
  var scrollTop = _getScrollTop();
  var scrollHeight = _getScrollHeight();
  var windowHeight = _getWindowHeight();
  if (scrollTop + windowHeight >= scrollHeight - 1) {
    callback();
  }
}

// 获取node
function getItemNode(target) {
  while (target = target.parentNode) {
    if (target.className.split(' ')[0] === 'news-item') {
      return target;
    }
  }
}

function getQueryByKey(key) {
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  var res = window.location.search.substr(1).match(reg);

  return res !== null ? decodeURIComponent(res[2]) : null;
}

/***************内部方法*************/
function _getScrollTop() {
  var scrollTop = 0,
      bodyScrollTop = 0,
      ElementScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    ElementScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = bodyScrollTop - ElementScrollTop > 0 ? bodyScrollTop : ElementScrollTop;
  return Math.floor(scrollTop);
}
function _getScrollHeight() {
  var scrollHeight = 0,
      bodyScrollHeight = 0,
      ElementScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    ElementScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = bodyScrollHeight - ElementScrollHeight > 0 ? bodyScrollHeight : ElementScrollHeight;
  return Math.floor(scrollHeight);
}
function _getWindowHeight() {
  var windowHeight = 0,
      bodyHeight = 0,
      ElementHeight = 0;
  if (document.body) {
    bodyHeight = document.body.clientHeight;
  }
  if (document.documentElement) {
    ElementHeight = document.documentElement.clientHeight;
  }
  windowHeight = bodyHeight - ElementHeight > 0 ? bodyHeight : ElementHeight;
  return Math.floor(windowHeight);
}

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(40);

__webpack_require__(20);

__webpack_require__(41);

__webpack_require__(44);

__webpack_require__(50);

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fastclick = __webpack_require__(20);

var _fastclick2 = _interopRequireDefault(_fastclick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  _fastclick2.default.attach(document.body);
}, false);

document.documentElement.addEventListener('touchmove', function (e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, false);

document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px';

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(42);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(12)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// Module
exports.push([module.i, "@charset \"utf-8\";\n.border,\n.border-top,\n.border-right,\n.border-bottom,\n.border-left,\n.border-topbottom,\n.border-rightleft,\n.border-topleft,\n.border-rightbottom,\n.border-topright,\n.border-bottomleft {\n    position: relative;\n}\n.border::before,\n.border-top::before,\n.border-right::before,\n.border-bottom::before,\n.border-left::before,\n.border-topbottom::before,\n.border-topbottom::after,\n.border-rightleft::before,\n.border-rightleft::after,\n.border-topleft::before,\n.border-topleft::after,\n.border-rightbottom::before,\n.border-rightbottom::after,\n.border-topright::before,\n.border-topright::after,\n.border-bottomleft::before,\n.border-bottomleft::after {\n    content: \"\\0020\";\n    overflow: hidden;\n    position: absolute;\n}\n/* border\n * 因，边框是由伪元素区域遮盖在父级\n * 故，子级若有交互，需要对子级设置\n * 定位 及 z轴\n */\n.border::before {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    border: 1px solid #eaeaea;\n    -webkit-transform-origin: 0 0;\n        -ms-transform-origin: 0 0;\n            transform-origin: 0 0;\n}\n.border-top::before,\n.border-bottom::before,\n.border-topbottom::before,\n.border-topbottom::after,\n.border-topleft::before,\n.border-rightbottom::after,\n.border-topright::before,\n.border-bottomleft::before {\n    left: 0;\n    width: 100%;\n    height: 1px;\n}\n.border-right::before,\n.border-left::before,\n.border-rightleft::before,\n.border-rightleft::after,\n.border-topleft::after,\n.border-rightbottom::before,\n.border-topright::after,\n.border-bottomleft::after {\n    top: 0;\n    width: 1px;\n    height: 100%;\n}\n.border-top::before,\n.border-topbottom::before,\n.border-topleft::before,\n.border-topright::before {\n    border-top: 1px solid #eaeaea;\n    -webkit-transform-origin: 0 0;\n        -ms-transform-origin: 0 0;\n            transform-origin: 0 0;\n}\n.border-right::before,\n.border-rightbottom::before,\n.border-rightleft::before,\n.border-topright::after {\n    border-right: 1px solid #eaeaea;\n    -webkit-transform-origin: 100% 0;\n        -ms-transform-origin: 100% 0;\n            transform-origin: 100% 0;\n}\n.border-bottom::before,\n.border-topbottom::after,\n.border-rightbottom::after,\n.border-bottomleft::before {\n    border-bottom: 1px solid #eaeaea;\n    -webkit-transform-origin: 0 100%;\n        -ms-transform-origin: 0 100%;\n            transform-origin: 0 100%;\n}\n.border-left::before,\n.border-topleft::after,\n.border-rightleft::after,\n.border-bottomleft::after {\n    border-left: 1px solid #eaeaea;\n    -webkit-transform-origin: 0 0;\n        -ms-transform-origin: 0 0;\n            transform-origin: 0 0;\n}\n.border-top::before,\n.border-topbottom::before,\n.border-topleft::before,\n.border-topright::before {\n    top: 0;\n}\n.border-right::before,\n.border-rightleft::after,\n.border-rightbottom::before,\n.border-topright::after {\n    right: 0;\n}\n.border-bottom::before,\n.border-topbottom::after,\n.border-rightbottom::after,\n.border-bottomleft::after {\n    bottom: 0;\n}\n.border-left::before,\n.border-rightleft::before,\n.border-topleft::after,\n.border-bottomleft::before {\n    left: 0;\n}\n@media (-webkit-max-device-pixel-ratio: 1.49), (max-device-pixel-ratio: 1.49), (-webkit-max-device-pixel-ratio: 1.4895833333333333), (-o-max-device-pixel-ratio: 143/96), (max-resolution: 143dpi), (-o-max-device-pixel-ratio: 149/100), (max-resolution: 1.49dppx) {\n    /* 默认值，无需重置 */\n}\n@media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49), (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49), (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.4895833333333335), (-o-min-device-pixel-ratio: 3/2) and (-o-max-device-pixel-ratio: 239/96), (min-resolution: 144dpi) and (max-resolution: 239dpi), (-o-min-device-pixel-ratio: 3/2) and (-o-max-device-pixel-ratio: 249/100), (min-resolution: 1.5dppx) and (max-resolution: 2.49dppx) {\n    .border::before {\n        width: 200%;\n        height: 200%;\n        -webkit-transform: scale(.5);\n            -ms-transform: scale(.5);\n                transform: scale(.5);\n    }\n    .border-top::before,\n    .border-bottom::before,\n    .border-topbottom::before,\n    .border-topbottom::after,\n    .border-topleft::before,\n    .border-rightbottom::after,\n    .border-topright::before,\n    .border-bottomleft::before {\n        -webkit-transform: scaleY(.5);\n            -ms-transform: scaleY(.5);\n                transform: scaleY(.5);\n    }\n    .border-right::before,\n    .border-left::before,\n    .border-rightleft::before,\n    .border-rightleft::after,\n    .border-topleft::after,\n    .border-rightbottom::before,\n    .border-topright::after,\n    .border-bottomleft::after {\n        -webkit-transform: scaleX(.5);\n            -ms-transform: scaleX(.5);\n                transform: scaleX(.5);\n    }\n}\n@media (-webkit-min-device-pixel-ratio: 2.5), (min-device-pixel-ratio: 2.5), (-o-min-device-pixel-ratio: 5/2), (min-resolution: 240dpi), (min-resolution: 2.5dppx) {\n    .border::before {\n        width: 300%;\n        height: 300%;\n        -webkit-transform: scale(.33333);\n            -ms-transform: scale(.33333);\n                transform: scale(.33333);\n    }\n    .border-top::before,\n    .border-bottom::before,\n    .border-topbottom::before,\n    .border-topbottom::after,\n    .border-topleft::before,\n    .border-rightbottom::after,\n    .border-topright::before,\n    .border-bottomleft::before {\n        -webkit-transform: scaleY(.33333);\n            -ms-transform: scaleY(.33333);\n                transform: scaleY(.33333);\n    }\n    .border-right::before,\n    .border-left::before,\n    .border-rightleft::before,\n    .border-rightleft::after,\n    .border-topleft::after,\n    .border-rightbottom::before,\n    .border-topright::after,\n    .border-bottomleft::after {\n        -webkit-transform: scaleX(.33333);\n            -ms-transform: scaleX(.33333);\n                transform: scaleX(.33333);\n    }\n}", ""]);



/***/ }),

/***/ 43:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(45);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(12)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// Imports
var urlEscape = __webpack_require__(46);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(21));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(21) + "#iefix");
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(47));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(48));
var ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(49) + "#iconfont");

// Module
exports.push([module.i, "@font-face {font-family: \"iconfont\";\n  src: url(" + ___CSS_LOADER_URL___0___ + "); /* IE9 */\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format('embedded-opentype'), \n  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),\n  url(" + ___CSS_LOADER_URL___2___ + ") format('woff'),\n  url(" + ___CSS_LOADER_URL___3___ + ") format('truetype'), \n  url(" + ___CSS_LOADER_URL___4___ + ") format('svg'); /* iOS 4.1- */\n}\n\n.iconfont {\n  font-family: \"iconfont\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-star:before {\n  content: \"\\e61d\";\n}\n\n.icon-star-o:before {\n  content: \"\\e613\";\n}\n\n.icon-arrow-left:before {\n  content: \"\\e60d\";\n}\n\n.icon-error:before {\n  content: \"\\e86e\";\n}\n\n.icon-follow:before {\n  content: \"\\e606\";\n}\n\n.icon-no-data:before {\n  content: \"\\e60b\";\n}\n\n", ""]);



/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/iconfont-abfea1293e08a3cf.woff";

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/iconfont-c7e42e6f52f45676.ttf";

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/iconfont-e05ed7e35eb2b3ba.svg";

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(51);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(12)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// Module
exports.push([module.i, "@charset \"utf-8\";html{background-color:#f5f7f8;color:#000;font-size:12px}\nbody,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0}\nbody,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{line-height:1.5;font-family:tahoma,arial,\"Hiragino Sans GB\",simsun,sans-serif}\nh1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}\nh1,h2,h3,h4,h5,h6{font-family:tahoma,arial,\"Hiragino Sans GB\",\"微软雅黑\",simsun,sans-serif}\nh1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}\naddress,cite,dfn,em,i,optgroup,var{font-style:normal}\ntable{border-collapse:collapse;border-spacing:0;text-align:left}\ncaption,th{text-align:inherit}\nul,ol,menu{list-style:none}\nfieldset,img{border:0}\nimg,object,input,textarea,button,select{vertical-align:middle}\narticle,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}\naudio,canvas,video{display:inline-block;*display:inline;*zoom:1}\nblockquote:before,blockquote:after,q:before,q:after{content:\"\\0020\"}\ntextarea{overflow:auto;resize:vertical}\ninput,textarea,button,select,a{outline:0 none;border: none;-webkit-box-sizing: border-box;box-sizing: border-box;}\nbutton::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}\nmark{background-color:transparent}\na,ins,s,u,del{text-decoration:none}\nsup,sub{vertical-align:baseline}\nhtml {overflow-x: hidden;height: 100%;font-size: 50px;-webkit-tap-highlight-color: transparent;}\nbody {font-family: Arial, \"Microsoft Yahei\", \"Helvetica Neue\", Helvetica, sans-serif;color: #333;font-size: .28em;line-height: 1;-webkit-text-size-adjust: none;}\nhr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}\na {color: #333;text-decoration: none;}\nimg {width: 100%;}\nhtml,body,#app{height:100%;}", ""]);



/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(53);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(54);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Header',
  tpl: function tpl(options) {
    var showLeftIcon = options.showLeftIcon,
        showRightIcon = options.showRightIcon;

    options.showLeftIcon = showLeftIcon ? 'block' : 'none';
    options.showRightIcon = showRightIcon ? 'block' : 'none';
    return (0, _utils.compileTemplate)(_index2.default, options);
  }
};

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<header class="header">\r\n  <div class="left icon">\r\n    <a href="{{ url }}" style="display: {{ showLeftIcon }}">\r\n      <span class="iconfont icon-arrow-left"></span>\r\n    </a>\r\n  </div>\r\n  <div class="center">\r\n    <h1>\r\n      {{ title }}\r\n    </h1>\r\n  </div>\r\n  <div class="right icon">\r\n    <a href="collections.html" style="display: {{ showRightIcon }};">\r\n      <span class="iconfont icon-follow"></span>\r\n    </a>\r\n  </div>\r\n</header>\r\n';

}
return __p
}

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });