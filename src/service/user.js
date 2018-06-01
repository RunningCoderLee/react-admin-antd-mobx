import request from '~/utils/request';

export async function requestGetUserInfo() {
  return request.get('/api/user/info');
}

export async function requestLogin(params) {
  return request.post('/api/user/login', params);
}

export async function requestRegister(params) {
  return request.post('/api/user/register', params);
}
