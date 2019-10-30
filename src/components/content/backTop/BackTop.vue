<template>
    <div class="backTopcss">
        <img src="@/assets/img/common/top.png" alt="">
    </div>
</template>

<script>
export default {
    name:'BackTop',
}
</script>

<style  scoped>
    /* 所有业务组件共有的 */
    .backTopcss{
       position: fixed;
       right: 8px;
        bottom: 55px;
    }
     .backTopcss img{
         width: 43px;
         height: 43px;
     }
</style>