<template>
  <section class="login-main">
    <!-- <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="login-menu" mode="horizontal" @select="selectItem">
          <el-menu-item index="1">登录</el-menu-item>
          <el-menu-item index="2">注册</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </el-main>
    </el-container> -->
    <el-container>
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </el-container>

  </section>
</template>

<script>
import {} from 'vue';
export default {
  name: 'LoginMain',
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
