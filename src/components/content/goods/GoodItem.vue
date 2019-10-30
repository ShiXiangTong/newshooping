<template>
  <div class="goods-item" @click="detail">
    <!-- 首页推荐监听 -->
      <img :src="showImage" @load="imgItemLoad"> 
      <div class="goods-info">
        <p>{{gooditem.title}}</p>
        <span class="price">{{gooditem.price}}</span>
        <span class="collect">{{gooditem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodItem",
  data(){
    return {
      imgNumber:false
    }
  },
  props: {
    gooditem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
    imgItemLoad(){
      this.$bus.$emit('imgItemLoad') //当图片加载完成发送事件
    },
    detail(){
      this.$router.push('/detail/'+this.gooditem.iid)
    }
  },
  //解决组件复用路径不一样
  computed:{
    showImage(){
      return  this.gooditem.image || this.gooditem.show.img
    }
  }
};

</script>

<style>
.goods-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>