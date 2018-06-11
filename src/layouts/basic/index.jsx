import React, { Component } from 'react';
import { Layout, Button } from 'antd';

import SiderMenu from './siderMenu';

import styles from './basicLayout.less';

const {
  Header, Content, Footer,
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
        />
        <Layout className={styles.main} style={mainStyle}>
          <Header />
          <Content>
            <div>
              <Button onClick={this.handleCollapse}>收起菜单</Button>
            ..
              <br />
          Really
              <br />...<br />...<br />...<br />
          long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
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
