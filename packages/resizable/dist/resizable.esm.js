import React, { useRef, useCallback, useEffect, cloneElement, useState } from 'react';

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit$1(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var classnames = {
  exports: {}
};
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
  /* global define */
  (function () {
    var hasOwn = {}.hasOwnProperty;

    function classNames() {
      var classes = [];

      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;
        var argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg);

            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === 'object') {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          } else {
            classes.push(arg.toString());
          }
        }
      }

      return classes.join(' ');
    }

    if (module.exports) {
      classNames.default = classNames;
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
})(classnames);

classnames.exports;

function find(array, cb) {
  if (!Array.isArray(array)) return undefined;

  for (var i = 0, length = array.length; i < length; i += 1) {
    if (cb.apply(cb, [array[i], i, array])) return array[i];
  }

  return undefined;
}

function isFunction(func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

function isNum(number) {
  return typeof number === 'number' && !Number.isNaN(number);
}

function snapToGrid(grid, pendingX, pendingY) {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

var prefixes = ['Moz', 'Webkit', 'O', 'ms'];

function kebabToTitleCase(str) {
  var value = '';
  var shouldCapitalize = true;

  for (var i = 0; i <= str.length; i += 1) {
    if (shouldCapitalize) {
      value += value[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      value += str[i];
    }
  }

  return value;
}

function browserPrefixToKey(prop, prefix) {
  return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
}

function getPrefix() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';
  var style = window.document.documentElement.style;
  if (prop in style) return '';

  for (var i = 0; i < prefixes.length; i += 1) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) {
      return prefixes[i];
    }
  }

  return '';
}

getPrefix();

function addClass(el, classname) {
  if (el.classList) {
    el.classList.add(classname);
  } else if (!el.className.match(new RegExp("(?:^|\\s)".concat(classname, "(?!\\S)")))) {
    // eslint-disable-next-line no-param-reassign
    el.className += "".concat(classname);
  }
}

function removeClass(el, classname) {
  if (el.classList) {
    el.classList.remove(classname);
  } else {
    // eslint-disable-next-line no-param-reassign
    el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(classname, "(?!\\S)"), 'g'), '');
  }
}

function addEvent(el, event, handler, inputOptions) {
  if (!el) return;

  var options = _objectSpread2({
    capture: true
  }, inputOptions);

  if (el.addEventListener) {
    el.addEventListener(event, handler, options); // @ts-ignore
  } else if (el.attachEvent) {
    // @ts-ignore
    el.attachEvent("on".concat(event), handler);
  } else {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    el["on".concat(event)] = handler;
  }
}

function removeEvent(el, event, handler, inputOptions) {
  if (!el) return;

  var options = _objectSpread2({
    capture: true
  }, inputOptions);

  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options); // @ts-ignore
  } else if (el.detachEvent) {
    // @ts-ignore
    el.detachEvent("on".concat(event), handler);
  } else {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    el["on".concat(event)] = null;
  }
}

var matchsSelectorFunc = '';

function matchSelector(el, selector) {
  if (!matchsSelectorFunc) {
    matchsSelectorFunc = find(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      return isFunction(el[method]);
    });
  }

  if (!isFunction(el[matchsSelectorFunc])) return false;
  return el[matchsSelectorFunc](selector);
}

