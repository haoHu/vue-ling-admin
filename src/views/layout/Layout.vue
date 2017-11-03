<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  }
};
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "../../styles/mixins/mixins.less";
  @expandSideBarWidth: 1.8rem;
  @hideSidebarWidth : 0.36rem;
  @navbarHeight: 0.5rem;

  .app-wrapper {
    .clearfix();
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar-container {
        width: @hideSidebarWidth;
        overflow: inherit;
      }
      .main-container {
        margin-left: @hideSidebarWidth;

        .navbar {
          left: @hideSidebarWidth;
        }
      }
    }
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: @expandSideBarWidth;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      // &::-webkit-scrollbar {display: none}
      .scrollBar();
    }
    .main-container {
      .relative();
      min-height: 100%;
      padding-top: @navbarHeight;
      transition: margin-left 0.28s ease-out;
      margin-left: @expandSideBarWidth;
      .navbar {
        position: fixed;
        top: 0;
        left: @expandSideBarWidth;
        right: 0;
      }
    }
  }
</style>

