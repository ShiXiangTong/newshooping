<template>
    <div class="cart">
        <nav-bar class="NavBar">
            <div slot="center">购物车({{getCarLength}})</div>
        </nav-bar>
        <!-- 商品展示 -->
        <scroll class="scroll" ref="scroll">
            <cart-list class="content" :list="getCarlist"></cart-list>
        </scroll>
        <!-- 购物车 -->
        <bottom-close></bottom-close>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import Scroll from "../../components/common/scroll/Scroll"
import CartList from './CartChiid/CartList'
import BottomClose from "./CartChiid/BottomClose"

import {mapGetters} from 'vuex'

export default {
    name:"Cart",
    components:{
        NavBar,
        Scroll,
        CartList,
        BottomClose
    },
    computed:{
        ...mapGetters([
            'getCarlist',
            'getCarLength'
        ])
    },
    activeted(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart{
    height: 100vh;
}
.NavBar{
    background-color: var(--color-tint);
    color:#fff;
}
.scroll{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
}
.content{
    height: 100%;
}
</style>