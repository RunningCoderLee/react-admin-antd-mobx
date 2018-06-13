import { formatter } from './menu';

describe('test format menu data', () => {
  describe('test primary menu', () => {
    it('test only one primary menu', () => {
      const menuData = [{
        name: '普通测试页',
        icon: 'star-o',
        path: 'test-basic',
        authority: 'admin',
      }];

      expect(formatter(menuData)).toEqual([{
        name: '普通测试页',
        icon: 'star-o',
        path: '/test-basic',
        authority: 'admin',
      }]);
    });

    it('test several primary menus', () => {
      const menuData = [{
        name: '普通测试页',
        icon: 'star-o',
        path: '/test-basic',
      }, {
        name: '高级测试页',
        icon: 'star',
        path: 'test-advance',
        authority: 'admin',
      }];

      expect(formatter(menuData)).toEqual([{
        name: '普通测试页',
        icon: 'star-o',
        path: '/test-basic',
        authority: undefined,
      }, {
        name: '高级测试页',
        icon: 'star',
        path: '/test-advance',
        authority: 'admin',
      }]);
    });
  });

  describe('test secondary menu', () => {
    it('test only one secondary menu', () => {
      const menuData = [{
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        authority: 'user',
        children: [
          {
            name: '分析页',
            path: 'analysis',
          },
          {
            name: '监控页',
            path: 'monitor',
          },
          {
            name: '工作台',
            path: 'workplace',
            authority: 'admin',
          },
        ],
      }];

      expect(formatter(menuData)).toEqual([{
        name: 'dashboard',
        icon: 'dashboard',
        path: '/dashboard',
        authority: 'user',
        children: [
          {
            name: '分析页',
            path: '/dashboard/analysis',
            authority: 'user',
          },
          {
            name: '监控页',
            path: '/dashboard/monitor',
            authority: 'user',
          },
          {
            name: '工作台',
            path: '/dashboard/workplace',
            authority: 'admin',
          },
        ],
      }]);
    });
  });

  describe('test tertiary menu', () => {
    const menuData = [{
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
          authority: 'user',
        },
        {
          name: '卡片列表',
          path: 'card-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
              authority: 'admin',
            },
            {
              name: '搜索列表（应用）',
              path: 'applications',
            },
          ],
        },
      ],
    }];

    expect(formatter(menuData)).toEqual([{
      name: '列表页',
      icon: 'table',
      path: '/list',
      authority: undefined,
      children: [
        {
          name: '查询表格',
          path: '/list/table-list',
          authority: undefined,
        },
        {
          name: '标准列表',
          path: '/list/basic-list',
          authority: 'user',
        },
        {
          name: '卡片列表',
          path: '/list/card-list',
          authority: undefined,
        },
        {
          name: '搜索列表',
          path: '/list/search',
          authority: undefined,
          children: [
            {
              name: '搜索列表（文章）',
              path: '/list/search/articles',
              authority: undefined,
            },
            {
              name: '搜索列表（项目）',
              path: '/list/search/projects',
              authority: 'admin',
            },
            {
              name: '搜索列表（应用）',
              path: '/list/search/applications',
              authority: undefined,
            },
          ],
        },
      ],
    }]);
  });
});
