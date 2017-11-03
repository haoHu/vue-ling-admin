<template>
  <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse" @open="handleOpen" @select="handleSelect" menu-trigger="click">
    <sidebar-item :routes="permission_routers"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('select');
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log('open');
      console.log(key, keyPath);
    }
  }
};
</script>

