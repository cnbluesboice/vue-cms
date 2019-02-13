import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入vue-resource
import VueResource from "vue-resource"
Vue.use(VueResource)

// 按需引入mint-ui
import "mint-ui/lib/style.css"
import {Header , Swipe, SwipeItem} from "mint-ui"
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)

// 引入mui
import "../lib/mui/css/mui.min.css"
import "../lib/mui/css/icons-extra.css"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
