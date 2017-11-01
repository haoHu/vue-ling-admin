import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
// @ 表示webpack resolve配置的alias
import { getToken } from '@/utils/auth';

const MessageDuration = 5 * 1000;
// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.BASE_API,
  // 请求超时时间
  timeout: 15000
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带自定义的token，根据具体情况修改
      config.headers['X_Token'] = getToken();
    }
    return config;
  },
  error => {
    // 处理请求错误
    console.log(error);
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    const code = res.errno;
    console.log(res);
    // code状态码为非0时，根据具体业务进行修改
    if (code !== 0) {
      Message({
        message: res.data,
        type: 'error',
        duration: MessageDuration
      });

      // 50008: 非法token；50012：其他客户端登录；50014：Token过期
      if (code === 50008 || code === 50012 || code === 50014) {
        MessageBox.confirm('你已经登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            // 重新实例化vue-router对象
            window.location.reload();
          });
        });
      }
      return Promise.reject('error');
    } else {
      return response;
    }
  },
  error => {
    console.log('err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: MessageDuration
    });
    return Promise.reject(error);
  }
);

export default service;