function matchSelectorAndParent(el, selector, baseNode) {
  var node = el;

  do {
    if (matchSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}

function getTouch(e, indentifier) {
  return e.targetTouches && find(e.targetTouches, function (t) {
    return indentifier === t.indentifier;
  }) || e.changedTouches && find(e.changedTouches, function (t) {
    return indentifier === t.indentifier;
  });
}

function getTouchIdentifier(e) {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
  return undefined;
}

function offsetFromParent(_ref, offsetParent, scale) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  var isBody = offsetParent === offsetParent.ownerDocument.body;
  var rect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  var x = (clientX + offsetParent.scrollLeft - rect.left) / scale;
  var y = (clientY + offsetParent.scrollTop - rect.top) / scale;
  return {
    x: x,
    y: y
  };
}

function addUserSelectStyles(doc) {
  if (!doc) return;
  var styleEl = doc.getElementById('draggable-style-el');

  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    styleEl.id = 'draggable-style-el';
    styleEl.innerHTML = '.draggable-transparent-selection *::-moz-selection { all: inherit; }\n';
    styleEl.innerHTML = '.draggable-transparent-selection *::selection { all: inherit; }\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }

  if (doc.body) addClass(doc.body, 'draggable-transparent-selection');
}

function removeUserSelectStyle(doc) {
  if (!doc) return;

  try {
    if (doc.body) removeClass(doc.body, 'draggable-transparent-selection'); // @ts-ignore

    if (doc.selection) {
      // @ts-ignore
      doc.getSelection.empty();
    } else {
      var selection = (doc.defaultView || window).getSelection();

      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    } // eslint-disable-next-line no-empty

  } catch (e) {}
}

function getContnrolPosition(e, draggableRef, touchIndentifier, scale) {
  var touchObj = typeof touchIndentifier === 'number' ? getTouch(e, touchIndentifier) : null;
  if (!(draggableRef !== null && draggableRef !== void 0 && draggableRef.current) || typeof touchIndentifier === 'number' && !touchObj) return null;
  var node = draggableRef.current;
  var offsetParent = draggableRef.current.offsetParent || node.offsetParent || node.ownerDocument.body;
  return offsetFromParent(touchObj || e, offsetParent, scale);
}

function createCoreData(ref, state, x, y) {
  var isStart = !isNum(state.lastX);
  var node = ref.current;

  if (isStart) {
    return {
      node: node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x: x,
      y: y
    };
  }

  return {
    node: node,
    deltaX: x - state.lastX,
    deltaY: y - state.lastY,
    lastX: state.lastX,
    lastY: state.lastY,
    x: x,
    y: y
  };
}

var events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
};
var dragEvent = events.mouse;

