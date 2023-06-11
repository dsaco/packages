import axios from 'axios';
import type {
	CreateAxiosDefaults,
	AxiosInstance,
	AxiosError,
	AxiosResponse,
	AxiosRequestConfig,
} from 'axios';

export type TypeOnRejected = (e: AxiosError) => void;

export class Request {
	#instance: AxiosInstance;

	constructor(config?: CreateAxiosDefaults, onRejected?: TypeOnRejected) {
		this.#instance = axios.create(config);

		this.#instance.interceptors.response.use(
			(response: AxiosResponse) => response.data,
			onRejected,
		);
	}

	get<T>(
		url: string,
		params = {},
		config: AxiosRequestConfig = {},
	): Promise<T> {
		return this.#instance.get(url, { params, ...config });
	}

	delete<T>(
		url: string,
		params = {},
		config: AxiosRequestConfig = {},
	): Promise<T> {
		return this.#instance.delete(url, { params, ...config });
	}

	head<T>(
		url: string,
		params = {},
		config: AxiosRequestConfig = {},
	): Promise<T> {
		return this.#instance.head(url, { params, ...config });
	}

	options<T>(
		url: string,
		params = {},
		config: AxiosRequestConfig = {},
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
		config?: AxiosRequestConfig,
	): Promise<T> {
		return this.#instance.patch(url, data, config);
	}

	request<T>(config: AxiosRequestConfig): Promise<T> {
		return this.#instance.request(config);
	}
}
