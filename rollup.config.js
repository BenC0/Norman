import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    postcss({
      extensions: [ '.css' ],
    }),
  ]
};