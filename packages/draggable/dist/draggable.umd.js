!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).draggable={},t.React)}(this,(function(t,e){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=n(e);function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,o,a=[],i=!0,c=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(a.push(r.value),!e||a.length!==e);i=!0);}catch(t){c=!0,o=t}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return a}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var s={exports:{}};
/*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */!function(t){!function(){var e={}.hasOwnProperty;function n(){for(var t=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var a=typeof o;if("string"===a||"number"===a)t.push(o);else if(Array.isArray(o)){if(o.length){var i=n.apply(null,o);i&&t.push(i)}}else if("object"===a)if(o.toString===Object.prototype.toString)for(var c in o)e.call(o,c)&&o[c]&&t.push(c);else t.push(o.toString())}}return t.join(" ")}t.exports?(n.default=n,t.exports=n):window.classNames=n}()}(s);var f=s.exports;function d(t,e){if(Array.isArray(t))for(var n=0,r=t.length;n<r;n+=1)if(e.apply(e,[t[n],n,t]))return t[n]}function g(t){return"function"==typeof t||"[object Function]"===Object.prototype.toString.call(t)}function p(t){return"number"==typeof t&&!Number.isNaN(t)}function v(t){return parseInt(t,10)}function y(t){return"both"===t||"x"===t}function m(t){return"both"===t||"y"===t}var h=["Moz","Webkit","O","ms"];function b(t,e){return e?"".concat(e).concat(function(t){for(var e="",n=!0,r=0;r<=t.length;r+=1)n?(e+=e[r].toUpperCase(),n=!1):"-"===t[r]?n=!0:e+=t[r];return e}(t)):t}var w=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transform";if("undefined"==typeof window||void 0===window.document)return"";var e=window.document.documentElement.style;if(t in e)return"";for(var n=0;n<h.length;n+=1)if(b(t,h[n])in e)return h[n];return""}();function x(t,e,n,r){if(t){var o=a({capture:!0},r);t.addEventListener?t.addEventListener(e,n,o):t.attachEvent?t.attachEvent("on".concat(e),n):t["on".concat(e)]=n}}function S(t,e,n,r){if(t){var o=a({capture:!0},r);t.removeEventListener?t.removeEventListener(e,n,o):t.detachEvent?t.detachEvent("on".concat(e),n):t["on".concat(e)]=null}}var E="";function N(t,e){return E||(E=d(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],(function(e){return g(t[e])}))),!!g(t[E])&&t[E](e)}function O(t,e,n){var r=t;do{if(N(r,e))return!0;if(r===n)return!1;r=r.parentNode}while(r);return!1}function D(t){if(t){var e,n,r=t.getElementById("draggable-style-el");r||((r=t.createElement("style")).setAttribute("type","text/css"),r.id="draggable-style-el",r.innerHTML=".draggable-transparent-selection *::-moz-selection { all: inherit; }\n",r.innerHTML=".draggable-transparent-selection *::selection { all: inherit; }\n",t.getElementsByTagName("head")[0].appendChild(r)),t.body&&(e=t.body,n="draggable-transparent-selection",e.classList?e.classList.add(n):e.className.match(new RegExp("(?:^|\\s)".concat(n,"(?!\\S)")))||(e.className+="".concat(n)))}}function k(t){var e,n;if(t)try{if(t.body&&(e=t.body,n="draggable-transparent-selection",e.classList?e.classList.remove(n):e.className=e.className.replace(new RegExp("(?:^|\\s)".concat(n,"(?!\\S)"),"g"),"")),t.selection)t.getSelection.empty();else{var r=(t.defaultView||window).getSelection();r&&"Caret"!==r.type&&r.removeAllRanges()}}catch(t){}}function j(t){var e,n,r=t.clientWidth,o=null===(e=t.ownerDocument)||void 0===e||null===(n=e.defaultView)||void 0===n?void 0:n.getComputedStyle(t);return o&&(r+=v(o.borderLeftWidth),r+=v(o.borderRightWidth)),r}function C(t){var e,n,r=t.clientHeight,o=null===(e=t.ownerDocument)||void 0===e||null===(n=e.defaultView)||void 0===n?void 0:n.getComputedStyle(t);return o&&(r+=v(o.borderTopWidth)+v(o.borderBottomWidth),r+=v(o.borderBottomWidth)),r}function T(t){var e,n,r=t.clientWidth,o=null===(e=t.ownerDocument)||void 0===e||null===(n=e.defaultView)||void 0===n?void 0:n.getComputedStyle(t);return o&&(r-=v(o.paddingLeft),r-=v(o.paddingRight)),r}function X(t){var e,n,r=t.clientHeight,o=null===(e=t.ownerDocument)||void 0===e||null===(n=e.defaultView)||void 0===n?void 0:n.getComputedStyle(t);return o&&(r-=v(o.paddingTop),r-=v(o.paddingBottom)),r}function Y(t,e){var n=t.x,r=t.y,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"px",a="translate(".concat(n).concat(o,", ").concat(r).concat(o,")");if(e){var i="".concat("string"==typeof e.x?e.x:"".concat(e.x).concat(o)),c="".concat("string"==typeof e.y?e.y:"".concat(e.y).concat(o));a="translate(".concat(i,", ").concat(c,")").concat(a)}return a}function M(t,e,n,r){var o="number"==typeof n?function(t,e){return t.targetTouches&&d(t.targetTouches,(function(t){return e===t.indentifier}))||t.changedTouches&&d(t.changedTouches,(function(t){return e===t.indentifier}))}(t,n):null;if(null==e||!e.current||"number"==typeof n&&!o)return null;var a=e.current;return function(t,e,n){var r=t.clientX,o=t.clientY,a=e===e.ownerDocument.body?{left:0,top:0}:e.getBoundingClientRect();return{x:(r+e.scrollLeft-a.left)/n,y:(o+e.scrollTop-a.top)/n}}(o||t,e.current.offsetParent||a.offsetParent||a.ownerDocument.body,r)}function L(t,e,n,r){var o=!p(e.lastX),a=t.current;return o?{node:a,deltaX:0,deltaY:0,lastX:n,lastY:r,x:n,y:r}:{node:a,deltaX:n-e.lastX,deltaY:r-e.lastY,lastX:e.lastX,lastY:e.lastY,x:n,y:r}}function A(t){var e=t.coreData,n=t.x,r=t.y,o=t.scale;return{node:e.node,x:n+e.deltaX/o,y:r+e.deltaY/o,deltaX:e.deltaX/o,deltaY:e.deltaY/o,lastX:n,lastY:r}}var P={start:"mousedown",move:"mousemove",stop:"mouseup"},R={start:"touchstart",move:"touchmove",stop:"touchend"},V=P,B=function(t){var n=t.children,r=t.allowAnyClick,o=t.disable,i=t.handle,c=t.cancel,l=t.grid,s=t.domRef,f=t.scale,d=void 0===f?1:f,g=t.enableUserSelect,p=void 0===g||g,v=t.onStart,y=void 0===v?function(){return 0}:v,m=t.onDrag,h=void 0===m?function(){return 0}:m,b=t.onStop,w=void 0===b?function(){return 0}:b,E=t.onMousedown,N=void 0===E?function(){return 0}:E,j=e.useRef({lastX:NaN,lastY:NaN,dragging:!1,touchIndentifier:void 0}),C=e.useRef(null),T=e.useCallback((function(t){var e=j.current,n=M(t,C,e.touchIndentifier,d);if(null!==n){var r=n.x,o=n.y;if(Array.isArray(l)){var i=u(function(t,e,n){return[Math.round(e/t[0])*t[0],Math.round(n/t[1])*t[1]]}(l,r-e.lastX,o-e.lastY),2),c=i[0],s=i[1];if(!c&&!s)return;r=e.lastX+c,o=e.lastY+s}var f=L(C,e,r,o);!1!==h(t,f)?j.current=a(a({},e),{},{dragging:!0,lastX:r,lastY:o}):X(new MouseEvent("mouseup"))}}),[C]),X=e.useCallback((function(t){var e=j.current;if(e.dragging){var n=M(t,C,e.touchIndentifier,d);if(null!==n){var r=n.x,o=n.y,i=L(C,e,r,o);!1!==w(t,i)&&(C.current&&p&&k(C.current.ownerDocument),j.current=a(a({},e),{},{dragging:!1,lastX:NaN,lastY:NaN}),C.current&&(S(C.current.ownerDocument,V.move,T),S(C.current.ownerDocument,V.stop,X)))}}}),[C]),Y=e.useCallback((function(t){var e=j.current;if(N&&N(t),r||0===t.button){var n=C.current,u=null==n?void 0:n.ownerDocument;if(!(n&&u&&u.body&&u.defaultView))throw new Error("Draggable not mounted on DragStart");if(!(o||!(t.target instanceof u.defaultView.Node)||i&&!O(t.target,i,n)||c&&O(t.target,c,n))){"touchstart"===t.type&&t.preventDefault();var l=function(t){return t.targetTouches&&t.targetTouches[0]?t.targetTouches[0].identifier:t.changedTouches&&t.changedTouches[0]?t.changedTouches[0].identifier:void 0}(t);j.current=a(a({},e),{},{touchIndentifier:l});var s=M(t,C,l,d);if(null!==s){var f=s.x,g=s.y,v=L(C,e,f,g);!1!==y(t,v)&&(p&&D(u),j.current=a(a({},e),{},{dragging:!0,lastX:f,lastY:g}),x(u,V.move,T),x(u,V.stop,X))}}}}),[C]),A=e.useCallback((function(t){return V=P,Y(t)}),[]),B=e.useCallback((function(t){return V=P,X(t)}),[]),I=e.useCallback((function(t){return V=R,Y(t)}),[]),W=e.useCallback((function(t){return V=R,X(t)}),[]);return e.useEffect((function(){return C.current&&(null==s||s(C.current),x(C.current,R.start,I,{passive:!1})),function(){if(null!=C&&C.current){var t=C.current.ownerDocument;S(t,P.move,T),S(t,R.move,T),S(t,P.stop,X),S(t,R.stop,X),S(C.current,R.start,I,{passive:!1}),p&&k(t)}}}),[C]),e.cloneElement(n,{ref:C,onMouseDown:A,onMouseUp:B,onTouchEnd:W})};t.DragCore=B,t.default=function(t){var n,o,l=t.children,s=t.className,d=t.draggedClassName,g=void 0===d?"dragged":d,h=t.draggingClassName,x=void 0===h?"dragging":h,S=t.position,E=t.bounds,N=t.positionOffset,O=t.scale,D=void 0===O?1:O,k=t.axis,M=void 0===k?"both":k,L=t.startPosition,P=void 0===L?{x:0,y:0}:L,R=t.onStop,V=t.onStart,I=t.onDrag,W=function(t){var n=u(e.useState(t),2),r=n[0],o=n[1],a=e.useRef(r);return[a,function(t){a.current=t,o(t)},r]}({dragging:!1,dragged:!1,x:null!==(n=null==S?void 0:S.x)&&void 0!==n?n:P.x,y:null!==(o=null==S?void 0:S.y)&&void 0!==o?o:P.y,prevPropsPos:a({},S),slackX:0,slackY:0,isElementSVG:!1,domNode:null}),G=u(W,3),H=G[0],U=G[1],z=G[2],q=u(e.useState({style:a({},l.props.style),className:"",transform:""}),2),_=q[0],F=q[1];e.useEffect((function(){void 0!==window.SVGAElement&&H.current.domNode instanceof window.SVGAElement&&U(a(a({},H.current),{},{isElementSVG:!0}))}),[H]),e.useEffect((function(){var t,e=H.current,n=!Boolean(S)||e.dragging,r=S||P,o={x:y(M)&&n?e.x:r.x,y:m(M)&&n?e.y:r.y},c=null,u={};e.isElementSVG?c=function(t,e){return Y(t,e,"")}(o,N):u=function(t,e){var n=Y(t,e,"px");return i({},b("transform",w),n)}(o,N);var d=f(s||"",l.props.className||"",(i(t={},g,e.dragged),i(t,x,e.dragging),t));F({style:a(a({},_.style),u),className:d,transform:c||""})}),[z]),e.useEffect((function(){if(S&&!H.current.dragging){var t=S.x,e=S.y;U(a(a({},H.current),{},{x:t,y:e}))}}),[S]);var $=e.useCallback((function(t,e){var n=H.current;if(!1===(V&&V(t,A({x:n.x,y:n.y,scale:D,coreData:e}))))return!1;U(a(a({},n),{},{dragging:!0,dragged:!0}))}),[H]),J=e.useCallback((function(t,e){var n=H.current;if(n.dragging){var r=A({x:n.x,y:n.y,scale:D,coreData:e}),o={x:r.x,y:r.y,slackX:0,slackY:0},i=o.x,c=o.y;if(o.x+=n.slackX,o.y+=n.slackY,n.domNode){var l=u(function(t,e,n,r){if(!e)return[n,r];var o=n,a=r,i="string"==typeof e?{}:function(t){return{left:t.left,right:t.right,top:t.top,bottom:t.bottom}}(e),c=t.ownerDocument,u=c.defaultView;if("string"==typeof e&&u){var l;if(!((l="parent"===e?t.parentNode:c.querySelector(e))instanceof u.HTMLElement))throw new Error('Bounds selector "'.concat(e,'" not exist.'));var s=u.getComputedStyle(t),f=u.getComputedStyle(l);i={left:-t.offsetLeft+v(f.paddingLeft)+v(s.marginLeft),top:-t.offsetTop+v(f.paddingTop)+v(s.marginTop),right:T(l)-j(t)-t.offsetLeft+v(f.paddingRight)-v(s.marginRight),bottom:X(l)-C(t)-t.offsetTop+v(f.paddingBottom)-v(s.marginBottom)}}return"number"==typeof i.right&&p(i.right)&&(o=Math.min(o,i.right)),"number"==typeof i.bottom&&p(i.bottom)&&(a=Math.min(a,i.bottom)),"number"==typeof i.left&&p(i.left)&&(o=Math.max(o,i.left)),"number"==typeof i.top&&p(i.top)&&(a=Math.max(a,i.top)),[o,a]}(n.domNode,E,o.x,o.y),2),s=l[0],f=l[1];o.x=s,o.y=f,o.slackX=n.slackX+(i-o.x),o.slackY=n.slackY+(c-o.y)}if(r.x=o.x,r.y=o.y,r.deltaX=o.x-n.x,r.deltaY=o.y-n.y,!1===(I&&I(t,r)))return!1;U(a(a({},n),o))}}),[H]),K=e.useCallback((function(t,e){var n=H.current;if(n.dragging){if(!1===(R&&R(t,e)))return!1;U(a(a({},n),{dragging:!1,slackX:0,slackY:0}))}}),[H]);return r.default.createElement(B,c({},a(a({},t),{},{onStart:$,onDrag:J,onStop:K}),{domRef:function(t){U(a(a({},H.current),{},{domNode:t}))}}),e.cloneElement(l,a({},_)))},Object.defineProperty(t,"__esModule",{value:!0})}));
