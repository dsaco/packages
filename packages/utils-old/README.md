##### install
```
npm i -S @dsaco/utils
```

##### usage
```ts
import { message } from 'antd';
import { Request as _Request } from '@dsaco/utils';

export const Request = new _Request(undefined, (e) => {
  const response = e.response;

  if (response?.status === 400) {
    message.error(
      (response?.data as API.ResponseError)?.message ?? '错误的请求'
    );
  } else if (response?.status === 401) {
    message.error('用户未登录');
  } else if (response?.status === 403) {
    message.error('权限不足');
  } else if (response?.status === 404) {
    message.error('访问地址不存在');
  } else if (response?.status === 500) {
    message.error((response?.data as API.ResponseError)?.message ?? '网络异常');
  }
  return Promise.reject(e.response?.statusText);
});
```

```ts
import { Request } from '@/utils';

export const getUsersByPage: API.RequestRecords<User> = (params) => {
  return Request.get('/api/users/page', params);
};
```