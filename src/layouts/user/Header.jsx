import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import styles from './Header.less';

const Header = () => (
  <header className={styles.container}>
    <Link to="/">
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className={styles.title}>Ant Design</h1>
      <div className={styles.subtitle}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </Link>
  </header>
);

export default Header;
