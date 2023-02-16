<template>
  <div class="setting-page h-full">
    <el-row class="h-full">
      <el-col
        class="h-full"
        :span="3"
      >
        <SettingMenu></SettingMenu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SettingMenu from '@/component/menu/SettingMenu.vue'
export default {
  name: 'setting-view-comp',
  components: { SettingMenu }
}
</script>
