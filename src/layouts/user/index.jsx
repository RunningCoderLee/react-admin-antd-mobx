import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../../routes/login/index';
import Footer from './Footer';
import Header from './Header';

import styles from './userLayout.less';

const UserLayout = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <Switch>
        <Route path="/user/login" render={() => <Login />} />
        <Redirect exact from="/user" to="/user/login" />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default UserLayout;
