/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const scssParser = require('postcss-scss')

const resolveRoot = (p) => path.join(__dirname, '../src', p)
const colors = fs.readFileSync(resolveRoot('support/variables/color-system.scss'))

// const root = postcss.parse(colors, { parser: scssParser.parse });
// console.log(root);
const root = scssParser.parse(colors)

// Generate color map
const map = {}
root.walkDecls((decl) => {
  const name = decl.prop.replace(/^\$(\w+)(-\d+)?$/, '$1')
  const value = decl.value.replace(/^(#.*)\s.*/, '$1')

  if (Array.isArray(map[name])) {
    map[name].push(value)
  } else {
    map[name] = [value]
  }
})

const data = `export default ${JSON.stringify(map, null, 2)}`
fs.writeFileSync(path.join(__dirname, '../theme/colors.ts'), data.replace(/"/g, "'"))
