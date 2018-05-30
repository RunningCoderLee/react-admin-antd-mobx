import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Result from '~/components/result/index';
import styles from './registerResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button size="large" type="primary">
        查看邮箱
      </Button>
    </Link>
    <Link to="/">
      <Button size="large">返回首页</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        你的账户：{location.state ? location.state.account : 'AntDesign@example.com'} 注册成功
      </div>
    }
    description="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
    actions={actions}
  />
);

RegisterResult.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default RegisterResult;
