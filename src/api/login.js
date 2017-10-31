import fetch from '@/utils/fetch';

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

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}