var DragCore = function DragCore(props) {
  var children = props.children,
      allowAnyClick = props.allowAnyClick,
      disable = props.disable,
      handle = props.handle,
      cancel = props.cancel,
      grid = props.grid,
      domRef = props.domRef,
      _props$scale = props.scale,
      scale = _props$scale === void 0 ? 1 : _props$scale,
      _props$enableUserSele = props.enableUserSelect,
      enableUserSelect = _props$enableUserSele === void 0 ? true : _props$enableUserSele,
      _props$onStart = props.onStart,
      onStart = _props$onStart === void 0 ? function () {
    return 0;
  } : _props$onStart,
      _props$onDrag = props.onDrag,
      onDrag = _props$onDrag === void 0 ? function () {
    return 0;
  } : _props$onDrag,
      _props$onStop = props.onStop,
      onStop = _props$onStop === void 0 ? function () {
    return 0;
  } : _props$onStop,
      _props$onMousedown = props.onMousedown,
      onMousedown = _props$onMousedown === void 0 ? function () {
    return 0;
  } : _props$onMousedown;
  var stateRef = useRef({
    lastX: NaN,
    lastY: NaN,
    dragging: false,
    touchIndentifier: undefined
  }); // ref never use as function
  // const domNode = ref as MutableRefObject<HTMLElement>

  var domNode = useRef(null);
  var handleDrag = useCallback(function (e) {
    var state = stateRef.current;
    var position = getContnrolPosition(e, domNode, state.touchIndentifier, scale);
    if (position === null) return;
    var x = position.x,
        y = position.y;

    if (Array.isArray(grid)) {
      var _snapToGrid = snapToGrid(grid, x - state.lastX, y - state.lastY),
          _snapToGrid2 = _slicedToArray(_snapToGrid, 2),
          deltaX = _snapToGrid2[0],
          deltaY = _snapToGrid2[1];

      if (!deltaX && !deltaY) return;
      x = state.lastX + deltaX;
      y = state.lastY + deltaY;
    }

    var coreEvent = createCoreData(domNode, state, x, y);
    var shouldUpdate = onDrag(e, coreEvent);

    if (shouldUpdate === false) {
      // TODO:
      // Old browser support
      try {
        handleDragStop(new MouseEvent('mouseup'));
      } catch (err) {
        var event = document.createEvent('MouseEvent');
        handleDragStop(event);
      }

      return;
    }

    stateRef.current = _objectSpread2(_objectSpread2({}, state), {}, {
      lastX: x,
      lastY: y
    });
  }, [domNode]);
  var handleDragStop = useCallback(function (e) {
    var state = stateRef.current;
    if (!state.dragging) return;
    var position = getContnrolPosition(e, domNode, state.touchIndentifier, scale);
    if (position === null) return;
    var x = position.x,
        y = position.y;
    var coreEvent = createCoreData(domNode, state, x, y);
    var shouldContinune = onStop(e, coreEvent);
    if (shouldContinune === false) return;

    if (domNode.current && enableUserSelect) {
      removeUserSelectStyle(domNode.current.ownerDocument);
    }

    stateRef.current = _objectSpread2(_objectSpread2({}, state), {}, {
      dragging: false,
      lastX: NaN,
      lastY: NaN
    });

    if (domNode.current) {
      // eslint-disable-next-line no-use-before-define
      removeEvent(domNode.current.ownerDocument, dragEvent.move, handleDrag);
      removeEvent(domNode.current.ownerDocument, dragEvent.stop, handleDragStop);
    }
  }, [domNode]);
  /**
   * Handle staring
   * @param { MouseTouchEvent } e Event
   */

  var handleDragStart = useCallback(function (e) {
    var state = stateRef.current;
    if (onMousedown) onMousedown(e); // Only accept left click from mouse

    if (!allowAnyClick && e.button !== 0) return;
    var node = domNode.current;
    var ownerDocument = node === null || node === void 0 ? void 0 : node.ownerDocument;

    if (!node || !ownerDocument || !ownerDocument.body || !ownerDocument.defaultView) {
      throw new Error('Draggable not mounted on DragStart');
    } // Handle cancel \ handle \ disable prop.


    if (disable || !(e.target instanceof ownerDocument.defaultView.Node) || handle && !matchSelectorAndParent(e.target, handle, node) || cancel && matchSelectorAndParent(e.target, cancel, node)) {
      return;
    } // Prevent scrolling on mobile device.


    if (e.type === 'touchstart') e.preventDefault();
    var touchIndentifier = getTouchIdentifier(e);
    stateRef.current = _objectSpread2(_objectSpread2({}, state), {}, {
      touchIndentifier: touchIndentifier
    });
    var position = getContnrolPosition(e, domNode, touchIndentifier, scale);
    if (position === null) return;
    var x = position.x,
        y = position.y;
    var coreEvent = createCoreData(domNode, state, x, y);
    var shouldUpdate = onStart(e, coreEvent);
    if (shouldUpdate === false) return;
    if (enableUserSelect) addUserSelectStyles(ownerDocument);
    stateRef.current = _objectSpread2(_objectSpread2({}, state), {}, {
      dragging: true,
      lastX: x,
      lastY: y
    });
    addEvent(ownerDocument, dragEvent.move, handleDrag);
    addEvent(ownerDocument, dragEvent.stop, handleDragStop);
  }, [domNode]);
  var onMouseDown = useCallback(function (e) {
    dragEvent = events.mouse;
    return handleDragStart(e);
  }, []);
  var onMouseUp = useCallback(function (e) {
    dragEvent = events.mouse;
    return handleDragStop(e);
  }, []);
  var onTouchStart = useCallback(function (e) {
    dragEvent = events.touch;
    return handleDragStart(e);
  }, []);
  var onTouchEnd = useCallback(function (e) {
    dragEvent = events.touch;
    return handleDragStop(e);
  }, []);
  useEffect(function () {
    if (domNode.current) {
      domRef === null || domRef === void 0 ? void 0 : domRef(domNode.current);
      addEvent(domNode.current, events.touch.start, onTouchStart, {
        passive: false
      });
    }

    return function () {
      if (domNode !== null && domNode !== void 0 && domNode.current) {
        var ownerDocument = domNode.current.ownerDocument;
        removeEvent(ownerDocument, events.mouse.move, handleDrag);
        removeEvent(ownerDocument, events.touch.move, handleDrag);
        removeEvent(ownerDocument, events.mouse.stop, handleDragStop);
        removeEvent(ownerDocument, events.touch.stop, handleDragStop);
        removeEvent(domNode.current, events.touch.start, onTouchStart, {
          passive: false
        });
        if (enableUserSelect) removeUserSelectStyle(ownerDocument);
      }
    };
  }, [domNode]);
  return /*#__PURE__*/cloneElement(children, {
    ref: domNode,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onTouchEnd: onTouchEnd
  });
};

