import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.less';

const Footer = () => (
  <footer className={styles.container} >
    <div className={styles.links} >
      <Link to="/">帮助</Link>
      <Link to="/">隐私</Link>
      <Link to="/">条款</Link>
    </div>
    <div className={styles.copyright}>Copyright &copy; 2018 kevin Lee</div>
  </footer>
);


export default Footer;
