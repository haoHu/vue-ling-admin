
export default {
  signup: config => {
    const { name, email, password, captcha } = JSON.parse(config.body);
    return {
      errno: 0,
      errmsg: `注册成功:${name}, ${email}, ${password}, ${captcha}`
    };
  }
};
