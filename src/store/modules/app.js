/**
 * 保存APP的一些全局状态
 */
import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      // sidebar展开|收起状态
      opened: !+Cookies.get('sidebarStatus')
    },
    // 保存打开的页面状态
    visitedViews: []
  },
  mutations: {
    // 控制sidebar展开|收起
    TOGGLE_SIDEBAR: state => {
      Cookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0);
      state.sidebar.opened = !state.sidebar.opened;
    },
    // 添加打开的页面记录
    ADD_VISITED_VIEWS: (state, view) => {
      // 如果记录中有，就不用添加
      if (state.visitedViews.som(v => v.path === view.path)) return;
      state.visitedViews.push({
        name: view.name,
        path: view.path
      });
    },
    // 删除打开的页面记录
    DEL_VISITED_VIEWS: (state, view) => {
      let index;
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i;
          break;
        }
      }
      state.visitedViews.splice(index, 1);
    }

  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR');
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    }
  }
};

export default app;
