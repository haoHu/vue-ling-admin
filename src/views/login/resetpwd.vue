<template>
  <div>
    <el-container>
      <el-header>
    <h1>这里是重置密码页面</h1>
    </el-header>
    <el-main>
      <el-menu :default-active="activeIndex" class="login-menu" mode="horizontal" @select="selectItem">
        <el-menu-item index="1">登录</el-menu-item>
        <el-menu-item index="2">注册</el-menu-item>
      </el-menu>
    </el-main>

    </el-container>
  </div>


</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    selectItem(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
