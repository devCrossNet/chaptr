import { HttpService } from './HttpService';
import { AxiosRequestConfig, AxiosError } from 'axios';

export function setupRequestInterceptor() {
  HttpService.interceptors.request.use(
    (config: AxiosRequestConfig) => {

      return {
        ...config,
        headers: {
          ...config.headers,
        },
      };
    },
    /* istanbul ignore next */
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
}
