import Vue from 'vue'
import Router from 'vue-router'

// 引入对应的组件文件
import HomeContainer from '@/pages/home'
import MemberContainer from '@/pages/member'
import ShopcarContainer from '@/pages/shopcar'
import SearchContainer from '@/pages/search'

Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect:"/home"},
    {
      path: '/home',
      name: 'HomeContainer',
      component: HomeContainer
    },
    {
      path: '/member',
      name: 'MemberContainer',
      component: MemberContainer
    },
    {
      path: '/shopcar',
      name: 'ShopcarContainer',
      component: ShopcarContainer
    },
    {
      path: '/search',
      name: 'SearchContainer',
      component: SearchContainer
    }
  ],
  linkActiveClass: "mui-active"
})
