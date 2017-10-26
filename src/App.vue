<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  // normalize.css 原生样式重置
  @import '~normalize.css/normalize.css';
  // 全局样式
  @import './styles/index.less';
</style>

