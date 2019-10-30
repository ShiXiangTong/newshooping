<template>
  <Nav-bar class="detailzindex">
    <div slot="left" class="DatailLeft" @click="getBack">
        <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="DatailRight">
      <div
       v-for="(item,index) of title"
       :class="{active:index===clickColor}"
       @click="nubIndex(index)">{{item}}</div>
    </div>

  </Nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNav",
  components: {
    NavBar
  },
  data() {
    return {
      title: ["商品", "参数", "详情", "评论"],
      clickColor: 0
    };
  },
  methods:{
      nubIndex(index){
         this.clickColor = index
         //1.将点击的index传给父组件
         this.$emit('titleClick',index) 
      },
      getBack(){
          this.$router.back()
      }
  }
};
</script>

<style>
.detailzindex{
  position: relative;
  z-index: 1;
  background-color: #ffffff;
}
.DatailRight {
  display: flex;
  
}
.DatailRight div {
  flex: 1;
}
.active {
  color: red;   
}
.DatailLeft{
    padding-top: 8px;
}

</style>