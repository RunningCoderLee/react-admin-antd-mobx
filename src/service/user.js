import request from '~/utils/request';

export async function requestLogin(params) {
  return request.post('/api/user/login', params);
}

export async function requestRegister(params) {
  return request.post('/api/user/register', params);
}

export async function getCurrentUserInfo(params) {
  return request('api/auth/userInfo', params);
}
