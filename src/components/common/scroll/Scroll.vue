<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "Scroll",

  //父组件传递过来的东西
  props: {
    monitor: {
      type: Number,
      default() {
        return 0;
      }
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      shou: false
    };
  },
  mounted() {
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      probeType: this.monitor, // 0不监听 1非实时监听 2屏幕滑动就触发 3手指离开也触发
      pullUpLoad: this.pullUpLoad, //页面是否需要监听
      click: true,
      bounce: {
        //bottom: false, //取消回弹动画
      }
    });
    //API - scroll 监听滚动事件即触发
    this.scroll.on("scroll", position => {
      this.$emit("backLocation", position);
    });
    //API - pullingUp 上拉到底事件 不加if也可以 这样更严谨
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("loadMore");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    loadMores() {
      //开启允许下一次加载
      this.scroll && this.scroll.finishPullUp(); //APi finishPullUp
    },
    refresh() {
      //刷新一个scroll的高度 home/Datail都用到了
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    activatedY() {
      //失效后获取位置
      return this.scroll ? this.scroll.y : 0;
    }
  },
  computed: {
    scrollY() {
      return this.scroll.y;
    }
  }
};
</script>

<style scoped>
/* 
    也就是说这个组件被调用的时候起的class名被组件里定义的class名会加在一起，而第二个div没啥事，再往里面塞的内容都会替换掉默认插槽。
    还有就是这个组件class名与home页面的class名 或 样式 不会起冲突 因为是局部的。
 */
</style>