<template>
  <div class="signup-container">
    <el-form autoComplete="off" :model="formModel" :rules="formRules" ref="signupForm" label-position="right" label-width="100px" class="signup-form">
      <h3 class="title">注册</h3>
      <el-form-item label="用户名">
        <el-input name="name" type="text" v-model="formModel.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input name="email" type="text" v-model="formModel.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-col :span="16">
          <el-input name="captcha" type="text" v-model="formModel.captcha" placeholder="验证码"></el-input>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="7">
          <el-button>获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-input name="password" type="password" v-model="formModel.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input name="password_confirm" type="password" v-model="formModel.password_confirm" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleSignup">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidEmail, isvalidUsername, isEmptyStr } from '@/utils/validate';

const validateName = (rule, value, callback) => {
  if (!isvalidUsername(value)) {
    callback(new Error('请填写正确格式用户名'));
  } else {
    callback();
  }
};
const validateEmail = (rule, value, callback) => {
  if (!isvalidEmail(value)) {
    callback(new Error('请填写正确格式邮箱'));
  } else {
    callback();
  }
};
const validateCaptcha = (rule, value, callback) => {
  if (isEmptyStr()) {
    callback(new Error('请填写校验码'));
  } else {
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (isEmptyStr()) {
    callback(new Error('请填写密码'));
  } else {
    callback();
  }
};
const validatePassConfirm = (rule, value, callback) => {
  if (value !== this.password) {
    callback(new Error('两次填写密码不一致，请检查'));
  } else {
    callback();
  }
};

const FormRules = {
  name: [{ required: true, rigger: 'blur', validator: validateName }],
  email: [{ required: true, trigger: 'blur', validator: validateEmail }],
  captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }],
  password: [{ required: true, trigger: 'blur', validator: validatePass }],
  password_confirm: [{ required: true, trigger: 'blur', validator: validatePassConfirm }]
};

export default {
  name: 'signup',
  data() {
    return {
      formModel: {
        name: '',
        email: '',
        captcha: '',
        password: '',
        password_confirm: ''
      },
      formRules: FormRules,
      loading: false
    };
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../styles/mixins/mixins.less";

@dark_gray: #889aa4;
@light_gray: #eee;
.signup-container {
  .relative();
  width: 100vw;

  .signup-form {
    .relative();
    width: 30vw;
    margin: 0 auto;
    > .title {
      margin: 0.5rem auto 0.1rem;
      font-size: 0.3rem;
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
    height: 0.47rem;

  }
  .el-input {
    display: inline-block;
    width: 100%;
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
    // border: 1px solid rgba(255, 255, 255, 0.1);
    border: 0;
    // background: rgba(0, 0, 0, 0.1);
    background: transparent;
    border-radius: 5px;
    color:#fff!important;
    > label {
      color: #fff!important;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
  }
}
</style>

