import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

// 入口文件
const entry = [
  './src/components/index.ts',
  './src/components/Button/index.ts',
  './src/components/Ripple/index.tsx',
];

// babel配置
// const babelOptions: RollupBabelInputPluginOptions = {
//   presets: ['@babel/preset-env'],
//   extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
//   exclude: '**/node_modules/**',
//   babelHelpers: 'runtime',
// };

// rollup配置
export default {
  // 入口
  input: entry,
  // 打包信息
  output: [
    {
      dir: 'es',
      format: 'es',
      assetFileNames: ({ name }) => {
        console.log(name);
        return '[name].[ext]';
      },
      // plugins: [
      //   getBabelOutputPlugin({
      //     presets: ['@babel/preset-env'],
      //     plugins: [
      //       // ['@babel/plugin-transform-runtime', { useESModules: true }],
      //     ],
      //   }),
      // ],
    },
  ],
  // 插件配置
  plugins: [
    // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
    resolve(),
    // 支持commonjs，包括第三方引入使用到commonjs语法
    commonjs(),
    // typescript支持
    typescript(),
    // 支持读取json文件
    json(),
    // babel
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      // presets: [
      //   ['@babel/preset-env', { modules: false }],
      //   [
      //     '@babel/preset-react',
      //     {
      //       runtime: 'automatic',
      //     },
      //   ],
      // ],
    }),
  ],
  external: [
    'react',
    'react-dom',
    'styled-components',
    '@react-spring/web',
    '@dsaco/utils',
    /@babel\/runtime/,
  ],
};
