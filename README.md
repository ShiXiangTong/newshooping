# shooping
# css
css的vm是什么？？
    代表视口 手机屏幕的宽高吧
    如：height:100vm 

flex fixed同时使用场景？
    在子组件里面写的flex布局，又在父组件里调用加上class设置fixed 惊。
  选项卡遇到的问题：
        div尽量用百分比因为换个手机就位置不对了。
        flex-wrap: wrap;
        多行显示 图片要有宽度 不然都在一行显示，
        justify-content: space-around; ，
        这个是总的两边的宽度 == 中间的宽度，
        那我想让两遍和中间平分？，
        可以用padding挤一下 具体值是屏幕总的宽度-lide宽度*2/3 就是距离了吧。
    知识点API：
        .collect::before 在元素前面添加一个元素。
        text-overflow: ellipsis; 文字显示点点点...
    求中间展示区的方式：
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    第二种：
        /* height:calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px; */

1.划分目录结构 (主要的)
    
    src
        common 功能性组件
        assets 静态资源 (图片 css)
            base.css      1. @import './normalize.css' 2.App -> style -> improt './assets/base.css' 方可生效
            normalize.css  
        components 组件
           common  全部通用组件
           content 业务内通用组件
        views 主视图(首页组件 分类组件等)
        router   路由
        store    公共状态管理
        network  网络请求相关
        commonjs 通用js 如常量
        App
        main
        
2.路径预设
    build -> vue-loader.conf.js -> @src 等等都设置了一遍 而且这些文件里面又引用了其他的文件，然后我又把简写路径设置了一遍，直到全部引用成功。
3.小图标
    index.html -> link引入设置小图标 -> 小图标放在了static文件夹下 但不知道打包的时候会不会有问题？
4.home页面
    1.首先我在通用文件夹common下新建了一个组件，这个组件是导航，然后再从home页面引用这个组件，home页面的template里使用该组件。
    知识点：
        在一个通用组件里尽量少些样式，因为写了那么别的页面使用也会生效。
        在通用组件里使用(具名插槽solt里写name="")用了三个，好处是以后想换那个换那个，插槽外面用div包裹，才能显示。
        在通用组件里 根不能用id了，因为它就不能复用了，写class即可。
        在home页面里，再给组件加class设置样式，是因为避免了全局样式。
        在home页面里，引入完组件了，但是我想把某个具名插槽加上内容，就直接从组件中间写该具名组件加上内容覆盖掉就可以了。
        最重要的是别忘了从home页面的componets里挂上被用的组件！！！！！
        home及其他页面的模板最终会放在App这里 不用挂载就行 如果挂载了那就成全部的了。
5.利用请求封装拿数据
    将封装好的axios放在network文件夹下，新建一个文件作为总的请求。首页用到就新建一个文件封装好一个函数，通过home.js为home.vue提供服务。好处是更加容易管理。
    home.js返回的promise被首页.then(res=>{})拿到,然后放到首页的data中，供home及属于home的子组件使用。
    如果home下的子组件Swiper使用，那就要父传子(props)：在home父组件里挂载并使用子组件，需要写上<home-swiper :banners子组件props里的属性="banners父组件data值"></home-swiper> 这样子组件就拿到了父组件的数据，然后v-for放入template中，然后之前从父组件调用的就会生效了。

    知识点：
        v-for当前版本item在前！
        export default导出 import from 可以不用加括号   export导出 import {} from 导入 要加括号。
        什么是子组件？
        components挂载的就是 还有父组件 根组件。
        子组件里的props可以怎么填？
        可以写数组
            ['s','d'] 但不要把他们看成字符串，看成属性。
        可以写对象
            attribute：{type:String, default(){return []; 默认值必须是函数 2.5.3以上版本必须这么写函数。},required:ture}
            type:啥类型 能写多个吧
            default：父亲不给传时我写了个属性默认是啥 
            required：你必须穿个值给我 不然我就从控制台报错
            attribute：function(value){自定义验证传进来的值是啥样的}
6.选项卡制作
    分析：
        属于项目独立组件
        项目中每个用到该组件时候的只是文字不一样，没必要用插槽。
    流程：
        创建TabControl子组件，Home父组件使用。父组件给子组件传递一个文字数组，子组件接收到进行遍历渲染。增加一个:class="{active:index===currentIndex子组件中的变量}，再添加一个点击事件，将点击的index赋给数据 达到切换的效果。
    知识点：
        文字下面的线是由padding挤成的文字短 线长，而且是active下面的样式，要活。
    附加小功能：
        position: sticky; 
        top:40px;
        效果就是当某个div到达高度时，那就更换为diplaty:flextd; 然而没实现...
