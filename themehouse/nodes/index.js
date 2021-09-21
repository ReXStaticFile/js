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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var grid = function () {
    function Grid(_ref) {
        var _this = this;

        var layout = _ref.layout,
            _ref$settings = _ref.settings,
            settings = _ref$settings === undefined ? {} : _ref$settings,
            listeners = _ref.listeners,
            _ref$init = _ref.init,
            init = _ref$init === undefined ? false : _ref$init,
            _ref$commonVersion = _ref.commonVersion,
            commonVersion = _ref$commonVersion === undefined ? "20210125" : _ref$commonVersion;

        _classCallCheck(this, Grid);

        this.init = function () {
            _this.initGet();
            _this.initSet();
        };

        this.initGet = function () {
            _this.rootEle = window.document.querySelector(_this.settings.depth0Selector);
            if (_this.rootEle !== null) {
                _this.nodes = _this.parse(_this.rootEle);

                _this.resizeGet();
            } else {
                console.error("Root selector not found");
            }
        };

        this.initSet = function () {
            _this.resizeSet();

            _this.rootEle.classList.add("thNodes__nodeList--running");
            _this.classAdded = true;
            _this.running = true;
        };

        this.resize = function () {
            _this.resizeGet();
            _this.resizeSet();
        };

        this.resizeGet = function () {
            _this.globalWidth = _this.rootEle.offsetWidth;
            _this.updateGet();
        };

        this.resizeSet = function () {
            _this.updateSet();
        };

        this.running = false;
        this.listenersAdded = false;
        this.minEnableWidth = 1;
        this.layout = layout;
        this.nodes = {};
        this.equalCategories = true;
        this.classAdded = false;
        this.alwaysCheck = true;
        this.newChanges = [];
        this.globalWidth = 1;
        this.cookieArray = [];
        this.settings = Object.assign({
            depth0Selector: ".thNodes__nodeList",
            depth1Selector: ".block",
            depth2Selector: ".node",
            separatorClass: "thNodes_separator"
        }, settings);

        this.settings.sizes = Object.assign({
            xs: 200,
            sm: 300,
            md: 400,
            lg: 600,
            xl: 1000
        }, settings.sizes || {});

        this.listeners = listeners || this.populateListeners();
        this.rootEle = null;
        this.commonVersion = commonVersion;
        this.common = window.themehouse.common[commonVersion];

        if (init) {
            this.init();
        }
    }

    // returns array of listeners


    _createClass(Grid, [{
        key: "populateListeners",
        value: function populateListeners() {
            var listeners = [];
            var sizes = this.settings.sizes;
            var sizeKeys = Object.keys(sizes);
            for (var i = 0, len = sizeKeys.length; i < len; i++) {
                var sizeKey = sizeKeys[i];
                var size = sizes[sizeKey];
                listeners.push({ name: "--below-" + sizeKey, min: 0, max: size });
                listeners.push({
                    name: "--above-" + sizeKey,
                    min: size + 1,
                    max: 999999
                });
                var min = size + 1;
                var max = i < len - 1 ? sizes[sizeKeys[i + 1]] : 999999;
                listeners.push({ name: "--is-" + sizeKey, min: min, max: max });
            }

            return listeners;
        }
    }, {
        key: "register",
        value: function register() {
            this.common.register({
                phase: "initGet",
                addon: "TH_Nodes",
                func: this.initGet,
                order: 10
            });
            this.common.register({
                phase: "initSet",
                addon: "TH_Nodes",
                func: this.initSet,
                order: 10
            });
            this.common.register({
                phase: "resizeGet",
                addon: "TH_Nodes",
                func: this.resizeGet,
                order: 10
            });
            this.common.register({
                phase: "resizeSet",
                addon: "TH_Nodes",
                func: this.resizeSet,
                order: 10
            });
        }
    }, {
        key: "getIdFromClass",


        // gets the ID from a className or -1 if none found
        value: function getIdFromClass(replaceString, str) {
            var splitEleClass = str.split(" ");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = splitEleClass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var classWord = _step.value;

                    var replaced = classWord.replace(replaceString, "");
                    if (replaced !== classWord) {
                        var possibleId = parseInt(replaced, 10);
                        if (possibleId > 0) {
                            return possibleId;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return -1;
        }

        // gets the node ID of an element and optionally only a separator

    }, {
        key: "getNodeId",
        value: function getNodeId(ele) {
            var separatorOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (ele !== null) {
                var eleClass = ele.className;
                if (!separatorOnly) {
                    if (eleClass.indexOf("block--category") > -1) {
                        return this.getIdFromClass("block--category", eleClass);
                    } else if (eleClass.indexOf("node--id") > -1) {
                        return this.getIdFromClass("node--id", eleClass);
                    } else {
                        var nearestNode = ele.querySelector(this.settings.depth2Selector);
                        if (nearestNode !== null) {
                            return this.getIdFromClass("node--id", nearestNode.className);
                        }
                    }
                }

                if (eleClass.indexOf(this.settings.separatorClass) > -1) {
                    return this.getIdFromClass("node--id", eleClass);
                }
            }

            return -1;
        }

        // format layout from addon into object for js

    }, {
        key: "formatLayout",
        value: function formatLayout(id) {
            var obj = {};
            var layout = this.layout[id];
            if (typeof layout !== "undefined") {
                var fill_last_row = layout.fill_last_row,
                    max_columns = layout.max_columns,
                    min_column_width = layout.min_column_width;

                if (fill_last_row && fill_last_row.value) {
                    obj.fill = fill_last_row.value;
                }
                if (max_columns && max_columns.value) {
                    obj.cols = max_columns.value;
                }
                if (min_column_width && min_column_width.value) {
                    obj.width = min_column_width.value;
                }
            }

            return obj;
        }

        // make a fully inherited layout object (inherits from js default, global default, optional custom layout for separators, then specified node)

    }, {
        key: "makeLayout",
        value: function makeLayout(id) {
            var customLayout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var ret = Object.assign({
                cols: 6,
                width: 330,
                fill: 0,
                id: id
            }, this.formatLayout(0), customLayout, this.formatLayout(id));

            ret.cols = parseInt(ret.cols, 10);
            ret.width = parseInt(ret.width, 10);
            ret.fill = parseInt(ret.fill, 10);

            if (id === -1) {
                ret.cols = 1; // TODO remove this
                ret.width = 1000;
            }

            return ret;
        }

        // recursive function to return layouts for a parent

    }, {
        key: "findLayouts",
        value: function findLayouts(parent, parentId, parentDepth) {
            var layouts = [];
            var selector = parentDepth === 0 ? this.settings.depth1Selector : this.settings.depth2Selector;
            var eles = parent.querySelectorAll(selector);
            var layoutNum = 0;

            var lastSeparator = parentId;
            for (var i = 0, len = eles.length; i < len; i++) {
                var _ele = eles[i];
                var separator = this.getNodeId(_ele.previousElementSibling, true);
                if (separator !== -1) {
                    lastSeparator = separator;
                    layoutNum += 1;
                }
                var id = this.getNodeId(_ele);
                if (typeof layouts[layoutNum] === "undefined") {
                    layouts[layoutNum] = {
                        children: [],
                        layout: this.makeLayout(lastSeparator)
                    };
                }

                layouts[layoutNum].children.push({
                    ele: _ele,
                    id: id,
                    depth: parentDepth,
                    layouts: this.findLayouts(_ele, id, parentDepth + 1),
                    className: ""
                });
            }

            return layouts;
        }

        // starts recursive generation of node tree

    }, {
        key: "parse",
        value: function parse(parent) {
            var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var layouts = this.findLayouts(parent, -1, depth);

            if (layouts.length === 0) {
                return {};
            }

            var result = {
                ele: parent,
                id: -1,
                depth: depth,
                className: "",
                ratio: 1,
                layouts: layouts
            };

            //console.log(result);

            return result;
        }

        // recursively calculate changes for node tree

    }, {
        key: "calculateChanges",
        value: function calculateChanges(nodes, depth) {
            var ratio = nodes.ratio,
                layouts = nodes.layouts;


            var parentWidth = ratio * this.globalWidth;
            var rowNumAbs = 0;
            var nodeNumAbs = 0;

            for (var layoutNum = 0, layoutLen = layouts.length; layoutNum < layoutLen; layoutNum++) {
                var _layouts$layoutNum = layouts[layoutNum],
                    children = _layouts$layoutNum.children,
                    _layout = _layouts$layoutNum.layout;

                var numChildren = children.length;
                var maxCols = Math.min(Math.floor(parentWidth / _layout.width), _layout.cols) || 1;
                var numCols = maxCols > 0 ? maxCols : 1;
                var colRemainder = numChildren % maxCols;
                var rowNum = 1;
                var numRows = Math.ceil(numChildren / maxCols);
                var colNum = 0;

                for (var childNum = 0; childNum < numChildren; childNum++) {
                    var child = children[childNum];
                    var nextRowNum = Math.floor(childNum / maxCols) + 1;
                    if (rowNum === nextRowNum) {
                        colNum += 1;
                    } else {
                        rowNum = nextRowNum;
                        colNum = 1;
                    }
                    if (_layout.fill === 0) {
                        if (rowNum === numRows && colRemainder > 0) {
                            numCols = colRemainder;
                        }
                    } else if (_layout.fill === 1) {
                        // don't adjust
                    } else {
                        if (rowNum >= numRows && colRemainder > 0) {
                            numCols = 1;
                        }
                    }

                    var newWidth = 100 / numCols;
                    var newWidthStr = newWidth + "%";

                    var leftCol = (colNum - 1) % numCols === 0;
                    var rightCol = (colNum - 1) % numCols === numCols - 1;

                    var newClassName = this.findClassName({
                        colNum: colNum,
                        numCols: numCols,
                        rowNum: rowNum,
                        rowNumAbs: rowNumAbs + rowNum,
                        numRows: numRows,
                        nodeNumAbs: nodeNumAbs,
                        nodeNum: childNum,
                        layoutNum: layoutNum,
                        leftCol: leftCol,
                        rightCol: rightCol,
                        numLayouts: layoutLen,
                        width: Math.floor(ratio * newWidth * this.globalWidth / 100)
                    });

                    var change = {
                        ele: child.ele
                    };

                    if (child.className !== newClassName) {
                        change.className = child.ele.className.replace(child.className, "") + newClassName;
                        child.className = newClassName;
                    }
                    if (child.width !== newWidthStr) {
                        change.width = newWidthStr;
                        child.width = newWidthStr;
                    }
                    if (typeof change.className !== "undefined" || typeof change.width !== "undefined") {
                        this.queueChange(change);
                    }

                    child.ratio = ratio * newWidth / 100;
                    nodeNumAbs += 1;

                    this.calculateChanges(child, depth + 1);
                }
                rowNumAbs += rowNum;
            }
        }
    }, {
        key: "update",
        value: function update() {
            this.updateGet();
            this.updateSet();
        }
    }, {
        key: "updateGet",
        value: function updateGet() {
            this.newChanges = [];
            this.calculateChanges(this.nodes, 0);
        }
    }, {
        key: "updateSet",
        value: function updateSet() {
            this.processChanges();
        }

        // adds a change to the queue to make during set

    }, {
        key: "queueChange",
        value: function queueChange(change) {
            this.newChanges.push(change);
        }

        // processes queue of changes during set

    }, {
        key: "processChanges",
        value: function processChanges() {
            for (var i = 0, len = this.newChanges.length; i < len; i++) {
                var _newChanges$i = this.newChanges[i],
                    _ele2 = _newChanges$i.ele,
                    _className = _newChanges$i.className,
                    _width = _newChanges$i.width;

                if (typeof _className !== "undefined") {
                    _ele2.className = _className;
                }
                if (typeof _width !== "undefined") {
                    _ele2.style.width = _width;
                    _ele2.style.flexBasis = _width;
                    _ele2.style.maxWidth = _width;
                }
            }
        }

        // calculates a className for a given node's state

    }, {
        key: "findClassName",
        value: function findClassName(config) {
            var colNum = config.colNum,
                numCols = config.numCols,
                rowNum = config.rowNum,
                rowNumAbs = config.rowNumAbs,
                numRows = config.numRows,
                nodeNum = config.nodeNum,
                nodeNumAbs = config.nodeNumAbs,
                leftCol = config.leftCol,
                rightCol = config.rightCol,
                layoutNum = config.layoutNum,
                numLayouts = config.numLayouts,
                width = config.width;

            var prefix = "th_nodes";

            var className = " " + prefix;
            if (width < 100) {
                className = className + " " + prefix + "_active";
            }
            if (leftCol) {
                className = className + " " + prefix + "_left";
            }
            if (rightCol) {
                className = className + " " + prefix + "_right";
            }
            if (rowNumAbs === 1) {
                className = className + " " + prefix + "_row_start";
            }
            if (rowNum === 1) {
                className = className + " " + prefix + "_layout_row_start";
            }
            if (rowNum === numRows) {
                if (layoutNum + 1 === numLayouts) {
                    className = className + " " + prefix + "_row_end";
                }
                className = className + " " + prefix + "_layout_row_end";
            }
            className = className + " " + prefix + "_col_" + colNum;
            className = className + " " + prefix + "_numCols_" + numCols;
            className = className + " " + prefix + "_row_" + rowNum;
            className = className + " " + prefix + "_rowAbs_" + rowNumAbs;
            className = className + " " + prefix + "_layNum_" + layoutNum;
            className = className + " " + prefix + "_numLays_" + numLayouts;
            className = className + " " + prefix + "_node_" + nodeNum;
            className = className + " " + prefix + "_nodeAbs_" + nodeNumAbs;
            className = className + " " + prefix + "_row_" + (rowNumAbs % 2 === 1 ? "odd" : "even");

            // element query classes
            var listeners = this.listeners;
            if (typeof listeners !== "undefined") {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (width < listeners[i].max && width >= listeners[i].min) {
                        className = className + " " + prefix + listeners[i].name;
                    }
                }
            }

            return className;
        }
    }]);

    return Grid;
}();

if (typeof window.themehouse === "undefined") {
    window.themehouse = {};
}

if (typeof window.themehouse.nodes === "undefined") {
    window.themehouse.nodes = {};
}

window.themehouse.nodes.grid = grid;

/* harmony default export */ __webpack_exports__["default"] = (grid);

/***/ })
/******/ ]);