<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name:"Toast",
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods:{
        shows(message="请选择商品",duration=1000){
            this.isShow = true
            this.message = message
            setTimeout(()=>{
                this.isShow = false
                this.message = ''
            },duration)
        }
    }
}
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:8px 10px;
    color: #fff;
    background-color: rgba(5, 5, 5, 0.452);
    z-index: 999;
}
</style>