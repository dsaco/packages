/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-return */
import { message } from 'antd';
import { Request } from '@dsaco/utils';
import { AxiosError, AxiosResponse } from 'axios';

export const request = new Request({ timeout: 10000 });

request.useResponse(
  ({ data }: AxiosResponse) => data,
  (e: AxiosError<API.ResponseError>) => {
    const response = e.response;

    if (response?.status === 400) {
      message.error(response?.data?.message ?? 'Bad Request');
    } else if (response?.status === 401) {
      message.error(response?.data?.message ?? 'Unauthorized');
      window.location.href = '/login';
    } else if (response?.status === 403) {
      message.error(response?.data?.message ?? 'Forbidden');
      window.location.href = '/login';
    } else if (response?.status === 404) {
      message.error(response?.data?.message ?? 'Not Found');
    } else if (response?.status === 500) {
      message.error(response?.data?.message ?? '网络异常');
    }
    return Promise.reject(response);
  },
);
