<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">登录系统</h3>
      <el-form-item prop="email">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮箱" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
        <!-- <span class='show-pwd' @click='showPwd'><icon-svg icon-class="yanjing" /></span> -->
        <span class="svg-container show-pwd" @click='showPwd'>
          <icon-svg :icon-class="showPwdIcon()" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>
        <router-link to="/resetpwd/index">忘记密码？</router-link>
      </div>
    </el-form>

  </div>
</template>

<script>
import { isvalidEmail } from '@/utils/validate';

export default {
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      pwdType: 'password',
      loading: false
    };
  },
  methods: {
    showPwdIcon() {
      return this.pwdType === 'password' ? 'eye' : 'yanjing';
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' });
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/mixins/mixins.less";
@loginBg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;
.login-container {
  .relative();
  height: 100vh;
  width: 100vw;
  .borderBox();
  background-color: @loginBg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 30vw;
    margin: 25vh auto;

    > .title {
      margin: 0 auto 1rem;
      font-size: 3rem;
      color: @dark_gray;
      font-weight: 700;
      text-align: center;
      vertical-align: middle;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    -webkit-appearance: none;
    border: 0;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: @light_gray;
    height: 47px;

  }
  .el-input {
    display: inline-block;
    .borderBox();
    height: 47px;
    width: 100%;
    padding-left: 30px;
  }
  .svg-container {
    position: absolute;
    top: 0;
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 20px;
    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
  }
  .tips {
    > a {
      color: @light_gray;
      text-decoration: none;
    }
  }
}
</style>

