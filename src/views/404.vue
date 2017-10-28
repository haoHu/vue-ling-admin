<template>
  <div class="http404">
    <div class="pic-404">
      <img :src="img_404" alt="404" />
    </div>
    <p class="msg-404">{{ message }}</p>
    <a href="/" class="home-link">返回首页</a>
  </div>
</template>

<script>
import img_404 from '@/assets/404_images/404.png';

export default {
  data() {
    return {
      img_404
    };
  },
  computed: {
    message() {
      return '此路不通...';
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.http404 {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #111;

  .pic-404 {
    display: block;
    width: 100%;
    & > img {
      display: block;
      width: 100%;
      border: 0 none;
    }
  }
  .msg-404 {
    margin: 2em auto;
    font-size: 6rem;
    text-align: center;
  }
  .home-link {
    display: inline-block;
    margin: 2em auto;
  }
}
</style>
