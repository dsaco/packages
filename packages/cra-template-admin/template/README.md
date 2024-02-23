> create-react-app创建的tsconfig.json没有`compilerOptions.paths`，需要自行添加
### 配置 alias

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### `npm start`

启动项目

### `npm run build`

构建项目
