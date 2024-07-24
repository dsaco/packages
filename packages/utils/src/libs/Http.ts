import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

type TypeOnFulfilled<V> = ((value: V) => V | Promise<V>) | null;

export type HttpConfig<T = unknown> = CreateAxiosDefaults & {
  reqBefore?: TypeOnFulfilled<InternalAxiosRequestConfig>;
  reqError?: ((error: AxiosError) => any) | null;
  resSuccess?: TypeOnFulfilled<AxiosResponse>;
  resError?: ((error: AxiosError<T>) => any) | null;
};
export type HttpError<T> = AxiosError<T>;

export class Http<T = unknown> {
  private instance: AxiosInstance;

  constructor(config?: HttpConfig<T>) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(config?.reqBefore, config?.reqError);

    this.instance.interceptors.response.use(
      config?.resSuccess ?? ((response) => response.data),
      config?.resError,
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
