import { asyncRouterMap, constantRouterMap } from '@/router';
console.log(asyncRouterMap);
console.log(constantRouterMap);

function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some(permission => route.meta.permissions.indexOf(permission) >= 0);
  } else {
    return true;
  }
}

/**
 * 判断是否有权限
 * @param {Array} roles
 * @param {Object} route
 */
// function hasPermissionByRoles(roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0);
//   } else {
//     return true;
//   }
// }

/**
 * 递归过滤异步路由表， 返回符合用户角色权限的路由表
 * @param {Array} asyncRouterMap
 * @param {Array} roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermissionByRoles(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles);
//       }
//       return true;
//     }
//     return false;
//   });
//   return accessedRouters;
// }

/**
 * 递归过滤异步路由表，返回符合用户permissions权限的路由表
 * @param {Array} asyncRouterMap
 * @param {Array} permissions
 */
function filterAsyncRouterByPermissions(asyncRouterMap, permissions) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouterByPermissions(route.children, permissions);
        if (route.children.length === 0) {
          return false;
        }
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    rotuers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles, permissions } = data;
        let accessedRouters;
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
          accessedRouters = filterAsyncRouterByPermissions(asyncRouterMap, permissions);
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
