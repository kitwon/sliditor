const prefixes = ['Moz', 'Webkit', 'O', 'ms']

function kebabToTitleCase(str: string) {
  let value = ''
  let shouldCapitalize = true
  for (let i = 0; i <= str.length; i += 1) {
    if (shouldCapitalize) {
      value += value[i].toUpperCase()
      shouldCapitalize = false
    } else if (str[i] === '-') {
      shouldCapitalize = true
    } else {
      value += str[i]
    }
  }

  return value
}

export function browserPrefixToKey(prop: string, prefix: string) {
  return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop
}

export function browserPrefixToStyle(prop: string, prefix: string) {
  return prefix ? `${prefix.toLowerCase()}-${prop}` : prop
}

export function getPrefix(prop = 'transform') {
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return ''

  const { style } = window.document.documentElement

  if (prop in style) return ''

  for (let i = 0; i < prefixes.length; i += 1) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) {
      return prefixes[i]
    }
  }

  return ''
}

export default getPrefix()
