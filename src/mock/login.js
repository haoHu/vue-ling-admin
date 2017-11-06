const _ = require('lodash');
import { param2Obj } from '@/utils';

const ALLPERMISSIONS = [
  'picture-books-create', 'picture-books-read',
  'picture-books-update', 'picture-books-delete',
  'promotions-create', 'promotions-read',
  'promotions-update', 'promotions-delete',
  'home-create', 'home-read', 'home-update',
  'home-delete', 'robots-create', 'robots-read',
  'robots-update', 'robots-delete', 'packages-create',
  'packages-read', 'packages-update', 'packages-delete',
  'users-create', 'users-read', 'users-update', 'users-delete',
  'operations-create', 'operations-read', 'operations-update',
  'operations-delete', 'upload-oss-create', 'upload-oss-read',
  'upload-oss-update', 'upload-oss-delete',
  'picture-books-topic-create', 'picture-books-topic-read',
  'picture-books-topic-update', 'picture-books-topic-delete',
  'users-download', 'users-scan-isbn', 'banners-create',
  'banners-read', 'banners-update', 'banners-delete',
  'robots-statistics'
];
// 管理员权限
const AdminPermissions = ALLPERMISSIONS;
const ConetntOPPermissions = ALLPERMISSIONS.slice(0, 4);
const MarketOPPermissions = ALLPERMISSIONS.slice(16, 24);
const CustomOPPermissions = ALLPERMISSIONS.slice(20, 24);
const DevelopOPPermissions = ALLPERMISSIONS;
const ProductOPPermissions = ALLPERMISSIONS;
const AllUserRoles = [
  ['admin', AdminPermissions],
  ['content-operation', ConetntOPPermissions],
  ['market-operation', MarketOPPermissions],
  ['custom-service', CustomOPPermissions],
  ['develop', DevelopOPPermissions],
  ['product-operation', ProductOPPermissions]
];

function genUserMaps() {
  const ret = {};
  _.forEach(AllUserRoles, (roleSet, i) => {
    const role = roleSet[0];
    const permissions = roleSet[1];
    const email = role + '@ling.ai';
    ret[email] = {
      errno: 0,
      errmsg: 'success',
      data: {
        token: email,
        name: role,
        introduction: 'this is ' + role,
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        role: [role],
        permissions: permissions
      }
    };
  });
  console.log(`mock usermap:`);
  console.log(ret);
  return ret;
}

const userMap = genUserMaps();
/**
 * 定义ajax api response数据结构
 * {errno, errmsg, data}
 *
 * @errno: 0:ok;
 * @errmsg: '错误信息'
 * @data: Object
 */

// const userMap = {
//   admin: {
//     code: 20000,
//     role: ['admin'],
//     token: 'admin',
//     introduction: '我是超级管理员',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   editor: {
//     code: 20000,
//     role: ['editor'],
//     token: 'editor',
//     introduction: '我是编辑',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   },
//   developer: {
//     code: 20000,
//     role: ['develop'],
//     token: 'develop',
//     introduction: '我是开发',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: '工程师小王'
//   }
// };

// const userMap = {
//   'admin@ling.ai': {
//     errno: 0,
//     role: ['admin']
//   }
// }

export default {
  loginByEmail: config => {
    const { email } = JSON.parse(config.body);
    return userMap[email];
  },
  // loginByUsername: config => {
  //   const { username } = JSON.parse(config.body);
  //   return userMap[username];
  // },

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
      errno: 0,
      errmsg: 'success'
    };
  },
  resetPwd: config => {
    const { email } = JSON.parse(config.body);
    return {
      errno: 0,
      errmsg: `已经把重置密码连接发送到邮箱:${email}`
    };
  },
  captchaEmail: config => {
    const { email } = JSON.parse(config.body);
    return {
      errno: 0,
      errmsg: '验证码已经发送到你的邮箱' + email + '，请查收'
    };
  }

};
