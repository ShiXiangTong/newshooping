<template>
<div>
<cart-item v-for="item of list" :key="item.iid" :item-info="item"></cart-item>
</div>
</template>
<script>
import CartItem from "./CartItem";
export default {
  name: "CartList",
  components: {
    CartItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return {};
      }
    }
  },
};
</script>

<style scoped>
</style>