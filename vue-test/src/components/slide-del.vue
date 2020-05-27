<template>
  <div>
    <div id="slidelist" class="slidelist">
      <div class="slide-item" v-for="(item,index) in list" :key="item.id" >
          <div class="scroll-item" :style="scrollItemStyleObject"> 
            <v-touch @swipeleft="handleSwipeLeft" @swiperight="handleSwipeRight">
              <div class="main-item" @click="doClick($event,item)">
                <slot :item="item">这是实例文字</slot>
              </div>
            </v-touch>
            <div class="del-btn-box" :style="delBtnStyleObject" @click="deleteItem(index)">
              <slot name="del-btn">删除</slot>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'slide-del',
  data() {
    return {
      preTouchIndex:'',
      preTouchEl:null,
      scrollItemStyleObject: {
        width: `calc( 100% + ${this.delBtnWidth/50}rem )`
      },
      delBtnStyleObject:{
        width:`${this.delBtnWidth/50}rem`
      },
      e:null
    };
  },
  props:{
    list:{
      type:Array,
      default:()=>[{title:'这是一段测试数据1',id:'1'},{title:'这是一段测试数据2',id:'2'},{title:'这是一段测试数据3',id:'3'}]
    },
    touchLength:{//触发左划右划的手指滑动距离
      type:[Number,String],
      default:20
    },
    delBtnWidth:{//删除按钮的长度
      type:[String,Number],
      default:'60'
    },
    delText:{
      type:[String],
      default:'删除'
    },
  },
  methods: {
    handleSwipeLeft(e){
      // alert('左滑')
      this.e&&this.handleSwipeRight(this.e);//重置上一次滑动
      let elStyle=e.target.parentNode.parentNode.parentNode.style;
      this.e=e;
      elStyle.cssText=elStyle.cssText+`transform:translateX(-${this.delBtnWidth/50}rem);`
    },
    handleSwipeRight(e){
      // alert('右滑')
      let elStyle=e.target.parentNode.parentNode.parentNode.style;
      elStyle.cssText=elStyle.cssText+`transform:translateX(0);`
    },
    deleteItem(index){
      this.list.splice(index,1)
      this.$emit('deleteItem',{index})
    },
    doClick(e,{id}){
      console.log(e.target)
      this.handleSwipeRight(this.e);//跳转时重置左滑状态
      this.$emit('click',{id})
    }
  },
  created() {
  },
  mounted() {
  },
};
</script>
<style lang="css" scoped>
.slide-item{
  overflow:hidden;
}
.main-item{
  text-align:left;
  float:left;
  width:100vw;
  transition:width 0.5s ease;
}
.del-btn-box {
  position:absolute;
  height:100%;
  right:0;
  top:0;
}
.scroll-item{
  overflow:hidden;
  transition:all 0.2s linear;
  position:relative;
}

</style>