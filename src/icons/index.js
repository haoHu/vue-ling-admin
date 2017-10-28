import Vue from 'vue';
// svg组件
import IconSvg from '@/components/Icon-svg';

// 注册全局组件
Vue.component('icon-svg', IconSvg);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
