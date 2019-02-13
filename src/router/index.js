import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/homeComponent'
import memberComponent from '../pages/memberComponent'
import shopcarComponent from '../pages/shopcarComponent'
import searchComponent from '../pages/searchComponent'
import newsListComponent from '../pages/newsList'
import newsInfoComponent from '../pages/newsInfo'
Vue.use(Router)


export default new Router({
  routes: [
    {path:'/',redirect:'./home'},
    {path:'/home',component:homeComponent},
    {path:'/member',component:memberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent},
    {path:'/home/newsList',component:newsListComponent},
    {path:'/home/newsInfo/:id',component:newsInfoComponent}
  ],
  linkActiveClass:'mui-active'
})
