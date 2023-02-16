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
              <div class="username mb-10px">
                <el-input
                  placeholder="请输入用户名"
                  ref="username-input"
                  prefix-icon="el-icon-user"
                  v-model="username"
                  clearable
                  @focus="usernameInputFocus"
                  @blur="usernameInputBlur"
                ></el-input>
                <div class="pt-5px pb-5px">
                  <div v-show="showUsernameTips.normal">
                    <span class="ml-5px fs-14px">{{ usernameTips }}</span>
                  </div>
                  <div v-show="showUsernameTips.success">
                    <i class="el-icon-success color-success"></i>
                    <span class="ml-5px fs-14px color-success">{{ usernameTips }}</span>
                  </div>
                  <div v-show="showUsernameTips.error">
                    <i class="el-icon-error color-error"></i>
                    <span class="ml-5px fs-14px color-error">{{ usernameTips }}</span>
                  </div>
                </div>
              </div>
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
                <div class="pt-5px pb-5px">
                  <div v-show="showPasswordTips.normal">
                    <span class="ml-5px fs-14px">{{ passwordTips }}</span>
                  </div>
                  <div v-show="showPasswordTips.error">
                    <i class="el-icon-error color-error"></i>
                    <span class="ml-5px color-error fs-14px">{{ passwordTips }}</span>
                  </div>
                </div>
              </div>
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
                <div class="pt-5px pb-5px">
                  <div v-show="showPasswordAgainTips.normal">
                    <span class="ml-5px fs-14px">{{ passwordAgainTips }}</span>
                  </div>
                  <div v-show="showPasswordAgainTips.error">
                    <i class="el-icon-info color-error"></i>
                    <span class="ml-5px color-error fs-14px">{{ passwordAgainTips }}</span>
                  </div>
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
                  @click.prevent="onclickService"
                >服务条款</a><span>&nbsp;和&nbsp;</span>
                <a
                  href="#"
                  class="color-main"
                  @click.prevent="onclickPrivacy"
                >隐私政策</a>
              </div>
            </div>
            <el-button @click.native="onclickRegister">注册</el-button>
            <div class="link clearfix">
              <a
                href="http://localhost:8001/#/login"
                class="fl color-main"
              >已有账号，去登录</a>
              <a
                href="http://localhost:8001/#/forget"
                class="fr mr-20px color-main"
                @click.prevent="toFogetPage"
              >忘记密码</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRegister } from '@/assets/js/public/api.js'
