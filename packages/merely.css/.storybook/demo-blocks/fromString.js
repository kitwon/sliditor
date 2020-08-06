const unified = require('unified')
const parse = require('remark-parse')
const containers = require('remark-containers')
const remark2rehype = require('remark-rehype')

module.exports = (markdown) => {
  const ast = unified()
    .use(parse)
    .use(containers, {
      default: false,
      custom: [{
        type: 'demo',
        element: '',
        transform: function(node, config, tokenize) {
          let value = ''

          // Get template from demo block
          node.children = node.children
            .filter(child => {
              return child.value.match(/^<template(\s+.*)?>/)
            })
            .forEach(child => {
              value = child.value.replace(/^<template>((\n.*)+)<\/template>$/gim, '$1')
            })

          // Change demo block to code block
          node.type = 'code'
          node.lang = 'html'
          node.value = value
        }
      }]
    })
    .use(remark2rehype)
    .parse(markdown)

  return ast
}