##### 配置路径别名

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
      "@/*": ["./src/*"]
    }
  }
}
```

##### 启动项目

```
npm start
```

##### 构建项目

```
npm run build
```

##### 检测 script 脚本

```
npm run lint:script
```

##### 检测并修复 script 脚本

```
npm run fix:script
```

##### 检测样式

```
npm run lint:style
```

##### 检测并修复样式

```
npm run fix:style
```

##### 检测修复脚本及样式

```
npm run fix
```

##### 代码格式化

```
npm run prettier
```

##### 预提交格式化

```
npm run precommit
```

```
npm run analyze
```

##### 分析项目构建结果

```
npm run analyze
```
