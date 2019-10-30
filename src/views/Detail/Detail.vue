<template>
  <div id="detail">
    <detail-nav @titleClick="titleClick" ref="Nav"></detail-nav>
    <scroll class="ScrollConent" ref="scroll" @backLocation="backLocation" :monitor="3">
      <datail-swper :images="topImages"></datail-swper>
      <datail-base-info :goods="GoodsObject"></datail-base-info>
      <bottom-object :shop="bottomObject"></bottom-object>
      <last-image :images="LastImages" @imageLoad="imageLoad"></last-image>
      <detail-params :params="DetailParamss" ref="parms"></detail-params>
      <datail-discuss :commentInfo="rate" ref="comment"></datail-discuss>
      <detail-goods :goodList="getRecommends" ref="recommend" class="goodsList"></detail-goods>
    </scroll>
    <bottom-bar @AddShopping="AddShopping"></bottom-bar>
     <back-top @click.native="backToTop" v-show="isScrollTop"></back-top>
  </div>
</template>

<script>
import DetailNav from "./DetailChild/DetailNav"; //商品详情导航
import DatailSwper from "./DetailChild/DetailSwper"; // 引入轮播图
import DatailBaseInfo from "./DetailChild/DetailBaseInfo"; //引入基础数据
import Scroll from "../../components/common/scroll/Scroll"; //scroll包裹中间 注意要定高度
import BottomObject from "./DetailChild/BottomShop"; //店铺数据
import LastImage from "./DetailChild/LastImage"; //最后的详情
import DetailParams from "./DetailChild/DatailParams"; //参考参数
import DatailDiscuss from "./DetailChild/DatailDiscuss"; //用户评论数据
import detailGoods from "../../components/content/goods/Goods"; //直接使用图片列表
import BottomBar from "./DetailChild/BottomBar" //加入购物车

import {debounce} from "../../common/utils"
import { itemListenerMixin,HomeDatailTop} from "../../common/mixin"; //与home页面共用混入 1.引入
import { getDetailSwiper, Goods, getRecommend } from "../../network/detail"; //引入请求文件 //及整合类

import { mapActions } from 'vuex' //好处是：this.$store.dispatch(事件 参数) 免啦！
export default {
  name: "Detail",
  mixins: [itemListenerMixin,HomeDatailTop], //2.挂载混入+防抖
  components: {
    DetailNav,
    DatailSwper,
    DatailBaseInfo,
    Scroll,
    BottomObject,
    LastImage,
    DetailParams,
    DatailDiscuss,
    detailGoods,
    BottomBar
  },
  data() {
    return {
      iid: 0,
      topImages: [], //轮播图数组
      GoodsObject: {}, //中间商品数据
      bottomObject: {}, //底部店铺数据
      LastImages: {}, //最后的图片
      DetailParamss: {}, //尺寸参数
      rate: {}, //评论
      getRecommends: [], // li
      themeTopYs: [], //放各个scroll的数组
      imageFangDou:null, //获取scroll次数过多
      currentIndex:0,
    };
  },
  //注意：用axios.get等请求，会返回一个pormise，那我也可以直接使用 async await。
  created() {
    this.iid = this.$route.params.iid;
    getDetailSwiper(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages;
      let data = res.result;
      this.GoodsObject = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      ); //中间商品的数据
      this.bottomObject = data.shopInfo;
      this.LastImages = data.detailInfo;
      this.DetailParamss = data.itemParams;
      if (data.rate.cRate !== 0) {
        //如果是1才去拿评论
        this.rate = data.rate.list[0];
      }
 
    });
    // 第二次请求
    getRecommend().then(res => {
      this.getRecommends = res.data.list;
    });
    //详情页面获取各个组件的scrollTop
     this.imageFangDou = debounce(()=>{
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.parms.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs); 网速慢..
      },500)
  },
  mounted() {
    //混入    
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener); //销毁后取消监听这个事件
  },
  methods: {
    ...mapActions(['setCarlist']),//actions的方法被混入

    imageLoad() {
      this.newRefresh(); //去调用防抖
      this.imageFangDou() //图片加载一次，调用一次防抖
    },
    titleClick(index) { //导航点击谁定位到谁
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    //监听滚动后
    backLocation(scrollY){
      //有两种写法：也可以自己加一个最大值，进行比较，但不循环最后一个。    
      let length = this.themeTopYs.length //1.拿到所有的组件高度信息
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i<length-1 && -scrollY.y >= this.themeTopYs[i] && -scrollY.y<=this.themeTopYs[i+1]) || (i===length-1 && -scrollY.y>=this.themeTopYs[i])) ) {
          this.currentIndex = i;
          this.$refs.Nav.clickColor = i;
          
        }
      
      }

      this.tops(scrollY)
    },
    //2.加入购物车(从这里用到vuex)
    AddShopping(){
      //拿取以前goods类里的商品信息 标题 图片 老价格 ..
      const commodity = {}
      commodity.imgage = this.topImages[0];
      commodity.title = this.GoodsObject.title;
      commodity.desc = this.GoodsObject.desc;
      commodity.price = this.GoodsObject.realPrice;
      commodity.iid = this.iid;
      this.setCarlist(commodity).then((res)=>{
        this.$toast.shows(res,1000)
        
      })
    }
  }
};
</script>

<style scoped>
#detail {
  /*
   1.让detail的主体高度改为当前视口高度 再遮住导航栏
   2.引入scroll给content加高度，这样显示的层级从低是 navbar(fiexd) - sroll(外层和detail) - detail(有颜色 但失效 z-index:1)
      height: calc(100% - 44px);计算scroll容器需要的高度
   */
  height: 100vh;
  position: relative;
  background-color: #fff;
  z-index: 1;
}
.ScrollConent {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>