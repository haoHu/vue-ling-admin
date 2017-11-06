import fetch from '@/utils/fetch';

/**
 * 通过用户名密码登录（接口弃用）
 * @param {String} username---改为email字段名
 * @param {String} password
 */
export function loginByUsername(username, password) {
  return fetch({
    url: '/login/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

/**
 * 通过email登录
 */
export function loginByEmail(email, password) {
  return fetch({
    url: '/login/login',
    method: 'post',
    data: {
      email,
      password
    }
  });
}

/**
 * 获取登录用户详细信息，包括role权限信息
 * @param {String} token
 */
export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

/**
 * 登出操作
 */
export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

/**
 * 重置登录密码
 * @param {Object} params
 * params = { email }
 */
export function resetpwd(params) {
  const { email, captcha, password } = params;
  return fetch({
    url: '/reset/pwd',
    method: 'post',
    data: {
      email,
      captcha,
      password
    }
  });
}

export function sendCaptchaEmail(params) {
  return fetch({
    url: '/captcha',
    method: 'post',
    data: params
  });
}
