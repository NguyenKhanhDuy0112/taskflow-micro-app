import { useAuthStore } from '@/lib/stores';
import { AxiosError, type AxiosInstance, type AxiosRequestConfig, HttpStatusCode } from 'axios';

let isRefreshing = false;

export const authRequestInterceptor = (config: AxiosRequestConfig) => {
    const accessToken = useAuthStore.getState()?.accessToken;

    config.headers = {
        ...config.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
    };

    return config;
};

export const authResponseInterceptor = async (error: AxiosError, axios: AxiosInstance) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest) return Promise.reject(error);

    if (status === HttpStatusCode.NotAcceptable) {
        return Promise.reject(error);
    }

    if (status === HttpStatusCode.Unauthorized && !isRefreshing) {
        const { logout, refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
            logout();
            return Promise.reject(error);
        }

        try {
            isRefreshing = true;

            const isRefreshEndpoint = originalRequest.url?.includes('/api/v1/auth/refresh');

            if (isRefreshEndpoint) {
                throw new Error('Refresh token is invalid');
            }

            const responseToken = await axios.post('/api/v1/auth/refresh', {
                refreshToken: refreshToken,
            });

            const { updateToken } = useAuthStore.getState();
            await updateToken({
                accessToken: responseToken?.data?.data?.token || '',
                refreshToken: responseToken?.data?.data?.refreshToken || '',
            });

            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${responseToken?.data?.data?.token}`;
            return axios(originalRequest);
        } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            isRefreshing = false;
            logout();
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
};
