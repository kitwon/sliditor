import React, { useRef, useCallback, useEffect, cloneElement, useState } from 'react';
import classNames from 'classnames';

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

function _int(number) {
  return parseInt(number, 10);
}
function snapToGrid(grid, pendingX, pendingY) {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}
function canDragX(axis) {
  return axis === 'both' || axis === 'x';
}
function canDragY(axis) {
  return axis === 'both' || axis === 'y';
}
function log() {
  if (process.env.NODE_ENV === 'development') {
    var _console;

    // eslint-disable-next-line
    (_console = console).log.apply(_console, arguments);
  }
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
var browserPrefix = getPrefix();

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
function outerWidth(node) {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += _int(computedStyle.borderLeftWidth);
  width += _int(computedStyle.borderRightWidth);
  return width;
}
function outerHeight(node) {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += _int(computedStyle.borderTopWidth) + _int(computedStyle.borderBottomWidth);
  height += _int(computedStyle.borderBottomWidth);
  return height;
}
function innerWidth(node) {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= _int(computedStyle.paddingLeft);
  width -= _int(computedStyle.paddingRight);
  return width;
}
function innerHeight(node) {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= _int(computedStyle.paddingTop);
  height -= _int(computedStyle.paddingBottom);
  return height;
}
function getTranslation(_ref2, positionOffset, unit) {
  var x = _ref2.x,
      y = _ref2.y;
  var translation = "translate(".concat(x).concat(unit, ", ").concat(y).concat(unit, ")");

  if (positionOffset) {
    var defaultX = "".concat(typeof positionOffset.x === 'string' ? positionOffset.x : "".concat(positionOffset.x).concat(unit));
    var defaultY = "".concat(typeof positionOffset.y === 'string' ? positionOffset.y : "".concat(positionOffset.y).concat(unit));
    translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")").concat(translation);
  }

  return translation;
}
function createCSSTransform(controlPos, positionOffset) {
  var translation = getTranslation(controlPos, positionOffset, 'px');
  return _defineProperty({}, browserPrefixToKey('transform', browserPrefix), translation);
}
function createSVGTransform(controlPos, positionOffset) {
  var translation = getTranslation(controlPos, positionOffset, '');
  return translation;
}

function cloneBounds(bounds) {
  return {
    left: bounds.left,
    right: bounds.right,
    top: bounds.top,
    bottom: bounds.bottom
  };
}

