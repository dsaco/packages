import axios from 'axios';
import type {
  CreateAxiosDefaults,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosInterceptorOptions,
} from 'axios';

type TypeOnFulfilled<V> = ((value: V) => V | Promise<V>) | null;

export class Request {
  private instance: AxiosInstance;

  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);

    this.useResponse(({ data }) => data);
  }

  get<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.instance.get(url, { params, ...config });
  }

  delete<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.instance.delete(url, { params, ...config });
  }

  head<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.instance.head(url, { params, ...config });
  }

  options<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.instance.options(url, { params, ...config });
  }

  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  patch<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  useRequest(
    onFulfilled?: TypeOnFulfilled<InternalAxiosRequestConfig>,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions,
  ) {
    this.instance.interceptors.request.use(onFulfilled, onRejected, options);
  }
  useResponse(
    onFulfilled?: TypeOnFulfilled<AxiosResponse>,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions,
  ) {
    this.instance.interceptors.response.use(
      onFulfilled ?? ((response: AxiosResponse) => response.data),
      onRejected,
      options,
    );
  }
}