7.商品列表
    分析数据模型：
       同时请求三类数据 保存到a{属性:{x:1,x:[]},{x:2,x:[]},{x:3,x:[]}} 下拉加载更多只需要展示不需要请求 到达第几页了 三个分别有各自的页数
    请求数据流程：
        上次用到的home.js页面请求页面里，写上一个函数->请求network总文件。
        那传的时候需要两个参数 type page。
        home组件中调用(因为是函数导出的所以导入就这样{函数名} ) ->created初始化的时候调用一下函数(好处是逻辑清晰 要干啥就放在函数中) -> 把属性及页码传进去 -> 页码和属性都不是固定的 -> 当函数执行 那就是获取到这个属性现在的页码是多少 再+1给一个变量 再传进去（每次调用当然得这样） -> 那传进去 又拿到了 -> 再将该属性的页码变动+1。
    注意：
        在数据中定义的对象中的三个属性，是将来要被传进url中的，所以也是接口的一部分，不能随便填。如：http://123.0.0.125/ + pop/1
    展示流程：
        Home组件负责调用大组件，大组件根据Home页传数组的遍历出来对象 分给小组件。
        大组件的作用：组织需要展示的小组件。
        小组件的作用：生成模板。
    切换显示对应的数据：
        当点击选项卡时(选项卡组件里) -> 将通过子传父this.$emit('自定义事件名',index)将点击的第几个传给父组件 -> 父组件通过调用子组件(在子组件行间上绑定@自定义事件='父组件事件') -> 父组件拿到值进行swich判断 -> 如果是012 data中的数据将会变成对应的值 -> 其他组件知道要展示那个属性后就渲染了 -> 另外写在计算属性中减少行内的表达式。
8.重构betterScroll框架 
    因为：原生自带滚动太卡，手机端实现滚动。
    使用：一共是两个标签 父子 -> 父标签必须有固定高度 顺便加overlow hidden -> 在mounted全部加载完的阶段执行 -> new BS('docment.querySelector('元素'或者直接.) -> 基本使用完成。
    项目中：
        在vue中如何使用betterScroll？
        长久之计：
            因为这个框架可信度不高，可能过两年就不用了，我们想把这个项目的东西都改了很麻烦，因为很多页面都用了。所以解决办法：封装一层.vue 让所以页面面向这个组件就行了，到时候改好改。
        当前项目中common>scroll文件夹 -> 
    知识点：
        ref绑定 (确保在vue中拿到的是一个准确的元素，比如一个公用组件被很多页面使用 再渲染 那么就可能出现多个重复的class名)
        在组件中写 this.$refs.name 拿到的是一个组件对象
        在div中写  this.$refs.name 拿到的是一个元素
    关于调用组件时加class：
        也就是说这个组件被调用的时候起的class名被父组件里定义的class名会加在一起，而第二个div没啥事，再往里面塞的内容都会替换掉默认插槽。
        还有就是这个组件与别的组件没有任何引入关联的时候，class样式不生效 名字如果一样也就无妨了。那组件有关联了，class名字合并的情况下，子组件定义一个样式，父组件定义一个样式，那听子组件的！
    问题：
        click点击失效，要写API参数，click:ture
        ......
9.scrollTop回到顶部
    问题：点击A组件触发B组件的事件 (附图片了)
    流程：
        因为是业务共有组件，所以放在components/content下面的文件夹中 -> 放上一张图片 -> 被Home调取 同时监听组件事件 -> 发生点击事件就触发home组件的方法(0,0,100) -> 然后再调用scroll组件中的方法 -> 然后scroll实例对象.scrollTo(x，y，time) ->这样就能见名知意了。(不在home里调用scrollto Api这样不清楚)
    显示隐藏
    还是用了scroll框架的API：
    this.scroll.on('scroll',(position)=>{
       this.$emit('backLocation',position)
    })
    拿到当前div距离顶部滚动了多少的数据 -> 发给父组件 -> 父组件再去根据数据显示和隐藏按钮。

10.上拉加载更多
    scorll里面监听事件 -> 开启首页监听 给scroll传ture -> this.scrollo.on('API')回调 -> 传出去 让父知道下拉到底了 -> 让父亲调用函数 -> 加载下一页 -> 加载完 再调用scroll里的方法 -> 可以开启下次加载了 
    
    回弹动画bug:
        当动画没有结束的时候又拉了一次，那又会触发函数说我拉到底了，然后父组件就又会再次请求....

11.上拉加载被弃用 重新解决BUG scroll获取高度比图片加载速度快
    检测图片每加载完成一次就获取一次当前scrollHight的高度：
        涉及问题：
            组件传值繁杂，父A 子a 子b -> 子a 孙子a -> 孙子a要给 子b 联系。
        三种办法：
            1.一种是传值 ->@load方法检测 -> 通过$emit传多层 -> 最终刷新scroll  API: this.$refs.scroll.scroll.refresh() 
            2.在Vue原型上加一个$bus方法 -> 通过this.$bus.emit('fun')绑定 -> 再用this.$bus.on("fun",function)操作
            3.使用Vuex

12.执行三十次没有必要 所以优化加防抖函数
    原理：当执行这个函数以后会进行等待，如果下次在规定的事件内又执行了，那取消上一次操作，执行这一次操作。(input案例)
    防抖函数：
        export function debounce(func, delay){
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args) 
        }, delay)
    }
    放在通用功能中，哪里需要，哪里import{函数} 
} 
13.选项栏吸顶
    原理：
        利用两个一样的导航栏，一个在scroll里面一个在外面，当轮播图加载完成后（触发获取距离父级的高度）当我滚动的时候（scroll会触发事件）当他们两个值相等的时候，让顶部的那个显示出来，点击那个，让那个和另一个的index变量一样，其实是有两个的。
        我猜想老师为什么不用flexd加scoll的原因是有个毛病。。。
    API:
        $el.offsetTop 是距离父级顶部的距离
          scrollTotop 被卷去的距离
        key值是唯一性 不然报错

