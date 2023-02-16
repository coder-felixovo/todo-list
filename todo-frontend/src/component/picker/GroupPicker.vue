<template>
  <div class="group-picker">
    <el-select
      v-model="selectedGroup"
      placeholder="请选择"
      @change="selectOnChange"
    >
      <el-option
        v-for="item in groupList"
        :key="item.groupId"
        :label="item.groupName"
        :value="item"
      >
        <i :class="item.groupIcon"></i>
        <span class="ml-10px">{{ item.groupName }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
const customGroupListData = [
  { groupId: 'admin', groupName: '演示', groupIcon: 'el-icon-star-on', createTime: '' }
]
export default {
  name: 'group-picker-comp',

  data () {
    return {
      groupList: customGroupListData, // Array
      selectedGroup: null // Object
    }
  },

  methods: {
    selectOnChange () {
      this.$store.commit('toggleGroupPicker')
      // 发送至AddTodo.vue
      this.$bus.$emit('bus-select-group', this.selectedGroup)
    }
  },

  created () {
    this.groupList = this.$store.state.groupList
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/picker/groupPicker.less";
</style>
