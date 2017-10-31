<template>
  <div class="errPage-container">
    <el-button @click="back" icon="arrow-left" class="pan-back-btn">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Ooops!</h1>
        <h2>该页面不存在</h2>
        <div class="link-type">
          <router-link to="/dashboard">回首页</router-link>
        </div>
      </el-col>
      <el-col :span="12">
        <img :src="errImg" alt="Ooops!" />>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errImg from '@/assets/404_images/404.png';

export default {
  data() {
    return {
      errImg
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBak) {
        this.$router.push({ path: '/dashboard' });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>