14.让Home不销毁
    利用keep-alive + activated激活后 + deactivated失效后
    重新刷新一次scroll
    与老师不一样的顺序有BUG：
        this.$refs.scroll.refresh();  
        this.$refs.scroll.scrollTo(0, this.activatedY, 0);
        当组件被激活后重新获取一次scroll的值，跟先定位好在重新获取一下值不一样，好像会重置scrollTo的y值。

1.商品详情页
    <keep-alive exclude="Detail"> 放行 重新创建组件-执行八个钩子
    导航栏基本流程：
        创建views里的大板块Detail -> 然后再匹配路由添加动态路由 -> 当在Home页面点击每个item的时候触发函数 -> 函数里写this.$router.push(路径+动态iid) -> 再从Detail页面通过this.$route.params.iid拿到动态值 -> 存到变量里面 ->

        引入通用公共组件navbar -> 放在Detail自己单独创建的DetailNav里面使用 -> 替换插槽时注意solt写在div里面使用 -> for循环文字出来 加点击事件 加动态class 加返回按钮(两种方式1. this.$router.go(-1) 2.用back) 
    轮播图遇到问题：
        一开始用老师自己封装的轮播图出现一个问题，就是图片不轮播，值能显示一张，后来打印created()与moneted()时能不能拿到数据，发现一直拿不到，而updated() 在dom渲染数据时拿到了数据，如果不去渲染dom updated也不起作用？不知道为什么。老师说父组件给子组件传值后在子组件moueted()阶段就可以拿到了。后来，我把动态数据换成静态后，发现是没有问题，原因应该就是在轮播图上。然后我又换成框架，我不会引用，就又看了看老师的视频，它用的2.x的swiper。
        重点是在img上加了一个key值，然后就搞定了.... 还有就是轮播图的一个 observer:true,也可以有用。
    商品列表搭建tamplate遇到的疑问：
        父组件开始创建组件时候 -> 模板编译 render函数创建 生成虚拟DOM diff算法进行DOM比对 是否触发重新编译 data props数据是否发生了变化 这些省略不谈 -> 执行八个钩子函数时，当在某一个阶段异步请求数据时，八个钩子函数不会的数据返回。也就意味着初始化的数据被渲染上去，而异步请求回来的数据是后来才替换掉初始数据的。而我从模板里三重找值找不到就会报错但dom却渲染出来了，而两重找数据找不到会是空值undefind当数据有了就进行显示了。
        解决：事先用if判断先让dom不生成，当发现goods里面有数据了再去生成模板，不能用v-show就是因为这部不是简单的显示与隐藏。
    参数：
        使用的table循环创建tr行 td列 分两个table写的。
    评论：
        预先显示一个，头像文字正常渲染。
        时间知识点：
            将从服务器端拿到的32431332数字转换成2018-1-1-12:22 利用别人封装的一个js文件 将从服务器端拿到的数据用事件对象new data(value*1000)转换时间戳，再调用那个js文件，将参数(变量，'格式yyyy-dd')传入就得到了。
    推荐页面：
        这里利用首页的goodlist复用组件 + 处理lastImg 刷新scroll。
        问题1：
            但是把组件直接拿过来用，首页与推荐里面的data数据格式不一样，就可以用计算属性 return a || b 有a返回a 没有返回b。
        问题2：
            css位置不对，依次查看后给推荐数据加了 position: relative 就没飘到上层去了。
        问题3：
            首页的goodlist有一个@load事件，在Detail页面调用会也会触发@load事件 -> 再去执行$bus.$emit(事件)监听 -> home页面的$bus.$on(事件，function)就会执行 刷新home的scroll 。所以我不需要通知home页面刷新，我只想让本次调用的页面刷新，该怎么做？
            思路一：用路由判断谁触发的，那就发送相应的事件a b。
            思路二：一旦发现home页面切换出去，那就把事件监听取消(this.$bus.$off('事件名'，'$on里面的函数建议用data保存一下放这里') 
                    一旦发现Datail页面切出去，那就把事件监听取消掉。
                    而防抖函数放在混入里，谁用就与谁混入，而调用的scroll是当前页面的scroll。
            （详情看图片）

    点击谁跳转到谁的组件上：
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100) 父组件接受完子组件点击的是那个后，
      避坑与最终方案：
        1.created:
            this.$nextTick(()=>{  //数据赋值完后 等到dom渲染完获取，但是图片除外！
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.parms.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.themeTopYs);
            })
        2.updated(){ //数据发生改变就获取，但dom还没渲染完成
                //会发生多次获取
                ....
            }
        3.methods:
            imageLoad() { //在图片每次加载完的回调里，再执行，能拿到正确的值，但调用次数过多
                this.newRefresh(); //image的防抖
                ....
            }
            4.定义一个变量this.A = 防抖(不行执行多次的函数，时间) -> 从image加载完回调里调用this.a
            这样就实现了图片加载完了，我也只获取和设置了一次。

    滚动到那个组件，那个组件的active被选中
       datail组件中的scroll组件的方法已经被监听，当触发滚动就会发送事件，父组件拿到事件后，找到Y值，根据Y值与各个组件的高度比较，使用for循环，判断当什么什么什么时候给data赋值，然后将nav组件里的变量改变。

