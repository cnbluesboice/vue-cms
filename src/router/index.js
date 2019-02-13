import Vue from 'vue'
import Router from 'vue-router'

// 引入对应的组件文件
import HomeContainer from '@/pages/home'
import MemberContainer from '@/pages/member'
import ShopcarContainer from '@/pages/shopcar'
import SearchContainer from '@/pages/search'
import newsListContainer from '@/pages/newsList'
import newsInfoContainer from '@/pages/newsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect:"/home"},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcar', component: ShopcarContainer},
    {path: '/search', component: SearchContainer},
    {path: '/home/newsList', component: newsListContainer},
    {path: '/home/newsInfo', component: newsInfoContainer},
  ],
  linkActiveClass: "mui-active"
})
