<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      class="two-tab-control"
      @zzzz="ffffff"
      ref="control2"
      v-show="isOffsetFiex"
    ></tab-control>
    <scroll
      class="aaaa"
      ref="scroll"
      :monitor="3"
      :pull-up-load="true"
      @backLocation="backLocation"
      @loadMore="loadMore"
    >
      <home-swiper :banners="banners" @HomeSwiperLoad="HomeSwiperLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-sticky" @zzzz="ffffff" ref="control"></tab-control>
      <good-list :goodList="threeList"></good-list>
    </scroll>
    <back-top @click.native="backToTop" v-show="isScrollTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; //引入项目导航栏组件
import TabControl from "components/content/tabControl/TabControl"; //引入项目选项卡组件

import HomeSwiper from "./childComps/HomeSwiper"; //引入公有轮播图组件
import RecommendView from "./childComps/RecommendView"; //引入推荐子组件
import FeatureView from "./childComps/FeatureView"; //引入本周流行子组件
import GoodList from "components/content/goods/Goods"; //选项卡一的组件

import Scroll from "@/components/common/scroll/Scroll"; //公有的组件 被封装的框架
//被混入........业务共有组件 回到顶部

import { getMultiData, getProductData } from "network/home"; //引入home的请求文件（轮播图数据 推荐数据）(三个列表数据)

import {itemListenerMixin,HomeDatailTop} from "../../common/mixin" //混入+防抖

export default {
  name: "Home",
  mixins:[itemListenerMixin,HomeDatailTop],
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      isOffsetTop: 0,
      isOffsetFiex: false,
      activatedY: 0 //失效后的位置
    };
  },
    //DOM为虚拟 data还未被替换
  created() {
    this.funGetMultiData();
    this.funGetProductData("pop");
    this.funGetProductData("new");
    this.funGetProductData("sell");
 
  },
   //DOM为真实，数据为真实
  mounted() {
    //每当图片加载都会触发防抖函数,让它只执行一次函数调用
    //混入
  },
  activated() {
    //组件被激活状态后调用
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.activatedY, 0);
    
  },
  deactivated() {
    //组件失效状态后调用
    this.activatedY = this.$refs.scroll.scrollY
    this.$bus.$off('itemImgLoad',this.itemImgListener) //离开组件就取消$bus监听事件
  },
  methods: {
    //网络请求相关方法
    funGetMultiData() {
      getMultiData().then(res => {
        this.banners = res.data.banner.list; //轮播数据
        this.recommends = res.data.recommend.list; //推荐数据
      });
    },
    funGetProductData(type) {
      let nub = this.goods[type].page; //当下拉更多的时候也要触发函数
      getProductData(type, nub).then(res => {
        this.goods[type].list.push(...res.data.list); //将list的内容一项一项的放进数组中
        this.goods[type].page += 1;
        this.$refs.scroll.loadMores(); //告诉scroll加载完一页了 想可以再次加载下一页了
      });
    },
    //事件监听相关方法
    ffffff(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 父组件接受到子组件的值，不管你们谁点击了，我都重新给你们赋值一次
      this.$refs.control.currentIndex = index
      this.$refs.control2.currentIndex = index
    },
    backLocation(position) {
      //top是否显示和隐藏
      //1.滑动如果大于1000就隐藏显示
      this.tops(position)
      //2.大于offsetTop让选项栏吸顶
      // console.log(Math.abs(position.y));
      
      this.isOffsetFiex = Math.abs(position.y) > this.isOffsetTop;
    },
    loadMore() {
      this.funGetProductData(this.currentType);
    },
    HomeSwiperLoad() {
      if (!this.isOffsetTop) {        
        this.isOffsetTop = this.$refs.control.$el.offsetTop;
      }
    }
  },

  computed: {
    threeList() {
      return this.goods[this.currentType].list; //计算tab选项卡的切换
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 用了scroll就没必要脱离文档了 */
  position: relative;
  z-index: 9;
}
.aaaa {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height:calc(100% - 93px);
  overflow: hidden; */
}
.two-tab-control {
  position: relative;
  z-index: 9;
}
</style>
