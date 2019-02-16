import Vue from 'vue'
import Router from 'vue-router'

// 引入对应的组件文件
import HomeComponent from '@/pages/home'
import MemberComponent from '@/pages/member'
import ShopcarComponent from '@/pages/shopcar'
import SearchComponent from '@/pages/search'
import newsListComponent from '@/pages/newsList'
import newsInfoComponent from '@/pages/newsInfo'
import picListComponent from '@/pages/pictureList'
import picDetailComponent from '@/pages/pictureDetail'
import goodsListComponent from '@/pages/goodsList'
import goodsInfoComponent from '@/pages/goodsInfo'
import goodsIntroComponent from '@/pages/goodsIntro'

Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect:"/home"},
    {path: '/home', component: HomeComponent},
    {path: '/member', component: MemberComponent},
    {path: '/shopcar', component: ShopcarComponent},
    {path: '/search', component: SearchComponent},
    {path: '/home/newsList', component: newsListComponent},
    {path: '/home/newsInfo/:id', component: newsInfoComponent},
    {path: '/home/picList', component: picListComponent},
    {path: '/home/picDetail/:id', component: picDetailComponent},
    {path: '/home/goodsList', component: goodsListComponent},
    {path: '/home/goodsInfo/:id', component: goodsInfoComponent},
    {path: '/home/goodsIntro/:id', component: goodsIntroComponent},
  ],
  linkActiveClass: "mui-active"
})
