import React, { Component } from 'react';
import { Layout } from 'antd';

import menuData from '~/common/menu';
import GlobalHeader from '~/components/globalHeader';
import SiderMenu from './siderMenu';

import styles from './basicLayout.less';

const {
  Content, Footer,
} = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleCollapse = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const { collapsed } = this.state;

    const mainStyle = { paddingLeft: collapsed ? 80 : 256 };

    return (
      <Layout className={styles.container}>
        <SiderMenu
          collapsed={collapsed}
          onCollapse={this.handleCollapse}
          width={256}
          data={menuData}
        />
        <Layout className={styles.main} style={mainStyle}>
          <GlobalHeader
            collapsed={collapsed}
            onCollapse={this.handleCollapse}
          />
          <Content className={styles.content}>
            <div>
            ..
              <br />
          Really
              <br />...<br />...<br />...<br />
          long
              {/* <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br /> */}
          content
            </div>
          </Content>
          <Footer>
            footer
          </Footer>
        </Layout>

      </Layout>
    );
  }
}

export default BasicLayout;
