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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pagination-container\">\r\n    <ul class=\"pagination\">\r\n        <li ng-click=\"selectPage(1)\"><a href=\"\">首页</a></li>\r\n        <li ng-click=\"selectPage(vm.currentPage - 1)\"><a href=\"\">上一页</a></li>\r\n        <li class=\"page-button\" ng-repeat=\"no in vm.pageList\" ng-class=\"{'active': vm.currentPage == no}\" ng-click=\"selectPage(no)\"><a>{{no}}</a></li>\r\n        <li ng-click=\"selectPage(vm.currentPage + 1)\"><a href=\"\">下一页</a></li>\r\n        <li ng-click=\"selectPage(vm.totalPage)\"><a href=\"\">尾页</a></li>\r\n    </ul>\r\n\r\n    <div class=\"page-count\" ng-if=\"!option.disableCounting\">第 <input type=\"number\" ng-model=\"vm.pageCount\" ng-keypress=\"inputPageNo($event)\"> 页 / {{vm.totalPage}}</div>\r\n</div>";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./pagination.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./pagination.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by zhang on 2017/6/1.
 * 初始化时，如果没有总页数，则默认一页
 * 初始化时，默认第一页
 */
var paginationCss = __webpack_require__(1);
var paginationHtml = __webpack_require__(0);

