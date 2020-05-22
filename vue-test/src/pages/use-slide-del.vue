<template>
  <div>
    <slip-del
      :list="list"
      ref="slipDel"
      delBtnWidth="60"
      touchLength="20"
      delText="删除"
      @deleteItem="del"
      @click="goItem"
    >
      <div slot="default" slot-scope="{item}" class="slide-del-item">
        {{item.title}}
      </div> 
      <div slot="del-btn" class="del-btn">
        <span>del-btn</span>
      </div>
    </slip-del>
  </div>
  
</template>

<script>
import SlipDel from '@/components/slide-del'

export default {
  name:'use-slide-del',
  data(){
    return{
      list:[{title:'这是一段测试数据1',id:'1'},{title:'这是一段测试数据2',id:'2'},{title:'这是一段测试数据3',id:'3'}]
    }
  },
  components: {
    SlipDel
  },
  methods: {
    slipOpen(vm) {
      // 无需手动关闭
    },
    del(params) {
      // 删除回调
      console.log('删除：',params)
    },
    goItem(params){
      console.log('跳转',params)
    }
  }
}
</script>
<style lang="scss">
  .del-btn{
    background:#f00;
  }
</style>