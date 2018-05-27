const { createToken } = require('./token');

const USER_TYPE = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

function loginByAccount(req, res) {
  const { username, password } = req.body;

  if ((username === 'admin') && (password === '888888')) {
    res.json({
      status: 'ok',
      token: createToken(USER_TYPE.ADMIN),
    });
    return;
  }

  if ((username === 'user') && (password === '123456')) {
    res.json({
      status: 'ok',
      token: createToken(USER_TYPE.USER),
    });
    return;
  }

  res.json({
    status: 'error',
    message: '用户名或密码错误！',
  });
}

function loginByMobile(req, res) {
  res.json({
    status: 'error',
    message: '验证码错误！',
  });
}

// function register(params) {
//   console.log(params);
// }
const user = {
  loginByAccount,
  loginByMobile,
};


module.exports = user;
