<template>

  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="HomeSwiperLoad">
      </a>
    </swiper-item>
  </swiper>

</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners:{
      type: Array,
      default() {
        return []; //默认值必须是函数 2.5.1以上版本必须这么写函数。
      }
    }
  },
  methods:{
    HomeSwiperLoad(){
      this.$emit('HomeSwiperLoad')
    }
  }
};
</script>

<style scoped>
</style>