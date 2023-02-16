<template>
  <div class="time-picker">
    <div style="padding: 10px;">
      <div class="flex items-center justify-between mb-10px">
        <h3 class="color-primary fs-16px">输入时间</h3>
      </div>
      <div class="flex justify-between">
        <div class="hour flex items-center">
          <select
            id="hour-select"
            v-model="selectedHour"
          >
            <option
              disabled
              value=""
            >请选择</option>
            <option value="0">0</option>
            <option
              v-for="hour in 23"
              :key="hour"
              :value="hour"
            >{{hour}}</option>
          </select>
          <label
            for="hour-select"
            class="ml-10px"
          >小时</label>
        </div>
        <div class="minute flex items-center">
          <select
            id="minute-select"
            v-model="selectedMinute"
          >
            <option
              disabled
              value=""
            >请选择</option>
            <option value="0">0</option>
            <option
              v-for="minute in 59"
              :value="minute"
              :key="minute"
            >{{minute}}</option>
          </select>
          <label
            for="minute-select"
            class="ml-10px"
          >分钟</label>
        </div>
      </div>
      <div class="flex justify-end mt-20px">
        <el-button
          type="primary"
          @click.stop="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          @click.stop="sure"
        >确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-picker-comp',

  data () {
    return {
      selectedHour: undefined,
      selectedMinute: undefined
    }
  },

  methods: {
    cancel () {
      this.$store.commit('toggleTimePicker')
    },

    sure () {
      const selectedHour = this.selectedHour
      const selectedMinute = this.selectedMinute
      if (this.$store.state.isShowTimePicker) {
        this.$store.commit('toggleTimePicker')
      }
      // 发送至AddTodo.vue
      this.$bus.$emit('bus-send-time', { selectedHour, selectedMinute })
    }
  }

}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/picker/timePicker.less";
</style>
