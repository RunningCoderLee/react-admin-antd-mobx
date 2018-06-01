import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '~/components/asyncComponent';
import Footer from './Footer';
import Header from './Header';

import styles from './userLayout.less';

const asyncLogin = asyncComponent(() => import('~/routes/login'));
const asyncRegister = asyncComponent(() => import('~/routes/register'));
const asyncRegisterResult = asyncComponent(() => import('~/routes/registerResult'));

const UserLayout = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <Switch>
        <Route path="/user/login" component={asyncLogin} />
        <Route path="/user/register" component={asyncRegister} />
        <Route path="/user/register-result" component={asyncRegisterResult} />
        <Redirect exact from="/user" to="/user/login" />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default UserLayout;