var ResizeCore = function ResizeCore(props) {
  var className = props.className,
      children = props.children,
      handle = props.handle,
      draggableOpts = props.draggableOpts,
      lockAspectRatio = props.lockAspectRatio,
      _props$axis = props.axis,
      axis = _props$axis === void 0 ? 'both' : _props$axis,
      _props$resizeHandles = props.resizeHandles,
      resizeHandles = _props$resizeHandles === void 0 ? ['se'] : _props$resizeHandles,
      _props$transformScale = props.transformScale,
      transformScale = _props$transformScale === void 0 ? 1 : _props$transformScale,
      _props$minConstraints = props.minConstraints,
      minConstraints = _props$minConstraints === void 0 ? [20, 20] : _props$minConstraints,
      _props$maxConstraints = props.maxConstraints,
      maxConstraints = _props$maxConstraints === void 0 ? [Infinity, Infinity] : _props$maxConstraints; // const [lastHandleRect, setLastHandle] = useState<DOMRect | null>(null)

  var lastHandleRect = useRef(null);
  var slack = useRef(null);
  var state = useRef({
    width: props.width,
    height: props.height
  });
  var renderResizeHandle = useCallback(function (handleAxis) {
    if (handle) {
      if (typeof handle === 'function') {
        return handle(handleAxis);
      }

      return handle;
    }

    return /*#__PURE__*/React.createElement("span", {
      className: "rc-resizable-handle is-".concat(handleAxis)
    });
  }, [handle]);

  var runConstraints = function runConstraints(w, h) {
    var min = minConstraints,
        max = maxConstraints;
    if (!min && !max) return [w, h]; // If constraining to min and max, we need to also fit width and height to aspect ratio.

    if (lockAspectRatio) {
      // const resizingHorizontally = h === props.height
      var resizingHorizontally = h === state.current.height;

      if (resizingHorizontally) {
        // const ratio = props.width / props.height
        var ratio = state.current.width / state.current.height;
        h = w / ratio;
        w = h * ratio;
      } else {
        // Take into account vertical resize with N/S handles on locked aspect
        // ratio. Calculate the change height-first, instead of width-first
        var _ratio = state.current.height / state.current.width;

        w = h / _ratio;
        h = w * _ratio;
      }
    }

    var oldW = w,
        oldH = h; // Add slack to the values used to calculate bound position. This will ensure that if
    // we start removing slack, the element won't react to it right away until it's been
    // completely removed.

    var _ref = slack.current || [0, 0],
        _ref2 = _slicedToArray$1(_ref, 2),
        slackW = _ref2[0],
        slackH = _ref2[1];

    w += slackW;
    h += slackH;

    if (min) {
      w = Math.max(min[0], w);
      h = Math.max(min[1], h);
    }

    if (max) {
      w = Math.min(max[0], w);
      h = Math.min(max[1], h);
    } // If the width or height changed, we must have introduced some slack. Record it for the next iteration.


    slack.current = [slackW + (oldW - w), slackH + (oldH - h)];
    return [w, h];
  };

  var resetData = function resetData() {
    lastHandleRect.current = null;
    slack.current = null;
  };

  var resizeHandler = function resizeHandler(handleName, handleAxis) {
    return function (e, dragData) {
      var deltaX = dragData.deltaX / transformScale;
      var deltaY = dragData.deltaY / transformScale;
      if (handleName === 'onResizeStart') resetData();
      var canDragX = (axis === 'both' || axis === 'x') && handleAxis !== 'n' && handleAxis !== 's';
      var canDragY = (axis === 'both' || axis === 'y') && handleAxis !== 'e' && handleAxis !== 'w';
      if (!canDragX && !canDragY) return;
      var axisVertical = handleAxis[0];
      var axisHorizontal = handleAxis[handleAxis.length - 1];
      var handleRect = dragData.node.getBoundingClientRect();

      if (lastHandleRect.current !== null) {
        if (axisHorizontal === 'w') {
          var deltaLeftSinceLast = handleRect.left - lastHandleRect.current.left;
          deltaX += deltaLeftSinceLast;
        }

        if (axisVertical === 'n') {
          var deltaTopSinceLast = handleRect.top - lastHandleRect.current.top;
          deltaY += deltaTopSinceLast;
        }
      }

      lastHandleRect.current = handleRect;
      if (axisHorizontal === 'w') deltaX = -deltaX;
      if (axisHorizontal === 'n') deltaY = -deltaY; // let width = props.width + (canDragX ? deltaX / transformScale : 0)
      // let height = props.height + (canDragY ? deltaY / transformScale : 0)

      var width = state.current.width + (canDragX ? deltaX / transformScale : 0);
      var height = state.current.height + (canDragY ? deltaY / transformScale : 0);

      var _runConstraints = runConstraints(width, height);

      var _runConstraints2 = _slicedToArray$1(_runConstraints, 2);

      width = _runConstraints2[0];
      height = _runConstraints2[1];
      var demensionsChanged = width !== state.current.width || height !== state.current.height;
      state.current = {
        width: width,
        height: height
      };
      var cb = typeof props[handleName] === 'function' ? props[handleName] : null;
      var shouldSkipCb = handleName === 'onResize' && !demensionsChanged;

      if (cb && !shouldSkipCb) {
        if (typeof e.persist === 'function') e.persist(); // cb(e, { node: dragData.node, size: { width, height }, handle: handleAxis })

        cb(e, {
          node: dragData.node,
          size: state.current,
          handle: handleAxis
        });
      }

      if (handleName === 'onResizeStop') resetData();
    };
  };

  if (!children) return null;
  return /*#__PURE__*/cloneElement(children, {
    className: "".concat(className || '', " rc-resizable"),
    children: [children === null || children === void 0 ? void 0 : children.props.children].concat(_toConsumableArray(resizeHandles.map(function (pos) {
      return /*#__PURE__*/React.createElement(DragCore, _extends({}, draggableOpts, {
        key: "resiableHandle-".concat(pos),
        onStop: resizeHandler('onResizeStop', pos),
        onStart: resizeHandler('onResizeStart', pos),
        onDrag: resizeHandler('onResize', pos)
      }), renderResizeHandle(pos));
    })))
  });
};

