import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'

export default {
    //加2
    [ADD_COUNTER](state, paylod) {            
        paylod.count += 1;
        },
    //新加
    [ADD_TO_CART](state, paylod) {
        paylod.checked = true    
        state.carlist.push(paylod)         
        }
}