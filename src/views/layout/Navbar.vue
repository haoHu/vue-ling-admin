<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <el-dropdown class="avatar-container" trigger="click">
      <i class="el-icon-caret-bottom"></i>
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
      </div>

      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">LogOut</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Levelbar from './Levelbar';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Levelbar,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // 重新实例化vue-routerd队形
        location.reload();
      });
    }
  }
};
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../styles/mixins/mixins.less';
  @navbarHeight: 0.5rem;
  @avatarSize: @navbarHeight;
  @dropdownIconSize: 0.2rem;
  .navbar {
    font-size: 0.12rem;
    line-height: 1;
    .hamburger-container {
      display: inline-block;
      .box-size(@navbarHeight);
      padding: 0.05rem 0.1rem;
      vertical-align: middle;
      float: left;
    }
    .avatar-container {
      position: absolute;
      right: 0.5rem;
      .box-size(@avatarSize + @dropdownIconSize, @navbarHeight);
      cursor: pointer;
      .el-icon-caret-bottom {
        position: absolute;
        top: (@navbarHeight / 2 - @dropdownIconSize / 2);
        right: 0;
        font-size: @dropdownIconSize;
      }
    }
    .avatar-wrapper {
      .relative();
      .box-size(@avatarSize);
      .user-avatar {
        display: block;
        .box-size(100%);
        border-radius: 50%;
      }

    }
  }

  // .navbar {
  //   height: 50px;
  //   line-height: 50px;
  //   border-radius: 0px !important;
  //   .hamburger-container {
  //       line-height: 58px;
  //       height: 50px;
  //       float: left;
  //       padding: 0 10px;
  //   }
  //   .errLog-container {
  //       display: inline-block;
  //       position: absolute;
  //       right: 150px;
  //   }
  //   .screenfull {
  //       position: absolute;
  //       right: 90px;
  //       top: 16px;
  //       color: red;
  //   }
  //   .avatar-container {
  //       height: 50px;
  //       display: inline-block;
  //       position: absolute;
  //       right: 35px;
  //       .avatar-wrapper {
  //           cursor: pointer;
  //           margin-top: 5px;
  //           position: relative;
  //           .user-avatar {
  //               width: 40px;
  //               height: 40px;
  //               border-radius: 10px;
  //           }
  //           .el-icon-caret-bottom {
  //               position: absolute;
  //               right: -20px;
  //               top: 25px;
  //               font-size: 12px;
  //           }
  //       }
  //   }
  // }
</style>
