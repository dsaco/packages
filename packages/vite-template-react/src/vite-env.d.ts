/// <reference types="vite/client" />

declare module '*.module.less' {
  const classes: readonly Record<string, unknown>;
  export default classes;
}
