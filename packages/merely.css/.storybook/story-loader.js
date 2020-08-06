const { join, basename, dirname } = require('path')
// const fromAst = require('code-blocks/lib/fromAST')
const fromString = require('code-blocks/lib/fromString')

function storiesFromMarkdown(markdown, file) {
  // const ast = fromString(markdown)
  const path = file.replace(/^\.\//, '')
  const stories = fromString(markdown, path).filter(block => block.lang === 'html')
  return stories
}

module.exports = function storyLoader(markdown) {
  // resourcePath is the full path to the file has being parsed
  // rootContext is just the dirname(rsourcePath)
  const { resourcePath = '', rootContext } = this

  const { sourcePath = rootContext } = this.query || {}
  const file = resourcePath.replace(`${sourcePath}/`, '')
  const path = join(dirname(file), basename(file, file.indexOf('.mdx') >= 0 ? '.mdx' : '.md'))
  console.log(path)
  const stories = storiesFromMarkdown(markdown, file)
  if (stories.length) {
    console.warn(`\n ${stories.length} stories found in ${file}`)
    return `
      const { storiesOf } = require('@storybook/react')
      const HtmlToReactParser = require('html-to-react').Parser

      const story = storiesOf(${JSON.stringify(path)})
      const stories = ${JSON.stringify(stories)}
      console.log(stories)

      const htmlParser = new HtmlToReactParser()
      for (const { title, value } of stories) {
        console.log(value)
        story.add(title, () => htmlParser.parse(value))
      }
    `
  } else {
    return `module.exports = { markdown: ${JSON.stringify(markdown)} }`
  }
}
