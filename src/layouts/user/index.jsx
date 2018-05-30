import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '~/routes/login/index';
import Register from '~/routes/register/index';
import RegisterResult from '~/routes/registerResult/index';
import Footer from './Footer';
import Header from './Header';

import styles from './userLayout.less';

const UserLayout = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <Switch>
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/register-result" component={RegisterResult} />
        <Redirect exact from="/user" to="/user/login" />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default UserLayout;
