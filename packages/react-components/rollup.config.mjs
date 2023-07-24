// import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
// import dts from 'rollup-plugin-dts';

// 入口文件
const entry = [
  './src/components/index.ts',
  './src/components/Test/index.tsx',
  './src/components/Ripple/index.tsx',

  // './src/components/Button/index.ts',
  // './src/components/Ripple/index.tsx',
];

// babel配置
// const babelOptions: RollupBabelInputPluginOptions = {
//   presets: ['@babel/preset-env'],
//   extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
//   exclude: '**/node_modules/**',
//   babelHelpers: 'runtime',
// };

// rollup配置
export default [
  {
    input: entry,
    output: [
      {
        dir: 'es',
        format: 'es',
        preserveModules: true,
        plugins: [
          getBabelOutputPlugin({
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime', { useESModules: true }],
            ],
          }),
        ],
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES6',
            jsx: 'react',
            declaration: true,
          },
          include: [
            'src/components/index.ts',
            'src/components/Ripple/index.tsx',
            'src/components/Test/index.tsx',
          ],
        },
      }),
      json(),
      babel({ babelHelpers: 'runtime' }),
    ],
    external: [
      'react',
      'react-dom',
      'styled-components',
      '@react-spring/web',
      '@dsaco/utils',
      /@babel\/runtime/,
    ],
  },
  {
    input: entry,
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        preserveModules: true,
        plugins: [
          getBabelOutputPlugin({
            presets: [
              '@babel/preset-env',
              // {
              //   modules: 'commonjs',
              // },
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', { useESModules: false }],
            ],
          }),
        ],
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES6',
            jsx: 'react',
          },
          include: [
            'src/components/index.ts',
            'src/components/Ripple/index.tsx',
            'src/components/Test/index.tsx',
          ],
        },
      }),
      json(),
      babel({ babelHelpers: 'runtime' }),
    ],
    external: [
      'react',
      'react-dom',
      'styled-components',
      '@react-spring/web',
      '@dsaco/utils',
      /@babel\/runtime/,
    ],
  },

  // {
  //   input: './src/components/index.ts',
  //   output: [
  //     {
  //       dir: 'es',
  //       format: 'es',
  //       // chunkFileNames: ({ name }) => {
  //       //   if (name === 'index') {
  //       //     return `${name}.d.ts`;
  //       //   }
  //       //   return `${name}/${name}.d.ts`;
  //       // },
  //       // preserveModules: true,
  //       // preserveModulesRoot: 'src',
  //     },
  //   ],
  //   plugins: [dts()],
  // },
];
