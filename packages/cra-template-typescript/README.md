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
      "@/*": ["./src/*"]
    }
  }
}
```

## 模版编写步骤

### 配置路径别名需要安装 craco

```sh
yarn add -D @craco/craco
```

创建 craco.config.js

```js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
```

修改 package.json 的 scripts

react-scripts 替换为 craco

消除编辑器警告

tsconfig.json 里添加

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### .env

根目录下创建.env

```bash
# 端口
PORT=3000
# 打包地址
BUILD_PATH=build
# 生产环境是否生成源代码映射文件，默认为true
GENERATE_SOURCEMAP=false
```

### 使用 sass

creact-react-app 默认支持，只需要安装 sass 即可

```
yarn add -D sass
```

### 使用 less

安装依赖

```
yarn add less craco-less
```

编辑 craco.config.js

```js
const cracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: cracoLessPlugin,
    },
  ],
};
```

### 配置代理

安装依赖

```
yarn add -D http-proxy-middleware
```

创建 src/setupProxy.js

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://example.com',
      changeOrigin: true,
    })
  );
};
```

### 分析代码打包结果

安装依赖

```
yarn add -D source-map-explorer
```

package.json 增加(需要开启 GENERATE_SOURCEMAP)

```json
{
  "scripts": {
    "analyze": "npm run build && source-map-explorer 'build/static/js/*.js'"
  }
}
```

### 使用 tailwindcss

安装

```
yarn add -D tailwindcss
npx tailwindcss init
```

修改 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

页面引入样式

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

消除 vscode 的样式警告

.vscode/settings.json

```json
{
  "css.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore"
}
```

### 使用 prettier

安装

```
yarn add --dev --exact prettier
```

新增.prettierrc

```json
{
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": "*.less",
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": "*.scss",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": "*.less",
      "options": {
        "singleQuote": false
      }
    },
    {
      "files": "*.scss",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

### 使用 stylelint

初始化

```
npm init stylelint
```

样式属性顺序、sass、less

```
yarn add -D stylelint-config-recess-order postcss-less postcss-scss
```

.vscode/settings.json

```json
{
  "css.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore",
  "stylelint.validate": ["css", "less", "postcss", "scss"]
}
```

.stylelintrc.json

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
  "overrides": [
    {
      "files": ["**/*.less"],
      "customSyntax": "postcss-less"
    },
    {
      "files": ["**/*.scss"],
      "customSyntax": "postcss-scss"
    }
  ],
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind"]
      }
    ],
    "function-no-unknown": [
      true,
      {
        "ignoreFunctions": ["theme"]
      }
    ]
  }
}
```

package.json

```json
{
  "scripts": {
    "lint:style": "stylelint src/**/*.{css,less,scss}",
    "fix:style": "npm run lint:style -- --fix"
  }
}
```

### 使用 eslint

安装

```
yarn add -D eslint eslint-plugin-react eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

创建.eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```
