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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__widthToggle__ = __webpack_require__(20);


new __WEBPACK_IMPORTED_MODULE_0__widthToggle__["a" /* default */]({
    settings: window.themehouse.settings.widthToggle
}).register();

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var widthToggle = function () {
    function WidthToggle(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, WidthToggle);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.initGet = function () {
            var triggerEle = window.document.querySelector(_this.settings.triggerSelector);
            var rootEle = window.document.querySelector(_this.settings.selector);
            if (triggerEle && rootEle) {
                triggerEle.addEventListener('click', function () {
                    var stateName = 'fixed';
                    if (rootEle.classList.contains(_this.settings.fixedClass)) {
                        rootEle.classList.remove(_this.settings.fixedClass);
                        rootEle.classList.add(_this.settings.fluidClass);
                        stateName = 'fluid';
                    } else {
                        rootEle.classList.add(_this.settings.fixedClass);
                        rootEle.classList.remove(_this.settings.fluidClass);
                    }

                    window.setTimeout(function () {
                        _this.common.resizeFire();
                    }, _this.settings.delay);

                    _this.common.fetch({
                        url: _this.settings.link,
                        data: {
                            width: stateName
                        }
                    });
                });
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            selector: 'html',
            triggerSelector: '#uix_widthToggle--trigger',
            fixedClass: 'uix_page--fixed',
            fluidClass: 'uix_page--fluid',
            enabled: false,
            link: '',
            delay: 400
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];

        if (init) {
            this.init();
        }
    }

    _createClass(WidthToggle, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_WidthToggle',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_WidthToggle',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return WidthToggle;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.widthToggle = {
    widthToggle: widthToggle
};

/* harmony default export */ __webpack_exports__["a"] = (widthToggle);

/***/ })

/******/ });