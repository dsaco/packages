import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

/**
 * @type {import('rollup').RollupOptions}
 */

export default {
  input: ['./src/component2/index.ts', './src/component2/Button/index.tsx'],
  output: [
    {
      dir: 'es',
      format: 'es',
      preserveModules: true,
      plugins: [
        getBabelOutputPlugin({
          presets: [
            [
              '@babel/preset-env',
              {
                // include
              },
            ],
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              { corejs: 3, useESModules: true },
            ],
          ],
          //   babelHelpers: 'runtime',
        }),
      ],
    },
    {
      dir: 'lib',
      format: 'cjs',
      preserveModules: true,
      // interop: 'auto',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: {
                  version: 3,
                  proposals: true,
                },
                useESModules: false,
              },
            ],
          ],
          //   babelHelpers: 'runtime',
        }),
      ],
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    json(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          // target: 'ES',
          jsx: 'react',
          // esModuleInterop: true,
        },
        include: [
          'src/component2/index.ts',
          // 'src/component2/Ripple/index.tsx',
          'src/component2/Test/index.tsx',
        ],
      },
    }),
    // babel({
    //   presets: ['@babel/preset-react'],
    // }),
    // babel({ babelHelpers: 'runtime' }),
  ],
  external: [
    'react',
    'react-dom',
    'styled-components',
    '@react-spring/web',
    '@dsaco/utils',
    'lodash',
    /@babel\/runtime/,
  ],
};
