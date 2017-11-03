<template>
  <div class="app-wrapper login-wrapper">
    <login-main></login-main>
  </div>
</template>

<script>
import { LoginMain } from '@/views/layout';

export default {
  name: 'login',
  components: {
    LoginMain
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.login-wrapper {
  background-color: #2d3a4b;
}
</style>

