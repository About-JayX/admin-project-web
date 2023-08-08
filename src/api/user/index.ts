import request from '@/utils/request';

export const register = (params?: object) => {
  return request.post('/user/register'), params;
};
