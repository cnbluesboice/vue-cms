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

// 使用Vuex实现数据共享
import Vuex from "vuex"
Vue.use(Vuex)

let car=JSON.parse(localStorage.getItem("car")) || []
let store=new Vuex.Store({
  state:{
    car, //用于存放要加入购物车的数据（商品id，价格，数量，勾选状态）
  },
  mutations:{
    // 参数state表示上面的数据，goodsInfo表示调用addToCar方法时传过来的参数
    // addToCar方法在goodsInfo中的addGoods中调用
    addToCar(state,goodsInfo){
      console.log(state)
      console.log(typeof goodsInfo.id,goodsInfo.id)
      // 首先判断加入的商品购物车中是否原本就存在,存在只修改其中的数量count值，不存在就放入car数组中
      // findIndex()方法直接返回当前皮匹配到的元素的索引值，为-1则表示数组中没有匹配到
      let index=state.car.findIndex(item=>item.id==parseInt(goodsInfo.id))
      console.log(index)
      if(index==-1){
        state.car.push(goodsInfo)
      }else{
        // goodsInfo.count可能为字符串
        state.car[index].count+=parseInt(goodsInfo.count)
      }
      // 存入本地缓存
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    // 这里的goodsInfo参数只需要id和count
    updateCount(state,goodsInfo){
      // console.log(typeof goodsInfo.id)
      // 找到跟当前id匹配的商品的数量，再将改变后的商品数量重新赋值给state中的数据，达到更新的目的
      // 然后再重新覆盖本地缓存
      state.car.some(item=>{
        if(item.id==parseInt(goodsInfo.id)){
          // console.log(item.count)
          item.count=goodsInfo.count
          // console.log(item.count)
          return true
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    removeGoods(state,id){
      state.car.some((item,index)=>{
        if(item.id==id){
          state.car.splice(index,1)
        }
        return true
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    updateSelected(state,goodsInfo){
      state.car.some(item=>{
        // console.log(1111)
        if(item.id==parseInt(goodsInfo.id)){
          item.selected=!goodsInfo.selected
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    }
  },
  getters:{
    // 商品的总数量
    goodsTotalCount(state){
      let sum=0
      state.car.forEach(item=>sum+=item.count)
      return sum
    },
    // 每个商品的数量
    goodsCount(state){
      // 自己创建一个对象{id的值：数量}，这样就可以保证每个count是对应的是每个购物车商品的数量
      // 由于数据更新时要根据id来匹配，但是要改变的是数量count值，所以可以把id值作为键，count值作为id的值
      // 例如：{82:5,92:10},在其他页面可以通过id值拿到对应的商品数量了
      let o={}
      state.car.forEach(item => {
        o[item.id]=item.count
      })
      return o
    },
    // 每个商品的勾选状态
    goodsSelected(state){
      let o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    // 商品的总数和总价
    allGoodsCountAndAmount(state){
      let o={
        allCounts:0,
        amount:0
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.allCounts += item.count
          o.amount += item.count * item.price
        }
      })
      return o
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //Vuex实例挂载到Vue实例上
  render: h => h(App)
})
