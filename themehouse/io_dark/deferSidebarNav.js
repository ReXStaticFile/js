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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidebar_nav__ = __webpack_require__(14);


new __WEBPACK_IMPORTED_MODULE_0__sidebar_nav__["a" /* default */]({
    settings: window.themehouse.settings.sidebarNav
}).register();

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sidebarNav = function () {
    function SidebarNav(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, SidebarNav);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.toggleSidebar = function () {
            var stateName = '0';
            if (_this.visible) {
                window.document.querySelector(_this.settings.selector).classList.remove(_this.settings.visible);
                stateName = '1';
            } else {
                window.document.querySelector(_this.settings.selector).classList.add(_this.settings.visible);
            }
            _this.visible = !_this.visible;

            _this.common.fetch({
                url: _this.settings.link,
                data: {
                    collapsed: stateName
                }
            });
        };

        this.navTrigger = function (e) {
            var rootEle = e.target;
            if (rootEle) {
                var parent = rootEle.closest(_this.settings.navElSelector);
                if (parent) {
                    var subNav = parent.querySelector(_this.settings.subNavSelector);
                    if (subNav) {
                        var subNavInner = subNav.querySelector(_this.settings.subNavInnerSelector);
                        if (subNavInner) {
                            var eleHeight = subNavInner.offsetHeight + 'px';
                            var triggerEle = rootEle.closest(_this.settings.collapseTriggerSelector);
                            triggerEle.classList.toggle(_this.settings.collapseClass);
                            if (subNav.classList.contains(_this.settings.expandClass)) {
                                subNav.style.height = eleHeight;
                                subNav.classList.remove(_this.settings.expandClass);
                                window.setTimeout(function () {
                                    window.requestAnimationFrame(function () {
                                        subNav.style.height = 0;
                                        window.setTimeout(function () {
                                            window.requestAnimationFrame(function () {
                                                subNav.style.height = '';
                                                _this.common.resizeFire();
                                            });
                                        }, _this.settings.collapseDuration);
                                    });
                                }, 17);
                            } else {
                                subNav.classList.add(_this.settings.expandClass);
                                subNav.style.height = eleHeight;
                                window.setTimeout(function () {
                                    window.requestAnimationFrame(function () {
                                        subNav.style.height = '';
                                        _this.common.resizeFire();
                                    });
                                }, _this.settings.collapseDuration);
                            }
                        }
                    }
                }
            }
        };

        this.initGet = function () {
            var triggers = window.document.querySelectorAll(_this.settings.collapseTriggerSelector);
            if (triggers && triggers.length) {
                for (var i = 0, len = triggers.length; i < len; i++) {
                    var _trigger = triggers[i];
                    _trigger.addEventListener('click', _this.navTrigger);
                }
            }

            var trigger = window.document.querySelector(_this.settings.triggerSelector);
            if (trigger) {
                trigger.addEventListener('click', function () {
                    _this.toggleSidebar();
                });
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            selector: 'html',
            triggerSelector: '#uix_sidebarNav--trigger',
            visible: 'sidebarNav--active',
            collapseTriggerSelector: '.uix_sidebarNav--trigger',
            navElSelector: '.p-navEl',
            subNavSelector: '.uix_sidebarNav__subNav',
            subNavInnerSelector: '.uix_sidebarNav__subNavInner',
            collapseClass: 'is-expanded',
            expandClass: 'subNav--expand',
            collapseDuration: 400
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
        this.visible = !this.settings.state;

        if (init) {
            this.init();
        }
    }

    _createClass(SidebarNav, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_SidebarNav',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_SidebarNav',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return SidebarNav;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.sidebarNav = {
    sidebarNav: sidebarNav
};

/* harmony default export */ __webpack_exports__["a"] = (sidebarNav);

/***/ })

/******/ });