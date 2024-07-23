import axios from 'axios';
import type {
  CreateAxiosDefaults,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

type TypeOnFulfilled<V> = ((value: V) => V | Promise<V>) | null;

export type HttpConfig<T = unknown> = CreateAxiosDefaults & {
  reqFulfilled?: TypeOnFulfilled<InternalAxiosRequestConfig>;
  reqRejected?: ((error: AxiosError) => any) | null;
  resFulfilled?: TypeOnFulfilled<AxiosResponse>;
  resRejected?: ((error: AxiosError<T>) => any) | null;
};

export class Http<T> {
  private instance: AxiosInstance;

  constructor(config?: HttpConfig<T>) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      config?.reqFulfilled,
      config?.reqRejected,
    );
    this.instance.interceptors.response.use(
      config?.resFulfilled ?? ((response: AxiosResponse) => response.data),
      config?.resRejected,
    );
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
}
