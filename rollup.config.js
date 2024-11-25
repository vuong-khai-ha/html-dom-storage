import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/html-dom-storage.js',
  output: {
    file: 'dist/html-dom-storage.umd.js',
    format: 'umd',
    name: 'HTMLDomStorage',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
    terser(),
  ],
};
