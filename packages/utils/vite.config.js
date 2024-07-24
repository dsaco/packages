import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default ({ mode }) => {
  const { VITE_MODE } = loadEnv(mode, process.cwd());

  switch (VITE_MODE) {
    case 'lib':
      return defineConfig({
        build: {
          lib: {
            entry: './src/index.ts',
            name: 'DsacoUtils',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
          },
          rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['axios'],
            output: {
              // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
              globals: {
                axios: 'axios',
              },
            },
          },
        },
        plugins: [
          dts({
            insertTypesEntry: true,
          }),
        ],
      });
    case 'project':
      return defineConfig({
        server: {
          port: 3003,
          host: '0.0.0.0',
          proxy: {
            '/api': {
              target: 'https://ds-or.com',
              changeOrigin: true,
            },
          },
        },
      });
  }
};
