import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图
import 'swiper/dist/css/swiper.css'

import store from './store/store' 
Vue.use(VueAwesomeSwiper)

//1.引入这个js文件
//export defaut 对象  这样的导出 导入的时候可以改名字。
import toast from './components/common/toast/index'
//2.使用toast插件
//use会自动执行obj.install = function(){}
Vue.use(toast)

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue()

new Vue({ 
  el: '#app',
  router,
  store,
  render: h => h(App)
})
