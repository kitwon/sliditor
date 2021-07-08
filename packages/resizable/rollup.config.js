const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/resizable.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/resizable.umd.js',
      name: 'resizable',
      format: 'umd',
      plugins: [terser()]
    }
  ],
  plugins: [
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
    }),
    commonjs(),
    babel({
      exclude: './node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
    })
  ],
  external: ['react']
}
