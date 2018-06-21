import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Tooltip } from 'antd';

import HeaderSearch from '~/components/headerSearch';
import NoticeIcon from '~/components/noticeIcon';

import styles from './globalHeader.less';

const { Header } = Layout;

const searchList = [
  '搜索提示一',
  '搜索提示二',
  '搜索提示三',
];

class GlobalHeader extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
  }

  static defaultProps = {
    collapsed: false,
    onCollapse: () => {},
  }

  handleCollapse = () => this.props.onCollapse(!this.props.collapsed)

  handlePressEnter = (val) => {
    console.log('press enter: ', val); // eslint-disable-line
  }

  handleSearch = (val) => {
    console.log('search: ', val) // eslint-disable-line
  }

  render() {
    const { collapsed } = this.props;

    return (
      <Header className={styles.container}>
        <button className={`${styles.action} ${styles['menu-trigger']}`} onClick={this.handleCollapse}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </button>
        <div className={styles['action-bar']}>
          <HeaderSearch
            className={styles.action}
            placeholder="站内搜索"
            dataSource={searchList}
            onSearch={this.handleSearch}
            onPressEnter={this.handlePressEnter}
          />
          <Tooltip title="使用文档">
            <a
              className={`${styles.action} ${styles.document}`}
              target="_blank"
              href="https://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon className={styles.action} />
        </div>
      </Header>
    );
  }
}

export default GlobalHeader;
