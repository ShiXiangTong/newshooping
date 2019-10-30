<template>
  <div class="bottomClose">
      <div class="anniu" @click="checkAll">
          <check-button class="button" :is-change="isShow"></check-button>
          <span>全选</span>
      </div>
      <div class="total">
          总价：{{getTotal}}
      </div>
      <div class="close" @click="close">
          结算：{{getTotalLength}} 件
      </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
    name:"BottomClose",
    components:{
        CheckButton
    },
    computed:{
        ...mapGetters(['getCarlist']),
        getTotal(){
            return this.getCarlist.filter(item => {
                return item.checked//条件
            })
            .reduce( (preValue,item)=>{
                return preValue + item.price * item.count
            },0)
            .toFixed(2)
        },
        getTotalLength(){
            return this.getCarlist.filter( item => {
                return item.checked
            }).reduce( (pre,item)=>{
                return pre + item.count
            },0)
        },
        //全选 如果有一个没选中，为false，不然就为ture
        isShow(){
           if(this.getCarlist.length === 0) return false
           return !this.getCarlist.find( item => !item.checked)
        },
        //如果一个都没有选中则 弹出
        ischecked(){
            if(this.getCarlist.length === 0) return false
            return this.getCarlist.find( item => item.checked)
        }
    },
    methods:{
        checkAll(){
            //如果都是选中状态，都改为false,如果有一个没被选中那都给选中
            if (this.isShow) {
                this.getCarlist.forEach(element => {
                    element.checked = false
                });
            }else{
                this.getCarlist.forEach(element => {
                     element.checked = true
                })
            }
        },
        //结算
        close(){
            //如果没有一个被点亮
            if (this.ischecked) {
              this.$toast.shows('跳转到结算页~~~')
            }else{
                 this.$toast.shows()
            }
        }
    }
}
</script>

<style scoped>
.bottomClose{
    height: 40px;
    position: relative;
    display: flex;
    background-color: rgba(209, 206, 199, 0.945);
    line-height: 40px;
    color:black;
}
.anniu{
    width: 60px;
    display: flex;
    align-items: center;
}
.button{
    width: 20px;
    height: 20px;
    line-height: 25px;
    text-align: center;
    margin: 0 2px 0 2px;
}
.total{
    flex: 1;
    text-align: center;
}
.close{
    width: 90px;
     background-color:rgb(236, 106, 219);
     text-align: center;
     color: #fff;
}
</style>