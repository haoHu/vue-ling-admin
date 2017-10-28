import Mock from 'mockjs';
import loginAPI from './login';

Mock.setup({
  timeout: '350-600'
});

// 登录接口
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);

export default Mock;
