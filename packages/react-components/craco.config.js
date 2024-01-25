const path = require('path');

const cracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  babel: {
    plugins: ['@emotion'],
  },
  plugins: [
    {
      plugin: cracoLessPlugin,
    },
  ],
};
