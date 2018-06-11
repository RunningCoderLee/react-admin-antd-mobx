import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import menuData from '~/common/menu';
import logo from '~/assets/logo.svg';
import Authorization from '~/components/authorization';

import styles from './siderMenu.less';

const { Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;
const { check } = Authorization;

function getOpenKeys(menuKeys, paths) {
  return paths
    .reduce((openKeys, path) =>
      [...openKeys, ...menuKeys.filter(key => pathToRegexp(key).test(path))], []);
}

/**
 * 转换url地址为数组形式
 * '/aaa/bbb/ccc' => ['/aaa', '/aaa/bbb', '/aaa/bbb/ccc']
 *
 * @param {URL} url
 * @reurns
 */
export function convertUrlToArray(url) {
  const urlArray = url.split('/');
  return urlArray.map((item, index, array) => array.slice(0, index + 1).join('/')).slice(1);
}


export function getFlatMenuKeys(menu) {
  return menu.reduce((keys, menuItem) => {
    keys.push(menuItem.path);
    if (menuItem.children) {
      return [...keys, ...getFlatMenuKeys(menuItem.children)];
    }

    return keys;
  }, []);
}


@withRouter
class SiderMenu extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    width: PropTypes.number,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    onCollapse: PropTypes.func,
  }

  static defaultProps = {
    collapsed: false,
    onCollapse: undefined,
    width: 200,
  }

  constructor(props) {
    super(props);
    this.menuKeys = getFlatMenuKeys(menuData);
    const { location: { pathname } } = props;

    this.state = {
      openKeys: getOpenKeys(this.menuKeys, convertUrlToArray(pathname)),
    };
  }

  isMainMenu = key => menuData.some(item => key && (item.path === key))

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(key => this.isMainMenu(key)).length > 1;

    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : openKeys,
    });
  }

  renderMenuItemTitle = (item) => {
    if (!item.icon) {
      return <span>{item.name}</span>;
    }

    return (
      <Fragment>
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </Fragment>
    );
  }

  renderMenuItemTitleWithLink = item => (
    <Link
      to={item.path}
      replace={item.path === this.props.location.pathname}
    >
      {this.renderMenuItemTitle(item)}
    </Link>
  )

  renderSubMenuOrMenuItem = (data) => {
    const { children } = data;
    const hasValidChildren = Array.isArray(children)
      && (children.some(child => child.name));

    if (hasValidChildren) {
      const menuItems = this.renderMenuItems(children);

      return (menuItems.length > 0) ? (
        <SubMenu
          key={data.path}
          title={this.renderMenuItemTitle(data)}
        >
          {menuItems}
        </SubMenu>
      ) : null;
    }

    return (
      <MenuItem key={data.path}>
        {this.renderMenuItemTitleWithLink(data)}
      </MenuItem>
    );
  }

  renderMenuItems = (data) => {
    if (!data) {
      return [];
    }

    return data
      .filter(item => item.name)
      .map((item) => {
        const itemDom = this.renderSubMenuOrMenuItem(item);
        return check(item.authority, itemDom);
      })
      .filter(item => item);
  };

  render() {
    const {
      collapsed, onCollapse, width, location: { pathname },
    } = this.props;
    const { openKeys } = this.state;

    return (
      <Sider
        collapsible
        collapsed={collapsed}
        className={styles.container}
        onCollapse={onCollapse}
        width={width}
        trigger={null}
      >
        <div className={styles.logo} >
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu
          className={styles.menu}
          openKeys={openKeys}
          onOpenChange={this.handleOpenChange}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
        >
          {this.renderMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;
