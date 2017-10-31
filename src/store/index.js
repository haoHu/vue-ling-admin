/**
 * 使用Vuex保存公共的状态，
 * 最主要的就是用户信息，APP侧边栏状态，动态路由表
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
});

export default store;
