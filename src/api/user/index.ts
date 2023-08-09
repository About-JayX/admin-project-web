import request from '@/utils/request';

export const register = (params?: object) => {
  return request.post('/user/register', params);
};

export const verifyCode = (params?: object) => {
  return request.post('/mailVerify/getVerifyCode', params);
};
