/**
 * @author Jay
 * @description 完成初步axios封装
 * @description 后续可以补充请求梯队返回promise数组
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import proxy from 'configs/host';
import { resData } from './interface';
// 判断开发环境
const env = import.meta.env.MODE || 'development';
// 根据开发环境配置baseurl
const API_HOST = proxy[env].API;
// 超时时间
const TIMEOUT = 5000;
const config = {
  baseURL: API_HOST,
  timeout: TIMEOUT,
  withCredentials: true,
};
class httpsRequest {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    // 构建请求副本
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 请求拦截  待处理状态
        console.log(config, 'config_');
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
    this.service.interceptors.response.use(
      (response: AxiosResponse<any, any>) => {
        // 返回响应
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }
  /**
   * @author Jay
   * @param {String} url [请求的URL地址]
   * @param {Object} params [请求参数]
   */
  get<T>(url: string, params?: object): Promise<resData<T>> {
    return this.service.get(url, {
      params,
    });
  }

  post<T>(url: string, params?: object): Promise<resData<T>> {
    return this.service.post(url, params);
  }
}

export default new httpsRequest(config);
