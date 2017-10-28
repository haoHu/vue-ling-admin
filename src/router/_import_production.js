module.exports = file => () => import('@/views/' + file + '.vue');
// 生产环境下要使用webpack lazy loading 方式，所以需要使用import加载依赖模块
