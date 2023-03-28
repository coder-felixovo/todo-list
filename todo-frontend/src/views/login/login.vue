<template>
  <div class="login-page">
    <div class="login-form-wrap">
      <form class="pt-50px pr-50px pb-50px pl-50px h-full">
        <h2 class="mb-30px">登录</h2>
        <div class="mb-10px">
          <el-input
            placeholder="请输入用户名"
            ref="username-input"
            prefix-icon="el-icon-user"
            v-model="username"
            clearable
            @focus="inputOnFocus"
          ></el-input>
        </div>
        <div class="mb-10px">
          <el-input
            placeholder="请输入密码"
            ref="password-input"
            v-model="password"
            show-password
            prefix-icon="el-icon-key"
            clearable
            @focus="inputOnFocus"
          ></el-input>
        </div>
        <div
          class="tips mb-10px"
          v-show="showTips"
        >
          <span class="fs-12px color-error">{{tips}}</span>
        </div>
        <ul class="overflow-hidden color-info fs-14px">
          <li class="fl">
            <input
              type="checkbox"
              v-model="keepLogin"
              id="keepLogin"
            >
            <label
              for="keepLogin"
              class="pl-5px color-main"
            >保持登录</label>
          </li>
          <li
            class="fr"
            @click="toForget"
          >忘记密码</li>
          <li
            class="fr pr-10px"
            @click="toRegister"
          >注册帐号</li>
        </ul>
        <el-button
          class="w-full mt-30px"
          @click="login"
        >登录</el-button>
        <div class="flex align-items mt-10px">
          <input
            type="checkbox"
            name=""
            id="protocol"
            v-model="checked"
          >
          <label
            for="protocol"
            class="pl-5px"
          >我已阅读，并同意</label>
          <span><a
              href="#"
              class="color-main"
              @click="toServiceTerms"
            >《服务条款》</a></span>
          <span>、</span>
          <span><a
              href="#"
              class="color-main"
              @click="toPrivacyPolicy"
            >《隐私政策》</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { apiLogin } from '@/assets/js/public/api.js'
import { encrypt } from '@/assets/js/public/aes.js'
import { showMessage } from '@/assets/js/public/publicFunction.js'
export default {
  name: 'login-view-comp',
  data () {
    return {
      username: null,
      password: null,
      showTips: false,
      tips: '输入的帐号或密码有误',
      keepLogin: true,
      checked: true
    }
  },
  methods: {
    login () {
      if (!this.username || !this.password) {
        this.showTips = true
        return
      }
      this.$request.post(apiLogin, {
        username: this.username,
        password: encrypt(this.password),
        isKeepLogin: this.keepLogin
      })
        .then(res => {
          if (res.status === 107) {
            this.tips = '密码错误'
            this.showTips = true
            return
          }
          if (res.status === 106) {
            this.tips = '帐号不存在'
            this.showTips = true
            return
          }
          if (res.status === 105) {
            const { token } = res.data
            localStorage.setItem('token', token)
            this.$router.push('/a/all/todo')
          }
        })
    },
    inputOnFocus () {
      this.showTips = false
    },
    toServiceTerms () {
      showMessage(this, '暂无《服务条款》', 'info')
    },
    toPrivacyPolicy () {
      showMessage(this, '暂无《隐私政策》', 'info')
    },
    toForget () {
      showMessage(this, '忘记密码功能暂未上线', 'info')
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
@import "./login.less";
</style>
