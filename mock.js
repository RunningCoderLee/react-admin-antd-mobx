const { loginByMobile, loginByAccount } = require('./mock/user');

const proxy = {
  'GET /api/user': {
    id: 1,
    username: 'kenny',
    sex: 6,
  },
  'GET /api/user/list': [
    {
      id: 1,
      username: 'kenny',
      sex: 6,
    }, {
      id: 2,
      username: 'kenny',
      sex: 6,
    },
  ],
  'POST /api/user/login': (req, res) => {
    const { body } = req;

    if (body.type === 'mobile') {
      loginByMobile(req, res);
      return;
    }

    if (body.type === 'account') {
      loginByAccount(req, res);
      return;
    }

    res.status(400).json({});
  },
  'DELETE /api/user/:id': (req, res) => {
    console.log('---->', req.body);
    console.log('---->', req.params.id);
    res.send({ status: 'ok', message: '删除成功！' });
  },
};

module.exports = proxy;
