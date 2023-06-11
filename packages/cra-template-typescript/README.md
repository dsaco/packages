### 使用方法

```sh
npx create-react-app my-app --template @dsaco/typescript
```

### 代码报错时，请配置路径别名
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