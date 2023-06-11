##### install
```
npm i -S @dsaco/eslint-config
```

##### usage
```
// .eslintrc
{
  // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  "root": true,
  // env 定义环境，每个环境都定义了一组预定义的全局变量
  "env": {
    // 可以使用浏览器环境中的全局变量
    "browser": true,
    // 可以使用 es2022 环境中的全局变量
    "es2022": true
  },
  "parserOptions": {
    // 使用最新的 ECMAScript 进行语法解析
    "ecmaVersion": "latest",
    // 默认为 script ，可设置为 module 标明代码是 ECMAScript 模块
    "sourceType": "module",
    // 启用JSX语法支持
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    // 自动检测所使用的React版本
    "react": {
      "version": "detect"
    }
  },
  // 配置忽略文件
  "ignorePatterns": [
    "setupProxy.js"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "prettier",
    "react",
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "@dsaco"
  ],
  "rules": {
    "prettier/prettier": 2,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0
  }
}
```