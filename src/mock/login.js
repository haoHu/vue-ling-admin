import { param2Obj } from '@/utils';

/**
 * 定义ajax api response数据结构
 * {errno, errmsg, data}
 *
 * @errno: 0:ok;
 * @errmsg: '错误信息'
 * @data: Object
 */

const userMap = {
  admin: {
    code: 20000,
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    code: 20000,
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  developer: {
    code: 20000,
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '工程师小王'
  }
};

// const userMap = {
//   'admin@ling.ai': {
//     errno: 0,
//     role: ['admin']
//   }
// }

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },

  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('error');
    }
  },
  logout: () => {
    return {
      code: 20000,
      message: 'success'
    };
  }
};
