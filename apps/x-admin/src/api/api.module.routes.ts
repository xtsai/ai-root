import { XaiModuleRouteMapType } from '@xtsai/core';

export const xaiAdminRoutes: XaiModuleRouteMapType = {
  System: {
    name: 'System',
    modulePath: 'sys',
    desc: '系统模块',
  },
  Common: {
    name: 'Common',
    modulePath: 'comm',
    desc: '公共模块',
  },
  AIBot: {
    name: 'AIBot',
    modulePath: 'ai',
    desc: '智能体管理',
  },
};
