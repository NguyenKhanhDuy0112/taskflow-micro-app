import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { ENV } from '../env';
import { useAuthStore } from '@/lib/stores';

export const DEFAULT_TIMEOUT = Number.POSITIVE_INFINITY;

export interface HttpClientConfig {
    baseUrl?: string;
    timeout?: number;
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    responseInterceptor?: (response: AxiosError, axios: AxiosInstance) => AxiosResponse | AxiosError | Promise<AxiosResponse | AxiosError>;
}

export class HttpClient {
    public httpClient: AxiosInstance;

    constructor(value: HttpClientConfig) {
        this.httpClient = axios.create({
            timeout: value.timeout ?? DEFAULT_TIMEOUT,
        });

        this.httpClient.interceptors.request.use((config) => {
            const accessToken = useAuthStore.getState()?.accessToken;
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            return config;
        });

        if (value.requestInterceptor)
            this.httpClient.interceptors.request.use(value.requestInterceptor as () => InternalAxiosRequestConfig);

        if (value?.responseInterceptor)
            this.httpClient.interceptors.response.use(
                (response: AxiosResponse) => {
                    return response;
                },
                (error: AxiosError) => {
                    return value.responseInterceptor && value.responseInterceptor(error, this.httpClient);
                }
            );
    }

    public get baseUrl() {
        return `${ENV.BASE_API}/api/v1`;
    }

    protected async post<T, U>(url: string, data: T, config?: AxiosRequestConfig) {
        const result = await this.httpClient.post<U>(url, data, {
            ...config,
            baseURL: this.baseUrl,
        });

        return result.data;
    }

    protected async patch<T, U>(url: string, payload: T, config?: AxiosRequestConfig) {
        const result = await this.httpClient.patch<U>(url, payload, {
            ...config,
            baseURL: this.baseUrl,
        });
        return result?.data;
    }

    protected async put<T, U>(url: string, payload: T, config?: AxiosRequestConfig) {
        const result = await this.httpClient.put<U>(url, payload, {
            ...config,
            baseURL: this.baseUrl,
        });
        return result?.data;
    }

    protected async delete<T, U>(url: string, params?: T | null, config?: Omit<AxiosRequestConfig, 'params'>) {
        const result = await this.httpClient.delete<U>(url, {
            params,
            ...config,
            baseURL: this.baseUrl,
        });

        return result?.data;
    }

    protected async get<T, U>(url: string, params?: T | null, config?: Omit<AxiosRequestConfig, 'params'>) {
        const result = await this.httpClient.get<U>(url, {
            params,
            ...config,
            baseURL: this.baseUrl,
        });

        return result?.data;
    }
}
