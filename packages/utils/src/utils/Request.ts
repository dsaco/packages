import axios from 'axios';
import type {
  CreateAxiosDefaults,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

export type TypeRequest = {
  config?: CreateAxiosDefaults;
  onReq?: (
    value: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>;
  onReqRejected?: (error: AxiosError) => any;
  onRes?: (
    value: AxiosResponse<any, any>
  ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
  onResRejected?: (error: AxiosError) => any;
};

export class Request {
  #instance: AxiosInstance;

  constructor(
    options: {
      config?: CreateAxiosDefaults;
      onReq?: (
        value: InternalAxiosRequestConfig<any>
      ) =>
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>>;
      onReqRejected?: (error: AxiosError) => any;
      onRes?: (
        value: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
      onResRejected?: (error: AxiosError) => any;
    } = {}
  ) {
    const { config, onReq, onReqRejected, onRes, onResRejected } = options;
    this.#instance = axios.create(config);

    this.#instance.interceptors.request.use(onReq, onReqRejected);
    this.#instance.interceptors.response.use(
      onRes ?? ((response: AxiosResponse) => response.data),
      onResRejected
    );
  }

  get<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.#instance.get(url, { params, ...config });
  }

  delete<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.#instance.delete(url, { params, ...config });
  }

  head<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.#instance.head(url, { params, ...config });
  }

  options<T>(
    url: string,
    params = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.#instance.options(url, { params, ...config });
  }

  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.post(url, data, config);
  }

  put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.put(url, data, config);
  }

  patch<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.#instance.patch(url, data, config);
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.#instance.request(config);
  }
}
