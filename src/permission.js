/**
 * 针对vue-router实例的处理，根据登录用户权限，需要加载不同的路由
 * 流程是在路由渲染前：
 * 1. 判断是否登录，如果未登录重定向到登录页面
 * 2. 如果已经登录，判断是否获取当前玩用户信息，如果未获取，需要先获取用户信息
 * 3. 生成该用户可以访问的路由表
 * 4. 判断当前页面是否有可以访问的权限，没有重定向401
 */

import router from './router';
import store from './store';
// Progress进度条控件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 从cookie中获取token
import { getToken } from '@/utils/auth';
import { hasPermission } from '@/utils/index';

// function genDynamicRouterMap(store, to, from, next) {
//   store.dispatch('GetUserInfo').then((res) => {
//     const roles = res.data.role;
//     // 生成可访问的路由表
//     store.dispatch('GenerateRoutes', { roles }).then(() => {
//       // 动态添加可访问路由
//       router.addRoutes(store.getters.addRoutes);
//       // hack,确保addRoutes文成
//       next({ ...to });
//     });
//   }).catch(() => {
//     // 重新定向到登录页面
//     store.dispatch('FedLogOut').then(() => {
//       next({ path: '/login' });
//     });
//   });
// }

// 免登陆白名单
const WhiteList = ['/login', 'authredirect'];
router.beforeEach((to, from, next) => {
  // 开启progress
  NProgress.start();
  if (getToken()) {
    // 用户已登录，含有token
    if (to.path === '/login') {
      next({ path: '/' });
      // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      NProgress.done();
    } else {
      // 判断当前登录用户是否获得用户信息
      if (store.getters.roles.length === 0) {
        // 需要拉取用户信息，用于生成路由表
        // genDynamicRouterMap(store, to, from, next);
        store.dispatch('GetUserInfo').then((res) => {
          const roles = res.data.role;
          // 生成可访问的路由表
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 动态添加可访问路由
            router.addRoutes(store.getters.addRouters);
            // hack,确保addRoutes文成
            next({ ...to });
          });
        }).catch(() => {
          // 重新定向到登录页面
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' });
          });
        });
      } else {
        // 根据用户权限信息，判断目标路由是否有权访问，如果无权重定向401
        // 如果有权限，并且没有动态改变权限的需求，则直接加载目标路由
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next();
        } else {
          next({ path: '/401', query: { noGoBak: true }});
          // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录
    if (WhiteList.indexOf(to.path) !== -1) {
      // 目标路由在免登陆白名单中，直接定向路由
      next();
    } else {
      next('/login');
      // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      NProgress.done();
    }
  }
});

router.afterEach(route => {
  // 结束Progress
  NProgress.done();
});

// import router from './router';
// import store from './store';
// // Progress进度条
// import NProgress from 'nprogress';
// // Progress进度条样式
// import 'nprogress/nprogress.css';
// // 校验权限
// import { getToken } from '@/utils/auth';
// // 不重定向白名单
// const whiteList = ['/login'];
// router.beforeEach((to, from, next) => {
//   // 进度条开始
//   NProgress.start();
//   // 通过getToken判断是否登录
//   if (getToken()) {
//     // 用户已经登录
//     if (to.path === '/login') {
//       next({ path: '/' });
//     } else {
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo').then(res => {
//           console.log(res);
//           // 获取用户信息
//           next();
//         });
//       } else {
//         next();
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next('/login');
//       NProgress.done();
//     }
//   }
// });

// router.afterEach(() => {
//   // 结束进度条
//   NProgress.done();
// });
