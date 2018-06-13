import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Menu } from 'antd';
import SiderMenu from './siderMenu';

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

describe('test <SiderMenu />', () => {
  it('no <MenuItem /> rendered ', () => {
    const menuData = [];

    const router = (
      <MemoryRouter
        initialEntries={[{ pathname: '/test-basic' }]}
      >
        <SiderMenu data={menuData} />
      </MemoryRouter>
    );

    expect(mount(router).find(MenuItem)).toHaveLength(0);
    expect(mount(router).find(SubMenu)).toHaveLength(0);
  });

  it('renders one <MenuItem />', () => {
    const menuData = [{
      name: '普通测试页',
      icon: 'star-o',
      path: '/test-basic',
    }];

    const router = (
      <MemoryRouter
        initialEntries={[{ pathname: '/test-basic' }]}
      >
        <SiderMenu data={menuData} />
      </MemoryRouter>
    );

    expect(mount(router).find(MenuItem)).toHaveLength(1);
    expect(mount(router).find(SubMenu)).toHaveLength(0);
  });
});

