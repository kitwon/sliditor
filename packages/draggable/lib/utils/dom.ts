import { find, isFunction, int } from './helpers'
import { MouseTouchEvent, ControlPosition, OffsetPositionOfControl } from '../types'
import browserPrefix, { browserPrefixToKey } from './prefix'

export function addClass(el: HTMLElement, classname: string) {
  if (el.classList) {
    el.classList.add(classname)
  } else if (!el.className.match(new RegExp(`(?:^|\\s)${classname}(?!\\S)`))) {
    // eslint-disable-next-line no-param-reassign
    el.className += `${classname}`
  }
}

export function removeClass(el: HTMLElement, classname: string) {
  if (el.classList) {
    el.classList.remove(classname)
  } else {
    // eslint-disable-next-line no-param-reassign
    el.className = el.className.replace(new RegExp(`(?:^|\\s)${classname}(?!\\S)`, 'g'), '')
  }
}

export function addEvent(
  el: Node,
  event: string,
  handler: EventListenerOrEventListenerObject,
  inputOptions?: AddEventListenerOptions
) {
  if (!el) return
  const options = { capture: true, ...inputOptions }
  if (el.addEventListener) {
    el.addEventListener(event, handler, options)
    // @ts-ignore
  } else if (el.attachEvent) {
    // @ts-ignore
    el.attachEvent(`on${event}`, handler)
  } else {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    el[`on${event}`] = handler
  }
}

export function removeEvent(
  el: Node,
  event: string,
  handler: EventListenerOrEventListenerObject,
  inputOptions?: AddEventListenerOptions
) {
  if (!el) return
  const options = { capture: true, ...inputOptions }
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options)
    // @ts-ignore
  } else if (el.detachEvent) {
    // @ts-ignore
    el.detachEvent(`on${event}`, handler)
  } else {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    el[`on${event}`] = null
  }
}

let matchsSelectorFunc = ''
export function matchSelector(el: Node, selector: string) {
  if (!matchsSelectorFunc) {
    matchsSelectorFunc = find(
      [
        'matches',
        'webkitMatchesSelector',
        'mozMatchesSelector',
        'msMatchesSelector',
        'oMatchesSelector'
      ],
      (method) => isFunction((el as any)[method])
    ) as string
  }

  if (!isFunction((el as any)[matchsSelectorFunc])) return false
  return (el as any)[matchsSelectorFunc](selector)
}

export function matchSelectorAndParent(el: Node, selector: string, baseNode: Node) {
  let node: (Node & ParentNode) | null | undefined = el as Node & ParentNode
  do {
    if (matchSelector(node, selector)) return true
    if (node === baseNode) return false
    node = node.parentNode
  } while (node)

  return false
}

export function getTouch(e: MouseTouchEvent, indentifier: number) {
  return (
    (e.targetTouches && find<any>(e.targetTouches as any, (t) => indentifier === t.indentifier)) ||
    (e.changedTouches && find<any>(e.changedTouches as any, (t) => indentifier === t.indentifier))
  )
}

export function getTouchIdentifier(e: MouseTouchEvent) {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier

  return undefined
}

export function offsetFromParent(
  { clientX, clientY }: MouseTouchEvent,
  offsetParent: Element,
  scale: number
) {
  const isBody = offsetParent === offsetParent.ownerDocument.body
  const rect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect()

  const x = (clientX + offsetParent.scrollLeft - rect.left) / scale
  const y = (clientY + offsetParent.scrollTop - rect.top) / scale

  return { x, y }
}

export function addUserSelectStyles(doc?: Document) {
  if (!doc) return
  let styleEl = doc.getElementById('draggable-style-el')
  if (!styleEl) {
    styleEl = doc.createElement('style')
    styleEl.setAttribute('type', 'text/css')
    styleEl.id = 'draggable-style-el'
    styleEl.innerHTML = '.draggable-transparent-selection *::-moz-selection { all: inherit; }\n'
    styleEl.innerHTML = '.draggable-transparent-selection *::selection { all: inherit; }\n'
    doc.getElementsByTagName('head')[0].appendChild(styleEl)
  }
  if (doc.body) addClass(doc.body, 'draggable-transparent-selection')
}

export function removeUserSelectStyle(doc?: Document) {
  if (!doc) return
  try {
    if (doc.body) removeClass(doc.body, 'draggable-transparent-selection')
    // @ts-ignore
    if (doc.selection) {
      // @ts-ignore
      doc.getSelection.empty()
    } else {
      const selection = (doc.defaultView || window).getSelection()
      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges()
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function outerWidth(node: HTMLElement) {
  let width = node.clientWidth
  const computedStyle = node.ownerDocument?.defaultView?.getComputedStyle(node)
  if (computedStyle) {
    width += int(computedStyle.borderLeftWidth)
    width += int(computedStyle.borderRightWidth)
  }
  return width
}

export function outerHeight(node: HTMLElement) {
  let height = node.clientHeight
  const computedStyle = node.ownerDocument?.defaultView?.getComputedStyle(node)
  if (computedStyle) {
    height += int(computedStyle.borderTopWidth) + int(computedStyle.borderBottomWidth)
    height += int(computedStyle.borderBottomWidth)
  }
  return height
}

export function innerWidth(node: HTMLElement) {
  let width = node.clientWidth
  const computedStyle = node.ownerDocument?.defaultView?.getComputedStyle(node)
  if (computedStyle) {
    width -= int(computedStyle.paddingLeft)
    width -= int(computedStyle.paddingRight)
  }
  return width
}

export function innerHeight(node: HTMLElement) {
  let height = node.clientHeight
  const computedStyle = node.ownerDocument?.defaultView?.getComputedStyle(node)
  if (computedStyle) {
    height -= int(computedStyle.paddingTop)
    height -= int(computedStyle.paddingBottom)
  }
  return height
}

export function getTranslation(
  { x, y }: ControlPosition,
  positionOffset?: OffsetPositionOfControl,
  unit = 'px'
) {
  let translation = `translate(${x}${unit}, ${y}${unit})`
  if (positionOffset) {
    const defaultX = `${
      typeof positionOffset.x === 'string' ? positionOffset.x : `${positionOffset.x}${unit}`
    }`
    const defaultY = `${
      typeof positionOffset.y === 'string' ? positionOffset.y : `${positionOffset.y}${unit}`
    }`
    translation = `translate(${defaultX}, ${defaultY})${translation}`
  }

  return translation
}

export function createCSSTransform(
  controlPos: ControlPosition,
  positionOffset?: OffsetPositionOfControl
) {
  const translation = getTranslation(controlPos, positionOffset, 'px')
  return { [browserPrefixToKey('transform', browserPrefix)]: translation }
}

export function createSVGTransform(
  controlPos: ControlPosition,
  positionOffset?: OffsetPositionOfControl
) {
  const translation = getTranslation(controlPos, positionOffset, '')
  return translation
}
