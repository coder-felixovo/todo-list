<template>
  <div class="register-page">
    <div class="head">
      <h1 class="color-main fs-28px">Todo清单</h1>
    </div>
    <div class="relative h-full">
      <div class="container">
        <div class="flex flex-col h-full pr-70px pl-70px">
          <h2 class="pt-20px pb-20px mb-10px fs-26px">欢迎注册Todo清单</h2>
          <div class="h-full">
            <form
              action="#"
              class="register-form"
            >
              <!-- 用户名 -->
              <div class="username mb-10px">
                <el-input
                  placeholder="请输入用户名"
                  ref="usernameInputRef"
                  prefix-icon="el-icon-user"
                  v-model="username"
                  clearable
                  @focus="usernameInputFocus"
                  @blur="usernameInputBlur"
                ></el-input>
                <div
                  class="pt-5px pb-5px"
                  v-show="isUsernameTipsShow"
                >
                  <i
                    :class="infoIconClass"
                    v-show="isUsernameInputFocus"
                  ></i>
                  <i
                    :class="successIconClass"
                    v-show="isValidUsername && !isUsernameInputFocus"
                  ></i>
                  <i
                    :class="errorIconClass"
                    v-show="!isValidUsername && !isUsernameInputFocus"
                  ></i>
                  <span
                    class="ml-5px fs-14px"
                    :class="{'color-success': isValidUsername, 'color-error': !isValidUsername && !isUsernameInputFocus }"
                  >{{ usernameTips }}</span>
                </div>
              </div>
              <!-- 密码 -->
              <div class="password mb-10px">
                <el-input
                  placeholder="请输入密码"
                  ref="password-input"
                  v-model="password"
                  show-password
                  prefix-icon="el-icon-key"
                  clearable
                  @focus="passwordInputFocus"
                  @blur="passwordInputBlur"
                ></el-input>
                <div
                  class="pt-5px pb-5px"
                  v-show="isPasswordTipsShow"
                >
                  <i
                    :class="infoIconClass"
                    v-show="isPasswordInputFocus"
                  ></i>
                  <i
                    :class="successIconClass"
                    v-show="isValidPassword && !isPasswordInputFocus"
                  ></i>
                  <i
                    :class="errorIconClass"
                    v-show="!isValidPassword && !isPasswordInputFocus"
                  ></i>
                  <span
                    class="ml-5px fs-14px"
                    :class="{'color-success': isValidPassword, 'color-error': !isValidPassword && !isPasswordInputFocus}"
                  >{{ passwordTips }}</span>
                </div>
              </div>
              <!-- 再次输入密码 -->
              <div class="password-again mb-10px">
                <el-input
                  placeholder="请再次输入密码"
                  ref="password-again-input"
                  v-model="passwordAgain"
                  prefix-icon="el-icon-user"
                  show-password
                  clearable
                  @focus="passwordAgainInputFocus"
                  @blur="passwordAgainInputBlur"
                ></el-input>
                <div
                  class="pt-5px pb-5px"
                  v-show="isPasswordAgainTipsShow"
                >
                  <i
                    :class="infoIconClass"
                    v-show="isPasswordAgainInputFocus"
                  ></i>
                  <i
                    :class="successIconClass"
                    v-show="isValidPasswordAgain && !isPasswordAgainInputFocus"
                  ></i>
                  <i
                    :class="errorIconClass"
                    v-show="!isValidPasswordAgain && !isPasswordAgainInputFocus"
                  ></i>
                  <span
                    class="ml-5px fs-14px"
                    :class="{'color-success': isValidPasswordAgain, 'color-error': !isValidPasswordAgain && !isPasswordAgainInputFocus }"
                  >{{ passwordAgainTips }}</span>
                </div>
              </div>
            </form>
            <div class="privacy flex">
              <input
                type="checkbox"
                v-model="checked"
              >
              <div class="ml-10px">
                <span>我已阅读并同意&nbsp;</span>
                <a
                  href="#"
                  class="color-main"
                  @click.prevent="clickService"
                >服务条款</a><span>&nbsp;和&nbsp;</span>
                <a
                  href="#"
                  class="color-main"
                  @click.prevent="clickPrivacy"
                >隐私政策</a>
              </div>
            </div>
            <div
              class="pt-5px pb-5px"
              v-show="isShowEmptyInputTips"
            >
              <i class="el-icon-error color-error"></i>
              <span class="ml-5px fs-14px color-error">{{emptyInputTips}}</span>
            </div>
            <el-button @click.native="register">注册</el-button>
            <div class="link clearfix">
              <a
                href="http://localhost:8001/#/login"
                class="fl color-main"
              >已有账号，去登录</a>
              <a
                href="http://localhost:8001/#/forget"
                class="fr mr-20px color-main"
                @click.prevent="toForgetPage"
              >忘记密码</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRegister, apiUsernameIsUsable } from '@/assets/js/public/api.js'
