import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

/**
 * @type {import('rollup').RollupOptions}
 */

const input = [
  './src/components/index.ts',
  // './src/components/Button/index.ts',
];
const external = [
  'react',
  'react-dom',
  'styled-components',
  '@react-spring/web',
  '@dsaco/utils',
  /@babel\/runtime/,
];

export default [
  {
    input,
    output: {
      dir: 'es',
      format: 'es',
      preserveModules: true,
      // plugins: [
      //   getBabelOutputPlugin({
      //     presets: [['@babel/preset-env']],
      //     plugins: [['@babel/plugin-transform-runtime']],
      //   }),
      // ],
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx'],
      }),
      json(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES5',
            jsx: 'react',
            // esModuleInterop: true,
          },
          include: input,
        },
      }),
    ],
    external,
  },
  {
    input,
    output: {
      dir: 'lib',
      format: 'cjs',
      preserveModules: true,
      // plugins: [
      //   getBabelOutputPlugin({
      //     presets: ['@babel/preset-env'],
      //     plugins: [['@babel/plugin-transform-runtime']],
      //   }),
      // ],
    },
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx'],
      }),
      json(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES5',
            jsx: 'react',
            // esModuleInterop: true,
          },
          include: input,
        },
      }),
      // babel({
      //   babelHelpers: 'runtime',
      //   presets: [
      //     [
      //       '@babel/preset-env',
      //       {
      //         targets: 'defaults',
      //         // targets: {
      //         //   esmodules: false,
      //         // },
      //       },
      //     ],
      //   ],
      //   plugins: ['@babel/plugin-transform-runtime'],
      // }),
    ],
    external,
  },
];
