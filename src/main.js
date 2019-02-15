// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//css初始化清除默认样式
import './styles/common.css'
//mui
import './libs/mui/css/mui.css'
import './libs/mui/fonts/mui.ttf'
import './libs/mui/css/icons-extra.css'
import './libs/mui/fonts/mui-icons-extra.ttf'

//引入请求
import VueResource from 'vue-resource'
Vue.use(VueResource)
//引入时间工具
import moment from 'moment'
//配置全局路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/';
Vue.http.options.emulateJSON = true;
//配置全局过滤器
Vue.filter('dateFormat',(data,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
  return moment(data).format(pattern)
})
//配置全局评论组件'
import comment from './components/comment.vue'
Vue.component('comment',comment)

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
