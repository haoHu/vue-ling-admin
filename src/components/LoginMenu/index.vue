<template>
  <div class="login-menu">
    <el-menu :default-active="activeIndex" class="login-menu" mode="horizontal" >
      <el-menu-item v-for="(btn, index) in MenuBtns" :key="btn.path" :index="index.toString()">
        <router-link :to="btn.path">{{btn.name}}</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
const MenuBtns = [
  { name: '登录', path: '/login/index' },
  { name: '注册', path: '/signup/index' }
];
export default {
  name: 'LoginMenu',
  created() {
    this.getLoginMenuBtns();
  },
  data() {
    return {
      activeIndex: '0',
      MenuBtns: null
    };
  },
  methods: {
    getLoginMenuBtns() {
      const matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      this.MenuBtns = MenuBtns;
      this.activeIndex = '0';
      MenuBtns.forEach((btn, i) => {
        if (btn.name === first) {
          this.activeIndex = i.toString();
          return true;
        }
      });
    }
  },
  watch: {
    $route() {
      this.getLoginMenuBtns();
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.el-menu-item {
  padding: 0;
  > a {
    display: block;
    padding: 0 0.2rem;
    text-decoration: none;
  }
}
</style>

