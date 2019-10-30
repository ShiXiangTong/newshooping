<template>
  <div>
    <swiper :options="swiperOption" class="DetailContent">
      <swiper-slide v-for="(item,index) of images" :key="index">
        <img :src="item" alt :key="item" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
     
  </div>
</template>

<script>
export default {
  name: "DetailSwper",
  components: {},
  props: {
    images: Array,    
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        observer:true,
        effect : 'flip',
        pagination: {
            el: '.swiper-pagination',
            loop : true,
          }
      }
    };
  },
  
};
</script>

<style scoped>
.DetailContent {
  height: 300px;
  overflow: hidden;
}
.DetailContent img {
  width: 100%;
  height: 500px;
}
</style>