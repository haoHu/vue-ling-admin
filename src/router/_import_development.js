// vue-loader at least v13.0.0+
module.exports = file => require('@/views/' + file + '.vue').default;
// 开发模式下不使用webpack lazy loading，所以可以直接使用require加载依赖模块
