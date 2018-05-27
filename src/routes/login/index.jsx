import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Form, Input, Icon, Row, Col, Button, Checkbox, Alert } from 'antd';
import { inject, observer } from 'mobx-react';

import styles from './login.less';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const LOGIN_TYPE = {
  ACCOUNT: 'account',
  MOBILE: 'mobile',
};

@inject('userStore')
@withRouter
@observer
class Login extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func,
    }).isRequired,
    userStore: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      autoLogin: false,
      loginType: LOGIN_TYPE.ACCOUNT,
      count: 0,
      loginError: undefined,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  beginCountdown = (callback) => {
    this.setState(prevState => ({ remainTime: prevState.remainTime - 1 }), callback);
  }

  handleChangeAutoLogin = () => {
    this.setState(prevState => ({ autoLogin: !prevState.autoLogin }));
  }

  handleChangeLoginType = (activeKey) => {
    this.setState({ loginType: activeKey });
  }

  handleGetCaptcha = () => {
    let count = 59;

    this.timer = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);

    this.setState({ count });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { loginType } = this.state;
    const { form: { validateFields }, userStore, history } = this.props;
    const valiateFieldNames = [];

    if (loginType === LOGIN_TYPE.ACCOUNT) {
      valiateFieldNames.push('username', 'password');
    } else {
      valiateFieldNames.push('mobile', 'captcha');
    }


    validateFields(valiateFieldNames, { force: true }, (errors, values) => {
      if (!errors) {
        userStore.login(Object.assign({}, values, { type: loginType })).then((result) => {
          if (result) {
            history.replace('/dashboard');
          } else {
            this.setState({ loginError: true });
          }
        });
      }
    });
  }

  renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const {
      autoLogin, loginType, count, loginError,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Tabs defaultActiveKey={loginType} onChange={this.handleChangeLoginType} animated={false}>
          <TabPane tab="账号密码登录" key={LOGIN_TYPE.ACCOUNT}>
            {loginError && (loginType === LOGIN_TYPE.ACCOUNT) && this.renderMessage('账户或密码错误（admin/888888）')}
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '请输入用户名！',
                }],
              })(<Input
                placeholder="admin/user"
                prefix={<Icon type="user" className={styles['prefix-icon']} />}
                size="large"
              />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码！',
                }],
              })(<Input
                placeholder="888888/123456"
                prefix={<Icon type="lock" className={styles['prefix-icon']} />}
                type="password"
                size="large"
              />)}
            </FormItem>
          </TabPane>
          <TabPane tab="手机号登录" key={LOGIN_TYPE.MOBILE}>
            {loginError && (loginType === LOGIN_TYPE.MOBILE) && this.renderMessage('验证码错误！')}
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [{
                  required: true,
                  message: '请输入手机号！',
                }, {
                  pattern: /^(13[0-9]|14[56789]|15[012356789]|16[56]|17[01345678]|18[0-9]|19[89])[0-9]{8}$/,
                  message: '请输入正确的手机号！',
                }],
              })(<Input
                placeholder="mobile number"
                prefix={<Icon type="mobile" className={styles['prefix-icon']} />}
                size="large"
              />)}
            </FormItem>
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  <FormItem>
                    {getFieldDecorator('captcha', {
                      rules: [{
                        required: true,
                        message: '请输入验证码！',
                      }],
                    })(<Input
                      placeholder="captcha"
                      prefix={<Icon type="mail" className={styles['prefix-icon']} />}
                      type="password"
                      size="large"
                    />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <Button
                    size="large"
                    disabled={count}
                    className={styles.getCaptcha}
                    onClick={this.handleGetCaptcha}
                  >{count ? `${count} 秒` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          </TabPane>
        </Tabs>
        <div>
          <Checkbox checked={autoLogin} onChange={this.handleChangeAutoLogin}>自动登录</Checkbox>
          <Link to="/forgot-password" className={styles['forgot-password']}>忘记密码</Link>
        </div>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.submit} size="large">登录</Button>
        </FormItem>
        <div>
          其他登录的方式
          <Icon type="alipay-circle" className={styles.icon} />
          <Icon type="taobao-circle" className={styles.icon} />
          <Icon type="weibo-circle" className={styles.icon} />
          <Link to="register" className={styles.register}>注册账户</Link>
        </div>
      </Form>
    );
  }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;