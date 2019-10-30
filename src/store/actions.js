import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
    setCarlist(context, paylod) {
        return new Promise((resolve,reject)=>{
             //返回找到已有的商品
            let oldcarlist = context.state.carlist.find(item => item.iid === paylod.iid)
            if (oldcarlist) {
                context.commit(ADD_COUNTER, oldcarlist)
                resolve('感谢您再次添加成功')
            } else {
                paylod.count = 1;
                context.commit(ADD_TO_CART, paylod)
                resolve('成功加入购物车')
            }
        })
    }
}

//actions可以返回一个promise 所以我点击购物车的时候要确保商品一定是被添加了！