function getBoundPosition(node, bounds, x, y) {
  if (!bounds) return [x, y];
  var newX = x;
  var newY = y;
  var newBounds = typeof bounds === 'string' ? {} : cloneBounds(bounds);

  if (typeof bounds === 'string') {
    var ownerDocument = node.ownerDocument;
    var ownerWindow = ownerDocument.defaultView;
    var boundNode;

    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }

    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error("Bounds selector \"".concat(bounds, "\" not exist."));
    }

    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
    newBounds = {
      left: -node.offsetLeft + _int(boundNodeStyle.paddingLeft) + _int(nodeStyle.marginLeft),
      top: -node.offsetTop + _int(boundNodeStyle.paddingTop) + _int(nodeStyle.marginTop),
      right: innerWidth(boundNode) - outerWidth(node) - node.offsetLeft + _int(boundNodeStyle.paddingRight) - _int(nodeStyle.marginRight),
      bottom: innerHeight(boundNode) - outerHeight(node) - node.offsetTop + _int(boundNodeStyle.paddingBottom) - _int(nodeStyle.marginBottom)
    };
  }

  if (isNum(newBounds.right)) newX = Math.min(newX, newBounds.right);
  if (isNum(newBounds.bottom)) newY = Math.min(newY, newBounds.bottom);
  if (isNum(newBounds.left)) newX = Math.max(newX, newBounds.left);
  if (isNum(newBounds.top)) newY = Math.max(newY, newBounds.top);
  return [newX, newY];
}
function getContnrolPosition(e, draggableRef, touchIndentifier, scale) {
  var touchObj = typeof touchIndentifier === 'number' ? getTouch(e, touchIndentifier) : null;
  if (typeof touchIndentifier === 'number' && !touchObj) return null;
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
function createDraggableData(state) {
  var coreData = state.coreData,
      x = state.x,
      y = state.y,
      scale = state.scale;
  return {
    node: coreData.node,
    x: x + coreData.deltaX / scale,
    y: y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: x,
    lastY: y
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
    touchIndentifier: null
  }); // ref never use as function
  // const domNode = ref as MutableRefObject<HTMLElement>

  var domNode = useRef(null);
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

    log('DragCore - handleStop: %j', coreEvent);
    stateRef.current = _objectSpread2(_objectSpread2({}, state), {}, {
      dragging: false,
      lastX: NaN,
      lastY: NaN
    });

    if (domNode) {
      // eslint-disable-next-line no-use-before-define
      removeEvent(domNode.current.ownerDocument, dragEvent.move, handleDrag);
      removeEvent(domNode.current.ownerDocument, dragEvent.stop, handleDragStop);
    }
  }, [domNode]);
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
    log('DragCore - handleDrag: %j', coreEvent); // Manually emit the stop event

    var shouldUpdate = onDrag(e, coreEvent);

    if (shouldUpdate === false) {
      // TODO:
      // Old browser support
      // @ts-ignore
      handleDragStop(new MouseEvent('mouseup'));
      return;
    }

    stateRef.current = _objectSpread2(_objectSpread2({}, state), {}, {
      dragging: true,
      lastX: x,
      lastY: y
    });
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

    if (!node || !node.ownerDocument || !node.ownerDocument.body) {
      throw new Error('Draggable not mounted on DragStart');
    }

    var ownerDocument = node.ownerDocument; // Handle cancel \ handle \ disable prop.

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
    log('DragCore - handleDragStart: %j', coreEvent);
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
    if (domNode) {
      if (isFunction(domRef)) domRef(domNode);
      addEvent(domNode.current, events.touch.start, onTouchStart, {
        passive: false
      });
    }

    return function () {
      if (domNode === null || domNode === void 0 ? void 0 : domNode.current) {
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

function useReferenceState(initialValue) {
  var _useState = useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var reference = useRef(state);

  var setRef = function setRef(value) {
    reference.current = value;
    setState(value);
  };

  return [reference, setRef, state];
}

var Draggable = function Draggable(props) {
  var _position$x, _position$y;

  var children = props.children,
      className = props.className,
      draggedClassName = props.draggedClassName,
      draggingClassName = props.draggingClassName,
      position = props.position,
      bounds = props.bounds,
      positionOffset = props.positionOffset,
      _props$scale = props.scale,
      scale = _props$scale === void 0 ? 1 : _props$scale,
      _props$axis = props.axis,
      axis = _props$axis === void 0 ? 'both' : _props$axis,
      _props$startPosition = props.startPosition,
      startPosition = _props$startPosition === void 0 ? {
    x: 0,
    y: 0
  } : _props$startPosition,
      onStop = props.onStop,
      onStart = props.onStart,
      onDrag = props.onDrag;
  var domNode = useRef(null);

  var _useReferenceState = useReferenceState({
    dragging: false,
    dragged: false,
    x: (_position$x = position === null || position === void 0 ? void 0 : position.x) !== null && _position$x !== void 0 ? _position$x : startPosition.x,
    y: (_position$y = position === null || position === void 0 ? void 0 : position.y) !== null && _position$y !== void 0 ? _position$y : startPosition.y,
    prevPropsPos: _objectSpread2({}, position),
    slackX: 0,
    slackY: 0,
    isElementSVG: false
  }),
      _useReferenceState2 = _slicedToArray(_useReferenceState, 3),
      stateRef = _useReferenceState2[0],
      setState = _useReferenceState2[1],
      refState = _useReferenceState2[2];

  var _useState = useState({
    style: _objectSpread2({}, children.props.style),
    className: '',
    transform: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      childProps = _useState2[0],
      setChildProps = _useState2[1]; // Effects


  useEffect(function () {
    if (typeof window.SVGAElement !== 'undefined' && domNode.current instanceof window.SVGAElement) {
      setState(_objectSpread2(_objectSpread2({}, stateRef.current), {}, {
        isElementSVG: true
      }));
    }
  }, [domNode]);
  useEffect(function () {
    var _classNames;

    var state = stateRef.current;
    var controlled = Boolean(position);
    var draggable = !controlled || state.dragging;
    var validatePosition = position || startPosition;
    var transformOpts = {
      x: canDragX(axis) && draggable ? state.x : validatePosition.x,
      y: canDragY(axis) && draggable ? state.y : validatePosition.y
    };
    var svgTransform = null;
    var cssTransform = {};

    if (state.isElementSVG) {
      svgTransform = createSVGTransform(transformOpts, positionOffset);
    } else {
      cssTransform = createCSSTransform(transformOpts, positionOffset);
    }

    var classnames = classNames(className || '', children.props.className || '', (_classNames = {}, _defineProperty(_classNames, draggedClassName, state.dragged), _defineProperty(_classNames, draggingClassName, state.dragging), _classNames));
    setChildProps({
      style: _objectSpread2(_objectSpread2({}, childProps.style), cssTransform),
      className: classnames,
      transform: svgTransform
    });
  }, [refState]);
  useEffect(function () {
    if (position && !stateRef.current.dragging) {
      var x = position.x,
          y = position.y;
      setState(_objectSpread2(_objectSpread2({}, stateRef.current), {}, {
        x: x,
        y: y
      }));
    }
  }, [position]); // Actions

  var handleDragStart = useCallback(function (e, coreData) {
    var state = stateRef.current;
    log('Draggable: handleDragStart: %j', coreData);
    var sholdStart = onStart && onStart(e, createDraggableData({
      x: state.x,
      y: state.y,
      scale: scale,
      coreData: coreData
    }));
    if (sholdStart === false) return false;
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      dragging: true,
      dragged: true
    }));
    return undefined;
  }, [stateRef]);
  var handleDrag = useCallback(function (e, coreData) {
    var state = stateRef.current;
    if (!state.dragging) return undefined;
    log('Draggable: handleDrag: %j', coreData);
    var uiData = createDraggableData({
      x: state.x,
      y: state.y,
      scale: scale,
      coreData: coreData
    });
    var newState = {
      x: uiData.x,
      y: uiData.y
    };

    if (bounds) {
      var x = newState.x,
          y = newState.y;
      newState.x += state.slackX;
      newState.y += state.slackY;

      var _getBoundPosition = getBoundPosition(domNode.current, bounds, newState.x, newState.y),
          _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2),
          newStateX = _getBoundPosition2[0],
          newStateY = _getBoundPosition2[1];

      newState.x = newStateX;
      newState.y = newStateY;
      newState.slackX = state.slackX + (x - newState.x);
      newState.slackY = state.slackY + (y - newState.y);
      uiData.x = newState.x;
      uiData.y = newState.y;
      uiData.deltaX = newState.x - state.x;
      uiData.deltaY = newState.y - state.y;
    }

    var shouldUpdate = onDrag && onDrag(e, uiData);
    if (shouldUpdate === false) return false;
    setState(_objectSpread2(_objectSpread2({}, state), newState));
    return undefined;
  }, [stateRef]);
  var handleDragStop = useCallback(function (e, coreData) {
    var state = stateRef.current;
    if (!state.dragging) return undefined;
    var shouldContinune = onStop && onStop(e, coreData);
    if (shouldContinune === false) return false;
    log('Draggable: onDragStop: %j', coreData);
    var newState = {
      dragging: false,
      slackX: 0,
      slackY: 0
    };
    setState(_objectSpread2(_objectSpread2({}, state), newState));
    return undefined;
  }, [stateRef]);
  return /*#__PURE__*/React.createElement(DragCore, _extends({}, _objectSpread2(_objectSpread2({}, props), {}, {
    onStart: handleDragStart,
    onDrag: handleDrag,
    onStop: handleDragStop
  }), {
    domRef: function domRef(instace) {
      domNode.current = instace.current;
    }
  }), /*#__PURE__*/cloneElement(children, _objectSpread2({}, childProps)));
};

export default Draggable;
export { DragCore };
//# sourceMappingURL=draggable.esm.js.map
