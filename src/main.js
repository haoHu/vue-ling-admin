import Vue from 'vue';
// 引入element-ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
// 引入App.vue
import App from './App';
import router from './router';
import store from './store';
// 全局filter
import * as filters from './filters';
// 加载icon 并分离打包
import '@/icons';
// error log
import './errorLog';
// 加载权限判断
import '@/permission';
// 该项目所有请求接口使用mockjs模拟
import './mock';

Vue.use(ElementUI, { locale });

// 注册全局的filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
