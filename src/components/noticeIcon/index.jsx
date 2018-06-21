import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, Icon, Badge } from 'antd';

import styles from './noticeIcon.less';

class NoticeIcon extends Component {
  static propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    count: 0,
    className: undefined,
  }

  handleClick = () => {}

  render() {
    const { count, className } = this.props;

    return (
      <Popover>
        <button onClick={this.handleClick} className={className}>
          <Badge count={count} className={styles.badge}>
            <Icon type="bell" />
          </Badge>
        </button>
      </Popover>
    );
  }
}

export default NoticeIcon;
