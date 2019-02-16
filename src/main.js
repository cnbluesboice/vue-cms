import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false



// 引入vue-resource
import VueResource from "vue-resource"
Vue.use(VueResource)



// 设置请求根域名
Vue.http.options.root="http://vue.lovegf.cn:8899/"
// Vue.http.options.root = 'http://vue.lovegf.cn:8899/';

// 按需引入mint-ui
// import "mint-ui/lib/style.css"
// import {Header, Swipe, SwipeItem, Button} from "mint-ui"
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)

// 全局引入mui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入mui
import "../lib/mui/css/mui.min.css"
import "../lib/mui/css/icons-extra.css"


// 注册全局评论组件
import commentComponent from "./components/comment"
Vue.component("comment",commentComponent)

// 注册全局过滤器
import moment from "moment"
Vue.filter("dateFormat",function(dateStr,pattern="YY-MM-DD HH:mm:ss"){
  return moment(dateStr).format("YYYY-MM-DD HH:mm:ss")
})

// 安装缩略图
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