import { decrypt, encrypt } from '@/assets/js/public/aes.js'
import { showMessage } from '@/assets/js/public/publicFunction.js'
const rawUsernameTips = '长度应为6 ~ 18个字符，可以使用数字、字母和下划线'
const rawPasswordTips = '长度应为8 ~ 18个字符，可以使用数字、字母、.和_'
const rawPasswordAgainTips = '请输入与上面一致的密码'
const rawUsernameRegExp = /^[a-zA-Z0-9_]{6,18}$/
const rawPasswordRegExp = /^[a-zA-Z0-9_.]{8,18}$/
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
      usernameRegExp: rawUsernameRegExp,
      passwordRegExp: rawPasswordRegExp,
      validUsername: false,
      validPassword: false,
      isSamePassword: false,
      isClickButton: false,
      showUsernameTips: {
        normal: false,
        success: false,
        error: false
      },
      showPasswordTips: {
        normal: false,
        error: false
      },
      showPasswordAgainTips: {
        normal: false,
        error: false
      }

    }
  },
  methods: {
    setTipsAllPropFalse (objectName) {
      for (const prop in this[objectName]) {
        this[objectName][prop] = false
      }
    },
    checkInputIsError (refName) {
      return this.$refs[refName].$el.children[0].className.includes('input-error')
    },
    setInputError (refName) {
      if (!this.checkInputIsError(refName)) {
        this.$refs[refName].$el.children[0].className += ' input-error'
      }
    },
    removeInputError (refName) {
      this.$refs[refName].$el.children[0].className = 'el-input__inner'
    },
    inputGetFocus (refName) {
      this.$refs[refName].focus()
    },
    usernameInputFocus () {
      if (this.isClickButton) {
        this.isClickButton = false
        return
      }
      if (this.checkInputIsError('username-input')) {
        this.removeInputError('username-input')
      }
      this.setTipsAllPropFalse('showUsernameTips')
      this.usernameTips = rawUsernameTips
      this.showUsernameTips.normal = true
    },
    usernameInputBlur () {
      this.removeInputError('username-input')
      this.setTipsAllPropFalse('showUsernameTips')
      if (this.username) {
        if (this.usernameRegExp.test(this.username)) {
          this.queryUsername()
        } else {
          this.validUsername = false
          this.usernameTips = rawUsernameTips
          this.showUsernameTips.error = true
          this.setInputError('username-input')
        }
      }
    },
    passwordInputFocus () {
      if (this.isClickButton) {
        this.isClickButton = false
        return
      }
      if (this.checkInputIsError('password-input')) {
        this.removeInputError('password-input')
      }
      this.setTipsAllPropFalse('showPasswordTips')
      this.passwordTips = rawPasswordTips
      this.showPasswordTips.normal = true
    },
    passwordInputBlur () {
      this.removeInputError('password-input')
      this.setTipsAllPropFalse('showPasswordTips')
      if (this.password) {
        if (this.passwordRegExp.test(this.password)) {
          this.validPassword = true
        } else {
          this.validPassword = false
          this.showPasswordTips.error = true
          this.setInputError('password-input')
        }
      }
    },
    passwordAgainInputFocus () {
      if (this.isClickButton) {
        this.isClickButton = false
        return
      }
      if (this.checkInputIsError('password-again-input')) {
        this.removeInputError('password-again-input')
      }
      this.setTipsAllPropFalse('showPasswordAgainTips')
      this.passwordAgainTips = rawPasswordAgainTips
      this.showPasswordAgainTips.normal = true
    },
    passwordAgainInputBlur () {
      this.removeInputError('password-again-input')
      this.setTipsAllPropFalse('showPasswordAgainTips')
      if (this.passwordAgain) {
        if (this.password === this.passwordAgain) {
          this.isSamePassword = true
        } else {
          this.passwordAgainTips = '两次输入的密码不一致'
          this.showPasswordAgainTips.error = true
          this.setInputError('password-again-input')
        }
      }
    },
    queryUsername () {
      this.$request.get('/api/verify_username', { queryUsername: this.username })
        .then(res => {
          if (res.status === 101) {
            this.validUsername = false
            this.usernameTips = '用户名已存在，请重新输入'
            this.showUsernameTips.error = true
            this.setInputError('username-input')
          } else {
            this.validUsername = true
            this.usernameTips = '恭喜，可以使用该用户名'
            this.showUsernameTips.success = true
          }
        })
    },
    onclickRegister () {
      this.isClickButton = true
      if (!this.username) {
        this.usernameTips = '用户名不能为空'
        this.showUsernameTips.error = true
        this.inputGetFocus('username-input')
        this.setInputError('username-input')
        return
      }
      if (!this.password) {
        this.passwordTips = '密码不能为空'
        this.showPasswordTips.error = true
        this.inputGetFocus('password-input')
        this.setInputError('password-input')
        return
      }
      if (!this.passwordAgain) {
        this.passwordAgainTips = '请再次输入密码'
        this.showPasswordAgainTips.error = true
        this.inputGetFocus('password-again-input')
        this.setInputError('password-again-input')
        return
      }
      if (!this.checked) {
        showMessage(this, '请勾选下方同意服务条款和隐私政策', 'info')
        return
      }
      if (this.validUsername && this.validPassword && this.isSamePassword && this.checked) {
        this.register()
      }
    },
    register () {
      this.$request.post(apiRegister, {
        username: this.username,
        password: encrypt(this.password)
      })
        .then(res => {
          if (res.status === 100) {
            showMessage(this, '注册成功，将跳转到登陆页面', 'success', '1000')
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
    onclickService () {
      showMessage(this, '暂无《服务条款》', 'info')
    },
    onclickPrivacy () {
      showMessage(this, '暂无《隐私政策》', 'info')
    },
    toFogetPage () {
      showMessage(this, '忘记密码功能暂未上线', 'info')
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/register.less";
</style>
