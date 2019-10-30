//1.引入vue
//2.引入vuex
//3.use使用插件
//4.new Vuex.Store
//5.main.js引入 挂载
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    carlist: []//购物车商品信息
}
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
export default store



//第二种写法：
// const state = {
// }
// export default new Vuex.store({
//     state
// })