import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/public/style.less'
import '@/assets/css/public/color.less'
import '@/assets/css/public/size.less'
import {
  Dialog, Row, Col, Button, Input, Menu, MenuItem, Message, Link, Popover,
  DatePicker, TimePicker, Select, Option, MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import req from './service/req'

Vue.config.productionTip = false
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Link)
Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$request = req
Vue.prototype.$bus = new Vue()

Vue.config.errorHandler = (err, vm, info) => {
  console.log('global error handler')
  console.error(err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
