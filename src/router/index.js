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
  { path: '/signup', component: _import('signup/index'), hidden: true },
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
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
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
    path: '/content',
    component: Layout,
    redirect: '/picture_books/idnex',
    name: '内容管理',
    // icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'picture_books/index', group: '绘本管理', component: _import('picture_books/index'), name: '绘本列表' },
      { path: 'picture_books/batch', component: _import('picture_books/batch'), name: '批量操作' },
      { path: 'picture_books/import', component: _import('picture_books/import'), name: '绘本导入' },
      { path: 'picture_books/pagetypes', group: '绘本字段', component: _import('picture_books/pagetypes'), name: '绘本页类型' },
      { path: 'picture_books/series', component: _import('picture_books/series'), name: '丛书系列' },
      { path: 'picture_books/brands', component: _import('picture_books/brands'), name: '品牌' },
      { path: 'picture_books/presses', component: _import('picture_books/presses'), name: '出版社' },
      { path: 'picture_books/authors', component: _import('picture_books/authors'), name: '作者' },
      { path: 'picture_books/tags', component: _import('picture_books/tags'), name: '绘本标签' },
      { path: 'picture_books/languages', component: _import('picture_books/languages'), name: '语言' }
    ]
  },
  {
    // 文件管理
    path: '/oss',
    component: Layout,
    redirect: '/oss/pics',
    name: '文件管理',
    // icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'pics', component: _import('oss/pics'), name: '图床资源' },
      { path: 'models', component: _import('oss/models'), name: '模型管理' },
      { path: 'audios', component: _import('oss/audios'), name: '音频管理' }
    ]
  },
  {
    // 运营管理
    path: '/op',
    component: Layout,
    redirect: '/op/banners',
    name: '运营管理',
    // icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'banners', group: 'Banner管理', component: _import('banners/index'), name: 'Banner列表' },
      { path: 'banners/snapshots', component: _import('banners/snapshots'), name: 'Banner展示列表' },
      { path: 'topics', group: '主题管理', component: _import('topics/index'), name: '绘本主题' },
      { path: 'specials', group: '专题页管理', component: _import('specials/index'), name: '专题页列表' },
      { path: 'promotions', group: '推广设置', component: _import('promotions/index'), name: '推广URL列表' },
      { path: 'news', group: '官网管理', component: _import('news/index'), name: '新闻列表' },
      { path: 'jobs', component: _import('jobs/index'), name: '招聘列表' }
    ]
  },
  {
    // 系统管理
    path: '/sys',
    component: Layout,
    redirect: '/sys/logs',
    name: '系统管理',
    // icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'logs', group: '日志', component: _import('logs/index'), name: '操作日志' },
      { path: 'rbac/profile', group: 'RBAC', component: _import('rbac/profile'), name: '个人设置' },
      { path: 'rbac/users', component: _import('rbac/users'), name: '用户列表' },
      { path: 'rbac/roles', component: _import('rbac/roles'), name: '角色列表' },
      { path: 'jobs', component: _import('jobs/index'), name: '招聘列表' },
      { path: 'sms', component: _import('sms/index'), name: '测试短信' }
    ]
  },
  {
    // 用户管理
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    name: '用户管理',
    // icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'index', component: _import('users/index'), name: '用户列表' },
      { path: 'isbn', component: _import('isbn/index'), name: 'ISBN' }
    ]
  },
  {
    // 设备管理
    path: '/devices',
    component: Layout,
    redirect: '/devices/ota/index',
    name: '设备管理',
    // icon: 'people',
    meta: { role: ['admin'] },
    children: [
      { path: 'index', group: 'OTA管理', component: _import('ota/index'), name: 'OTA列表' },
      { path: 'robots/index', group: '设备信息', component: _import('robots/index'), name: '查询设备' },
      { path: 'robots/statistics', component: _import('robots/statistics'), name: '设备统计' },
      { path: 'robots/udid', component: _import('robots/udid'), name: '少量导入' },
      { path: 'robots/import', component: _import('robots/import'), name: '批量导入' },
      { path: 'robots/inheritance', component: _import('robots/inheritance'), name: '设备固有信息' },
      { path: 'robots/variable', component: _import('robots/variable'), name: '设备可变更信息' },
      { path: 'robots/debug', component: _import('robots/debug'), name: '设备可调式信息' }

    ]
  }
];
