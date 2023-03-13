<template>
  <div class="week-view">
    <div class="week-name">
      <div
        class="week-item"
        v-for="item in weekName"
        :key="item.id"
      >{{item.name}}</div>
    </div>
    <div class="week-main">
      <div class="time">
        <div class="time-item">0:00</div>
        <div class="time-item">3:00</div>
        <div class="time-item">6:00</div>
        <div class="time-item">9:00</div>
        <div class="time-item">12:00</div>
        <div class="time-item">15:00</div>
        <div class="time-item">18:00</div>
        <div class="time-item">21:00</div>
      </div>
      <div class="week-list"></div>
      <div class="week-list"></div>
      <div class="week-list"></div>
      <div class="week-list"></div>
      <div class="week-list"></div>
      <div class="week-list"></div>
      <div class="week-list"></div>
    </div>
  </div>
</template>

<script>
const weekNameData = [
  { id: 'empty', name: '' },
  { id: 'mon', name: '星期一' },
  { id: 'tue', name: '星期二' },
  { id: 'wed', name: '星期三' },
  { id: 'thu', name: '星期四' },
  { id: 'fri', name: '星期五' },
  { id: 'sat', name: '星期六' },
  { id: 'sun', name: '星期天' }
]
export default {
  name: 'week-view',
  data () {
    return {
      weekName: weekNameData
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/views/todo-view/index.less";
</style>
