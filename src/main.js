// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'

//css初始化
import './styles/common.css'
//mui
import './libs/mui/css/mui.css'
import './libs/mui/fonts/mui.ttf'
import './libs/mui/css/icons-extra.css'
import './libs/mui/fonts/mui-icons-extra.ttf'

//引入请求
import VueResource from 'vue-resource'
Vue.use(VueResource)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h=>h(App)
    
  
 })
