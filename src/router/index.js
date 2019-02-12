import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/homeComponent'
import memberComponent from '../pages/memberComponent'
import shopcarComponent from '../pages/shopcarComponent'
import searchComponent from '../pages/searchComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'./home'},
    {path:'/home',component:homeComponent},
    {path:'/member',component:memberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent}
  ],
  linkActiveClass:'mui-active'
})
