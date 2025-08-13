import { authRequestInterceptor, authResponseInterceptor, HttpClient } from '@/lib/configs';

export class AuthApiService extends HttpClient {
    constructor() {
        super({
            requestInterceptor: authRequestInterceptor,
            responseInterceptor: authResponseInterceptor,
        });
    }
}