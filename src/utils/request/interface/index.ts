/**
 * @author Jay
 * @description 定义请求返回的数据类型
 */

export interface resData<T> {
  code: number;
  msg: string;
  data: T;
}
