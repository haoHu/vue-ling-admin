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
@import '../../styles/mixins/mixins.less';
@headerBg: #eef1f6;
@headerHeight: 0.6rem;
@bodyBg: #2d3a4b;
@logoSize: 0.3rem;
@logoColor: #111;
.login-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: @headerHeight 0 0 0;
  background: @bodyBg;
  overflow: auto;
  .scrollBar();
  .login-header {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    background: @headerBg;
  }
  .login-header .logo {
    display: block;
    height: @headerHeight;
    > a {
      display: block;
      padding: 0.15rem;
      font-size: @logoSize;
      color: @logoColor;
    }
  }
}


</style>

