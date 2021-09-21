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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fab__ = __webpack_require__(16);


new __WEBPACK_IMPORTED_MODULE_0__fab__["a" /* default */]({
    settings: window.themehouse.settings.fab
}).register();

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fab = function () {
    function Fab(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, Fab);

        this.setState = function (state) {
            if (state !== _this.active) {
                _this.active = state;
                for (var i = 0, len = _this.eles.length; i < len; i++) {
                    var ele = _this.eles[i];
                    if (state) {
                        ele.classList.add(_this.settings.active);
                    } else {
                        ele.classList.remove(_this.settings.active);
                    }
                }
            }
        };

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.initGet = function () {
            if (_this.settings.enabled) {
                _this.eles = window.document.querySelectorAll(_this.settings.selector);
            }

            var quickReplyButtons = window.document.querySelectorAll(_this.settings.quickReplySelector);
            if (quickReplyButtons && quickReplyButtons.length) {
                for (var i = 0, len = quickReplyButtons.length; i < len; i++) {
                    var quickReplyButton = quickReplyButtons[i];
                    quickReplyButton.addEventListener('click', function (e) {
                        var $editor = window.XF.findRelativeIf('.js-quickReply .js-editor', window.jQuery(e.target));
                        if ($editor) {
                            window.XF.focusEditor($editor);
                            e.preventDefault();
                        }
                    });
                }
            }

            if (_this.settings.enableQuickPost) {
                var quickPostButtons = window.document.querySelectorAll(_this.settings.quickPostSelector);
                if (quickPostButtons && quickPostButtons.length) {
                    for (var _i = 0, _len = quickPostButtons.length; _i < _len; _i++) {
                        var quickPostButton = quickPostButtons[_i];
                        quickPostButton.addEventListener('click', function (e) {
                            var target = window.document.querySelector(_this.settings.quickPostTargetSelector);
                            if (target) {
                                e.preventDefault();
                                target.focus();
                            }
                        });
                    }
                }
            }
        };

        this.initSet = function () {
            if (_this.settings.enabled) {
                _this.running = true;
            }
        };

        this.scroll = function () {
            _this.scrollGet();
            _this.scrollSet();
        };

        this.scrollGet = function () {
            if (_this.settings.enabled) {}
        };

        this.scrollSet = function () {
            if (_this.settings.enabled) {
                if (window.themehouse.data.scrollY > _this.lastScrollTop) {
                    _this.setState(false);
                } else if (window.themehouse.data.scrollY < _this.lastScrollTop) {
                    _this.setState(true);
                }
                _this.lastScrollTop = window.themehouse.data.scrollY;
            }
        };

        this.running = false;
        this.settings = Object.assign({
            selector: '.uix_fabBar',
            active: 'uix_fabBar--active',
            quickReplySelector: '.uix_quickReply--button',
            quickPostSelector: '.uix_quickPost--button',
            quickPostTargetSelector: '.js-titleInput',
            enabled: false,
            enableQuickPost: false
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
        this.eles = [];
        this.active = true;
        this.lastScrollTop = 0;

        if (init) {
            this.init();
        }
    }

    _createClass(Fab, [{
        key: 'register',
        value: function register() {
            if (this.settings.enabled) {
                this.common.register({
                    phase: 'afterGet',
                    addon: 'TH_UIX_Fab',
                    func: this.initGet,
                    order: 10
                });
                this.common.register({
                    phase: 'afterSet',
                    addon: 'TH_UIX_Fab',
                    func: this.initSet,
                    order: 10
                });
                this.common.register({
                    phase: 'scrollGet',
                    addon: 'TH_UIX_Fab',
                    func: this.scrollGet,
                    order: 10
                });
                this.common.register({
                    phase: 'scrollSet',
                    addon: 'TH_UIX_Fab',
                    func: this.scrollSet,
                    order: 10
                });
            }
        }
    }]);

    return Fab;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.fab = {
    fab: fab
};

/* harmony default export */ __webpack_exports__["a"] = (fab);

/***/ })

/******/ });