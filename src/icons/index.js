import Vue from 'vue';
// svg组件
import IconSvg from '@/components/Icon-svg';
import generateIconsView from '@/views/svg-icons/generateIconsView.js';
// 注册全局组件
Vue.component('icon-svg', IconSvg);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
const iconMap = requireAll(req);

generateIconsView.generate(iconMap);
