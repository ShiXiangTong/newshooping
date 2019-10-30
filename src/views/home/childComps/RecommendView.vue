<template>
  <div class="recommendBox">
    <div v-for="item of recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommendBox {
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
}
.recommendBox img {
   width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
</style>