2.层级关系分清

3.回到顶部 使用混入达到复用效果

4.使用Vuex做加入购物车
  流程：
      1.是添加新的物品 还是 X2？ 
        A组件 -> this.$emit(事件，参数) -> 父组件 -> @事件=函数 ->向actions发送： this.$store.dispatch(函数名，参数) -> actions接受：函数(context,paylod) -> 发送给mutations：context.commit('函数名'，参数) -> mutions接受到后是讲参数+1，还是push 直接操作state。
      2.购物车(0) 怎么获取？
        导航栏用的是插槽<div solt="">
        vuex中分离出getters后 ->在store里导入挂载 ->计算好list的的长度后 -> 在需要这个结果的页面通过导入 -> import {mapGetters} 'vuex' 再从commputed 通过...name({a})或者(['s']) 自动混入哦
     3.checked绑定？一定是模型的属性发生改变！！
        当发生添加时，给每个item加一个属性，给button绑定这个属性，button里拿到这个属性判断是否显示或隐藏。
     4.是否全部为ture 则全选被点亮
        利用计算属性 -> 使用find函数 -> 查找每一个item 如果有一个不为ture则返回ture -> 再取反 赋值给全选 
     5.点击全选使所有item为ture/false
        点击后 -> 根据上面全选的状态判断 现在如果是全为ture 那改成false 使用foreach修改。 
     6.计算总价
       利用计算属性 -> 使用filter 返回已被选择的对象 -> 再利用reduce 计算出总价。
     7.结算数量
        同上利用 filter+reduce
     8.点击加入购物车弹框
       重点不懂：自己新建了一个组件和一个js -> 要先在main.js引入js并使用 -> 然后到js里将dom和对象挂载到Vue上 -> 这样就可以随时拿 如:this.$toast.shows(res,1000) 
     9.结算判断要没有商品
       与全选计算差不多
       ...

  注意点：
    mutations里面尽量不要写很多逻辑，写在actions里，actions不仅仅可以放异步操作。
    而且store里只需要挂载moutions actions等对象就行了。
    actions 也可以与moutions一样有 mapActions  mapMoutions 混入到当前组件的methods 或者 mouted created
    actions里面可以返回一个promise   谁用方法了：a.dispatch(事件，参数).then()........

  变量：
    //如果有一天我要修改某个地方，那只需要该这里其他的地方也会跟着改变。
    //变量用在函数名上要加[SSSSS]
   
fastclick 300ms延迟问题

vue图片懒加载
