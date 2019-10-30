<template>
  <div class="goods-list ">
    <good-item class="item" 
    v-for="(item,index) of goodList"
    :gooditem="item" :key="index">
    </good-item>
  </div>
</template>

<script>
import GoodItem from "./GoodItem";
export default {
  name: "Goods",
  components: {
    GoodItem
  },
  props: {
    goodList: Array
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
}
.goods-list .item {
  width: 48%;
}
/*
     flex-wrap: wrap;
     多行显示 图片要有宽度 不然都在一行显示
     justify-content: space-around; 
    这个是总的两边的宽度 == 中间的宽度
    那我想让两遍和中间平分？
    可以用padding挤一下 具体值是屏幕总的宽度-lide宽度*2/3 就是距离了吧
     */
</style>