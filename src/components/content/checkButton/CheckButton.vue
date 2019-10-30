<template>
  <div class="CheckButton" :class="{click:isChange}">
    <img src="../../../assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChange: {
      default() {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.CheckButton {
  border: 1px rgb(187, 184, 184) solid;
}
.click {
  background-color: rgb(255, 96, 162);
}
</style>

