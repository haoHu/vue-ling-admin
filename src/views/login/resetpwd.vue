<template>
  <div class="resetpwd-container">
    <el-form autoComplete="on" :model="formModel" :rules="formRules" ref="formModel" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">重置密码</h3>
      <el-form-item prop="email">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="email" />
        </span>
        <el-input name="email" type="text" v-model="formModel.email" autoComplete="on" placeholder="邮箱" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="16">
          <span class="svg-container svg-container_login">
            <icon-svg icon-class="captcha" />
          </span>
          <el-input name="captcha" type="text" v-model="formModel.captcha" placeholder="验证码"></el-input>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="7">
          <el-button @click="getCaptcha" :disabled="captchaBtn.disabled">{{captchaBtn.label}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="password" />
        </span>
        <el-input name="password" :type="pwdType" v-model="formModel.password" autoComplete="on" placeholder="密码" ></el-input>
        <span class="svg-container show-pwd" @click='showPwd'>
          <icon-svg :icon-class="showPwdIcon()" />
        </span>
      </el-form-item>
      <el-form-item prop="password_confirm">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="password-confirm" />
        </span>
        <el-input name="password_confirm" :type="pwdType" v-model="formModel.password_confirm" autoComplete="on" placeholder="确认密码" ></el-input>
        <span class="svg-container show-pwd" @click='showPwd'>
          <icon-svg :icon-class="showPwdIcon()" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleResetPwd">
          重置密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
import { isvalidEmail, isEmptyStr } from '@/utils/validate';
import { resetpwd, sendCaptchaEmail } from '@/api/login';
const OneMinuteCounter = 60;
function handleCounter() {
  if (this.captchaBtn.counter === 1) {
    clearTimeout(this.captchaBtn.timer);
    this.captchaBtn.label = '获取验证码';
    this.captchaBtn.counter = OneMinuteCounter;
    this.captchaBtn.timer = null;
    this.captchaBtn.disabled = false;
    return;
  }
  this.captchaBtn.counter--;
  this.captchaBtn.label = '获取验证码(' + this.captchaBtn.counter + 's)';
  this.captchaBtn.timer = setTimeout(handleCounter.bind(this), 1000);
}
export default {
  name: 'resetpwd',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('请填写正确格式邮箱'));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (isEmptyStr(value)) {
        callback(new Error('请填写校验码'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (isEmptyStr(value)) {
        callback(new Error('请填写密码'));
      } else {
        callback();
      }
    };
    const validatePassConfirm = (rule, value, callback) => {
      if (value !== this.formModel.password) {
        callback(new Error('两次填写密码不一致，请检查'));
      } else {
        callback();
      }
    };
    const FormRules = {
      email: [{ required: true, trigger: 'blur', validator: validateEmail }],
      captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }],
      password: [{ required: true, trigger: 'blur', validator: validatePass }],
      password_confirm: [{ required: true, trigger: 'blur', validator: validatePassConfirm }]
    };
    return {
      formModel: {
        email: '',
        captcha: '',
        password: '',
        password_confirm: ''
      },
      formRules: FormRules,
      pwdType: 'password',
      loading: false,
      captchaBtn: {
        label: '获取验证码',
        disabled: false,
        counter: OneMinuteCounter,
        timer: null
      }
    };
  },
  methods: {
    showPwdIcon() {
      return this.pwdType === 'password' ? 'show-pwd' : 'eye';
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text';
      } else {
        this.pwdType = 'password';
      }
    },
    handleResetPwd() {
      this.$refs.formModel.validate(valid => {
        if (valid) {
          this.loading = true;

          resetpwd(this.formModel).then(response => {
            const code = response.data.errno.toString();
            const msg = response.data.errmsg;
            this.loading = false;
            this.$message({
              message: msg,
              type: code === '0' ? 'success' : 'error',
              showClose: true,
              duration: 3000
            });
          }).catch((err) => {
            this.loading = false;
            console.log(err);
            // this.$message({
            //   message: err,
            //   type: 'error',
            //   showClose: true,
            //   duration: 3000
            // });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCaptcha() {
      if (isEmptyStr(this.formModel.email)) {
        this.$message({
          message: '请先输入有效邮箱',
          type: 'error',
          showClose: true,
          duration: 3000
        });
        return;
      }
      this.loading = true;
      // 屏蔽连续点击获取验证码
      this.captchaBtn.disabled = true;
      // 发送请求获取验证码
      sendCaptchaEmail(this.formModel).then(response => {
        const code = response.data.errno.toString();
        const msg = response.data.errmsg;
        this.loading = false;
        this.$message({
          message: msg,
          type: code === '0' ? 'success' : 'error',
          showClose: true,
          duration: 3000
        });
      }).catch((err) => {
        this.loading = false;
        console.log(err);
        // this.$message({
        //   message: err,
        //   type: 'error',
        //   showClose: true,
        //   duration: 3000
        // });
      });
      // 设定倒计时1分钟之后恢复可点击状态
      handleCounter.bind(this)();
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@import "../../styles/mixins/mixins.less";
@dark_gray: #889aa4;
@light_gray: #eee;
.resetpwd-container {
  .relative();
  width: 100vw;
  .login-form {
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
    padding: 0.12rem 0.05rem 0.12rem 0.15rem;
    color: @light_gray;
    height: 0.47rem;

  }
  .el-input {
    display: inline-block;
    .borderBox();
    height: 0.47rem;
    width: 100%;
    padding-left: 30px;
  }
  .svg-container {
    position: absolute;
    top: 0;
    padding: 0.06rem 0.05rem 0.06rem 0.15rem;
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

