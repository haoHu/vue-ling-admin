import fetch from '@/utils/fetch';

/**
 * 注册接口
 * @param {Object} params 注册表单参数
 * params = {_token, name, email, captcha, password}
 */
export function signup(params) {
  const { _token = '', name = '', email = '', captcha = '', password = '' } = params;
  return fetch({
    url: '/signup',
    method: 'post',
    data: {
      _token,
      name,
      email,
      captcha,
      password
    }
  });
}

/**
 * 获取注册验证码
 * @param {String} email
 */
export function getCaptccha(email) {
  return fetch({
    url: '/captcha',
    method: 'post',
    data: {
      email
    }
  });
}
