import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// 开发模式下不使用Lazy loading，因为lazy loading
// 多个文件会导致webpack的热更新非常慢
// 所以只在生产环境下使用lazy loading

/* layout */
import Layout from '../views/layout/Layout';

Vue.use(Router);

/**
 * icon: sidebar中显示的图标
 * hidden: `hidden: true` 不显示在sidebar中
 * redirect: `redirect:noredirect`不重定向
 * noDropdown: `noDropdown:true` 没有子菜单
 * meta: `{ role: ['admin] }` 页面的角色权限
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index')
      }
    ]
  },
  // 其他所有不在RouterMap中的路由统统跳转到/404
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

export default new Router({
  // 后端支持可开启
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
