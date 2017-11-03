<template>
  <section class="login-main">
    <div class="login-header">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content">
            <div class="logo">
              <router-link to="/">Ling</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="4" :offset="16">
          <div class="grid-content">
            <login-menu></login-menu>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="login-body">
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </div>

  </section>
</template>

<script>
import {} from 'vue';
import LoginMenu from '@/components/LoginMenu';
export default {
  name: 'LoginMain',
  components: {
    LoginMenu
  },
  data() {
    return {
      activeIndex: 1
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
    },
    selectItem(key, keyPath) {
      // TODO 跳转路由
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped rel="stylesheet/less" >
@headerBg: #eef1f6;
@headerHeight: 60px;
.login-main {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;

  .login-header {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100vw;
    height: @headerHeight;
    background-color: @headerBg;

    .logo > a {
      font-size: 2em;
      display: block;
      padding: 10px 20px;
      line-height: 1.5;
      vertical-align: middle;
      text-decoration: none;
      color: #111;
    }
  }
}
</style>

