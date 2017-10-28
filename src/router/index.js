/**
 * 定义系统的路由模块
 * 使用vue-router模块
 * 包括默认的路由和根据用户角色动态加载的路由配置
 *
 */
import Vue from 'vue';
import Router from 'vue-router';
// 针对不同环境，引入路由模块导入依赖view层文件方式的封装，
// 开发模式下直接使用require导入，生产环境使用import
const _import = require('./_import_' + process.env.NODE_ENV);
// 使用Router模块
Vue.use(Router);

// 引入真个系统布局
import Layout from '../views/layout/Layout';

/**
 * RouterMap的数据结构：
 * path: 页面路径
 * component: 页面view层入口文件
 * name: 页面名称
 * icon: sidebar中显示的图标
 * hidden: `hidden: true` 不显示在sidebar中
 * redirect: `redirect:noredirect`不重定向
 * noDropdown: `noDropdown:true` 不需要下拉菜单
 * meta: `{ role: ['admin] }` 页面的角色权限
 * 定义RouterMap常量
 */
export const constantRouterMap = [
  // 登录页面
  { path: '/login', component: _import('login/index'), hidden: true },
  // 用于第三方登录验证后的重定向
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  // 公共的异常情况页面包括404，401，500等，在这里定义
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  // dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', components: _import('dashboard/index') }]
  }
];

// 定义Router实例
export default new Router({
  // 如果服务器端支持history可开
  // mode: 'history',
  // 路由切换后默认滚动到页顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

/**
 * 动态RouterMap，涉及用户权限（meta字段）
 */
export const asyncRouterMap = [
  {
    // 内容管理板块
    path: '/content_manager',
    component: Layout,
    redirecct: '/picture_books/idnex',
    name: '绘本管理',
    icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'index', component: _import('picture_books/index'), name: '绘本列表' },
      { path: 'batch', component: _import('picture_books/batch'), name: '批量操作' },
      { path: 'import', component: _import('picture_books/import'), name: '绘本导入' }
    ]
  }
];
// import Vue from 'vue';
// import Router from 'vue-router';
// const _import = require('./_import_' + process.env.NODE_ENV);
// // 开发模式下不使用Lazy loading，因为lazy loading
// // 多个文件会导致webpack的热更新非常慢
// // 所以只在生产环境下使用lazy loading

// /* layout */
// import Layout from '../views/layout/Layout';

// Vue.use(Router);

// /**
//  * icon: sidebar中显示的图标
//  * hidden: `hidden: true` 不显示在sidebar中
//  * redirect: `redirect:noredirect`不重定向
//  * noDropdown: `noDropdown:true` 没有子菜单
//  * meta: `{ role: ['admin] }` 页面的角色权限
//  */
// export const constantRouterMap = [
//   {
//     path: '/login',
//     component: _import('login/index'),
//     hidden: true
//   },
//   {
//     path: '/404',
//     component: _import('404'),
//     hidden: true
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     name: 'Dashboard',
//     hidden: true,
//     children: [
//       {
//         path: 'dashboard',
//         component: _import('dashboard/index')
//       }
//     ]
//   },
//   // 其他所有不在RouterMap中的路由统统跳转到/404
//   {
//     path: '*',
//     redirect: '/404',
//     hidden: true
//   }
// ];

// export default new Router({
//   // 后端支持可开启
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// });
