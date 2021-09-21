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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inputSync__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loginPanel__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nodes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tooltipFix__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__minimalSearch__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__debug__ = __webpack_require__(11);

//import Canvas from './canvas';






// import Anchors from './anchors';


new __WEBPACK_IMPORTED_MODULE_0__inputSync__["a" /* default */]({
    settings: window.themehouse.settings.inputSync
}).register();

new __WEBPACK_IMPORTED_MODULE_1__loginPanel__["a" /* default */]({
    settings: window.themehouse.settings.loginPanel
}).register();

new __WEBPACK_IMPORTED_MODULE_2__sidebar__["a" /* default */]({
    settings: window.themehouse.settings.sidebar
}).register();

new __WEBPACK_IMPORTED_MODULE_3__nodes__["a" /* default */]({
    settings: window.themehouse.settings.nodes
}).register();

new __WEBPACK_IMPORTED_MODULE_4__tooltipFix__["a" /* default */]({
    settings: window.themehouse.settings.tooltipFix
}).register();

new __WEBPACK_IMPORTED_MODULE_5__minimalSearch__["a" /* default */]({
    settings: window.themehouse.settings.minimalSearch
}).register();

// new Anchors({
//     settings: window.themehouse.settings.anchors,
// }).register();

__webpack_require__(12);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inputSync = function () {
    function InputSync(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, InputSync);

        this.sync = function (e) {
            var target = e.target || e.srcElement;
            if (target) {
                var value = target.value;
                var sync = target.getAttribute('data-' + _this.settings.data);
                var otherTargets = window.document.querySelectorAll(_this.settings.selector + '[data-' + _this.settings.data + '="' + sync + '"]:not(:focus)');
                for (var i = 0, len = otherTargets.length; i < len; i++) {
                    otherTargets[i].value = value;
                }
            }
        };

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.initGet = function () {
            _this.inputs = window.document.querySelectorAll(_this.settings.selector);
            for (var i = 0, len = _this.inputs.length; i < len; i++) {
                var input = _this.inputs[i];
                input.addEventListener('propertychange', _this.sync);
                input.addEventListener('input', _this.sync);
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            selector: '.js-uix_syncValue', // selector for all inputSync
            data: 'uixsync' // data attribute for knowing what to sync together
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
        this.inputs = [];

        if (init) {
            this.init();
        }
    }

    _createClass(InputSync, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_InputSync',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_InputSync',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return InputSync;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.inputSync = {
    inputSync: inputSync
};

/* harmony default export */ __webpack_exports__["a"] = (inputSync);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loginPanel = function () {
    function LoginPanel(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, LoginPanel);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.keyCheck = function (e) {
            if (_this.state) {
                if (e.keyCode === 27) {
                    _this.setState(false);
                }
            }
        };

        this.setState = function (state, selector) {
            if (state) {
                var ele = window.document.querySelector(selector);
                if (ele) {
                    var inputEle = ele.querySelector(_this.settings.inputSelector);
                    if (inputEle) {
                        inputEle.focus();
                    }
                    ele.classList.add(_this.settings.active);
                }

                if (!_this.listener) {
                    _this.listener = true;
                    window.document.addEventListener('keydown', _this.keyCheck);
                }
            } else {
                window.document.querySelector(_this.settings.loginSelector).classList.remove(_this.settings.active);
                window.document.querySelector(_this.settings.registerSelector).classList.remove(_this.settings.active);

                if (_this.listener) {
                    window.document.removeEventListener('keydown', _this.keyCheck);
                    _this.listener = false;
                }
            }

            _this.state = state;
        };

        this.initGet = function () {
            var loginTrigger = window.document.querySelector(_this.settings.loginTriggerSelector);
            if (loginTrigger) {
                loginTrigger.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this.setState(true, _this.settings.loginSelector);

                    return false;
                });
            }

            var registerTrigger = window.document.querySelector(_this.settings.registerTriggerSelector);
            if (registerTrigger) {
                registerTrigger.addEventListener('click', function (e) {
                    e.preventDefault();
                    _this.setState(true, _this.settings.registerSelector);
                    return false;
                });
            }

            var mask = window.document.querySelector(_this.settings.maskSelector);
            if (mask) {
                mask.addEventListener('click', function () {
                    _this.setState(false);
                });
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            loginSelector: '.uix__loginForm--login', // selector for login form
            loginTriggerSelector: '#uix_loginPanel--trigger',
            registerSelector: '.uix__loginForm--register', // selector for login form
            registerTriggerSelector: '#uix_registerPanel--trigger',
            maskSelector: '.uix__loginForm--mask',
            active: 'is-active',
            inputSelector: '.input'
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
        this.state = false;
        this.listener = false;

        if (init) {
            this.init();
        }
    }

    _createClass(LoginPanel, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_LoginPanel',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_LoginPanel',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return LoginPanel;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.loginPanel = {
    loginPanel: loginPanel
};

/* harmony default export */ __webpack_exports__["a"] = (loginPanel);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sidebar = function () {
    function Sidebar(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, Sidebar);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.toggleSidebar = function () {
            var stateName = '1';
            if (window.document.querySelector(_this.settings.selector).classList.contains(_this.settings.collapseClass)) {
                window.document.querySelector(_this.settings.selector).classList.remove(_this.settings.collapseClass);
                stateName = '0';
            } else {
                window.document.querySelector(_this.settings.selector).classList.add(_this.settings.collapseClass);
            }
            if (_this.settings.link === null) {
                _this.common.warn('No AJAX link set for sidebar toggle');
            } else {
                _this.common.fetch({
                    url: _this.settings.link,
                    data: {
                        collapsed: stateName
                    }
                });
            }

            window.setTimeout(function () {
                _this.common.resizeFire();
                window.setTimeout(function () {
                    _this.common.resizeFire(); // fire second time since animation lasts 700ms
                }, _this.settings.delay);
            }, _this.settings.delay);
        };

        this.initGet = function () {
            var triggers = window.document.querySelectorAll(_this.settings.triggerSelector);
            if (triggers && triggers.length) {
                for (var i = 0, len = triggers.length; i < len; i++) {
                    var trigger = triggers[i];
                    trigger.addEventListener('click', function () {
                        _this.toggleSidebar();
                    });
                }
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            selector: 'html',
            triggerSelector: '.uix_sidebarTrigger',
            collapseClass: 'uix_sidebarCollapsed',
            link: null,
            delay: 400
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];

        if (init) {
            this.init();
        }
    }

    _createClass(Sidebar, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_Sidebar',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_Sidebar',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return Sidebar;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.sidebar = {
    sidebar: sidebar
};

/* harmony default export */ __webpack_exports__["a"] = (sidebar);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodes = function () {
    function Nodes(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, Nodes);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.initGet = function () {
            if (_this.settings.enabled) {
                var eles = window.document.querySelectorAll(_this.settings.selector);
                if (eles && eles.length) {
                    var _loop = function _loop(i, len) {
                        var ele = eles[i];
                        ele.addEventListener('click', function (e) {
                            var target = e.target;
                            if (target) {
                                if (target.closest(_this.settings.subNodeSelector)) {
                                    return true;
                                }
                                if (target.closest('a')) {
                                    return true;
                                }
                                if (target.tagName.toLowerCase() === 'a') {
                                    return true;
                                }
                            }

                            var hrefEle = ele.querySelector(_this.settings.hrefSelector);
                            if (hrefEle) {
                                var href = hrefEle.getAttribute('href');
                                if (e.metaKey || e.cmdKey) {
                                    e.preventDefault();
                                    window.open(href, '_blank');
                                } else {
                                    window.location = href;
                                }
                            }
                            return true;
                        });
                    };

                    for (var i = 0, len = eles.length; i < len; i++) {
                        _loop(i, len);
                    }
                }
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            selector: '.node-body',
            hrefSelector: '.node-title a',
            subNodeSelector: '.node-subNodeMenu',
            enabled: false
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];

        if (init) {
            this.init();
        }
    }

    _createClass(Nodes, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_Nodes',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_Nodes',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return Nodes;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.nodeClick = {
    nodes: nodes
};

/* harmony default export */ __webpack_exports__["a"] = (nodes);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tooltipFix = function () {
    function TooltipFix(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, TooltipFix);

        this.scroll = function () {
            _this.scrollGet();
            _this.scrollSet();
        };

        this.scrollGet = function () {
            if (window.XF.MemberTooltip.activeTooltip && window.XF.MemberTooltip.activeTooltip.trigger && window.XF.MemberTooltip.activeTooltip.trigger.$target && window.XF.MemberTooltip.activeTooltip.trigger.$target.length) {
                var triggerEle = window.XF.MemberTooltip.activeTooltip.trigger.$target[0];
                var disablerEle = triggerEle.closest(_this.settings.fixClassSelector);
                if (disablerEle) {
                    _this.needsReposition = true;
                }
            }
        };

        this.scrollSet = function () {
            if (_this.needsReposition) {
                if (window.XF.MemberTooltip.activeTooltip && window.XF.MemberTooltip.activeTooltip.tooltip) {
                    window.XF.MemberTooltip.activeTooltip.tooltip.reposition();
                }
                _this.needsReposition = false;
            }
        };

        this.needsReposition = false;
        this.settings = Object.assign({
            fixClassSelector: '.uix_stickyBodyElement',
            enabled: false
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
    }

    _createClass(TooltipFix, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'scrollGet',
                addon: 'TH_UIX_TooltipFix',
                func: this.scrollGet,
                order: 10
            });
            this.common.register({
                phase: 'scrollSet',
                addon: 'TH_UIX_TooltipFix',
                func: this.scrollSet,
                order: 10
            });
        }
    }]);

    return TooltipFix;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.tooltipFix = {
    tooltipFix: tooltipFix
};

/* harmony default export */ __webpack_exports__["a"] = (tooltipFix);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var minimalSearch = function () {
    function MinimalSearch(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, MinimalSearch);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.setState = function (state, parent) {
            if (state) {
                var parentEle = parent.closest(_this.settings.activeTargetsSelector);
                if (parentEle) {
                    if (_this.common.values.innerWidth < parseInt(_this.settings.breakpoint, 10)) {
                        parentEle.classList.add(_this.settings.active);
                    } else {
                        parentEle.classList.remove(_this.settings.active);
                    }
                }
            } else {
                _this.focusBlocked = true;
                var activeEles = window.document.querySelectorAll('.' + _this.settings.active);
                if (activeEles) {
                    for (var i = 0, len = activeEles.length; i < len; i++) {
                        activeEles[i].classList.remove(_this.settings.active);
                    }
                }
                _this.blurActiveEle();

                window.setTimeout(function () {
                    _this.blurActiveEle();
                    _this.focusBlocked = false;
                }, 900);
            }
        };

        this.blurActiveEle = function () {
            var activeEle = window.document.activeElement;
            if (activeEle) {
                activeEle.blur();
            }
        };

        this.setDropdown = function (ele, state) {
            if (state) {
                var wrapper = ele.closest(_this.settings.searchBarSelector).querySelector(_this.settings.selector);
                if (wrapper) {
                    var rect = wrapper.getBoundingClientRect();
                    ele.style.top = rect.height + 10 + 'px';
                }
                ele.style.display = 'block';

                window.setTimeout(function () {
                    ele.classList.add(_this.settings.searchDropdownActive);
                    ele.style.display = '';
                }, 17);
                _this.numOpenedDropdown += 1;
                var eleForm = ele.querySelector('form');
                if (eleForm) {
                    _this.recentlyOpenedForm = eleForm;
                }
            } else {
                ele.classList.remove(_this.settings.searchDropdownActive);
                ele.style.top = '';

                _this.numOpenedDropdown -= 1;
            }

            _this.checkCloser();
        };

        this.checkCloser = function () {
            if (_this.numOpenedDropdown > 0) {
                if (_this.closerListener === null) {
                    _this.closerListener = window.document.addEventListener('click', function (e) {
                        var target = e.target || e.toElelent || e.srcElement;
                        if (target) {
                            var closestSearch = target.closest(_this.settings.searchBarSelector);
                            var closeSearch = false;
                            if (closestSearch === null) {
                                closeSearch = true;
                            } else {
                                var closeEle = target.closest(_this.settings.closeSelector);
                                if (closeEle !== null) {
                                    closeSearch = true;
                                }
                            }

                            if (closeSearch) {
                                var activeSearchEles = window.document.querySelectorAll('.' + _this.settings.searchDropdownActive);
                                if (activeSearchEles && activeSearchEles.length) {
                                    for (var i = 0, len = activeSearchEles.length; i < len; i++) {
                                        var activeSearchEle = activeSearchEles[i];
                                        _this.setDropdown(activeSearchEle, false);
                                    }
                                }
                            }
                        }
                        _this.numOpenedDropdown = 0;
                    });
                }
            } else if (_this.closerListener !== null) {
                window.document.removeEventListener('click', _this.closerListener);
                _this.closerListener = null;
            }
        };

        this.forceFocus = function (ele) {
            // workaround for android keyboard issue
            ele.focus();
            for (var i = 0; i < 10; i++) {
                window.setTimeout(function () {
                    ele.focus();
                }, 50 * i);
            }
        };

        this.initGet = function () {
            if (_this.lastWidth === -1) {
                _this.lastWidth = window.innerWidth;
            }
            var dropdownTriggerEles = window.document.querySelectorAll(_this.settings.searchDropdownTriggerSelector);

            var _loop = function _loop(i, len) {
                var triggerEle = dropdownTriggerEles[i];
                var searchBar = triggerEle.closest(_this.settings.searchBarSelector);
                if (searchBar && triggerEle) {
                    var menuEle = searchBar.querySelector(_this.settings.searchDropdownSelector);
                    if (menuEle) {
                        triggerEle.addEventListener('focus', function () {
                            if (!_this.focusBlocked) {
                                if (_this.common.values.innerWidth >= _this.settings.dropdownBreakpoint) {
                                    var closestActive = searchBar.querySelector('.' + _this.settings.searchDropdownActive);
                                    if (closestActive === null) {
                                        _this.setDropdown(menuEle, true);
                                    }
                                }
                            }
                        });
                    }
                }
            };

            for (var i = 0, len = dropdownTriggerEles.length; i < len; i++) {
                _loop(i, len);
            }

            var inputEles = window.document.querySelectorAll(_this.settings.selector);
            if (inputEles && inputEles.length) {
                var _loop2 = function _loop2(i, len) {
                    var inputEle = inputEles[i];

                    inputEle.addEventListener('focus', function () {
                        if (!_this.focusBlocked) {
                            var searchForm = inputEle.closest(_this.settings.searchFormSelector);
                            if (searchForm) {
                                searchForm.classList.add(_this.settings.focusedSearchForm);
                            }
                        }
                    });

                    inputEle.addEventListener('blur', function () {
                        if (!_this.focusBlocked) {
                            var searchForm = inputEle.closest(_this.settings.searchFormSelector);
                            if (searchForm) {
                                searchForm.classList.remove(_this.settings.focusedSearchForm);
                            }
                        }
                    });

                    var searchBar = inputEle.closest(_this.settings.searchBarSelector);
                    if (searchBar) {
                        var trigger = searchBar.querySelector(_this.settings.triggerSelector);
                        if (trigger) {
                            trigger.addEventListener('click', function () {
                                if (!_this.focusBlocked) {
                                    _this.setState(true, searchBar);
                                    window.setTimeout(function () {
                                        _this.forceFocus(inputEle);
                                    }, 350);
                                }
                            });
                        }

                        var searchForm = searchBar.querySelector(_this.settings.searchFormSelector);
                        if (searchForm) {
                            searchForm.addEventListener('submit', function (e) {
                                if (_this.recentlyOpenedForm) {
                                    e.preventDefault();
                                    _this.recentlyOpenedForm.submit();
                                }
                            });

                            searchForm.addEventListener('click', function () {
                                if (!_this.focusBlocked) {
                                    _this.forceFocus(inputEle);
                                }
                            });

                            var submitIcon = searchForm.querySelector(_this.settings.submitIconSelector);
                            if (submitIcon) {
                                submitIcon.addEventListener('click', function () {
                                    searchForm.submit();
                                });
                            }
                        }

                        var detailedEle = searchBar.querySelector(_this.settings.detailedSelector);
                        if (detailedEle) {
                            detailedEle.addEventListener('click', function (e) {
                                var menuEle = searchBar.querySelector(_this.settings.searchDropdownSelector);
                                if (menuEle) {
                                    _this.setDropdown(menuEle, true);
                                }

                                e.preventDefault();
                                return false;
                            });
                        }
                    }
                };

                for (var i = 0, len = inputEles.length; i < len; i++) {
                    _loop2(i, len);
                }
            }

            var closeEles = window.document.querySelectorAll(_this.settings.closeSelector);
            if (closeEles && closeEles.length) {
                for (var i = 0, len = closeEles.length; i < len; i++) {
                    var closeEle = closeEles[i];
                    closeEle.addEventListener('click', function (e) {
                        e.preventDefault();
                        _this.setState(false);
                        e.preventDefault();
                        return false;
                    });
                }
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.resizeGet = function () {
            var openXFMenuEle = window.document.querySelector(_this.settings.xfMenuOpenSelector);
            if (openXFMenuEle && _this.lastWidth !== window.innerWidth) {
                _this.xfMenuOpen = true;
                _this.lastWidth = window.innerWidth;
            }
        };

        this.resizeSet = function () {
            if (_this.xfMenuOpen) {
                window.XF.MenuWatcher.closeAll(); // close XF dropdown menu since trigger could responsively hide
                _this.xfMenuOpen = false;
            }
        };

        this.running = false;
        this.settings = Object.assign({
            selector: '.uix_searchInput', // selector for search input
            closeSelector: '.uix_search--close',
            active: 'minimalSearch--active',
            activeTargetsSelector: '.p-nav-inner, .p-sectionLinks, .p-header-content, .p-staffBar',
            detailedSelector: '.uix_search--settings',
            detailed: 'minimalSearch--detailed',
            breakpoint: '650px',
            clickDelay: 100,
            clickTargetSelector: '.js-uix_minimalSearch__target',
            triggerSelector: '.uix_searchIconTrigger',
            searchFormSelector: '.uix_searchForm',
            focusedSearchForm: 'uix_searchForm--focused',
            searchBarSelector: '.uix_searchBar',
            searchInnerSelector: '.uix_searchBarInner',
            submitIconSelector: '.uix_search--submit .uix_icon--search',
            searchDropdownSelector: '.uix_searchDropdown__menu',
            searchDropdownTriggerSelector: '.uix_searchDropdown__trigger',
            searchDropdownActive: 'uix_searchDropdown__menu--active',
            dropdownBreakpoint: 0,
            xfMenuOpenSelector: '.menu.is-active form[data-xf-init="quick-search"]'
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
        this.numOpenedDropdown = 0;
        this.lastWidth = -1;
        this.closerListener = null;
        this.xfMenuOpen = false;
        this.focusBlocked = false;
        this.recentlyOpenedForm = null;

        if (init) {
            this.init();
        }
    }

    _createClass(MinimalSearch, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_MinimalSearch',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_MinimalSearch',
                func: this.initSet,
                order: 10
            });

            this.common.register({
                phase: 'resizeGet',
                addon: 'TH_UIX_MinimalSearch',
                func: this.resizeGet,
                order: 10
            });
            this.common.register({
                phase: 'resizeSet',
                addon: 'TH_UIX_MinimalSearch',
                func: this.resizeSet,
                order: 10
            });
        }
    }]);

    return MinimalSearch;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.minimalSearch = {
    minimalSearch: minimalSearch
};

/* harmony default export */ __webpack_exports__["a"] = (minimalSearch);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var debug = function debug() {
    var settings = window.themehouse.settings;
    var keys = Object.keys(settings);
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        console.log('==========================');
        console.log(key);
        printObject(settings[key], 1);
    }
};

var printObject = function printObject(data) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var spacer = '';
    for (var spacerIndex = 0; spacerIndex < depth; spacerIndex++) {
        spacer += '     ';
    }
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        var keys = Object.keys(data);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var childData = data[key];
            if ((typeof childData === 'undefined' ? 'undefined' : _typeof(childData)) === 'object') {
                console.log(spacer + key + ':');
                printObject(data[key], depth + 1);
            } else {
                console.log(spacer + key + ': ' + data[key]);
            }
        }
    } else {
        console.log(spacer + data);
    }
};

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.debug = debug;

/* unused harmony default export */ var _unused_webpack_default_export = (debug);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

window.XF.HScroller.prototype.updateScroll = function () {
    var el = this.$scrollTarget[0];
    var left = this.$scrollTarget.normalizedScrollLeft();
    var width = el.offsetWidth;
    var scrollWidth = el.scrollWidth;
    var startActive = left > 0;
    var endActive = width + left + 1 < scrollWidth;

    if (startActive) {
        this.$scrollTarget.addClass('th_scroller--start-active');
    } else {
        this.$scrollTarget.removeClass('th_scroller--start-active');
    }

    if (endActive) {
        this.$scrollTarget.addClass('th_scroller--end-active');
    } else {
        this.$scrollTarget.removeClass('th_scroller--end-active');
    }

    this.$goStart[startActive ? 'addClass' : 'removeClass']('is-active');
    this.$goEnd[endActive ? 'addClass' : 'removeClass']('is-active');
};

/***/ })
/******/ ]);