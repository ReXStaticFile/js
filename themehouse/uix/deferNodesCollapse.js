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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nodes_collapse__ = __webpack_require__(18);


new __WEBPACK_IMPORTED_MODULE_0__nodes_collapse__["a" /* default */]({
    settings: window.themehouse.settings.nodesCollapse
}).register();

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodesCollapse = function () {
    function NodesCollapse(_ref) {
        var _this = this;

        var _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? '20180112' : _ref$commonVersion;

        _classCallCheck(this, NodesCollapse);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.initGet = function () {
            var triggers = window.document.querySelectorAll(_this.settings.triggerSelector);
            if (triggers && triggers.length) {
                for (var i = 0, len = triggers.length; i < len; i++) {
                    var trigger = triggers[i];
                    trigger.addEventListener('click', function (e) {
                        var ele = e.target;
                        var parent = ele.closest(_this.settings.parentSelector);
                        var parentClassSplit = parent.className.split(' ');
                        var nodeId = -1;
                        for (var classIndex = 0, classLen = parentClassSplit.length; classIndex < classLen; classIndex++) {
                            var className = parentClassSplit[classIndex];
                            if (className.indexOf(_this.settings.nodeIdReplace) === 0 && className !== _this.settings.nodeIdReplace) {
                                nodeId = parseInt(className.replace(_this.settings.nodeIdReplace, ''), 10);
                            }
                        }
                        var child = parent.querySelector(_this.settings.childSelector);
                        var innerChild = child.querySelector(_this.settings.childInnerSelector);
                        var height = innerChild.offsetHeight;
                        child.style.height = height + 'px';
                        child.classList.add('uix_node--transitioning');
                        window.requestAnimationFrame(function () {
                            var stateName = '1';
                            if (parent.classList.contains(_this.settings.active)) {
                                parent.classList.remove(_this.settings.active);
                                stateName = '0';
                            } else {
                                parent.classList.add(_this.settings.active);
                            }

                            _this.common.fetch({
                                url: _this.settings.link,
                                data: {
                                    collapsed: stateName,
                                    node_id: nodeId
                                }
                            });

                            window.setTimeout(function () {
                                child.style.height = '';
                                child.classList.remove('uix_node--transitioning');
                            }, _this.settings.duration);
                        });
                    });
                }
            }
        };

        this.initSet = function () {
            _this.running = true;
        };

        this.running = false;
        this.settings = Object.assign({
            triggerSelector: '.categoryCollapse--trigger',
            parentSelector: '.block--category',
            nodeIdReplace: 'block--category',
            childSelector: '.uix_block-body--outer',
            childInnerSelector: '.block-body',
            active: 'category--collapsed',
            duration: 400
        }, settings);

        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];
        this.state = false;
        this.listener = false;

        if (init) {
            this.init();
        }
    }

    _createClass(NodesCollapse, [{
        key: 'register',
        value: function register() {
            this.common.register({
                phase: 'afterGet',
                addon: 'TH_UIX_NodesCollapse',
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: 'afterSet',
                addon: 'TH_UIX_NodesCollapse',
                func: this.initSet,
                order: 10
            });
        }
    }]);

    return NodesCollapse;
}();

if (typeof window.themehouse === 'undefined') {
    window.themehouse = {};
}

window.themehouse.nodesCollapse = {
    nodesCollapse: nodesCollapse
};

/* harmony default export */ __webpack_exports__["a"] = (nodesCollapse);

/***/ })

/******/ });