angular.module('ui.pagination', []).directive('uiPagination', function () {
    var defaultOptions = {
        pageSize: 5, // 每页条数
        displayCount: 5, // 展示的可点击块数
        disableCounting: false // 是否不展示页数输入框
    };

    return {
        restrict: 'AE',
        template: paginationHtml,
        scope: {
            pageSize: '@', // 总共页数， 默认5
            displayCount: '@', // 展示可点击的块数量
            onChange: "&", // 当分页被选择，回调
            disableCounting: '@', // 是否显示计数，默认显示
            totalItems: '=' },
        link: function link($scope) {
            var option = $scope.option = parseOption({
                pageSize: $scope.pageSize,
                displayCount: $scope.displayCount,
                disableCounting: $scope.disableCounting
            });

            $scope.vm = {
                currentPage: 1
            };

            $scope.$watch('totalItems', function () {
                refresh();
            });

            // 通过输入框直接输入页码
            $scope.inputPageNo = function (event) {
                // 如果回车了，则执行选择页面
                if (event.keyCode == '13') {
                    var pageNo = parseInt($scope.vm.pageCount);

                    // 不是数字，则置为当前页面
                    if (isNaN(pageNo)) {
                        // $scope.vm.pageCount = $scope.vm.currentPage;
                        return;
                    }

                    $scope.selectPage(pageNo);
                }
            };

            // 选择页数
            $scope.selectPage = function (pageNo) {
                var prePage = $scope.vm.currentPage;
                // curPage;

                // if (pageNo > $scope.vm.totalPage) {
                //     curPage = $scope.vm.totalPage;
                // } else if (pageNo < 1) {
                //     curPage = 1;
                // } else {
                //     curPage = pageNo;
                // }

                $scope.vm.currentPage = pageNo;

                refresh();

                // $scope.vm.pageCount = $scope.vm.currentPage = curPage;

                if ($scope.vm.currentPage !== prePage) {
                    // $scope.vm.pageList = generatePageList(curPage, parseInt($scope.totalPage), option.displayCount);

                    // 调用回调方法
                    ($scope.onChange || angular.noop)({ curPage: $scope.vm.currentPage, prePage: prePage });
                }
            };

            /**
             * 刷新分页器
             */
            function refresh() {
                $scope.vm.totalPage = getTotalPage(option.pageSize, $scope.totalItems);

                if ($scope.vm.currentPage > $scope.vm.totalPage) {
                    $scope.vm.currentPage = $scope.vm.totalPage;
                } else if ($scope.vm.currentPage < 1) {
                    $scope.vm.currentPage = 1;
                }

                $scope.vm.pageCount = $scope.vm.currentPage;
                $scope.vm.pageList = generatePageList($scope.vm.currentPage, $scope.vm.totalPage, option.displayCount);
            }

            /**
             * 生成分页器中可点页数
             *
             * @param {number} currentPage 当前页数
             * @param {number} totalPage 所有页数
             * @param {number} visibleCount 可以点击的数量
             */
            function generatePageList(currentPage, totalPage, visibleCount) {
                var startPageNum, endPageNum, leftCount, rightCount;

                // 计算在当前页中，左右应该各显示多少个页数按钮
                if (visibleCount % 2 > 0) {
                    leftCount = rightCount = Math.floor(visibleCount / 2);
                } else {
                    leftCount = visibleCount / 2 - 1;
                    rightCount = leftCount + 1;
                }

                if (totalPage <= visibleCount) {
                    // 总数过少，直接显示所有
                    return generateList(1, totalPage);
                } else if (currentPage < 1) {
                    // 确保不会出现负数页面
                    return generateList(1, visibleCount);
                } else if (currentPage >= totalPage) {
                    // 确保不会出现页数大于最大页数
                    return generateList(totalPage - visibleCount + 1, totalPage);
                } else {
                    // 计算出合适的显示范围
                    startPageNum = currentPage - leftCount;
                    endPageNum = currentPage + rightCount;

                    if (startPageNum <= 0) {
                        endPageNum = -1 * startPageNum + 1 + endPageNum;
                        startPageNum = 1;
                    } else if (endPageNum > totalPage) {
                        startPageNum = startPageNum - (endPageNum - totalPage);
                        endPageNum = totalPage;
                    }

                    return generateList(startPageNum, endPageNum);
                }
            }

            /**
             * 生成从头到尾的数组
             *
             * @param {number} start 起始位置，包含
             * @param {number} end 截止位置，包含
             */
            function generateList(start, end) {
                var arrays = [];

                if (end < start) {
                    throw new RangeError('End must large than start');
                }

                for (var i = start; i <= end; i++) {
                    arrays.push(i);
                }

                return arrays;
            }

            /**
             * 计算总共页数
             * @param pageSize
             * @param totalItems
             */
            function getTotalPage(pageSize, totalItems) {
                var totalPages = Math.ceil(totalItems / pageSize);

                return totalPages || 1;
            }

            /**
             * 解析页面配置
             * @param option
             */
            function parseOption(option) {
                option.pageSize = option.pageSize ? parseInt(option.pageSize) : defaultOptions.pageSize;
                option.displayCount = option.displayCount ? parseInt(option.displayCount) : defaultOptions.displayCount;
                option.disableCounting = option.disableCounting !== undefined && option.displayCount !== 'false';

                return option;
            }
        }
    };
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".pagination-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 20px 0;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #333;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .pagination-container * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n  .pagination-container ul.pagination {\n    display: inline-block;\n    margin: 0;\n    padding-left: 0;\n    border-radius: 4px; }\n    .pagination-container ul.pagination > li {\n      display: inline; }\n      .pagination-container ul.pagination > li > a {\n        position: relative;\n        float: left;\n        padding: 6px 12px;\n        margin-left: -1px;\n        line-height: 1.42857143;\n        color: #337ab7;\n        text-decoration: none;\n        background-color: #fff;\n        border: 1px solid #ddd;\n        cursor: pointer; }\n      .pagination-container ul.pagination > li.active > a {\n        z-index: 3;\n        color: #fff;\n        cursor: default;\n        background-color: #337ab7;\n        border-color: #337ab7; }\n      .pagination-container ul.pagination > li:first-child > a {\n        margin-left: 0;\n        border-top-left-radius: 4px;\n        border-bottom-left-radius: 4px; }\n      .pagination-container ul.pagination > li:last-child > a {\n        border-top-right-radius: 4px;\n        border-bottom-right-radius: 4px; }\n    .pagination-container ul.pagination .page-button a {\n      min-width: 45px;\n      text-align: center; }\n  .pagination-container .page-count {\n    margin-left: 20px; }\n    .pagination-container .page-count input {\n      width: 45px;\n      padding: 0 5px;\n      border-radius: 4px;\n      border: 1px solid #ddd;\n      line-height: inherit;\n      font-size: inherit; }\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
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

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

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
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
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

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
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

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

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
/* 6 */
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
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


/***/ })
/******/ ]);