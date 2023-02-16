<template>
  <div class="year-month-picker">
    <div>{{value}}</div>
    <div class="year">
      <div class="left">
        <i
          class="el-icon-d-arrow-left"
          @click="lastYear"
        ></i>
      </div>
      <div class="mid">
        <span>{{year}}</span>
      </div>
      <div class="right">
        <i
          class="el-icon-d-arrow-right"
          @click="nextYear"
        ></i>
      </div>
    </div>
    <div
      class="month"
      @click="select"
    >
      <div class="row">
        <div class="col">
          <span tag="1">一月</span>
        </div>
        <div class="col">
          <span tag="2">二月</span>
        </div>
        <div class="col">
          <span tag="3">三月</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span tag="4">四月</span>
        </div>
        <div class="col">
          <span tag="5">五月</span>
        </div>
        <div class="col">
          <span tag="6">六月</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span tag="7">七月</span>
        </div>
        <div class="col">
          <span tag="8">八月</span>
        </div>
        <div class="col">
          <span tag="9">九月</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span tag="10">十月</span>
        </div>
        <div class="col">
          <span tag="11">十一月</span>
        </div>
        <div class="col">
          <span tag="12">十二月</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Year-Month-Picker',
  created () {
    this.year = new Date().getFullYear()
  },
  data () {
    return {
      value: null,
      year: null
    }
  },
  methods: {
    lastYear () {
      this.year -= 1
    },
    nextYear () {
      this.year += 1
    },
    select () {
      const tag = event.target.getAttribute('tag')
      if (tag) {
        let month = Number(tag)
        if (month < 10) {
          month = '0' + month
        }
        this.value = this.year + '-' + month
      }
    }
  }
}
</script>

<style lang="less" scoped>
.year-month-picker {
  width: 320px;
  .year {
    display: flex;
    .left:hover,
    .right:hover {
      color: #409eff;
      cursor: pointer;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .mid {
      margin: 0 auto;
    }
  }
  .month {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    .row {
      div {
        padding: 8px 0;
      }
    }
    div {
      text-align: center;
    }
    span:hover {
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
