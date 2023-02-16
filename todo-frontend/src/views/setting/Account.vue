<template>
  <div class="account-safety">
    <h2 class="fs-24px">帐号安全</h2>
    <div class="nickname-wrap mt-20px">
      <p>昵称</p>
      <el-input
        v-model="nickname.value"
        :disabled="nickname.isEdit ? false : true"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-user"
        ></i>
      </el-input>
      <el-button
        type="primary"
        :icon="nickname.isEdit ? 'el-icon-circle-check' : 'el-icon-edit' "
        @click="updateNickname()"
      ></el-button>
      <el-button
        v-if="nickname.isEdit ? true : false"
        type="primary"
        icon="el-icon-circle-close"
        @click="cancelUpdateNickname()"
      ></el-button>
    </div>
    <div class="username-wrap mt-20px">
      <p>用户名</p>
      <el-input
        disabled
        v-model="username"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-user"
        ></i>
      </el-input>
    </div>
    <div class="password-wrap mt-20px">
      <p>密码</p>
      <el-input
        type="password"
        v-model="password"
        show-password
        disabled
      ></el-input>
    </div>
    <div class="contact-wrap mt-20px">
      <p>联系方式</p>
      <el-input
        v-model="contact.value"
        :disabled="contact.isEdit ? false : true"
      >
        <i
          slot="prefix"
          class="el-input_icon el-icon-phone"
        ></i>
      </el-input>
      <el-button
        type="primary"
        :icon="contact.isEdit ? 'el-icon-circle-check' : 'el-icon-edit'"
      ></el-button>
      <el-button
        v-if="contact.isEdit ? true : false"
        type="primary"
        icon="el-icon-circle-close"
      ></el-button>
    </div>
    <div class="email-wrap mt-20px">
      <p>邮箱</p>
      <el-input
        v-model="email.value"
        :disabled="email.isEdit ? false : true"
      >
        <i
          slot="prefix"
          class="el-input_icon el-icon-phone"
        ></i>
      </el-input>
      <el-button
        type="primary"
        :icon="email.isEdit ? 'el-icon-circle-check' : 'el-icon-edit'"
      ></el-button>
      <el-button
        v-if="email.isEdit ? true : false"
        type="primary"
        icon="el-icon-circle-close"
      ></el-button>
    </div>
    <div class="delete-account-wrap mt-20px">
      <p>账号管理</p>
      <el-link type="danger">删除账号</el-link>
    </div>
    <!-- <el-dialog
      title="删除账号"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span style="color: rgb(255,49,128)">警告：删除账号将会清除全部数据</span>
      <el-input
        placeholder="请输入当前账户密码"
        v-model="delPwd"
        show-password
      ></el-input>
      <el-checkbox-group v-model="delCheckList">
        <el-checkbox label="我已明确删除账号将会清除全部数据"></el-checkbox>
        <br>
        <el-checkbox label="我确认要删除账号"></el-checkbox>
      </el-checkbox-group>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import {
  getUserInfoHandler, updateNicknameHandler, cancelUpdateNicknameHandler,
  updateContactHandler, cancelUpdateContactHandler, updateEmailHandler, cancelUpdateEmailHandler
} from '@/assets/js/views/setting'

export default {
  name: 'account-view-comp',

  data () {
    return {
      username: '',
      password: '',
      nickname: {
        value: null,
        isEdit: false
      },
      contact: {
        value: null,
        isEdit: false
      },
      email: {
        value: null,
        isEdit: false
      },
      dialogVisible: false,
      delPwd: null,
      delCheckList: []
    }
  },

  methods: {
    getUserInfo () {
      getUserInfoHandler(this)
    },
    // updateNickname () {
    //   updateNicknameHandler(this)
    // },
    // cancelUpdateNickname () {
    //   cancelUpdateNicknameHandler(this)
    // },
    // updateContact () {
    //   updateContactHandler(this)
    // },
    // cancelUpdateContact () {
    //   cancelUpdateContactHandler(this)
    // },
    // updateEmail () {
    //   updateEmailHandler(this)
    // },
    // cancelUpdateEmail () {
    //   cancelUpdateEmailHandler(this)
    // },
    // showDeleteDialog () {
    //   this.dialogVisible = true
    // }

    created () {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/setting/account";
</style>
