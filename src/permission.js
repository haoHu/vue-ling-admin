import router from './router';
import store from './store';
// Progress进度条
import NProgress from 'nprogress';
// Progress进度条样式
import 'nprogress/nprogress.css';
// 校验权限
import { getToken } from '@/utils/auth';
// 不重定向白名单
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start();
  // 通过getToken判断是否登录
  if (getToken()) {
    // 用户已经登录
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          console.log(res);
          // 获取用户信息
          next();
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 结束进度条
  NProgress.done();
});
