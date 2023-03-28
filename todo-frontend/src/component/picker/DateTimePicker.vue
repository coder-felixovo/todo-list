<template>
  <div
    class="datetime-picker"
    @click.stop
  >
    <el-date-picker
      v-model="datetime"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      @blur="onBlurCallback"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { formatDateObject } from '@/assets/js/public/timeUtils'
export default {
  name: 'datetime-picker-comp',

  data () {
    return {
      datetime: new Date()
    }
  },

  methods: {
    onBlurCallback () {
      this.$bus.$emit('bus-datetime', formatDateObject(this.datetime))
      this.$store.commit('toggleDatetimePicker')
    }
  }
}
</script>

<style lang="less" scoped>
.datetime-picker {
  position: absolute;
  top: 40px;
  left: 650px;
}
</style>
