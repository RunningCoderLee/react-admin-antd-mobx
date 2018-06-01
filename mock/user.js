const { createToken, verifyToken } = require('./token');

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

function register(req, res) {
  setTimeout(() => {
    res.json({
      status: 'ok',
      token: createToken(USER_TYPE.USER),
    });
  }, 1000);
}

function getUserInfo(req, res) {
  const { authentication } = req.headers;

  try {
    const decoded = verifyToken(authentication);
    const { userType } = decoded;
    let name = '';

    if (userType === USER_TYPE.ADMIN) {
      name = '管理员';
    }

    if (userType === USER_TYPE.USER) {
      name = '普通职员';
    }

    res.json({
      name,
      authority: userType,
    });
  } catch (err) {
    res.status(401);
  }
}

module.exports = {
  loginByAccount,
  loginByMobile,
  register,
  getUserInfo,
};
