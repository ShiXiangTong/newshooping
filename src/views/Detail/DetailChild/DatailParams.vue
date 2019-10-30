<template>
  <div class="param-info" v-if="Object.keys(params).length !== 0">
      <!-- 第一个table -->
      <table class="info-size" v-for="(item,index) of params.rule.tables" :key="index">
          <tr v-for="(list,index) of item" :key="index">
             <td v-for="(tds,index) of list" :key="index">{{tds}}</td>
          </tr>
      </table>
       <!-- 第二个table -->
      <table class="info-param">
          <tr v-for="(item,index) of params.info.set" :key="index">
              <td class="info-param-key">{{item.key}}</td>
              <td class="param-value">{{item.value}}</td>
          </tr>
      </table>
      <!-- 底部有个img 很少出现就没在这里写 -->
  </div>
</template>

<script>
export default {
    name:"DatailParams",
    props:{
        params:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    
}
</script>

<style scoped>
 .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>