var _excluded = ["handle", "handleSize", "onResize", "onResizeStart", "onResizeStop", "draggableOpts", "minConstraints", "maxConstraints", "lockAspectRatio", "axis", "width", "height", "resizeHandles", "style", "transformScale"];

var Resizable = function Resizable(props) {
  // const { width, height, style, onResize, children, ...resizeProps } = props
  var handle = props.handle,
      handleSize = props.handleSize,
      onResize = props.onResize,
      onResizeStart = props.onResizeStart,
      onResizeStop = props.onResizeStop,
      draggableOpts = props.draggableOpts,
      minConstraints = props.minConstraints,
      maxConstraints = props.maxConstraints,
      lockAspectRatio = props.lockAspectRatio,
      axis = props.axis,
      width = props.width,
      height = props.height,
      resizeHandles = props.resizeHandles,
      style = props.style,
      transformScale = props.transformScale,
      extraProps = _objectWithoutProperties(props, _excluded);

  var _useState = useState({
    width: width,
    height: height,
    propsWidth: width,
    propsHeight: height
  }),
      _useState2 = _slicedToArray$1(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // const state = useRef({
  //   width,
  //   height,
  //   propsWidth: width,
  //   propsHeight: height
  // })


  var handleResize = useCallback(function (e, data) {
    var size = data.size;

    if (onResize) {
      var _e$persist;

      onResize(e, data);
      (_e$persist = e.persist) === null || _e$persist === void 0 ? void 0 : _e$persist.call(e);
    }

    setState(size); // state.current = { ...state.current, ...size }
  }, []);
  return /*#__PURE__*/React.createElement(ResizeCore, {
    axis: axis,
    draggableOpts: draggableOpts,
    handle: handle,
    handleSize: handleSize,
    height: state.height,
    lockAspectRatio: lockAspectRatio,
    maxConstraints: maxConstraints,
    minConstraints: minConstraints,
    onResizeStart: onResizeStart,
    onResize: handleResize,
    onResizeStop: onResizeStop,
    resizeHandles: resizeHandles,
    transformScale: transformScale,
    width: state.width
  }, /*#__PURE__*/React.createElement("div", _extends({}, extraProps, {
    style: _objectSpread2$1(_objectSpread2$1({}, style), {}, {
      width: "".concat(state.width, "px"),
      height: "".concat(state.height, "px")
    })
  })));
};

export default Resizable;
//# sourceMappingURL=resizable.esm.js.map
