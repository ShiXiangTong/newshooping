<template>
  <div class="goods-info" v-if="Object.keys(images).length !== 0">
        <!-- 文字简述 -->
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{images.desc}}</div>
            <div class="end"></div>
        </div>
        <!-- 便利图片 -->
        <div v-for="(item,index) of images.detailImage" :key="index">
            <div class="info-key">{{item.key}}</div>
            <div class="info-key">
                <img :src="item" v-for="(item,index) of item.list" :key="index" @load="imgeLoad">
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:"lastImage",
    props:{
        images:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
      //两种办法做：$bus $emit
      imgeLoad(){ 
        this.$emit('imageLoad')
      }
    }
}
</script>

<style scoped>
 .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
    position: relative;
    top: 0;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-key img {
    width: 100%;
  }
</style>