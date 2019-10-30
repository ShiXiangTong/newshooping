import {debounce} from "./utils" //引入防抖
import BackTop from "@/components/content/backTop/BackTop";

//这东西被混入了，也就是说可以直接拿到this.newRefresh
export const itemListenerMixin = {

    data(){
        return{
            itemImgListener:null,
            newRefresh:null,
        }
    },
    mounted(){
        //                        这个scroll谁调用的就能获取到谁的ref也就刷新谁的。
        this.newRefresh = debounce(this.$refs.scroll.refresh,100)

        // 下面两个是为detail与home页面的goodlist准备的
        this.itemImgListener = () =>{
           this.newRefresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener) //有人给我发射谁我监听的就是谁 goolist
    }
}

// home与detail页面的top
export const HomeDatailTop = {
    data(){
        return {
            isScrollTop: false,
        }
    },
    components:{
        BackTop
    },
    methods:{
        backToTop() {
            //点击top触发回到顶部
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        tops(position){
            this.isScrollTop = Math.abs(position.y) > 1000;
        }
    }
    
}