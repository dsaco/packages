### `npm start`

启动项目

#### 配置路径别名

```js
// cacro.config.js
const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
```
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
}
```

### `npm run build`

构建项目

### `npm run lint:script`

检测script脚本

### `npm run lint:script -- --fix`

检测并修复script脚本

### `npm run lint:style`

检测样式

### `npm run lint:style -- --fix`

检测并修复样式

### `npm run fix`

检测修复脚本及样式

### `npm run analyze`

分析项目构建结果



