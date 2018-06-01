/* eslint-disable no-console */
import axios from 'axios';
import { notification } from 'antd';
import history from '~/utils/history';
import { loadToken } from './token';

const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const request = axios.create({
  // baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const token = loadToken();
  if (token) {
    return Object.assign({}, config, { headers: { authentication: token } });
  }

  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
});

request.interceptors.response.use(
  response => response,
  (error) => {
    console.error(error);
    const { response } = error;
    if ((response.status === 404) || (response.status === 500)) {
      return history.replace(`/${response.status}`);
    }

    const errorText = CODE_MESSAGE[response.status];
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errorText,
    });

    const err = new Error(errorText);
    err.name = response.status;
    err.response = response;
    return Promise.reject(err);
  },
);

export default request;
