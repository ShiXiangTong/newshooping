<template>
  <div id="app">
    <!-- home及其他页面的模板最终会放在这里 不用挂载就行 如果挂载了那就成全部的了 -->
    <keep-alive exclude="Detail"><router-view /></keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "../src/components/content/tabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";

/* 
 <main-tab-bar/> 渲染Maintabbar的组件 包含其他两个组件封装
 
*/
</style>