import { encrypt } from '@/assets/js/public/aes.js'
import { showMessage } from '@/assets/js/public/publicFunction.js'
import { watch } from 'vue'
const rawUsernameTips = '长度应为6 ~ 18个字符，可以使用数字、字母和下划线'
const rawPasswordTips = '长度应为8 ~ 18个字符，可以使用数字、字母、.和_'
const rawPasswordAgainTips = '请输入与上面一致的密码'
const usernameRegExp = /^[a-zA-Z0-9_]{6,18}$/
const passwordRegExp = /^[a-zA-Z0-9_.]{8,18}$/
export default {
  name: 'register-view-comp',
  data () {
    return {
      username: '',
      password: '',
      passwordAgain: '',
      checked: false,
      usernameTips: rawUsernameTips,
      passwordTips: rawPasswordTips,
      passwordAgainTips: rawPasswordAgainTips,
      isUsernameTipsShow: false,
      isPasswordTipsShow: false,
      isPasswordAgainTipsShow: false,
      isUsernameInputFocus: false,
      isPasswordInputFocus: false,
      isPasswordAgainInputFocus: false,
      isValidUsername: false,
      isValidPassword: false,
      isValidPasswordAgain: false,
      isShowEmptyInputTips: false,
      emptyInputTips: ''
    }
  },
  methods: {
    usernameInputFocus () {
      this.isShowEmptyInputTips = false
      this.usernameTips = rawUsernameTips
      this.isUsernameTipsShow = true
      this.isUsernameInputFocus = true
    },
    usernameInputBlur () {
      this.isUsernameTipsShow = false
      this.isUsernameInputFocus = false
      // 验证用户名是否符合要求
      if (this.username) {
        if (usernameRegExp.test(this.username)) {
          this.$request.get(apiUsernameIsUsable, {
            username: this.username
          })
            .then(res => {
              if (res.status === 101) {
                this.usernameTips = '该用户名可以注册'
                this.isUsernameTipsShow = true
                this.isValidUsername = true
              } else {
                this.usernameTips = '该用户名已注册'
                this.isUsernameTipsShow = true
                this.isValidUsername = false
              }
            })
        } else {
          this.usernameTips = '用户名不符合要求'
          this.isUsernameTipsShow = true
          this.isValidUsername = false
        }
      }
    },
    passwordInputFocus () {
      this.isShowEmptyInputTips = false
      this.passwordTips = rawPasswordTips
      this.isPasswordTipsShow = true
      this.isPasswordInputFocus = true
    },
    passwordInputBlur() {
      this.isPasswordTipsShow = false
      this.isPasswordInputFocus = false
      if (this.password) {
        this.isPasswordTipsShow = true
        if (passwordRegExp.test(this.password)) {
          this.passwordTips = '可以使用该密码'
          this.isValidPassword = true
        } else {
          this.passwordTips = '密码不符合要求'
          this.isValidPassword = false
        }
      }
    },
    passwordAgainInputFocus() {
      this.isShowEmptyInputTips = false
      this.passwordAgainTips = rawPasswordAgainTips
      this.isPasswordAgainTipsShow = true
      this.isPasswordAgainInputFocus = true
    },
    passwordAgainInputBlur () {
      this.isPasswordAgainTipsShow = false
      this.isPasswordAgainInputFocus = false
      if (!this.password || !this.passwordAgain) {
        return
      }
      if (this.password !== this.passwordAgain) {
        this.passwordAgainTips = '两次输入的密码不一致'
        this.isPasswordAgainTipsShow = true
        this.isValidPasswordAgain = false
      } else {
        this.passwordAgainTips = '两次输入的密码一致'
        this.isPasswordAgainTipsShow = true
        this.isValidPasswordAgain = true
      }
    },
    register () {
      if (!this.username) {
        this.emptyInputTips = '请输入用户名'
        this.isShowEmptyInputTips = true
        return
      }
      if (!this.password) {
        this.emptyInputTips = '请输入密码'
        this.isShowEmptyInputTips = true
        return
      }
      if (!this.passwordAgain) {
        this.emptyInputTips = '请再次输入密码'
        this.isShowEmptyInputTips = true
        return
      }
      if (!this.checked) {
        this.emptyInputTips = '请勾选同意服务协议和隐私政策'
        this.isShowEmptyInputTips = true
        return
      }
      this.$request.post(apiRegister, {
        username: this.username,
        password: encrypt(this.password),
        isAgreeServiceTerms: this.checked
      })
        .then(res => {
          if (res.status === 100) {
            showMessage(this, '注册成功，1s后将跳转到登陆页面', 'success', '1000')
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          }
        })
        .catch(error => {
          showMessage(this, '注册失败', 'error')
          console.log(error)
        })
    },
    clickService () {
      showMessage(this, '暂无《服务条款》', 'info')
    },
    clickPrivacy () {
      showMessage(this, '暂无《隐私政策》', 'info')
    },
    toForgetPage () {
      showMessage(this, '忘记密码功能暂未上线', 'info')
    }
  },

  computed: {
    infoIconClass () {
      return {
        'color-info': true,
        'el-icon-info': true
      }
    },
    successIconClass () {
      return {
        'color-success': true,
        'el-icon-success': true
      }
    },
    errorIconClass () {
      return {
        'color-error': true,
        'el-icon-error': true
      }
    }
  },
  watch: {
    checked () {
      if (this.checked) {
        this.isShowEmptyInputTips = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./register.less";
</style>
