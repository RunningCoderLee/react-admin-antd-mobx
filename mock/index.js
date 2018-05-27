import Mock from 'mockjs';
// import { loginByMobile, loginByAccount } from './user';

Mock.setup({
  timeout: '10-1000',
});

// Mock.mock('/api/user/login', 'post', (options) => {
//   const body = JSON.parse(options.body);

//   if (body.type === 'mobile') {
//     return loginByMobile(body.mobile, body.captcha);
//   }

//   if (body.type === 'account') {
//     return loginByAccount(body.username, body.password);
//   }

//   return {
//     code: 400,
//     data: {},
//     message: '请求参数错误！',
//   };
// });
